// import template from './template.html'

// import { templateParser } from '../../lib/util'

export class PartialHighlighter extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.mutationObserver = new window.MutationObserver(this.onSlotChange.bind(this))
  }

  connectedCallback () {
    this.mutationObserver.observe(this, { characterData: true, attributes: false, childList: true, subtree: true })
    this.render()
  }

  disconnectedCallback () {
    this.mutationObserver.disconnect()
  }

  onSlotChange (event) {
    this.render()
  }

  render () {
    if (this.firstChild && this.firstChild.nodeType === window.Node.TEXT_NODE) {
      const innerText = this.firstChild.textContent.trim()
      if (innerText !== 'test') {
        this.shadowRoot.childNodes.forEach(childNode => this.shadowRoot.removeChild(childNode))
        const para = document.createElement('span')
        para.innerText = innerText
        this.shadowRoot.appendChild(para)
      }
    }
  }
}
