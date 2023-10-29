import { makeDraggable } from './draggable.js'

const draggableElements = document.querySelectorAll('.draggable')

for (const dragme of draggableElements) {
  const container = document.querySelector(dragme.getAttribute('data-container'))

  if (!container.contains(dragme)) {
    container.appendChild(dragme)
  }
  makeDraggable(
    {
      pos: {
        x: 0,
        y: 0
      }
    },
    dragme
  )
}
