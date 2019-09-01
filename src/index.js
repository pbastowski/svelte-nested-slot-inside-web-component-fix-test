import { LitElement, html, css } from 'lit-element'

import App from './App.svelte'

customElements.define(
    'lit-01',
    class extends LitElement {
        static get properties() {
            return {
                abc: String,
                hello: Boolean
            }
        }

        connectedCallback() {
            const app = new App({
                target: this.shadowRoot,
                props: { abc: this.abc, hello: this.hello }
            })
        }
    }
)

// export default app
