import m from 'mithril'

interface Attrs {
  id: string
}

interface State {
  result:any
}

export class Account implements m.ClassComponent<Attrs> {
  private state: State
  constructor() 
  {
    this.state = { result: undefined }
  }

  oninit({attrs}: m.CVnode<Attrs>) {
    this.fetchTransactions(attrs.id)
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
    const result = await response.json()
    console.log('response', result)
    if (result.result) {
      this.state.result = result.result
      m.redraw()
    } else if(result.error) {
      toaster.error(result.error.message)
      m.route.set('/')
    }
    
    
  }
  view({attrs}: m.CVnode<Attrs>) {
    if(this.state.result) {
      return m('', this.state.result.timeUsed)
    } else {
      return m('', t.__('Loading....'))
    }
  }
}

