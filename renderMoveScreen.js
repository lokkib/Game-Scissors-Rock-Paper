function blockMove(container) {
    const buttonPaper = document.createElement('button');
    buttonPaper.innerHTML = 'Бумага <i class="fa-regular fa-map"></i>';
    const buttonScissors = document.createElement('button');
    buttonScissors.innerHTML = 'Ножницы <i class="fa-solid fa-scissors"></i>';
    const buttonRock = document.createElement('button');
    buttonRock.innerHTML = 'Камень <i class="fa-regular fa-hand-back-fist"></i>';
  
    container.append(buttonPaper, buttonScissors, buttonRock);
      console.log('clickКнопкиБумаганожницы');

  }
  
  
  function moveScreen() {
    const mainBlock = document.querySelector('.app');
    mainBlock.textContent = '';
  
    const title = document.createElement('h1');
    title.textContent = 'Ваш ход';
    title.classList.add('heading-your-move');
    
    const content = document.createElement('div');
    content.classList.add('block-move');
  
   window.application.renderBlock('blockMove', content);
   
    mainBlock.appendChild(title);
    mainBlock.appendChild(content);

    content.addEventListener('click', function(event){
        if (event.target.innerHTML === 'Бумага <i class="fa-regular fa-map"></i>') {
            request({
                path: 'play',
                params: {
                    token: window.application.Mytoken,
                    id: window.application.idGame,
                    move: 'paper',
                },
                onSuccess(data) {
                    console.log(data);
                    
                       window.application.renderScreen('waitingForEnemyMoveScreen')();
                   
                }
            })
        }
        if (event.target.innerHTML === 'Ножницы <i class="fa-solid fa-scissors"></i>') {
            request({
                path: 'play',
                params: {
                    token: window.application.Mytoken,
                    id: window.application.idGame,
                    move: 'scissors',
                },
                onSuccess(data) {
                    console.log(data);
                    
                    
                      window.application.renderScreen('waitingForEnemyMoveScreen')();
                    
                }
            })
        }

        if (event.target.innerHTML === 'Камень <i class="fa-regular fa-hand-back-fist"></i>') {
            request({
                path: 'play',
                params: {
                    token: window.application.Mytoken,
                    id: window.application.idGame,
                    move: 'rock',
                },
                onSuccess(data) {
                    console.log(data);
                    
                    
                    window.application.renderScreen('waitingForEnemyMoveScreen')();
                    
                }
            })
        }


    })
  }
  
  