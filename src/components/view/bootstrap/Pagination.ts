import m from 'mithril'

interface Attrs {
  currentPage: number
  totalPages: number
  ariaLabel: string
  onPageChange: (page: number) => void
  pill?: boolean
}

export class Pagination implements m.ClassComponent<Attrs> {
  visibleNumberButtons(currentPage: number, totalPages: number): number {
    return currentPage <= 2 || currentPage >= totalPages - 1 ? 3 : 2
  }
  firstVisibleButton(currentPage: number, totalPages: number): number {
    if (currentPage <= 2) return 1
    if (totalPages - currentPage <= 2) return totalPages - 3
    return currentPage - 1
  }
  lastVisibleButton(currentPage: number, totalPages: number): number {
    return Math.min(
      totalPages,
      this.visibleNumberButtons(currentPage, totalPages) +
        this.firstVisibleButton(currentPage, totalPages),
    )
  }

  pages(attrs: Attrs): m.Vnode[] {
    const { currentPage, totalPages } = attrs
    const buttons: m.Vnode[] = []

    // no ellipsis, with <= 5 pages
    if (totalPages <= 5) {
      for (let i = 0; i < totalPages; i++) {
        buttons.push(this.makePageButton(i + 1, currentPage === i + 1 ? 0 : -1, attrs))
      }
      return buttons
    }

    if (currentPage > 2) {
      buttons.push(this.makeEllipsisButton())
    }
    let i = this.firstVisibleButton(currentPage, totalPages)

    for (; i <= this.lastVisibleButton(currentPage, totalPages); i++) {
      buttons.push(this.makePageButton(i, currentPage === i ? 0 : -1, attrs))
    }

    if (currentPage < totalPages - 1) {
      buttons.push(this.makeEllipsisButton())
    }

    return buttons
  }

  changePage(page: number, { totalPages, currentPage, onPageChange }: Attrs) {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page)
    }
  }

  makeEllipsisButton(): m.Vnode {
    return m(
      'li.page-item.disabled.bv-d-sm-down-none',
      { role: 'separator' },
      m('span.page-link', '...'),
    )
  }

  makePageButton(page: number, tabindex: number, attrs: Attrs): m.Vnode {
    const { totalPages, currentPage } = attrs
    const isActive = page === currentPage
    return m(`li.page-item${isActive ? '.active' : ''}`, [
      m(
        'button.page-link',
        {
          is: 'button',
          type: 'button',
          role: 'menuitem',
          'aria-label': `${t.__('Go to page')} ${page}`,
          'aria-posinset': page,
          'aria-setsize': totalPages,
          tabindex,
          onclick: () => this.changePage(page, attrs),
        },
        page,
      ),
    ])
  }

  makeArrowButton(
    disabled: boolean,
    ariaLabel: string,
    buttonLabel: string,
    targetPage: number,
    attrs: Attrs,
  ): m.Vnode {
    return m(`li.page-item${disabled ? '.disabled' : ''}`, [
      disabled
        ? m(
            'span.page-link',
            {
              is: 'span',
              'aria-disabled': 'true',
              'aria-label': ariaLabel,
              role: 'menuitem',
            },
            buttonLabel,
          )
        : m(
            'button.page-link',
            {
              is: 'button',
              type: 'button',
              role: 'menuitem',
              'aria-label': ariaLabel,
              tabindex: '-1',
              onclick: () => this.changePage(targetPage, attrs),
            },
            buttonLabel,
          ),
    ])
  }

  view({ attrs }: m.CVnode<Attrs>) {
    if (attrs.totalPages <= 1) {
      return
    }
    const isFirst = attrs.currentPage === 1
    const isLast = attrs.currentPage === attrs.totalPages
    return m(
      'nav.mt-3',
      {
        'aria-label': attrs.ariaLabel,
        role: 'menubar',
        'aria-disabled': false,
        'hide-ellipsis': true,
      },
      [
        m(
          'ul.justify-content-center.pagination.pagination-lg',
          { class: attrs.pill ? 'b-pagination-pills' : '' },
          [
            this.makeArrowButton(isFirst, t.__('Go to first page'), '«', 1, attrs),
            this.makeArrowButton(
              isFirst,
              t.__('Go to previous page'),
              '‹',
              attrs.currentPage - 1,
              attrs,
            ),
            this.pages(attrs),
            this.makeArrowButton(
              isLast,
              t.__('Go to next page'),
              '›',
              attrs.currentPage + 1,
              attrs,
            ),
            this.makeArrowButton(isLast, t.__('Go to last page'), '»', attrs.totalPages, attrs),
          ],
        ),
      ],
    )
  }
}
