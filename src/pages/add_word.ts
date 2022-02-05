import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js'

let words: any = localStorage.getItem("words"),
    word2: Array<Object> = JSON.parse(words);

@customElement('p-add_word')
export class PAdd_Word extends LitElement {
    static styles = [
        css`
            :host {
                display: flex;
                justify-content:flex-start;
                align-items:center;
                flex-direction:column;
            }
            *{
                font-family:Dirooze;
            }
            h1{
                color:#fff;
            }
            #topic,input{
                width:80%;
                height:3em;
                border-radius:5px;
                outline:none;
            }
            form{
                width:100%;
                display:flex;
                flex-direction:column;
                justify-content:flex-start;
                align-items:center;
            }
            label{
                width:80%;
                text-align:right;
                color:#fff;
            }
            #mod{
                width:60%;
                height:2em;
                outline:none;
                border:1px solid #fff;
                background-color:#fff;
                position:fixed;
                bottom:2em;
            }
            `
    ];

    render() {
        return html`
        <h1>افزودن کلمه</h1>
        <form action="/add_word" method="POST" >
       <label for="topic">موضوع</label>
        <select name="topic" id="topic">
            ${Object.entries(word2).map(data => {
            return Object.entries(data[1]).map(data2 => {
                return html`
                    <option >${data[0]}-${data2[0]} </option>
                    `
            })
        })}
        </select>
        <label for="moc">کلمه</label>
        <input name="word" type="text"> 
        <input id="mod" type="submit" value="ارسال">
       </form>
        `;
    }
}
