export default class Timer {
  count: number = 0;
  intervalId?: any;

  constructor(defaultCount: number = 0) {
    this.count = defaultCount;
  }

  start(cb: (count: number) => void, interval: number) {
    this.intervalId = setInterval(() => {
      this.count += 100;

      if (this.count % interval === 0) {
        cb(this.count);
      }
    }, 100);
  }

  stop() {
    clearInterval(this.intervalId);
  }
}
