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

  static get observedAttributes () {
    return ['partialStyle']
  }

  render () {
    let strHtml = ''
    if (this.firstChild && this.firstChild.nodeType === window.Node.TEXT_NODE) {
      const innerText = this.firstChild.textContent.trim()
      try {
        const partialStyle = JSON.parse(this.getAttribute('partialStyle'))
        const partialStyleKeys = Object.keys(partialStyle)

        strHtml = innerText
          .split(new RegExp(`(${partialStyleKeys.join('|')})`))
          .map(text => {
            if (partialStyle[text]) {
              const spanElm = document.createElement('span')
              spanElm.innerText = text
              spanElm.style = partialStyle[text]
              return spanElm.outerHTML
            }
            return text
          })
          .join('')
      } catch (e) {
        console.error('e', e)
      }
    }
    this.shadowRoot.innerHTML = strHtml
  }
}
