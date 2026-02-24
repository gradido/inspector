import m from 'mithril'
import { gradidoNodeClient } from '../client/gradidoNodeClient'
import { CONFIG } from '../config'
import 'bootstrap/js/src/dropdown'
import { Community } from '../client/output.schema'

interface Attrs {
  communityId: string | undefined
}

export class CommunitySwitch implements m.ClassComponent<Attrs> {
  communities: Community[] = []

  currentCommunity(communityId: string): Community | undefined {
    if(!communityId || !globalThis.communities) {
      return undefined
    }
    return globalThis.communities.get(communityId)
  }

  oninit({ attrs }: m.CVnode<Attrs>) {
    this.fetchCommunities(attrs)
  }
  async fetchCommunities(attrs: Attrs) {
    try {
      this.communities = (await gradidoNodeClient.listCommunities()).communities
      globalThis.communities = new Map(this.communities.map((c) => [c.communityId, c]))
      m.redraw()
    } catch (e) {
      console.warn(`fetchCommunities: ${e}`)
    } finally {
      if (CONFIG.AUTO_POLL_INTERVAL > 0) {
        setTimeout(() => this.fetchCommunities(attrs), CONFIG.AUTO_POLL_INTERVAL)
      }
    }
  }
  view({ attrs }: m.CVnode<Attrs>) {
    const currentCommunity = this.currentCommunity(attrs.communityId!)
    return m(
      '.community-switch',
      this.communities.length > 1
        ? m('.dropdown', [
            m(
              'button.btn.btn-md.btn-secondary.dropdown-toggle',
              {
                'data-bs-toggle': 'dropdown',
                type: 'button',
                'aria-expanded': 'false',
                'aria-haspopup': 'menu',
              },
              currentCommunity?.alias || t.__('select community'),
            ),
            m(
              'ul.dropdown-menu.overflow-auto',
              { 'aria-labelledby': 'dropdownMenuButton', role: 'menu' },
              this.communities.map((community) =>
                m(
                  'li',
                  { role: 'presentation' },
                  m(
                    'button.dropdown-item',
                    {
                      type: 'button',
                      role: 'menuitem',
                      onclick: () => m.route.set(`/${community.communityId}`),
                    },
                    community.alias,
                  ),
                ),
              ),
            ),
          ])
        : m('.mb-4.mt-2', m('.row', m('.col.fw-bold', currentCommunity?.alias))),
    )
  }
}
