import { LitElement, html, css } from "lit";
import { customElement, query } from "lit/decorators.js";
import "boxicons";

let change = false,
  err: number = 0,
  sec: number = 120,
  lenght_group: any = localStorage.getItem("lenght_group");

@customElement("p-name")
export class PName extends LitElement {
  static styles = [
    css`
      :host {
        width: 100%;
        height: 100vh;
        display: block;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .time {
        font-size: 40px;
        position: fixed;
        top: 0;
        color: gold;
      }
      .name {
        width: 18em;
        height: 18em;
        border: 1px solid #fff;
        border-radius: 50%;
        box-shadow: 0 0 10px 0 #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .name > span {
        font-size: 30px;
        font-family: Dirooze;
        text-align:center;
        color: darkorange;
      }
      .logo {
        width: 10em;
        height: 10em;
      }
      .start {
        position: fixed;
        bottom: 5em;
        width: 20em;
        height: 4em;
        border-radius: 8px;
        border: none;
        background-color: dodgerblue;
        color: #fff;
        cursor:pointer;
      }
      .repost {
        fill: #fff;
        position: absolute;
        bottom: 1em;
        left: 2em;
        cursor:pointer;
      }
      .stop ,.body{
        fill: #fff;
        cursor:pointer;
      }
      #hidden{
        display:none;
      }
      #bakc{
        background-color:tomato;
      }
      .mo2{
        width:40%;
        display:flex;
        justify-content:space-around;
        align-items:center;
        position:absolute;
        bottom:1em;
      }
    `,
  ];

  render() {
    return html`
      <p class="time">2:00</p>
      <div class="name">
        <img src="Images/logo.png" alt="Logo" class="logo" />
      </div>
      <button class="start" @click=${this.start}>نمایش</button>
      <box-icon class="repost" @click=${this.change_word} name="repost" id="hidden" size="40px"></box-icon>
      <div class="mo2" id="hidden">
        <box-icon class="stop" @click=${this.stop_e} name="pause-circle" size="50px"></box-icon>
        <box-icon name="body" @click=${this.err} class="body" size="50px"></box-icon>
      </div>
      <div class="muzci" id="hidden"></div>
    `;
  }
  @query(".name")
  name_div!: HTMLDivElement;
  @query(".start")
  start_B!: HTMLDivElement;
  @query(".repost")
  repost!: HTMLElement;
  @query(".time")
  time!: HTMLParagraphElement;
  @query(".muzci")
  muzci!: HTMLParagraphElement;
  @query(".mo2")
  mo2!: HTMLDivElement;
  @query(".stop")
  stop!: HTMLDivElement;

  get_word() {
    const words: any = localStorage.getItem("words_selct_topic"),
      Arayy_words: Array<string> = JSON.parse(words),
      word_red: any = localStorage.getItem("word_red");

    const get_word = () => {
      const number = Math.floor(Math.random() * Arayy_words.length),
        word = Arayy_words[number] === undefined ? "خودت یک کلمه بگو!" : Arayy_words[number];
      Arayy_words.splice(number, 1);
      return word
    };

    let word = get_word();
    if (word_red) {
      JSON.parse(word_red).forEach((element: any) => {
        if (word === element) {
          word = get_word();
        }
      });
    }
    this.name_div.innerHTML = `<span>${word}</span>`;

  }

  change_word() {
    this.get_word();
    change = true;
    this.repost.setAttribute("id", "hidden");
    console.log(change);
  }


  start(_e: Event) {
    if (this.start_B.innerHTML === "نمایش") {
      this.get_word()
      this.start_B.innerHTML = "شروع";
      this.repost.removeAttribute("id");
    } else if (this.start_B.innerHTML === "شروع") {
      this.repost.setAttribute("id", "hidden")
      this.mo2.removeAttribute("id")
      this.start_B.setAttribute("id", "hidden");
      let se: number = 0;
      let min: number = 2;
      const time = () => {
        se--;
        sec--;
        if (min === 0 && se === 0) {
          let num: any = localStorage.getItem("get_turn");
          if (parseInt(lenght_group) === parseInt(num)) {
            localStorage.setItem("get_turn", JSON.stringify(1));
            let curse: any = localStorage.getItem("course");
            localStorage.setItem("course", String(parseInt(curse) - 1))
          } else {
            localStorage.setItem("get_turn", JSON.stringify(parseInt(num) + 1))
          }
          clearInterval(myInterval);
          this.muzci.innerHTML = `<video controls="" autoplay="" name="media"><source src="/voice/end_voice.wav" type="audio/wav"></video>`;
          setTimeout(() => {
            location.pathname = "/group"
          }, 1000)
        }
        if (se < 0) {
          min--;
          se = 60;
        }
        this.time.innerHTML = `${min}:${se}`
      }
      const myInterval = setInterval(time, 1000)
    }
  }

  stop_e() {
    this.muzci.innerHTML = `<video controls="" autoplay="" name="media"><source src="/voice/end_voice.wav" type="audio/wav"></video>`;
    let Score: number = 0,
      level_topic: any = localStorage.getItem("level_topic")
    Score = 0 + parseInt(level_topic) - (err);
    if (change) { Score = Score - 2 }
    Score = Score + Math.floor(sec / 30);
    let a: any = localStorage.getItem("get_turn"),
      b = parseInt(a),
      c: any = localStorage.getItem("get_num"),
      d = JSON.parse(c);
    d[b - 1] = d[b- 1]  + Score;
    localStorage.setItem("get_num", JSON.stringify(d))
    if (parseInt(lenght_group) === b) {
      localStorage.setItem("get_turn", JSON.stringify(1));
      let curse: any = localStorage.getItem("course");
      localStorage.setItem("course", String(parseInt(curse) - 1))
    } else {
      localStorage.setItem("get_turn", JSON.stringify(b + 1))
    }
    setTimeout(() => {
      location.pathname = "/group"
    }, 1000)
  }
  err() {
    this.muzci.innerHTML = `<video controls="" autoplay="" name="media"><source src="/voice/err_voice.wav" type="audio/wav"></video>`;
    err++;
    console.log(err);
  }
}
