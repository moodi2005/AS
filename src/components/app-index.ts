import { LitElement, html, css } from "lit";
import { customElement, query ,state} from "lit/decorators.js";

import { attachRouter } from "../router/index";
import "../pages/install"



@customElement("app-index")
export class AppIndex extends LitElement {
  @query("main")
  private main!: HTMLElement;

  static styles = [
    css`
      :host {
        width: 100%;
        min-height: 100vh;
      }
      p-install{
        height:100vh;
      }
    `,
  ];
  @state()
  install:any =localStorage.getItem("install");
  render() {
    return html`
           <main role="main"></main>
           ${this.install=="true" ? "" : html`<p-install></p-install>`}
      `;
  }

  firstUpdated() {
    attachRouter(this.main);
  }
}
