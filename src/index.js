/* eslint-disable switch-colon-spacing */
'use strict';

const awesomeWeather = (function() {
    const init = () => {
        const PROXY = '//localhost:3000/api/query/';

        let query = 'oslo,no';

        let request = new Request(PROXY + query, {
            method: 'GET',
            mode: 'cors',
            redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        fetch(request).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        }).then((json) => {
            console.log(json);
        }).catch((error) => {
            console.error(error);
        });
    };

    return {
        init: init
    };
}());

awesomeWeather.init();
