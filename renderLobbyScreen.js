function blockPlayerList(container) {
 

  const blockWithPlayers = document.createElement('div');
  blockWithPlayers.classList.add('block-players')

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
                  const p = document.createElement('div');
                  p.classList.add('player-wrapper')
                  const playerName = document.createElement('div');
                  playerName.innerHTML = data.list[i].login;
                  playerName.classList.add('player')
                  p.append(playerName)
                 
                  blockWithPlayers.append(p);
                  i++;
              } else {
                  stopInterval();
              }

          }
      })
  }
  
  let intervalRequestLobby = setInterval(intervalReq, 500);

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
            console.log(window.application.Mytoken)
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
    const backgroundLobbyBlock = document.createElement('div');
    backgroundLobbyBlock.classList.add('background-lobby-block')
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

  const imagesWrapper = document.createElement('div');
  imagesWrapper.classList.add('images-wrapper');

  const imageRock = document.createElement('img');
  imageRock.setAttribute('src','images/rock-lobby.png')
  
  const imageScissors = document.createElement('img');
  imageScissors.setAttribute('src','images/scissors-lobby.png')
    const imagePaper = document.createElement('img');
    imagePaper.setAttribute('src','images/paper-lobby.png')
    imagesWrapper.append(imageRock,imageScissors, imagePaper)
  window.application.renderBlock('blockPlayerList', contentOne);

  window.application.renderBlock('blockButtonPlay', contentSecond);
  mainBlock.appendChild(backgroundLobbyBlock);
  mainBlock.appendChild(title);
  mainBlock.appendChild(contentThird);
  mainBlock.appendChild(imagesWrapper);
}
  
  
  