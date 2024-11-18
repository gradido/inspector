export class Decay {
  decay: string
  duration: number
  end: Date
  start: Date

  constructor(decay: string, duration: number, end: Date, start: Date) {
    this.decay = decay
    this.duration = duration
    this.end = end
    this.start = start
  }
}