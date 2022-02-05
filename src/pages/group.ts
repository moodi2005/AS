import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("p-group")
export class PGroup extends LitElement {
  static styles = [
    css`
      :host {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      h2,
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
        justify-content: flex-start;
        align-items: center;
      }
      .group {
        width: 75%;
        height: 2.7em;
        background-image: linear-gradient(90deg, #ff007b 0%, #a50fb9 100%);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1em;
        border-radius: 5px;
        margin: 1.2em 0;
        cursor: pointer;
      }
      .group > p,
      .group > span {
        color: #fff;
      }
      .group:nth-child(2n) {
        background-image: linear-gradient(90deg, #8000ff 0%, #4c0bb3 100%);
      }
      .group:nth-child(3n) {
        background-image: linear-gradient(90deg, #00c3ff 0%, #0bb39d 100%);
      }
      .group:nth-child(4n) {
        background-image: linear-gradient(90deg, #546fc7 0%, #0d4dd8 100%);
      }
      .group:nth-child(5n) {
        background-image: linear-gradient(90deg, #34bd66 0%, #27831e 100%);
      }
      #active {
        width: 80%;
        height: 3em;
        box-shadow: 0 0 15px 0 #fff;
      }
      .start_button {
        width: 70%;
        height: 3em;
        border-radius: 5px;
        border: none;
        background-color: #34bd66;
        position: fixed;
        bottom: 2em;
        color: #fff;
      }
      .list {
        width: 100%;
        height: 60%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
      }
    `,
  ];
  render() {
    let a: any = localStorage.getItem("course");
    if (a == 0) {
      location.pathname = "/result"
    }
    const name = [
      "بیستم",
      "نانزدهم",
      "هجدهم",
      "هفدهم",
      "شانزدهم",
      "پانزدهم",
      "چهاردهم",
      "سیزدهم",
      "دوازدهم",
      "یازدهم",
      "دهم",
      "نهم",
      "هشتم",
      "هفتم",
      "ششم",
      "پنجم",
      "چهارم",
      "سوم",
      "دوم",
      "اول",
    ];

    const group: any = localStorage.getItem("lenght_group"),
      get_num = localStorage.getItem("get_num"),
      get_turn: any = localStorage.getItem("get_turn");
    let num: Array<Number> = [];

    for (let index = 0; index < group; index++) {
      this.name_group.push(`گروه ${name[19 - index]}`);
      if (!get_num) {
        num.push(0);
      } else {
        num = JSON.parse(get_num);
      }
    }
    localStorage.setItem("get_num", JSON.stringify(num));

    if (!get_turn) {
      localStorage.setItem("get_turn", String(1));
      console.log("h");
    }

    const trun: any = localStorage.getItem("get_turn");

    return html`
      <div class="list">
        ${this.name_group.map((value, index) => {
      return html`
            <div class="group" id="${index == parseInt(trun) - 1 ? "active" : ""}">
              <p>${value}</p>
              <span>${num[index]}</span>
            </div>
          `;
    })}
      </div>
      <button class="start_button" @click=${this.next}>بزن بریم !</button>
    `;
  }
  @property({ type: Array })
  name_group: Array<string> = [];

  next() {
    location.pathname = '/topics'
  }
}
