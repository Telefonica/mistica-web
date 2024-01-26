// specs: https://www.figma.com/file/koROdh3HpEPG2O8jG52Emh/%F0%9F%94%B8-Buttons-Component-Specs?type=design&node-id=0-1&mode=design&t=jszeUxdVPr1Nfvuj-0
import './text.js';
import './spinner.js';
import {html} from './dom.js';

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

    static get observedAttributes() {
        return ['loading'];
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (newValue === oldValue) {
            return;
        }
        if (name === 'loading') {
            const isLoading = newValue !== null;
            if (isLoading) {
                this.shadowRoot?.querySelector('.content')?.classList.add('loading');
            } else {
                this.shadowRoot?.querySelector('.content')?.classList.remove('loading');
            }
            const captions = this.shadowRoot?.querySelectorAll('.caption');
            captions?.[0]?.setAttribute('aria-hidden', isLoading ? 'true' : 'false');
            captions?.[1]?.setAttribute('aria-hidden', isLoading ? 'false' : 'true');
        }
    }

    connectedCallback() {
        if (!this.shadowRoot) {
            return;
        }

        const disabled = this.getAttribute('disabled') === null ? '' : 'disabled';
        const variant = getVariant(this.getAttribute('variant'));
        const small = this.getAttribute('small') === null ? '' : 'small';
        const isLoading = this.getAttribute('loading') !== null;
        const loadingClass = isLoading ? 'loading' : '';
        const textPreset = small ? 2 : 3;

        const hasLoadingSlot = !!this.querySelector(`*[slot='loading']`)?.textContent;

        this.shadowRoot.innerHTML = html`
            <style>
                .button {
                    display: none;
                }
            </style>
            <link rel="stylesheet" href="./styles/button.css" />
            <button class="button ${variant} ${small} ${disabled}" ${disabled}>
                <div class="content ${loadingClass}">
                    <div class="caption" aria-hidden="${isLoading}">
                        <slot name="icon"></slot>
                        <m-text preset="${textPreset}" medium><slot></slot></m-text>
                    </div>

                    <div class="caption" aria-hidden="${!isLoading}">
                        <m-text preset="${textPreset}" medium>
                            <m-spinner size="16px" color="currentColor"></m-spinner>
                        </m-text>
                        ${hasLoadingSlot
                            ? html`
                                  <m-text preset="${textPreset}" medium><slot name="loading"></slot></m-text>
                              `
                            : ''}
                    </div>
                </div>
            </button>
        `;
    }
}

customElements.define('m-button', MisticaButton);
