function loginScreen() {
  const mainBlock = document.querySelector('.app');
  mainBlock.textContent = '';
  const backgroundBlock = document.createElement('div');
  backgroundBlock.classList.add('background-block')
  const backgroundImage = document.createElement('img');
  backgroundImage.setAttribute(
    'src',
    'images/background-main.png'
  );
  backgroundImage.setAttribute(
    'alt',
    'фоновое изображение игры'
  );

  backgroundBlock.appendChild(backgroundImage);

  const title = document.createElement('h1');
  title.textContent = 'Игра "Камень, ножницы, бумага"!';
  title.classList.add('main-heading');

  const content = document.createElement('div');
  content.classList.add('block-login');

  window.application.renderBlock('blockAuthorization', content);
  mainBlock.appendChild(backgroundBlock);
  mainBlock.appendChild(title);
  mainBlock.appendChild(content);

}

function blockAuthorization(container) {
    const inputLabel = document.createElement('p');
    inputLabel.textContent = 'Никнейм';
  const inputLogin = document.createElement('input');
  inputLogin.classList.add('input-login');
  inputLogin.placeholder = 'Введите никнейм';
  const buttonLogin = document.createElement('button');
  buttonLogin.textContent = 'Войти';
  buttonLogin.classList.add('button-login-disabled');
  const warning = document.createElement('p');
  warning.classList.add('warning');



  container.append(inputLabel, inputLogin, buttonLogin, warning);

  inputLogin.addEventListener('input', function () {
    if (inputLogin.value) {
      warning.innerHTML = '';
      buttonLogin.classList.remove('button-login-disabled');
      buttonLogin.classList.add('button-login-active');
    }
    else {
        buttonLogin.classList.add('button-login-disabled');
      buttonLogin.classList.remove('button-login-active');
    }
  });

  buttonLogin.addEventListener('click', function (event) {
    if (!inputLogin.value) {
      event.preventDefault();
      warning.innerHTML = 'Пожалуйста, введите логин';
    } else {
      request({
        path: 'login',
        params: {
          login: `${inputLogin.value}`,
        },
        onSuccess(data) {
          window.application.Mytoken = data.token;

          request({
            path: 'player-status',
            params: {
              token: window.application.Mytoken,
            },
            onSuccess(data) {
              if (data['player-status'].status === 'lobby') {
                window.application.renderScreen('lobbyScreen')();
              }

              if (data['player-status'].status === 'game') {
                window.application.idGame = data['player-status'].game.id;
                window.application.renderScreen('moveScreen')();
              }
            },
          });
        },
      });
    }
  });
}
