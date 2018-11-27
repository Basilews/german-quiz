class AppAnzeigetafel extends HTMLElement {
  constructor() {
    super();

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
}

customElements.define('app-anzeigetafel', AppAnzeigetafel);
