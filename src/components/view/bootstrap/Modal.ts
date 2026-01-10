import m, { type ClassComponent } from 'mithril'

interface ModalAttrs {
  id: string
  title: string
  body: m.Children
  footer?: m.Children
}

export const Modal: ClassComponent<ModalAttrs> = {
  view({ attrs }) {
    const { id, title, body, footer } = attrs
    return m(
      '.modal',
      {
        id,
        role: 'dialog',
        tabindex: -1,
        'aria-labelledby': `${id}-title`,
        'aria-hidden': 'true',
      },
      [
        m('.modal-dialog', [
          m('.modal-content', [
            m('.modal-header', [
              m(`h5#${id}-title`, { class: 'modal-title' }, title),
              m('button.btn-close', {
                type: 'button',
                'data-bs-dismiss': 'modal',
                'aria-label': 'Close',
              }),
            ]),
            m('.modal-body', body),
            footer ? m('.modal-footer', footer) : undefined,
          ]),
        ]),
      ],
    )
  },
}
