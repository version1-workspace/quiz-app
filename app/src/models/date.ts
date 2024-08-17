import dayjs from "dayjs";

export default class AppDate {
  private readonly _raw: dayjs.Dayjs;

  constructor(params: Date) {
    this._raw = dayjs(params);
  }

  toString() {
    return this._raw.toString();
  }

  format(format: string) {
    return this._raw.format(format);
  }

  dayAgo(day: number) {
    return new AppDate(this._raw.subtract(day, "day").toDate());
  }

  get withinAWeek() {
    const sec = dayjs().diff(this._raw, "second");
    return sec < 60 * 60 * 24 * 7;
  }

  get withinAYear() {
    const sec = dayjs().diff(this._raw, "second");
    return sec < 60 * 60 * 24 * 365;
  }

  get relative() {
    const sec = dayjs().diff(this._raw, "second");
    const borders = [
      {
        threshold: 60,
        msg: (sec: number, _unit: number) => `${sec}秒前`,
      },
      {
        threshold: Math.pow(60, 2),
        msg: (sec: number, unit: number) => `${Math.floor(sec / unit)}分前`,
      },
      {
        threshold: Math.pow(60, 2) * 24,
        msg: (sec: number, unit: number) => `${Math.floor(sec / unit)}時間前`,
      },
      {
        threshold: Math.pow(60, 2) * 24 * 7,
        msg: (sec: number, unit: number) => `${Math.floor(sec / unit)}日前`,
      },
      {
        threshold: Math.pow(60, 2) * 24 * 30,
        msg: (sec: number, unit: number) => `${Math.floor(sec / unit)}週間前`,
      },
      {
        threshold: Math.pow(60, 2) * 24 * 365,
        msg: (sec: number, unit: number) => `${Math.floor(sec / unit)}ヶ月前`,
      },
    ];

    for (let i = 0; i < borders.length; i++) {
      const ele = borders[i];
      if (sec < ele.threshold) {
        const unit = borders[i - 1]?.threshold || 0;
        return ele.msg(sec, unit);
      }
    }

    return `${Math.floor(sec / (Math.pow(60, 2) * 24 * 365))}年前`;
  }

  sameDay(date?: AppDate) {
    if (!date) {
      return false;
    }

    return this._raw.isSame(date._raw, "day");
  }

  sameYear(date?: AppDate) {
    if (!date) {
      return false
    }

    return this._raw.isSame(date._raw, "year");
  }
}
