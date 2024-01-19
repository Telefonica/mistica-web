// specs: https://www.figma.com/file/aNHyvXe1mqjaelE8XWVQD5/%F0%9F%94%B9-Text-presets-definition?type=design&node-id=1105-1142&mode=design&t=i1YNouYkaOthL36s-0

class MisticaText extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    static PRESETS = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);

    static getPresetClass = (preset: string | null) => {
        if (MisticaText.PRESETS.has(preset || '')) {
            return `preset-${preset}`;
        }
        return 'preset-3';
    };

    connectedCallback() {
        if (!this.shadowRoot) {
            return;
        }

        const preset = MisticaText.getPresetClass(this.getAttribute('preset'));
        const bold = this.getAttribute('bold') !== null ? 'bold' : '';
        const medium = this.getAttribute('medium') !== null ? 'medium' : '';
        const regular = this.getAttribute('regular') !== null ? 'regular' : '';
        const light = this.getAttribute('light') !== null ? 'light' : '';
        const weight = bold || medium || regular || light || 'regular';

        this.shadowRoot.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;1,500&display=swap');
            @import url('./styles/text.css');
        </style>
        <span class="text ${preset} ${weight}"><slot /></span>
        `;
    }
}

customElements.define('m-text', MisticaText);
