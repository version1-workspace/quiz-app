import dayjs from 'dayjs'

export default class AppDate {
  private readonly _raw: dayjs.Dayjs

  constructor(params: Date) {
    this._raw = dayjs(params)
  }

  toString() {
    return this._raw.toString()
  }
}
