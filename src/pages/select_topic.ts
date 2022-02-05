import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("p-select_topic")
export class PSelect_Topic extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
      }
      h1,
      div,
      img,
      body,
      button,
      span {
        margin: 0;
        padding: 0;
        font-family: Dirooze;
      }
      body {
        width: 100%;
        height: 100vh;
        background-color: rgb(43, 43, 67);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .title {
        color: #fff;
        text-align: center;
      }
      .topic {
        width: 90%;
        max-width: 40em;
        height: 4em;
        background-color: steelblue;
        border-radius: 6px;
        padding: 1em;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 1em;
      }
      .topic > p {
        color: #fff;
      }
      .topic > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 50%;
      }
      .topic > div > span {
        display: inline-block;
        background-color: #fff;
        width: 2em;
        height: 2em;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        transition: 200ms linear background-color,200ms linear color;
        font-family: Salboo;
        cursor:pointer;
      }
      .topic > div > span:hover {
        background-color: gold;
        color:#fff;
      }
    `,
  ];

  render() {
    let b: any = localStorage.getItem("words");

    b = JSON.parse(b);

    return html`
      <h1 class="title">انتخاب موضوع</h1>
      ${Object.entries(b).map((vlaue: any) => {
      return html`
          <div class="topic">
            <p>${vlaue[0]}</p>
            <div>
              ${Object.entries(vlaue[1]).map((data: any) => {
        return html`
                  <span
                    @click=${() => {
            this.next(data[1], data[0]);
          }}
                    >${data[0]}</span
                  >
                `;
      })}
            </div>
          </div>
        `;
    })}
    `;
  }
  next(words: Array<any>, level: any) {
    localStorage.setItem("words_selct_topic", JSON.stringify(words));
    localStorage.setItem("level_topic", level)
    location.pathname = "/name";
  }
}
