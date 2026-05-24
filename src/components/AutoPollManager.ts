import { CONFIG } from '../config'

export class AutoPollManager {
  timerId: ReturnType<typeof setTimeout> | undefined = undefined

  public callAfterTimeout(callback: Function) {
    if (CONFIG.AUTO_POLL_INTERVAL > 0) {
      this.clearTimer()
      this.timerId = setTimeout(callback, CONFIG.AUTO_POLL_INTERVAL)
    }
  }

  public clearTimer(): void {
    if (this.timerId) {
      clearTimeout(this.timerId)
      this.timerId = undefined
    }
  }
}
