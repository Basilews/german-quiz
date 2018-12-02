import list from '../constants/data.js';

class AppAnzeigetafel extends HTMLElement {
  constructor() {
    super();

    this.lang = 'en';
    this.count = 0;
    this.index = 0;
    this.maxLength = list.words.length;
    this.words = this.shuffle(list.words);
    this.word = null;

    this.attachShadow({
      mode: 'open',
    });

    const template = document.createElement('template');

    template.innerHTML = `
      <link rel="stylesheet" href="css/app-anzeigetafel.css">
      <div class="behälter">
        <div class="ergebnis isHidden">
          <span>Score:</span>
          <span class="punktzahl">0</span>
        </div>
        <div class="languages">
          <label class="radio">
            <input type="radio" name="language" checked>
            EN
          </label>
          <label class="radio">
            <input type="radio" name="language">
            RU
          </label>
        </div>
        <div class="überschrift isMargined">
          <h1>We have a word for that!</h1>
        </div>
        <div class="verpackung">
          <div class="start isMargined">
            <button class="startSchaltfläche">Begin</button>
          </div>
          <div class="steuerElemente isHidden">
            <span class="wort"></span>
            <span class="beschreibung"></span>
            <h2>is that german word?</h2>
            <div>
              <button class="yes">yes</button>
              <button class="no">no</button>
            </div>
            <div class="weiter isHidden">
              <span class="richtig isHidden">Correct!</span>
              <span class="falsch isHidden">Wrong!</span>
              <button class="weiterSchaltfläche">
                next →
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="ende isHidden">
        <p class="endstand">
          <b>Final score:<b>
          <b>
            <span class="endstandzahl"></span>
          </b>
        </p>
        <button class="neustartschaltfläche">
          Restart Game
        </button>
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.mainTitle = this.shadowRoot.querySelector('.überschrift');
    this.gameContainer = this.shadowRoot.querySelector('.behälter');
    this.score = this.shadowRoot.querySelector('.ergebnis');
    this.scoreCount = this.shadowRoot.querySelector('.punktzahl');
    this.wordContainer = this.shadowRoot.querySelector('.wort');
    this.description = this.shadowRoot.querySelector('.beschreibung');
    this.startContainer = this.shadowRoot.querySelector('.start');
    this.steuerElemente = this.shadowRoot.querySelector('.steuerElemente');
    this.startButton = this.shadowRoot.querySelector('.startSchaltfläche');
    this.yesButton = this.shadowRoot.querySelector('.yes');
    this.noButton = this.shadowRoot.querySelector('.no');
    this.next = this.shadowRoot.querySelector('.weiter');
    this.nextButton = this.shadowRoot.querySelector('.weiterSchaltfläche');
    this.correctAnswerContainer = this.shadowRoot.querySelector('.richtig');
    this.wrongAnswerContainer = this.shadowRoot.querySelector('.falsch');
    this.endContainer = this.shadowRoot.querySelector('.ende');
    this.finalScorePoints = this.shadowRoot.querySelector('.endstandzahl');
    this.restartButton = this.shadowRoot.querySelector('.neustartschaltfläche')

    this.startButton.addEventListener('click', () => this.beginTheGame());
    this.yesButton.addEventListener('click', () => this.checkAnswer(true));
    this.noButton.addEventListener('click', () => this.checkAnswer(false));
    this.nextButton.addEventListener('click', () => this.showNextWord());
    this.restartButton.addEventListener('click', () => this.restartGame());
  }

  beginTheGame() {
    this.mainTitle.classList.remove('isMargined');
    this.startContainer.classList.add('isHidden');
    this.steuerElemente.classList.remove('isHidden');
    this.score.classList.remove('isHidden');
    this.setWord(0);
  }

  setWord(index) {
    this.wordContainer.innerHTML = this.words[index].word;
    this.word = this.words[index];
    this.description.innerHTML = this.words[index].description[`${this.lang}`];
  }

  checkAnswer(answer) {
    this.next.classList.remove('isHidden');
    this.yesButton.disabled = this.noButton.disabled = true;
    this.index++;

    if (answer === this.word.isGerman) {
      this.count++;
      this.scoreCount.innerHTML = this.count;
      this.correctAnswerContainer.classList.remove('isHidden');
    }
    else {
      this.wrongAnswerContainer.classList.remove('isHidden');
    }
  }

  showNextWord() {
    this.next.classList.add('isHidden');
    this.correctAnswerContainer.classList.add('isHidden');
    this.wrongAnswerContainer.classList.add('isHidden');
    this.yesButton.disabled = this.noButton.disabled = false;

    this.index === this.maxLength
      ? this.showGameEnd()
      : this.setWord(this.index);
  }

  redrawWord() {
    //
  }

  showGameEnd() {
    this.gameContainer.classList.add('isHidden');
    this.endContainer.classList.remove('isHidden');
    this.finalScorePoints.innerHTML = `
      ${this.count} / ${this.maxLength}
    `;
  }

  restartGame() {
    this.endContainer.classList.add('isHidden');
    this.gameContainer.classList.remove('isHidden');
    this.count = this.index = this.scoreCount.innerHTML = 0;
    this.words = this.shuffle(list.words);
    this.word = null;
    this.setWord(0);
  }

  shuffle(arr) {
    for (let i = arr.length - 1; i--;) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }
}

customElements.define('app-anzeigetafel', AppAnzeigetafel);
