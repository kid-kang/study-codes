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

// 在拖拽目标时触发的事件 dragstart、drag、dragend
// 在目标区域释放时触发事件 dragenter、dragleave 、dragover 、drop

// dragstart、dragend - 元素开始和结束拖动时触发此事件
// drag - 元素正在拖动时持续触发此事件（无论是否在目标区域内）

// dragenter、dragleave - 当被拖动的元素进入和离开目标区域内时触发此事件
// dragover - 当被拖动的元素在目标区域内拖动时触发此事件
// drop - 当被拖动的元素在目标区域被放下时触发此事件

// dragstart 事件： 在进行拖放操作时，通过dataTransfer来实现数据的存储和获取，每个event事件对象中都会有DataTransfer对象用来保存被拖动的数据。它可以保存一项或多项数据、一种或者多种数据类型。