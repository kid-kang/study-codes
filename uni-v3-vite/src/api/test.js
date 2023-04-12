import goods from './goods.json'

export function apiGoods(pageNum, pageSize, keyword) {
  return new Promise((resolute, reject) => {
    setTimeout(() => {
      try {
        const data = {
          list: [], // 数据列表
          totalCount: 0, // 总数量
          totalPage: 0, // 总页数
          hasNext: false, // 是否有下一页
        }

        // 符合关键词的记录
        let keywordList = []
        if (!keyword || keyword === '全部') {
          // 搜索全部商品
          keywordList = goods
        } else {
          for (let i = 0; i < goods.length; i += 1) {
            const good = goods[i]
            if (good.goodName.indexOf(keyword) !== -1) {
              keywordList.push(good)
            }
          }
        }

        // 分页
        for (let i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i += 1) {
          if (i >= keywordList.length) break
          data.list.push(keywordList[i])
        }

        // 汇总数据
        data.totalCount = keywordList.length
        data.totalPage = Math.ceil(data.totalCount / pageSize)
        data.hasNext = pageNum < data.totalPage

        resolute(data)
      } catch (e) {
        reject(e)
      }
    }, 1000)
  })
}
