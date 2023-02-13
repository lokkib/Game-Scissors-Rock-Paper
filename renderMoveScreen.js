function blockMove(container) {
  const paperWrapper = document.createElement('div');
  paperWrapper.classList.add('move-wrapper')
  const paperImage = document.createElement('img');
  paperImage.setAttribute('src', 'images/paper-game-screen.png');

  const buttonPaper = document.createElement('button');
  buttonPaper.innerHTML = 'Бумага';

  paperWrapper.append(paperImage,buttonPaper )


  

  const rockWrapper = document.createElement('div');
  rockWrapper.classList.add('move-wrapper')

  const rockImage = document.createElement('img');
  rockImage.setAttribute('src', 'images/rock-game-screen.png');


  const buttonRock = document.createElement('button');
  buttonRock.innerHTML = 'Камень';

  rockWrapper.append(rockImage,buttonRock )



  const scissorsWrapper = document.createElement('div');
  scissorsWrapper.classList.add('move-wrapper')
  const scissorsImage = document.createElement('img');
  scissorsImage.setAttribute('src', 'images/scissors-game-screen.png');

  const buttonScissors = document.createElement('button');
  buttonScissors.innerHTML = 'Ножницы';

  scissorsWrapper.append(scissorsImage,buttonScissors )


  container.append(paperWrapper, scissorsWrapper, rockWrapper);
}

function moveScreen() {
  const mainBlock = document.querySelector('.app');
  mainBlock.textContent = '';

  const backgroundLobbyBlock = document.createElement('div');
  backgroundLobbyBlock.classList.add('background-lobby-block');

  const title = document.createElement('h1');
  title.textContent = 'Игра';
  title.classList.add('heading-your-move');

  let enemyMessage;
  request({
    path: 'game-status',
    params: {
      token: window.application.Mytoken,
      id: window.application.idGame,
    },
    onSuccess(data) {
     
      if (data['game-status'].enemy.login) {
        enemyMessage = document.createElement('p');
        enemyMessage.textContent = `Вы против ${data['game-status'].enemy.login}`;
        enemyMessage.classList.add('enemy-message');

        const content = document.createElement('div');
        content.classList.add('block-move');

        window.application.renderBlock('blockMove', content);

        mainBlock.append(backgroundLobbyBlock, title, enemyMessage, content);

        content.addEventListener('click', function (event) {
          if (
            event.target.innerHTML ===
            'Бумага'
          ) {
            request({
              path: 'play',
              params: {
                token: window.application.Mytoken,
                id: window.application.idGame,
                move: 'paper',
              },
              onSuccess(data) {
               

                window.application.renderScreen('waitingForEnemyMoveScreen')();
              },
            });
          }
          if (
            event.target.innerHTML ===
            'Ножницы'
          ) {
            request({
              path: 'play',
              params: {
                token: window.application.Mytoken,
                id: window.application.idGame,
                move: 'scissors',
              },
              onSuccess(data) {
            
                window.application.renderScreen('waitingForEnemyMoveScreen')();
              },
            });
          }

          if (
            event.target.innerHTML ===
            'Камень'
          ) {
            request({
              path: 'play',
              params: {
                token: window.application.Mytoken,
                id: window.application.idGame,
                move: 'rock',
              },
              onSuccess(data) {
        

                window.application.renderScreen('waitingForEnemyMoveScreen')();
              },
            });
          }
        });
      }
    },
  });
}
