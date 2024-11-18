import m from 'mithril'

// Toast typ definition
interface Toast {
  id?: number
  title: string
  message: string
  variant: string
  bodyClass?: string
  timeout?: number
}

const defaultDelay = 5000

export class Toaster implements m.ClassComponent<{}> {
 
  constructor(private toasts: Toast[] = [], private counter = 0) {}

  public toast(toast: Toast) {
    const id = ++this.counter
    toast.id = id
    toast.timeout ??= defaultDelay
    this.toasts.push(toast)
    m.redraw()

    if (toast.timeout > 0) {
      setTimeout(() => this.removeToast(id), toast.timeout)
    }
  }

  removeToast(id: number) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id)
    m.redraw()
  }

  public success(message: string, timeout?: number) {
    this.toast({
      title: t.__('Success'),
      message,
      variant: 'success',
      timeout
    });
  }

  public error(message: string, timeout?: number) {
    this.toast({
      title: t.__('Error'),
      message,
      variant: 'danger',
      timeout
    });
  }

  public warning(message: string, timeout?: number) {
    this.toast({
      title: t.__('Info'),
      message,
      variant: 'warning',
      bodyClass: 'gdd-toaster-body-darken',
      timeout
    });
  }

  view() {
    return m(
      '.toast-container.position-fixed.top-0.end-0.p-3',
      this.toasts.map((toast) => 
        m(
          `.toast.show.gdd-toaster.text-bg-${toast.variant}`,
          {
            key: toast.id,
            role: 'alert',
            'data-bs-delay': toast.timeout === defaultDelay ? undefined : toast.timeout,
            'aria-live': 'assertive',
            'aria-atomic': true
          },
          [
            m('div.toast-header.gdd-toaster-title', [
              m(
                'strong.me-auto',
                toast.title
              ),
              m(
                'button.btn-close.ms-2.mb-1',
                { 
                  type: 'button', 
                  'aria-label': t.__('Close'), 
                  onclick: () => toast.id ? this.removeToast(toast.id) : undefined 
                }
              )
            ]),
            m(`.toast-body.${toast.bodyClass || '.gdd-toaster-body'}`, toast.message)
          ]
        )        
      )
    )
  }
}

