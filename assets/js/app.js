import { makeDraggable } from './draggable.js'

const draggableElements = document.querySelectorAll('.modal-header')

for (const dragme of draggableElements) {
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
