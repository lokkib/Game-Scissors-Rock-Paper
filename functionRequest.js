'use strict'

const noParams = {};

function request({
    method = 'GET',
    url = 'https://skypro-rock-scissors-paper.herokuapp.com',
    path,
    params = noParams,
    type = 'json',
    onSuccess,
}) {
    const req = new XMLHttpRequest();

    const UrlParams = new URLSearchParams(params);

    req.open(method, url + '/' + path + (UrlParams.toString() ? `?${UrlParams.toString()}` : ''));

    req.responseType = type;

    req.onload = function() {
        if(req.status !== 200) {
            console.log(req.statusText);
            return;
        }
        onSuccess(req.response);
    }

    req.onerror = function() {
        console.log('Ошибка при выполнении запроса');
        return;
    }

    req.send();
}