// specs: https://www.figma.com/file/koROdh3HpEPG2O8jG52Emh/%F0%9F%94%B8-Buttons-Component-Specs?type=design&node-id=0-1&mode=design&t=jszeUxdVPr1Nfvuj-0
import {getId, html} from './dom.js';

class MisticaSpinner extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    id: string = getId();

    connectedCallback() {
        if (!this.shadowRoot) {
            return;
        }

        const color = this.getAttribute('color') || '#000';
        const size = this.getAttribute('size') || '24px';
        const id = this.getAttribute('id') || this.id;
        const title = 'Loading'; // TODO

        this.shadowRoot.innerHTML = html`
            <link rel="stylesheet" href="./styles/spinner.css" />

            <svg
                aria-labelledby="${id}"
                class="ios"
                height="${size}"
                width="${size}"
                role="img"
                viewBox="0 0 30 30"
            >
                <title id="${id}">${title}</title>
                <g role="presentation">
                    <path
                        fill="${color}"
                        d="M14 1.5C14 0.671573 14.6716 0 15.5 0C16.3284 0 17 0.671573 17 1.5V8.5C17 9.32843 16.3284 10 15.5 10C14.6716 10 14 9.32843 14 8.5V1.5Z"
                    />
                    <path
                        fill="${color}"
                        d="M21.182 11.1317C20.5962 11.7175 19.6464 11.7175 19.0607 11.1317C18.4749 10.5459 18.4749 9.59619 19.0607 9.01041L24.0104 4.06066C24.5962 3.47487 25.5459 3.47487 26.1317 4.06066C26.7175 4.64645 26.7175 5.59619 26.1317 6.18198L21.182 11.1317Z"
                    />
                    <path
                        fill="${color}"
                        d="M28.5 13C29.3284 13 30 13.6716 30 14.5C30 15.3284 29.3284 16 28.5 16H21.5C20.6716 16 20 15.3284 20 14.5C20 13.6716 20.6716 13 21.5 13H28.5Z"
                    />
                    <path
                        fill="${color}"
                        d="M19.0607 20.182C18.4749 19.5962 18.4749 18.6464 19.0607 18.0607C19.6464 17.4749 20.5962 17.4749 21.182 18.0607L26.1317 23.0104C26.7175 23.5962 26.7175 24.5459 26.1317 25.1317C25.5459 25.7175 24.5962 25.7175 24.0104 25.1317L19.0607 20.182Z"
                    />
                    <path
                        fill="${color}"
                        d="M14 21.5C14 20.6716 14.6716 20 15.5 20C16.3284 20 17 20.6716 17 21.5V28.5C17 29.3284 16.3284 30 15.5 30C14.6716 30 14 29.3284 14 28.5V21.5Z"
                    />
                    <path
                        fill="${color}"
                        d="M7.18198 25.1317C6.59619 25.7175 5.64645 25.7175 5.06066 25.1317C4.47487 24.5459 4.47487 23.5962 5.06066 23.0104L10.0104 18.0607C10.5962 17.4749 11.5459 17.4749 12.1317 18.0607C12.7175 18.6464 12.7175 19.5962 12.1317 20.182L7.18198 25.1317Z"
                    />
                    <path
                        fill="${color}"
                        d="M8.5 13C9.32843 13 10 13.6716 10 14.5C10 15.3284 9.32843 16 8.5 16H1.5C0.671573 16 0 15.3284 0 14.5C0 13.6716 0.671573 13 1.5 13H8.5Z"
                    />
                    <path
                        fill="${color}"
                        d="M5.06066 6.18198C4.47487 5.59619 4.47487 4.64645 5.06066 4.06066C5.64645 3.47487 6.59619 3.47487 7.18198 4.06066L12.1317 9.01041C12.7175 9.59619 12.7175 10.5459 12.1317 11.1317C11.5459 11.7175 10.5962 11.7175 10.0104 11.1317L5.06066 6.18198Z"
                    />
                </g>
            </svg>
        `;
    }
}

customElements.define('m-spinner', MisticaSpinner);
