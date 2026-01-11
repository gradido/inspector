import m from 'mithril'
import type { TransactionList, WalletTransaction } from '../client/output.schema'
import { UserTransactionType } from '../enum/UserTransactionType'
import { Decay } from './TransactionTypes/Decay'
import { DecayDetailsShort } from './TransactionTypes/DecayDetailsShort'
import { Transfer } from './TransactionTypes/Transfer'
import { Collapse } from './view/bootstrap/Collapse'
import { WalletSum } from './WalletSum'

interface Attrs {
  transactionList: TransactionList
  communityId: string
}

export class TransactionListView implements m.ClassComponent<Attrs> {
  chooseTransactionTypeView(transaction: WalletTransaction, communityId: string): m.Child {
    const containerClasses = [
      'pointer',
      'mb-3',
      'bg-white',
      'app-box-shadow',
      'gradido-border-radius',
      'p-3',
    ]
    switch (transaction.typeId) {
      case UserTransactionType.DECAY:
        return m(Collapse, {
          info: (isOpen) => m(Decay, { isOpen }),
          details: m(DecayDetailsShort, transaction),
          containerClasses,
          detailClasses: ['pb-4', 'pt-5'],
          id: transaction.id,
        })
      case UserTransactionType.SEND:
      case UserTransactionType.RECEIVE:
      case UserTransactionType.CREATE:
      case UserTransactionType.LINK_SEND:
      case UserTransactionType.LINK_RECEIVE:
      case UserTransactionType.LINK_DELETE:
      case UserTransactionType.LINK_CHANGE:
      case UserTransactionType.LINK_CHARGE:
      case UserTransactionType.LINK_TIMEOUT:
        return m(Transfer, { transaction, communityId })
      default:
        return m('', transaction.typeId.toString())
    }
  }

  view({ attrs: { transactionList, communityId } }: m.CVnode<Attrs>) {
    return m('.row.px-lg3', [
      m('.col-12.mb-4', `${t.__('Address Type')}: ${transactionList.addressType}`),
      m(
        '.col-12',
        m(
          '.row.row-cols-12.d-lg-flex',
          m(
            '.col',
            m('.row', [
              m(
                '.col-lg-6.col-12',
                m(WalletSum, {
                  amount: transactionList.balance,
                  unit: 'GDD',
                  name: 'GDD',
                  active: true,
                }),
              ),
            ]),
          ),
        ),
      ),
      m(
        '.col-12',
        m(
          '.main-content.mt-lg-3.mt-0',
          m(
            '.list-group.transactions-list',
            transactionList.transactions === undefined || transactionList.transactions.length === 0
              ? m('.mt-4.text-center', t.__("You don't have any transactions on your account yet."))
              : transactionList.transactions.map((transaction) =>
                  this.chooseTransactionTypeView(transaction, communityId),
                ),
          ),
        ),
      ),
    ])
  }
}
