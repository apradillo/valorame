export class PagingModel<T> {

  constructor(public items: T[],
              public total: number) {
  }
}
