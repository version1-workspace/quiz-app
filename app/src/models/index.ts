export class BaseModel<T> {
  private readonly _raw: T

  constructor(params: T) {
    this._raw = params
  }

  get raw() {
    return this._raw
  }
}

export const proxyHandler = <K extends BaseModel<V>, V>() => ({
  get: (target: K, prop: keyof V) => {
    if (target[prop as keyof K]) {
      return target[prop as keyof K]
    }

    return target.raw[prop as keyof V]
  }
})


