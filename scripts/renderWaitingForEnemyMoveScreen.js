function blockWaitingForEnemyMove(container) {
    const backgroundLobbyBlock = document.createElement('div');
    backgroundLobbyBlock.classList.add('background-lobby-block');

    const waitingMoveEnemyWrapper = document.createElement('div');
    waitingMoveEnemyWrapper.classList.add('waiting-enemy-wrapper')

    const timeImage = document.createElement('img');
    timeImage.setAttribute('src','images/time-icon.png')
    timeImage.classList.add('time-image');


    const title = document.createElement('h2');
    title.classList.add('title-loading-enemy')
    title.textContent = 'Ожидаем ход соперника';

    const titleSpan = document.createElement('span');
    titleSpan.textContent = '...'
    titleSpan.classList.add('title-loading-enemy-span')
title.append(titleSpan)



    waitingMoveEnemyWrapper.append(timeImage, title)
    container.append(backgroundLobbyBlock, waitingMoveEnemyWrapper);
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