let _statsInstance: Stats;

export default function useStats() {
  const running = false;
  let stopped = false;
  function animate() {
    _statsInstance.showPanel(0);
    _statsInstance.begin();

    // monitored code goes here

    _statsInstance.end();
    if (!stopped) {
      requestAnimationFrame(animate);
    }
  }

  return {
    _statsInstance,
    start: async () => {
      if (!running && !stopped) {
        const Stats = (await import('stats.js')).default;

        _statsInstance = new Stats();
        stopped = false;
        _statsInstance.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(_statsInstance.dom);
        requestAnimationFrame(animate);
      }
    },
    stop: () => {
      stopped = true;
      if (_statsInstance.dom.parentNode) {
        _statsInstance.dom.parentNode.removeChild(_statsInstance.dom);
      }
    }
  };
}
