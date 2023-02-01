function blockCongratulationVictory(container) {
  const victoryHeading = document.createElement('h1');
  victoryHeading.innerHTML = 'Вы выиграли!';
  victoryHeading.classList.add('heading-win');

  container.append(victoryHeading);
}


function winScreen() {
  const mainBlock = document.querySelector('.app');
  mainBlock.textContent = '';

  const contentFirst = document.createElement('div');
  contentFirst.classList.add('blockVictoryHeading');

  const contentSecond = document.createElement('div');
  contentSecond.classList.add('block-play-again');

  const contentThird = document.createElement('div');
  contentThird.classList.add('block-go-to-lobby');

  window.application.renderBlock('blockCongratulationVictory', contentFirst);
  window.application.renderBlock('blockButtonPlay', contentSecond);
  window.application.renderBlock('blockGoToLobby', contentThird);

  mainBlock.appendChild(contentFirst);
  mainBlock.appendChild(contentSecond);
  mainBlock.appendChild(contentThird);
}
  