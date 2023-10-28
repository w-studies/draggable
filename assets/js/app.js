import { makeDraggable } from './draggable.js'

const draggableElements = document.querySelectorAll('.draggable')

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
