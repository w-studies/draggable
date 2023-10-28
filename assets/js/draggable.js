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

    state = {
      ...state,
      dragging: { dx: state.pos.x - event.x, dy: state.pos.y - event.y },
      offset: {
        x: event.x - el.getBoundingClientRect().left,
        y: event.y - el.getBoundingClientRect().top
      },
      container,
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

    const maxX = containerRect.width - state.containerBorderSize.x - el.offsetWidth
    const maxY = containerRect.height - state.containerBorderSize.y - el.offsetHeight

    const pointerX = event.x - state.offset.x - containerRect.left
    const pointerY = event.y - state.offset.y - containerRect.top

    // Limit the position within the container
    const x = Math.min(maxX, Math.max(0, pointerX))
    const y = Math.min(maxY, Math.max(0, pointerY))

    el.style.left = `${x}px`
    el.style.top = `${y}px`
  }

  el.addEventListener('pointerdown', start)
  el.addEventListener('pointerup', end)
  el.addEventListener('pointercancel', end)
  el.addEventListener('pointermove', move)
  el.addEventListener('touchstart', (e) => e.preventDefault())
  el.addEventListener('dragstart', (e) => e.preventDefault())
}
