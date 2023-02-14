function blockGoToLobby(container) {
    const buttonGoToLobby = document.createElement('button');
    buttonGoToLobby.innerHTML = 'В лобби';
    buttonGoToLobby.classList.add('button-go-toLobby-again');

    container.append(buttonGoToLobby);

    buttonGoToLobby.addEventListener('click', function() {
        window.application.renderScreen('lobbyScreen')();
    })
}