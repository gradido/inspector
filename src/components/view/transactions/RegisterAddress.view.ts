import m from 'mithril'
import { DetailsBlock } from '../DetailsBlock'
import { Badge } from '../bootstrap/Badge'
import registerIcon from '~icons/bi/card-checklist'
import { ViewAttrs } from './viewAttrs'
import { RegisterAddress } from '../../../schemas/transaction.schema'
import { getAddressTypeString } from '../../../enum/AddressType'
import { PublicKeyLink } from '../PublicKeyLink'
import { PublicKeyCopy } from '../PublicKeyCopy'

export class RegisterAddressView implements m.ClassComponent<ViewAttrs> {

  viewDetails(registerAddress: RegisterAddress, communityId: string) {
    console.log(registerAddress)
    return m('', [
      m('.row.mt-3', [
        m('.col', t.__('Address Type')),
        m('.col.fw-bold.text-end', getAddressTypeString(registerAddress.addressType))
      ]),
      m('.row.mt-1', [
        m('.col', t.__('User Public Key')),
        m('.col.text-end', m(PublicKeyCopy, {publicKey: registerAddress.userPubkey}))
      ]),
      m('.row.mt-1', [
        m('.col', t.__('Name Hash')),
        m('.col.text-end', m(PublicKeyCopy, {publicKey: registerAddress.nameHash}))
      ]),
      m('.row.mt-1', [
        m('.col', t.__('Account Public Key')),
        m('.col.text-end', m(PublicKeyLink, {publicKey: registerAddress.accountPubkey, communityId}))
      ]),
      m('.row.mt-1', [
        m('.col', t.__('Account Number')),
        m('.col.text-end', registerAddress.derivationIndex)
      ]),
      m('.row.mb-2'),
    ])
  }

  view({attrs}: m.CVnode<ViewAttrs>) {
    return m(DetailsBlock, {
      firstRow: m(Badge, {icon: registerIcon, backgroundColor: '#c58d38'}),
      secondRow: {
        text: t.__('Register Address Transaction'),
        date: attrs.transaction.confirmedAt
      },
      thirdRow: {
        label: t.__('Registered'),
        amount: '0',
      },
      id: attrs.transaction.id,
      details: this.viewDetails(attrs.transaction.gradidoTransaction.bodyBytes.registerAddress, attrs.communityId),
    })
  }
}
