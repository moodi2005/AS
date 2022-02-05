import { LitElement, html, css } from "lit";
import { customElement,property,query } from "lit/decorators.js";

export let ok:any = "";

@customElement("p-alarm")
export class PALarm extends LitElement {


  @property({attribute:true,type:String})
  massage= "پیام";
  @property({attribute:true,type:String})
  title= "عنوان";
  @property({attribute:true,type:String})
  ok= "تایید";
  @property({attribute:true,type:String})
  nook= "لغو";
 


  static styles = [
    css`
      :host {
        width:100%;
        height:100vh;
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:10;
        position:fixed;
        top:0;
        left:0;
      }
      .layer {
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.392);
        filter: blur(5px);
        position: fixed;
        top: 0;
        left: 0;
      }
      .box,p {
        font-family:Dirooze;
      }
      .box {
        padding:.2em;
        width: 20em;
        height: 13em;
        background-color: rgb(255, 255, 255);
        border-radius: 9px;
        position: fixed;
        top: 4em;
        z-index: 5;
      }
      .title {
        text-align: center;
        font-family:Dirooze;
      }
      .box_button {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 1em;
      }
      .re,
      .ok {
        width: 10em;
        height: 3em;
        border: none;
        margin: 0 auto;
        border-radius: 7px;
        color: #fff;
        font-family:Dirooze;
        cursor:pointer;
      }
      .re {
        background-color: tomato;
      }
      .ok {
        background-color: green;
      }
      #hidden{
        display:none;
      }
    `,
  ];

  render() {
    return html`
      <div class="layer" @click=${this.hidden_box}></div>
      <div class="box">
        <h1 class="title">${this.title}</h1>
        <p>${this.massage}</p>
        <div class="box_button">
          <button @click=${this.hidden_box} class="ok">${this.ok}</button>
        </div>
      </div>
    `;
  }
  @query(".layer")
  a1!:HTMLDivElement
  @query(".box")
  box!:HTMLDivElement

  hidden_box(){
  this.setAttribute("style","display:none")
  }
}






