function blockPlayerList(container) {
  const playersHeading = document.createElement('h3');
  playersHeading.innerHTML = 'Игроки онлайн: ';
  playersHeading.classList.add('players-heading');

  const blockWithPlayers = document.createElement('div');

  container.append(playersHeading);
  container.append(blockWithPlayers);
  let i = 0;

  function intervalReq() {
      request({
          path: 'player-list',
          params: {
              token: window.application.Mytoken
          },
          onSuccess(data) {
              if ((data.list[i])) {
                  const p = document.createElement('p');
                  p.innerHTML = data.list[i].login;
                  blockWithPlayers.append(p);
                  i++;
              } else {
                  stopInterval();
              }

          }
      })
  }
  
  let intervalRequestLobby = setInterval(intervalReq, 1000);

  function stopInterval() {
      clearInterval(intervalRequestLobby);
  }

}


function blockButtonPlay(container) {
  const buttonPlay = document.createElement('button');
  buttonPlay.textContent = 'Играть';
  buttonPlay.classList.add('button-play');

  container.append(buttonPlay);

  buttonPlay.addEventListener('click', function() {
      request({
          path: 'start',
          params: {
              token: window.application.Mytoken
          },
          onSuccess(data) {
              console.log(data);
              window.application.idGame = data['player-status'].game.id;
              console.log(window.application.idGame);
              window.application.renderScreen('waitingForStartScreen')();
          }
      })
  })
}


function lobbyScreen() {
  const mainBlock = document.querySelector('.app');
  mainBlock.textContent = '';

  const title = document.createElement('h1');
  title.textContent = 'Лобби';
  title.classList.add('lobby-heading');

  const contentOne = document.createElement('div');
  contentOne.classList.add('block-players-list');

  const contentSecond = document.createElement('div');
  contentSecond.classList.add('block-button-play');

  const contentThird = document.createElement('div');
  contentThird.classList.add('block-players-and-button')
  contentThird.append(contentOne, contentSecond);

  window.application.renderBlock('blockPlayerList', contentOne);

  window.application.renderBlock('blockButtonPlay', contentSecond);

  mainBlock.appendChild(title);
  mainBlock.appendChild(contentThird);

}
  
  
  