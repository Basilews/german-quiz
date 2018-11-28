class AppAnzeigetafel extends HTMLElement {
  constructor() {
    super();

    this.lang = 'en';
    this.count = 0;

    this.attachShadow({
      mode: 'open',
    });

    const template = document.createElement('template');

    template.innerHTML = `
      <link rel="stylesheet" href="css/app-anzeigetafel.css">
      <slot></slot>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    console.log('Hi!');
  }
}

customElements.define('app-anzeigetafel', AppAnzeigetafel);
