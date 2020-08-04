const hexToRgb = (col) => {
  const color = col.charAt(0) === '#' ? col.substr(1) : col
  return color.match(/.{1,2}/g).map(item => parseInt(item, 16))
}

const rgbStringToArray = (str) => {
  if (typeof str !== 'string') throw new Error('error converting color rgb to hex. value: ' + str)
  const splited = str.split(',')
  const rgb = []
  rgb.push(parseInt(splited[0].replace(/\D/g, ''), 10))
  rgb.push(parseInt(splited[1].replace(/\D/g, ''), 10))
  rgb.push(parseInt(splited[2].replace(/\D/g, ''), 10))
  return rgb
}

const getUniqueId = () => {
  const a = Date.now()
  return '_' + (Number(String(Math.random()).slice(2)) + a + Date.now()).toString(36)
}

const rgbToHex = (rgb) => {
  const ar = Array.isArray(rgb) ? rgb : rgbStringToArray(rgb)
  const toHex = (num) => {
    const hex = num.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  return '#' + toHex(ar[0]) + toHex(ar[1]) + toHex(ar[2])
}

const luminance = (col) => {
  const rgb = hexToRgb(col)
  const ar = rgb.map(v => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return ar[0] * 0.2126 + ar[1] * 0.7152 + ar[2] * 0.0722
}

const contrast = (col1, col2) => {
  const lum1 = luminance(col1)
  const lum2 = luminance(col2)
  const result = lum1 > lum2 ? (lum1 + 0.05) / (lum2 + 0.05) : (lum2 + 0.05) / (lum1 + 0.05)
  return Math.round(100 * result) / 100
}

const getColorPropertyFromEl = (el, property) => {
  let val = window.getComputedStyle(el).getPropertyValue(property)
  return val === 'rgba(0, 0, 0, 0)' ? '' : val
}

const getColorProperty = (el, property) => {
  let elem = el
  let v = getColorPropertyFromEl(elem, property)
  if (v) return v
  if (elem.tagName === 'body') return false
  do {
    elem = elem.parentElement
    if (!elem) return false
    v = getColorPropertyFromEl(elem, property)
  } while (!v && elem.tagName !== 'BODY')
  if (!v) return false
  return v
}

const getRatio = (el) => {
  const obj = {
    headerColor: '#2c2c2c',
    bodyColor: '#efefef',
    header: '',
    message1: '',
    message2: ''
  }
  try {
    let bg = getColorProperty(el, 'background-color')
    if (!bg) throw new Error('unknown background')
    if (bg.startsWith('rgb')) bg = rgbToHex(bg)
    let color = getColorProperty(el, 'color')
    if (!color) throw new Error('unknown color')
    if (color.startsWith('rgb')) color = rgbToHex(color)
    const contr = contrast(bg, color)
    if (!contr || (typeof contr !== 'number')) throw new Error('')
    obj.message1 = 'contrast ratio: ' + contr
    obj.message2 = '(' + color + ' on ' + bg + ')'
    if (contr >= 7) {
      obj.headerColor = '#12432f',
        obj.header = 'OK - AAA level',
        obj.bodyColor = '#ddf6ec'
      return obj
    }
    if (contr >= 4.5) {
      obj.headerColor = '#e56717'
      obj.header = 'OK - AA level only'
      obj.bodyColor = '#f5deb3'
      return obj
    }
    obj.headerColor = '#b70023',
      obj.header = 'LOW CONTRAST',
      obj.bodyColor = '#ffe9ef'
    return obj
  }
  catch (err) {
    obj.message1 = err.message || 'unknown error'
    obj.header = 'error'
    return obj
  }
}
export default {
  bind (el) {
    setTimeout(() => {
      const obj = getRatio(el)
      const wrap = document.createElement('div')
      const header = document.createElement('div')
      const field = document.createElement('div')
      const wrapStyles = [
        'border-radius: 3px',
        'border: 1px solid #dadada',
        'box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'display: flex',
        'flex-direction: column',
        'font-family: inherit',
        'left: 0',
        'overflow: hidden',
        'position: absolute',
        'top: calc(100% + 2px)',
        'z-index: 9'
      ]
      const headerStyles = [
        'background: ' + obj.headerColor,
        'color: #ffffff',
        'font-size: 12px',
        'font-weight: 600',
        'line-height: 1',
        'padding: 4px',
        'text-transform: uppercase'
      ]
      const fieldStyles = [
        'background: ' + obj.bodyColor,
        'color: #161616',
        'display: flex',
        'flex-direction: column',
        'font-size: 12px',
        'font-weight: 400',
        'line-height: 1.2',
        'padding: 4px'
      ]
      const id = getUniqueId()
      wrap.setAttribute('id', id)
      el._tvlContrastId = id
      wrap.style.cssText = wrapStyles.join('; ')
      header.style.cssText = headerStyles.join('; ')
      field.style.cssText = fieldStyles.join('; ')
      const span1 = document.createElement('span')
      const span1Text = document.createTextNode(obj.message1)
      span1.appendChild(span1Text)
      field.appendChild(span1)
      if (obj.message2) {
        span1.style.marginBottom = '4px'
        const span2 = document.createElement('span')
        const span2Text = document.createTextNode(obj.message2)
        span2.appendChild(span2Text)
        field.appendChild(span2)
      }
      const headerText = document.createTextNode(obj.header)
      header.appendChild(headerText)
      wrap.appendChild(header)
      wrap.appendChild(field)
      const pos = window.getComputedStyle(el).getPropertyValue('position')
      if (!pos || pos === 'static') el.style.position='relative'
      el.appendChild(wrap)
    }, 500)
  },
  unbind (el) {
    if (!('_tvlContrastId' in el)) return
    const id = el._tvlContrastId
    const child = document.getElementById(id)
    if (!child) return 
    document.body.removeChild(child)
  }


}