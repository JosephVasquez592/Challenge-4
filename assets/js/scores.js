function displayScores() {
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
  
    highscores.sort(function (a, b) {
      return b.points - a.points;
    });
  
    for (var i = 0; i < highscores.length; i += 1) {
      var createLi = document.createElement('li');
      createLi.textContent = highscores[i].name + ' - ' + highscores[i].points;
  
      var unorderedList = document.getElementById('highscores');
      unorderedList.appendChild(createLi);
    }
  }
  
  function deleteHighscores() {
    window.localStorage.removeItem('highscores');
    window.location.reload();
  }
  
  document.getElementById('delete').onclick = deleteHighscores;
  
  displayScores();
  