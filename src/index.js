/* eslint-disable switch-colon-spacing */
'use strict';

/* eslint-disable no-unused-vars */
const awesomeWeather = ((() => {
    const init = () => {
        $('#go').on('click', (e) => {
            let obj = e.currentTarget;

            query($('#query').val());
        });
    };

    const query = (q) => {
        const PROXY = '//localhost:3000/api/query/';

        let request = new Request(PROXY + q, {
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
})());
