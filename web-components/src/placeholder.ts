class MisticaPlaceholder extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        if (!this.shadowRoot) {
            return;
        }

        const height = this.getAttribute('height') || '100px';
        const width = this.getAttribute('width') || '100%';

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./styles/placeholder.css">
        <style>
            .size {
                height: ${height};
                width: ${width};
            }
        </style>

        <div class="placeholder size">
            <svg class="svg" viewBox="0 0 100% 100%">
                <line x1="0" y1="0" x2="100%" y2="100%" stroke="#AAA" stroke-width="2px" />
                <line x1="0" y1="100%" x2="100%" y2="0" stroke="#AAA" stroke-width="2px" />
            </svg>
        </div>
        `;
    }
}

customElements.define('m-placeholder', MisticaPlaceholder);
