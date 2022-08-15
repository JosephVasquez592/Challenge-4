var questionNumber = 0;
var timer = questions.length * 20;
var startTimer;

var quizlet = document.getElementById('quiz');
var timeLeft = document.getElementById('time');
var quizChoices = document.getElementById('selections');
var beginQuiz = document.getElementById('begin');
var saveScore = document.getElementById('save');
var playerName = document.getElementById('record');

function quizStart() {
    var homePage = document.getElementById('home');
    homePage.setAttribute('class', 'hidden');

    quizlet.removeAttribute('class');

    startTimer = setInterval(timerInterval, 1000);
    timeLeft.textContent = timer;

    fetchQuestions()
}

function fetchQuestions () {
    var questionIndex = questions[questionNumber];

    var questionContent = document.getElementById('title');
    questionContent.textContent = questionIndex.q;

    quizChoices.innerHTML = '';

    for (var i = 0; i < questionIndex.c.length; i++) {
        var option = questionIndex.c[i];
        var optionSection = document.createElement('button');
        optionSection.setAttribute('class', 'option');
        optionSection.setAttribute('value', option);

        optionSection.textContent = i + 1 + '. ' + option;

        quizChoices.appendChild(optionSection);
    }
}

function selectAnswer(event) {
    var optionButtons = event.target;
  
    if (!optionButtons.matches('.option')) {
      return;
    }
  
    if (optionButtons.value !== questions[questionNumber].a) {
      timer -= 15;
  
      if (timer < 0) {
        timer = 0;
      }
  
      timeLeft.textContent = timer;    
    } 
  
    questionNumber++;
  
    if (timer <= 0 || questionNumber === questions.length) {
        gameOver();
    } else {
        fetchQuestions();
    }
  }

  function gameOver() {
    clearInterval(startTimer);

    var gameOverPage = document.getElementById('game-over');
    gameOverPage.removeAttribute('class');

    var totalScore = document.getElementById('score');
    totalScore.textContent = timer;

    quizlet.setAttribute('class', 'hidden')

  }

  function timerInterval() {
    timer--;
    timeLeft.textContent = timer;

    if (timer <= 0) {
        gameOver();
    } 
  }

  function etchScore() {
    var player = playerName.value.trim();
  
    if (player !== '') {
      var hof = JSON.parse(window.localStorage.getItem('highscores')) || [];
  
      var addToHof = {
        points: timer,
        name: player,
      };
  
      hof.push(addToHof);
      window.localStorage.setItem('highscores', JSON.stringify(hof));
  
      window.location.href = 'highscores.html';
    }
  }

  function submitResponse(event) {
    if (event.key === 'Enter') {
      etchScore();
    }
  }
  
  saveScore.onclick = etchScore;
  
  beginQuiz.onclick = quizStart;
  
  quizChoices.onclick = selectAnswer;
  
  playerName.onkeyup = submitResponse;
  