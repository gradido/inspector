export class Timestamp {
  public seconds: string = '0'
  public nanos: number = 0

  getDate(): Date {
    return new Date(parseInt(this.seconds) * 1000.0 + this.nanos / 1000000.0)
  }
}