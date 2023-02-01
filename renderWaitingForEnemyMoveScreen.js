function blockWaitingForEnemyMove(container) {
  const title = document.createElement('h1');
  title.textContent = 'Ожидаем ход соперника...';

  container.append(title);
}


function waitingForEnemyMoveScreen() {
  const mainBlock = document.querySelector('.app');
  mainBlock.textContent = '';

  const content = document.createElement('div');
  content.classList.add('blockWaitingForEnemyMove');

  const messageError = document.createElement('p');
  messageError.innerHTML = 'Бой не проводится. Попробуйте перезайти';

  window.application.renderBlock('blockWaitingForEnemyMove', content);

  mainBlock.appendChild(content);

  function waitingEnemyMove() {
      request({
          path: 'game-status',
          params: {
              token: window.application.Mytoken,
              id: window.application.idGame,
          },
          onSuccess(data) {
              if (!data['game-status']) {
                  mainBlock.appendChild(messageError);
                  return messageError;
              }
              if (data['game-status'].status !== 'waiting-for-enemy-move') {
                  stopintervalWaitingEnemy();
                  if (data['game-status'].status === 'win') {
                      window.application.renderScreen('winScreen')();
                  }

                  if (data['game-status'].status === 'lose') {
                      window.application.renderScreen('loseScreen')();
                  }
                  if (data['game-status'].status === 'waiting-for-your-move') {
                      window.application.renderScreen('moveScreen')();
                  }
              }
          }
      })
  }


  const intervalWaitingEnemyMove = setInterval(waitingEnemyMove, 500);

  function stopintervalWaitingEnemy() {
      clearInterval(intervalWaitingEnemyMove);
  }
}