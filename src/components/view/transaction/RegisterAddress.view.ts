import m from 'mithril'
import registerIcon from '~icons/bi/card-checklist'
import { getAddressTypeString } from '../../../enum/AddressType'
import { Badge } from '../bootstrap/Badge'
import { CopyToClipboardLink } from '../CopyToClipboardLink'
import { DetailsBlock } from '../DetailsBlock'
import { PublicKeyLink } from '../PublicKeyLink'
import { SignaturesView } from './Signatures.view'
import type { ViewAttrs } from './viewAttrs'
import { LedgerAnchorView } from './LedgerAnchor.view'

export class RegisterAddressView implements m.ClassComponent<ViewAttrs> {
  viewDetails(attrs: ViewAttrs) {
    const gradidoTransaction = attrs.transaction.gradidoTransaction
    const registerAddress = gradidoTransaction.bodyBytes.registerAddress
    if (!registerAddress) {
      throw new Error(
        `invalid transaction, expect registerAddress, but get: ${JSON.stringify(attrs)}`,
      )
    }
    const signaturePairs = gradidoTransaction.signatureMap
    const communityId = attrs.communityId
    return m('', [
      m('.row', [
        m('.col', t.__('Transaction Number')),
        m('.col.text-end', attrs.transaction.id),
      ]),
      m(LedgerAnchorView, { ledgerAnchor: attrs.transaction.ledgerAnchor }),
      m(SignaturesView, { signaturePairs }),
      m('.fw-bold.pb-2.mt-3', t.__('Register Address')),
      m('.row', [
        m('.col', t.__('Address Type')),
        m('.col.fw-bold.text-end', getAddressTypeString(registerAddress.addressType)),
      ]),
      m('.row.mt-1', [
        m('.col', t.__('User Public Key')),
        m(
          '.col.text-end',
          m(CopyToClipboardLink, {
            data: registerAddress.userPubkey,
            name: t.__('User Public Key'),
          }),
        ),
      ]),
      m('.row.mt-1', [
        m('.col', t.__('Name Hash')),
        m(
          '.col.text-end',
          m(CopyToClipboardLink, {
            data: registerAddress.nameHash,
            name: t.__('Name Hash'),
          }),
        ),
      ]),
      m('.row.mt-1', [
        m('.col', t.__('Account Public Key')),
        m(
          '.col.text-end',
          m(PublicKeyLink, {
            publicKey: registerAddress.accountPubkey,
            communityId,
          }),
        ),
      ]),
      m('.row.mt-1', [
        m('.col', t.__('Account Number')),
        m('.col.text-end', registerAddress.derivationIndex),
      ]),
    ])
  }

  view({ attrs }: m.CVnode<ViewAttrs>) {
    const gradidoTransaction = attrs.transaction.gradidoTransaction
    if (!gradidoTransaction.bodyBytes.registerAddress) {
      throw new Error(
        `invalid transaction, expect registerAddress, but get: ${JSON.stringify(attrs)}`,
      )
    }
    return m(DetailsBlock, {
      firstRow: m(Badge, { icon: registerIcon, backgroundColor: '#c58d38' }),
      secondRow: {
        text: t.__('Register Address Transaction'),
        date: attrs.transaction.confirmedAt,
      },
      thirdRow: {
        label: t.__('Registered'),
        publicKey: gradidoTransaction.bodyBytes.registerAddress.accountPubkey,
      },
      id: attrs.transaction.ledgerAnchor.value || attrs.transaction.id.toString(),
      details: this.viewDetails(attrs),
      detailClasses: ['pt-lg-3', 'pb-4'],
      communityId: attrs.communityId,
    })
  }
}
