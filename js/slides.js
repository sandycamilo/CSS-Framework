class SimpleSlides extends HTMLElement {
  constructor() {
    super() 
    
    this._width = this.getAttribute('width')
    this._height = this.getAttribute('height')
    this._time = this.getAttribute('time')
    this._transition = this.getAttribute('transition')
    this._move = this.getAttribute('move')
    this._shadowRoot = this.attachShadow({ mode: 'open' })


    this._container = document.createElement('div')
    this._container.style.width = this._width + 'px'
    this._container.style.height = this._height + 'px'
    this._container.style.border = '3px solid'
    this._container.style.overflow = 'hidden'
    

    this._innerDiv = document.createElement('div')
    this._innerDiv.style.display = 'flex'
    this._innerDiv.style.transition = this._transition + 'ms'
    this._container.appendChild(this._innerDiv)
    this._shadowRoot.appendChild(this._container)

    this._imgs = Array.from(this.querySelectorAll('img'))
    this._imgs.forEach((img) => {
      this._innerDiv.appendChild(img)
    })
    
    this._index = -1
  }

  _addTimer() {
    this._removeTimer()
    this._timer = setInterval(() => this._nextImg(), this._time)
  }

  _removeTimer() {
    clearInterval(this._timer)
  }

  connectedCallback() {
    this._addTimer()
    this._nextImg() 
  }

  disconnectedCallback() {
    this._removeTimer()
  }
  

  static get observedAttributes() {
    return ['time', 'paused', 'transition']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'time': 
        this._time = newValue
        this._addTimer()
        break
    
      case 'transition':
        this._transition = newValue
        this._innerDiv.style.transition = this._transition + 'ms'
        break 

      case 'paused': 
        break

    }
  }

  _nextImg() {
    if (this._move === 'vertical') {
      this._innerDiv.style.flexDirection = 'column'
      this._index = (this._index + 1) % this._imgs.length
      const y = this._index * -this._height
      this._innerDiv.style.transform = `translate(0, ${y}px)`
    }
    else {
      this._index = (this._index + 1) % this._imgs.length
      const x = this._index * -this._width
      this._innerDiv.style.transform = `translate(${x}px, 0)`
    }
 
  }
}

customElements.define('simple-slides', SimpleSlides)