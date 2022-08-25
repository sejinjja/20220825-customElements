
export function setCustomElement (constucterObject) {
  const [name] = Object.keys(constucterObject)

  window.customElements.define(toKebabCase(name), constucterObject[name])
}

export function templateParser (htmlString) {
  const div = document.createElement('div')
  div.innerHTML = htmlString.trim()

  // Change this to div.childNodes to support multiple top-level nodes.
  return div.firstChild
}
function toKebabCase (str) {
  if (str && typeof str === 'string') {
    return str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.toLowerCase())
      .join('-')
  }
  return ''
}
