import m from 'mithril'

interface Attrs {
  id: string
}

interface State {
  result:any[]
}

export class Account implements m.ClassComponent<Attrs> {
  private state: State
  constructor() 
  {
    this.state = { result: [] }
  }

  async oninit({attrs}: m.CVnode<Attrs>) {
    await this.fetchTransactions(attrs.id)
  }
  async fetchTransactions(pubkey: string) {
    const response = await fetch(nodeServerUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'listtransactions',
            params: {
                groupAlias,
                pageSize: 10,
                pubkey
            },
            id: Math.random()
        })
    })
    this.state.result = await response.json();
    m.redraw()
  }
  view({attrs}: m.CVnode<Attrs>) {
    console.log('attrs: ', attrs)
    return m('', this.state.result)
  }
}

