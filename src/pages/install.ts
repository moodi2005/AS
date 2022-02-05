import { LitElement, html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js'

import { PwaInstallButton } from 'pwa-helper-components';

customElements.define('pwa-install-button', PwaInstallButton);

@customElement('p-install')
export class PInstall extends LitElement {
    static styles = [
        css`
            :host {
                width:100%;
                height:100vh;
                display: flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
                position:fixed;
                top:0;
                right:0;
                z-index:100;
                background-color:#2b2b43;
            }
            *{
                font-family:Dirooze;
                color:#fff;
            }
            button{
                width:10em;
                height:3em;
                border-radius:4px;
                border:2px solid gold;
                background-color:transparent;
                cursor:pointer;
                transition:200ms linear background-color;
            }
            button:hover{
                background-color:gold;
            }
        `
    ];

    render() {
        return html`
        <h1>👋اول باید نصب کنی!</h1>
        <p>لطفا با کلیک بر روی دکمه زیر برنامه رو نصب کنید</p>
        <pwa-install-button>
            <button>نصب</button>
        </pwa-install-button>
        `;
    }

    @query("pwa-install-button")
    pwaInstallButton!: HTMLButtonElement

    firstUpdated() {
        this.pwaInstallButton.addEventListener('pwa-installed', (_event) => {
            localStorage.setItem("install", "true")
            location.reload();
        });
    }
}
