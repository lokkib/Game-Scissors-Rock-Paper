function blockWaitingForStart(container) {
    const title = document.createElement('h2');
    title.classList.add('title-loading')
    title.textContent = 'Loading...';
    container.append(title);

    function intervalRequestPlayer() {
        request({
            path: 'game-status',
            params: {
                token: window.application.Mytoken,
                id: window.application.idGame,
            },
            onSuccess(data) {
                console.log(data)
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

    const backgroundLobbyBlock = document.createElement('div');
    backgroundLobbyBlock.classList.add('background-lobby-block')

    const timeImage = document.createElement('img');
    timeImage.setAttribute('src','images/time-icon.png')
    timeImage.classList.add('time-image');

    const content = document.createElement('div');
    content.classList.add('block-waiting-for-start');
    content.appendChild(timeImage)
    window.application.renderBlock('blockWaitingForStart', content);

    mainBlock.append(backgroundLobbyBlock, content);
}