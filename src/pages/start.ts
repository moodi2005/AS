import { LitElement, html, css } from "lit";
import { customElement, query, state } from "lit/decorators.js";

const game = localStorage.getItem("lenght_group") ? true : false;
import "../pages/Alarm"

const words = localStorage.getItem("words");
if (!words) {
  fetch("/db/Words.json").then((data) => {
    data.json().then((data) => {
      localStorage.setItem("words", JSON.stringify(data));
    });
  });
}

@customElement("p-start")
export class PStart extends LitElement {
  static styles = [
    css`
      :host {
        width:100%;
        height:100vh;
        display: flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
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
        justify-content: center;
        align-items: center;
      }
      .logo {
        width: 7em;
      }
      .t1 {
        color: aliceblue;
        margin: 0.5em;
      }
      .start_game,
      .add_word,
      .upldate_word {
        width: 20em;
        height: 3em;
        border: none;
        border-radius: 5px;
        background-color: tomato;
        color: aliceblue;
        margin: 1em;
        box-shadow: 0 0 10px 0 tomato;
        transition: 100ms linear box-shadow;
        animation-delay: 500ms;
      }
      .start_game:hover {
        box-shadow: 0 0 20px 5px tomato;
      }
      .add_word {
        background-color: cornflowerblue;
        box-shadow: 0 0 10px 0 cornflowerblue;
        animation-delay: 1.2s;
      }
      .add_word:hover {
        box-shadow: 0 0 20px 5px cornflowerblue;
      }
      .upldate_word {
        background-color: green;
        box-shadow: 0 0 10px 0 green;
        animation-delay: 800ms;
      }
      .upldate_word:hover {
        box-shadow: 0 0 20px 5px green;
      }
      .layer {
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.309);
        backdrop-filter: blur(2px);
        box-sizing: border-box;
      }
      .box_Start_game {
        position: fixed;
        bottom: -100%;
        right: 0;
        width: 100%;
        height: 20em;
        background-color: rgb(66, 66, 99);
        border-radius: 15% 15% 0 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition:300ms linear bottom;
      }
      .box_Start_game > p {
        color: rgb(20, 134, 241);
      }
      .number_group {
        height: 1em;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .number_group > span {
        width: 1.5em;
        height: 1.5em;
        margin: 2em;
        background-color: rgb(14, 109, 197);
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        box-sizing: border-box;
        border-radius: 50%;
        cursor: pointer;
      }
      .number_group > p {
        color: #fff;
      }
      .ok_group {
        margin: 2em;
        margin-top: 4em;
        width: 8em;
        height: 3em;
        border-radius: 5px;
        background-color: rgb(14, 109, 197);
        border: none;
        color: #fff;
      }
      #hidden{
        display:none;
      }
      #hidden_box{
        transition:300ms linear bottom;
        bottom:0;
      }
      .alrt{
        width:70%;

      }
    `,
  ];

  render() {
    return html`
    <div class="alrt"></div>
      <img
        src="Images/logo.png"
        alt="Logo"
        class="logo animate__animated animate__flip"
      />
      <h2 class="t1 animate__animated animate__flip">پانتومین</h2>
      <button class="start_game animate__animated animate__fadeInUpBig " @click="${this.open_group}">
        شروع بازی
      </button>
      <button class="upldate_word  animate__animated animate__fadeInUpBig " @click=${this.update_b}>
        بروزرسانی کلمات
      </button>
      <a href="/add_word"><button class="add_word  animate__animated animate__fadeInUpBig">
        افزودن کلمه
      </button></a>
      <div class="layer" @click="${this.close_group}" id="hidden"></div>
      <div class="box_Start_game" id="hidden">
        <p>تعداد گروه ها</p>
        <div class="number_group">
          <span @click="${() => {
        if (this.group < 20) {
          this.group++
        }
      }}">+</span>
          <p>${this.group}</p>
          <span  @click="${() => {
        if (this.group > 1) {
          this.group--
        }
      }}">-</span>
        </div>

        <p>تعداد دوره</p>
        <div class="number_group">
          <span  @click="${() => {
        this.course++
      }}">+</span>
          <p>${this.course}</p>
          <span  @click="${() => {
        if (this.course > 1) {
          this.course--
        }
      }}">-</span>
        </div>
        <button class="ok_group" @click="${this.creat_group}">تایید</button>
      </div>
    `;
  }
  @state()
  group: number = 1;
  @state()
  course: number = 1;
  @query(".box_Start_game")
  box_Start_game!: HTMLElement
  @query(".alrt")
  alrt!: HTMLElement
  @query(".layer")
  layer!: HTMLElement
  open_group(_e: Event) {
    if (!game) {
      this.layer.removeAttribute("id");
      this.box_Start_game.setAttribute("id", "hidden_box");
    } else {
      location.pathname = '/group'
    }
  }
  close_group(_e: Event) {
    this.layer.setAttribute("id", "hidden");
    this.box_Start_game.removeAttribute("id");
  }
  creat_group() {
    localStorage.setItem("course", `${this.course}`);
    localStorage.setItem("lenght_group", `${this.group}`)
    location.pathname = '/group'
  }
  update_b() {
    fetch("/db/Words.json").then((data) => {
      data.json().then((data) => {
        localStorage.setItem("words", JSON.stringify(data));
      });
    });
    this.alrt.innerHTML = `<p-alarm title="آپدیت شد" massage="دیتابیس کلمات با موفقیت بروزسانی شد"  ></p-alarm>`
  }
}
