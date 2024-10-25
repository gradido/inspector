export class TimestampSeconds {
  public seconds: string = '0'

  getDate(): Date {
    return new Date(parseInt(this.seconds) * 1000.0)
  }
}