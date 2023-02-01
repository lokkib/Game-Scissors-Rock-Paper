function loginScreen() {
  const mainBlock = document.querySelector('.app');
  mainBlock.textContent = '';

  const title = document.createElement('h1');
  title.textContent = 'Игра "Камень, ножницы, бумага"!';
  title.classList.add('main-heading')

  const content = document.createElement('div');
  content.classList.add('blockLogin');

  window.application.renderBlock('blockAuthorization', content);

  mainBlock.appendChild(title);
  mainBlock.appendChild(content);
}

function blockAuthorization(container) {
  const inputLogin = document.createElement('input');
  inputLogin.classList.add('input-login');
  inputLogin.placeholder = 'Никнейм';
  const buttonLogin = document.createElement('button');
  buttonLogin.textContent = 'Войти';
  buttonLogin.classList.add('button-login');
  const warning = document.createElement('p');
  warning.classList.add('warning');

  console.log('click');


  container.append(inputLogin, buttonLogin, warning);

  inputLogin.addEventListener('input', function() {
      if (inputLogin.value) {
          warning.innerHTML = '';
      }
  })

  buttonLogin.addEventListener('click', function(event) {
    
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
                  // console.log(data.token);
                  window.application.Mytoken = data.token;

                  request({
                      path: 'player-status',
                      params: {
                          token: window.application.Mytoken
                      },
                      onSuccess(data) {

                          if (data['player-status'].status === 'lobby') {
                              window.application.renderScreen('lobbyScreen')();
                          }

                          if (data['player-status'].status === 'game') {
                              window.application.idGame = data['player-status'].game.id;
                              window.application.renderScreen('moveScreen')();
                          }
                      }
                  })
              }
          });
      }
  })
}