class TouchUtil {
  _getCoordinates(e) {
    const [touch] = e.touches;
    return {
      x: touch.clientX,
      y: touch.clientY,
    };
  }

  _getDirection(displacement) {
    return {
      x: {
        direction: displacement.x < 0 ? 'left' : 'right',
        value: Math.abs(displacement.x),
      },
      y: {
        direction: displacement.y < 0 ? 'up' : 'down',
        value: Math.abs(displacement.y),
      },
    };
  }
}

export default TouchUtil;
