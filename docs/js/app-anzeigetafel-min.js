import list from"../constants/data.js";class AppAnzeigetafel extends HTMLElement{constructor(){super(),this.lang="en",this.count=0,this.index=0,this.maxLength=list.words.length,this.median=Math.floor(this.maxLength/2),this.words=this.shuffle(list.words),this.word=null,this.attachShadow({mode:"open"});const t=document.createElement("template");t.innerHTML=`\n      <link rel="stylesheet" href="css/app-anzeigetafel.css">\n      <div class="behälter">\n        <div class="ergebnis istUnsichtbar">\n          <span>Score:</span>\n          <span class="punktzahl">0</span>\n        </div>\n        <div class="fortschritt istUnsichtbar">1/${list.words.length}</div>\n        <div class="sprachen istUnsichtbar">\n          <label class="radio en">\n            <input type="radio" name="language" checked>\n            EN\n          </label>\n          <label class="radio ru">\n            <input type="radio" name="language">\n            RU\n          </label>\n        </div>\n        <div class="überschrift isMargined">\n          <h1>We have a word for that!</h1>\n        </div>\n        <div class="verpackung">\n          <div class="start isMargined">\n            <button class="startSchaltfläche">Begin</button>\n          </div>\n          <div class="steuerElemente istUnsichtbar">\n            <span class="wort"></span>\n            <span class="beschreibung"></span>\n            <h2>is that german word?</h2>\n            <div>\n              <button class="yes">yes</button>\n              <button class="no">no</button>\n            </div>\n            <div class="weiter istUnsichtbar">\n              <span class="richtig istUnsichtbar">Correct!</span>\n              <span class="falsch istUnsichtbar">Wrong!</span>\n              <button class="weiterSchaltfläche">\n                next →\n              </button>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class="ende istUnsichtbar">\n        <p class="endstand">\n          <b>Final score:<b>\n          <b>\n            <span class="endstandzahl"></span>\n          </b>\n        </p>\n        <p class="ergebnistext"></p>\n        <button class="neustartschaltfläche">\n          Restart Game\n        </button>\n      </div>\n    `,this.shadowRoot.appendChild(t.content.cloneNode(!0)),this.mainTitle=this.shadowRoot.querySelector(".überschrift"),this.gameContainer=this.shadowRoot.querySelector(".behälter"),this.score=this.shadowRoot.querySelector(".ergebnis"),this.progress=this.shadowRoot.querySelector(".fortschritt"),this.scoreCount=this.shadowRoot.querySelector(".punktzahl"),this.wordContainer=this.shadowRoot.querySelector(".wort"),this.description=this.shadowRoot.querySelector(".beschreibung"),this.startContainer=this.shadowRoot.querySelector(".start"),this.steuerElemente=this.shadowRoot.querySelector(".steuerElemente"),this.startButton=this.shadowRoot.querySelector(".startSchaltfläche"),this.yesButton=this.shadowRoot.querySelector(".yes"),this.noButton=this.shadowRoot.querySelector(".no"),this.next=this.shadowRoot.querySelector(".weiter"),this.nextButton=this.shadowRoot.querySelector(".weiterSchaltfläche"),this.correctAnswerContainer=this.shadowRoot.querySelector(".richtig"),this.wrongAnswerContainer=this.shadowRoot.querySelector(".falsch"),this.endContainer=this.shadowRoot.querySelector(".ende"),this.finalScorePoints=this.shadowRoot.querySelector(".endstandzahl"),this.finalScoreText=this.shadowRoot.querySelector(".ergebnistext"),this.restartButton=this.shadowRoot.querySelector(".neustartschaltfläche"),this.languages=this.shadowRoot.querySelector(".sprachen"),this.enLangLabel=this.shadowRoot.querySelector(".en"),this.ruLangLabel=this.shadowRoot.querySelector(".ru"),this.startButton.addEventListener("click",()=>this.beginTheGame()),this.yesButton.addEventListener("click",()=>this.checkAnswer(!0)),this.noButton.addEventListener("click",()=>this.checkAnswer(!1)),this.nextButton.addEventListener("click",()=>this.showNextWord()),this.restartButton.addEventListener("click",()=>this.restartGame()),this.enLangLabel.addEventListener("click",()=>this.switchLanguage("en")),this.ruLangLabel.addEventListener("click",()=>this.switchLanguage("ru"))}switchLanguage(t){this.lang=t,this.description.innerHTML=this.word.description[t]}beginTheGame(){this.mainTitle.classList.remove("isMargined"),this.startContainer.classList.add("istUnsichtbar"),this.steuerElemente.classList.remove("istUnsichtbar"),this.score.classList.remove("istUnsichtbar"),this.progress.classList.remove("istUnsichtbar"),this.languages.classList.remove("istUnsichtbar"),this.setWord(0)}setWord(t){this.wordContainer.innerHTML=this.words[t].word,this.word=this.words[t],this.description.innerHTML=this.words[t].description[this.lang],this.progress.innerHTML=`${this.index+1}/${list.words.length}`}checkAnswer(t){this.next.classList.remove("istUnsichtbar"),this.yesButton.disabled=this.noButton.disabled=!0,this.index++,t===this.word.isGerman?(this.count++,this.scoreCount.innerHTML=this.count,this.correctAnswerContainer.classList.remove("istUnsichtbar")):this.wrongAnswerContainer.classList.remove("istUnsichtbar")}showNextWord(){this.next.classList.add("istUnsichtbar"),this.correctAnswerContainer.classList.add("istUnsichtbar"),this.wrongAnswerContainer.classList.add("istUnsichtbar"),this.yesButton.disabled=this.noButton.disabled=!1,this.index===this.maxLength?this.showGameEnd():this.setWord(this.index)}showGameEnd(){const{count:t,maxLength:s}=this;this.gameContainer.classList.add("istUnsichtbar"),this.endContainer.classList.remove("istUnsichtbar"),this.finalScorePoints.innerHTML=`\n      ${t} / ${s}\n    `,0===t?this.finalScoreText.innerHTML="en"===this.lang?"How'd that happen? 😐":"Как такое произошло?":t>0&&t<this.median?this.finalScoreText.innerHTML="Nicht Schlecht! "+this.lang=="en"?"I bet you can do it better!":"Бьюсь об заклад, вы можете лучше!":t>=this.median&&t<s?this.finalScoreText.innerHTML="Sehr, sehr gut! 👍 Vielleicht, fehlt Ihnen nur ein kleines bisschen.":t===s&&(this.finalScoreText.innerHTML="Sind Sie Deutschen? 🤔")}restartGame(){this.endContainer.classList.add("istUnsichtbar"),this.gameContainer.classList.remove("istUnsichtbar"),this.count=this.index=this.scoreCount.innerHTML=0,this.words=this.shuffle(list.words),this.word=null,this.setWord(0)}shuffle(t){for(let s=t.length-1;s--;){const e=Math.floor(Math.random()*(s+1));[t[s],t[e]]=[t[e],t[s]]}return t}}customElements.define("app-anzeigetafel",AppAnzeigetafel);