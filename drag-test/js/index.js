const sortableList = document.querySelector('.sortable-list')
const items = document.querySelectorAll('.item')

items.forEach(item => {
  item.addEventListener('dragstart', () => item.classList.add('dragging'))
  item.addEventListener('dragend', () => item.classList.remove('dragging'))

})

const initSortableList = (e) => {
  // 去除鼠标🚫样式
  e.preventDefault()

  const draggingItem = sortableList.querySelector('.dragging')
  const others = [...sortableList.querySelectorAll('.item:not(.dragging)')]

  // 找到第一个在鼠标下面的盒子
  let nextItem = others.find(item => {
    return e.clientY <= item.offsetTop + item.offsetHeight / 2
  })

  // 在nextItem前面动态插入draggingItem   insertBefore如果元素存在则移动
  sortableList.insertBefore(draggingItem, nextItem)
}

// 拖动时持续触发
sortableList.addEventListener('dragover', initSortableList)

// dragstart事件 是监听拖拽物的
// drag、dragover、dragleave事件 是监听可放置区域的
// drag：拖拽完成事件、完成了就触发一次
// dragover: 在可放置区域内移动则持续触发该事件