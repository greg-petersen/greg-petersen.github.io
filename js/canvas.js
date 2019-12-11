define(() => {
  const canvasElement = $("#canvas").get(0)
  const canvasContext = canvasElement.getContext("2d")

  // TODO: Come up with a to scale canvas
  canvasContext.scale(2, 2)

  return {
    canvasContext,
    canvasElement
  }
})
