// specs: https://www.figma.com/file/aNHyvXe1mqjaelE8XWVQD5/%F0%9F%94%B9-Text-presets-definition?type=design&node-id=1105-1142&mode=design&t=i1YNouYkaOthL36s-0
import {html} from './dom.js';

const PRESETS = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);

const getPresetClass = (preset: string | null) => {
    if (PRESETS.has(preset || '')) {
        return `preset-${preset}`;
    }
    return 'preset-3';
};

class MisticaText extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        if (!this.shadowRoot) {
            return;
        }

        const preset = getPresetClass(this.getAttribute('preset'));
        const bold = this.getAttribute('bold') !== null ? 'bold' : '';
        const medium = this.getAttribute('medium') !== null ? 'medium' : '';
        const regular = this.getAttribute('regular') !== null ? 'regular' : '';
        const light = this.getAttribute('light') !== null ? 'light' : '';
        const weight = bold || medium || regular || light || 'regular';

        this.shadowRoot.innerHTML = html`
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;1,500&display=swap"
            />
            <link rel="stylesheet" href="./styles/text.css" />

            <span class="text ${preset} ${weight}"><slot /></span>
        `;
    }
}

customElements.define('m-text', MisticaText);
