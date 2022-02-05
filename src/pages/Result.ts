import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js'

@customElement('p-result')
export class PREsult extends LitElement {
    static styles = [
        css`
            :host {
                display: flex;
                flex-direction:column;
                justify-content:flex-start;
                align-items:center;
                width:100%;
                height:100vh;
                margin:0;
                padding:0;
                box-sizing:border-box;
                border:3px solid gold;
            }
            *{
                font-family:Dirooze;
            }
            h1{
                color:gold;
            }
            .group{
                width:80%;
                height:3em;
                border-radius:4px;
                display:flex;
                justify-content:space-around;
                align-items:center;
                background-color:#fff;
                margin:.5em 0 ;
            }
            .group:nth-child(2){
                background-color:gold;
                margin:1em 0;
                box-shadow:0 0 15px 0 gold;
                color:#fff;
            }
            .group:nth-child(3){
                background-color:#CD7F32;
                margin:.5em 0;
            }
            .group:nth-child(4){
                background-color:silver;
                margin:.5em 0;
            }
            .buttom{
                width:80%;
                height:2em;
                background-color:gold;
                border-radius:4px;
                position:fixed;
                bottom:2em;
                display:flex;
                justify-content:center;
                align-items:center;
                color:#fff;
                cursor:pointer;
            }
        `
    ];

    render() {

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
        const result: any = [];
        const get: any = localStorage.getItem("get_num");
        JSON.parse(get).forEach((element: any, index: number) => {
            result.push({ name: `گروه ${name[19 - index]}`, num: element })
        });
        result.sort((firstItem: any, secondItem: any) =>   secondItem.num - firstItem.num);

        return html`
        <h1>نتایج</h1>
        ${result.map((data: any) => {
       return html`
        <div class="group">
            <p>${data.name}</p>
            <span>${data.num}</span>
        </div>
        `
        })}
        <div class="buttom" @click=${this.go_to_hoem}>بازگشت به صفحه اصلی</div>
        `;
    }
    go_to_hoem(){
        localStorage.removeItem("words_selct_topic")
        localStorage.removeItem("lenght_group")
        localStorage.removeItem("get_num")
        localStorage.removeItem("course")
        localStorage.removeItem("get_turn")
        localStorage.removeItem("level_topic")
        location.pathname="/"
    }
}
