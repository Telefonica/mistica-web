import {html} from './dom.js';

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

        this.shadowRoot.innerHTML = html`
            <style>
                .placeholder {
                    display: none;
                }
                .size {
                    height: ${height};
                    width: ${width};
                }
            </style>

            <link rel="stylesheet" href="./styles/placeholder.css" />

            <div class="placeholder size">
                <svg class="svg" viewBox="0 0 1 1" preserveAspectRatio="none">
                    <line
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                        stroke="#AAA"
                        stroke-width="2px"
                        vector-effect="non-scaling-stroke"
                    />
                    <line
                        x1="0"
                        y1="1"
                        x2="1"
                        y2="0"
                        stroke="#AAA"
                        stroke-width="2px"
                        vector-effect="non-scaling-stroke"
                    />
                </svg>
            </div>
        `;
    }
}

customElements.define('m-placeholder', MisticaPlaceholder);
