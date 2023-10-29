export const makeDraggable = (state, el) => {
  function getBorderSize(el) {
    const computedStyle = getComputedStyle(el)

    const x =
      parseFloat(computedStyle.getPropertyValue('border-left-width')) +
      parseFloat(computedStyle.getPropertyValue('border-right-width'))

    const y =
      parseFloat(computedStyle.getPropertyValue('border-top-width')) +
      parseFloat(computedStyle.getPropertyValue('border-bottom-width'))

    return { x, y }
  }

  function start(event) {
    if (event.button !== 0) return // left button only
    event.stopPropagation() // for nested draggables

    el.classList.add('move')
    el.setPointerCapture(event.pointerId)
    const container = document.querySelector(el.getAttribute('data-container'))
    const draggableElement = document.querySelector(el.getAttribute('data-draggable'))

    state = {
      ...state,
      dragging: { dx: state.pos.x - event.x, dy: state.pos.y - event.y },
      offset: {
        x: event.x - draggableElement.getBoundingClientRect().left,
        y: event.y - draggableElement.getBoundingClientRect().top
      },
      container,
      draggableElement,
      containerBorderSize: getBorderSize(container)
    }
  }

  function end(event) {
    state.dragging = null
    el.classList.remove('move')
  }

  function move(event) {
    if (!state.dragging) return
    event.stopPropagation()

    const containerRect = state.container.getBoundingClientRect()

    const maxX = containerRect.width - state.draggableElement.offsetWidth
    const maxY = containerRect.height - state.draggableElement.offsetHeight

    const pointerX = event.x - state.offset.x - containerRect.left
    const pointerY = event.y - state.offset.y - containerRect.top

    // Limit the position within the container
    const x = Math.min(maxX, Math.max(0, pointerX))
    const y = Math.min(maxY, Math.max(0, pointerY))

    state.draggableElement.style.transform = `translate(${x}px,${y}px)`

    document.querySelector('.log > p:last-child').innerHTML = JSON.stringify(
      {
        event: { x: event.x, y: event.y },
        element: { x: state.offset.x, y: state.offset.y },
        translate: `translate(${x}px,${y}px)`,
        parent: state.draggableElement.parentNode
      },
      null,
      2
    )
  }
  el.addEventListener('pointerdown', start)
  el.addEventListener('pointerup', end)
  el.addEventListener('pointercancel', end)
  el.addEventListener('pointermove', move)
  el.addEventListener('touchstart', (e) => e.preventDefault())
  el.addEventListener('dragstart', (e) => e.preventDefault())
}
