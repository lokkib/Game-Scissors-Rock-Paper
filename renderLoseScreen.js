function blockLose(container) {
  const backgroundLobbyBlock = document.createElement('div');
  backgroundLobbyBlock.classList.add('background-lobby-block')
  const imageLose = document.createElement('img')
  imageLose.setAttribute('src','images/losing-image.png')
  const loseHeading = document.createElement('h1');
  loseHeading.innerHTML = 'Вы проиграли';
  loseHeading.classList.add('heading-lose');

  const log = document.createElement('p');
  log.classList.add('name-of-winner')

  request({
      path: 'game-status',
      params: {
          token: window.application.Mytoken,
          id: window.application.idGame,
      },
      onSuccess(data) {


          log.innerHTML = `${data['game-status'].enemy.login} победил`
      }
  })

  container.append(backgroundLobbyBlock, imageLose, loseHeading, log);
}


function loseScreen() {
  const mainBlock = document.querySelector('.app');
  mainBlock.textContent = '';

  const contentFirst = document.createElement('div');
  contentFirst.classList.add('block-lose-heading');

  const contentSecond = document.createElement('div');
  contentSecond.classList.add('block-play-again');

  const contentThird = document.createElement('div');
  contentThird.classList.add('block-go-to-lobby');

  window.application.renderBlock('blockLose', contentFirst);
  window.application.renderBlock('blockButtonPlay', contentSecond);

  window.application.renderBlock('blockGoToLobby', contentThird);

  mainBlock.appendChild(contentFirst);
  mainBlock.appendChild(contentSecond);
  mainBlock.appendChild(contentThird);
}