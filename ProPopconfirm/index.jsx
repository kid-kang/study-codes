/**
 * @file 气泡二次确认组件，某种情况不需要弹出气泡直接执行回调
 * @file 例如未勾选直接点批量删除不希望弹出确认框而直接弹出提示
 */
import { message, Popconfirm } from "antd";
import { useState } from "react";
import { t } from "@/utils/method";

/**
 * @param {Function} confirm （必填）确认操作的回调
 * @param {boolean} [condition=false] （非必填）不弹气泡的判断条件，默认false都会弹
 * @param {string} [title] （非必填）二次确认气泡的标题
 * @param {Function} [conditionCb] （非必填）不弹气泡的回调
 * @param {object} [attribute] （非必填）Popconfirm组件额外的属性
 */
export default function ProPopconfirm(props) {
  const [open, setOpen] = useState(false);
  const { confirm, condition = false, title = t("确认删除？"), conditionCb, ...attribute } = props;

  const handleOpenChange = (newOpen) => {
    // 关
    if (!newOpen) {
      setOpen(newOpen);
      return;
    }
    // 开
    if (condition) {
      return conditionCb ? conditionCb() : message.error(t("未选择操作的对象！"));
    } else {
      setOpen(newOpen);
    }
  };

  return (
    <Popconfirm
      title={title}
      open={open}
      onOpenChange={handleOpenChange}
      onConfirm={() => {
        try {
          confirm();
        } catch (err) {}
      }}
      onCancel={() => setOpen(false)}
      {...attribute}
    >
      {props.children}
    </Popconfirm>
  );
}
