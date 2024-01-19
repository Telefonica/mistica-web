// specs: https://www.figma.com/file/koROdh3HpEPG2O8jG52Emh/%F0%9F%94%B8-Buttons-Component-Specs?type=design&node-id=0-1&mode=design&t=jszeUxdVPr1Nfvuj-0
import './text.js';

type Variant = 'primary' | 'secondary' | 'danger';

const VARIANTS = new Set<Variant>(['primary', 'secondary', 'danger']);

const getVariant = (variant: string | null): Variant => {
    if (VARIANTS.has(variant as Variant)) {
        return variant as Variant;
    }
    return 'primary';
};

class MisticaButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        if (!this.shadowRoot) {
            return;
        }

        const disabled = this.getAttribute('disabled') === null ? '' : 'disabled';
        const variant = getVariant(this.getAttribute('variant'));
        const small = this.getAttribute('small') === null ? '' : 'small';

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./styles/button.css">

        <button class="button ${variant} ${small} ${disabled}" ${disabled}>
            <slot name="icon"></slot>
            <m-text preset="${small ? 2 : 3}" medium>
                <slot></slot>
            </m-text>
        </button>
        `;
    }
}

customElements.define('m-button', MisticaButton);
