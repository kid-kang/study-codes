/**
 * @file 支持下拉滚动触底刷新更多的下拉选择表单组件
 */

import { Select, Spin, message } from "antd";
import { debounce } from "lodash";
import { useState } from "react";
import { t } from "@/utils/method";
const { Option } = Select;

/** loadOptions回调说明
 * @description: 该组件接收一个异步的loadOptions回调函数，用来请求更多下拉的选项，以下是该函数接收的参数以及返回值格式
 * @param {number} page 当前页
 * @param {string} search 搜索词
 * @return {object} 返回值格式：{success:true, data:[opt1,opt2]}
 */
export default function ProSelect({ loadOptions, ...attribute }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false); // 加载更多状态
  const [isBottom, setIsBottom] = useState(false); // 到底状态
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  function initData() {
    setPage(1);
    setSearch("");
    setIsBottom(false);
  }

  function handleScroll(e) {
    if (loading || isBottom) {
      return;
    }
    const distanceBottom = e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop;
    if (distanceBottom <= 50) {
      getLoadOptions(false, search, page + 1);
      setPage(page + 1);
    }
  }

  function handleSearch(value) {
    getLoadOptions(true, value, 1);
    setIsBottom(false);
    setSearch(value);
    setPage(1);
  }

  async function getLoadOptions(isSearch, search, page) {
    setLoading(true);
    try {
      const res = await loadOptions(page, search);
      if (!res.success) {
        return message.info(res.message || "Request Error");
      }
      if (res.data.length) {
        setOptions((prevOptions) => optsDeduplication(isSearch ? res.data : [...prevOptions, ...res.data]));
      } else {
        if (isSearch) {
          setOptions([]);
          setIsBottom(false);
        } else {
          setIsBottom(true);
        }
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  return (
    <Select
      {...attribute}
      showSearch
      placeholder={t("支持模糊搜索")}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      defaultActiveFirstOption={false}
      filterOption={false}
      onSearch={debounce(handleSearch, 400)}
      onPopupScroll={debounce(handleScroll, 400)}
      onBlur={initData}
      onFocus={(e) => {
        handleSearch(e.target.value);
      }}
    >
      {options.map((item) => (
        <Option value={item.value} key={item.value} option={item}>
          {item.label}
        </Option>
      ))}

      {loading ? (
        <Option value={-1} disabled>
          <Spin />
        </Option>
      ) : (
        ""
      )}

      {isBottom ? (
        <Option value={-2} disabled>
          - {t("已经到底了")} -
        </Option>
      ) : (
        ""
      )}
    </Select>
  );
}

// opts去重
function optsDeduplication(opts) {
  const labelArr = [];
  const valueArr = [];
  const resArr = [];
  opts.forEach((item) => {
    if (!labelArr.includes(item.label)) {
      if (!valueArr.includes(item.value)) {
        resArr.push(item);
        labelArr.push(item.label);
        valueArr.push(item.value);
      }
    }
  });
  return resArr;
}
