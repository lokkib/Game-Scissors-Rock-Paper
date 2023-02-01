function blockWaitingForStart(container) {
    const title = document.createElement('h1');
    title.textContent = 'Ожидаем подключение соперника...';
    container.append(title);

    function intervalRequestPlayer() {
        request({
            path: 'game-status',
            params: {
                token: window.application.Mytoken,
                id: window.application.idGame,
            },
            onSuccess(data) {
                if ((data['game-status'].status !== 'waiting-for-start')) {
                    stopIntervalSecondPlayer();
                    window.application.renderScreen('moveScreen')();
                }


            },
        })
    }

    const intervalRequestSecondPlayer = setInterval(intervalRequestPlayer, 500);

    function stopIntervalSecondPlayer() {
        clearInterval(intervalRequestSecondPlayer);
    }
}


function waitingForStartScreen() {
    const mainBlock = document.querySelector('.app');
    mainBlock.textContent = '';

    const content = document.createElement('div');
    content.classList.add('blockWaitingForStart');

    window.application.renderBlock('blockWaitingForStart', content);

    mainBlock.appendChild(content);
}