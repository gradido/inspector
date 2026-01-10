import m from 'mithril'
import { gradidoNodeClient } from '../client/gradidoNodeClient'
import { CONFIG } from '../config'
import 'bootstrap/js/src/dropdown'

interface Attrs {
  setCommunityId: (communityId: string) => void
  defaultCommunityId: string | undefined
}

export class CommunitySwitch implements m.ClassComponent<Attrs> {
  communities: string[] = []
  communityId: string | undefined = undefined

  oninit({ attrs }: m.CVnode<Attrs>) {
    this.communityId = attrs.defaultCommunityId
    this.fetchCommunities(attrs)
  }
  async fetchCommunities(attrs: Attrs) {
    try {
      this.communities = (await gradidoNodeClient.listCommunities()).communities
      if (this.communities.length > 0 && !this.communityId) {
        this.communityId = this.communities[0]
        attrs.setCommunityId(this.communityId)
      }
      m.redraw()
    } catch (e) {
      console.warn(`fetchCommunities: ${e}`)
    } finally {
      if (CONFIG.AUTO_POLL_INTERVAL > 0) {
        setTimeout(() => this.fetchCommunities(attrs), CONFIG.AUTO_POLL_INTERVAL)
      }
    }
  }
  updateCommunityId(communityId: string, attrs: Attrs) {
    this.communityId = communityId
    attrs.setCommunityId(communityId)
  }
  view({ attrs }: m.CVnode<Attrs>) {
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
              this.communityId || t.__('select community'),
            ),
            m(
              'ul.dropdown-menu.overflow-auto',
              { 'aria-labelledby': 'dropdownMenuButton', role: 'menu' },
              this.communities.map((communityId) =>
                m(
                  'li',
                  { role: 'presentation' },
                  m(
                    'button.dropdown-item',
                    {
                      type: 'button',
                      role: 'menuitem',
                      onclick: () => this.updateCommunityId(communityId, attrs),
                    },
                    communityId,
                  ),
                ),
              ),
            ),
          ])
        : m('.mb-4.mt-2', m('.row', m('.col.fw-bold', this.communityId))),
    )
  }
}
