import Axios from 'axios';
import json from './sites.json';

export default class Sites {
    constructor(username, url) {
        this.username = username;
        this.url = url;
    }

    async getUserName() {
        let cors = 'https://cors-anywhere.herokuapp.com/';

        try {
            const response = await Axios({
                url: `${cors}${this.url}${this.username}`,
                timeout: 10000
            });
            // console.log(response.data);
            // console.log(response.status);
            // console.log(response.statusText);
            // console.log(response.headers);
            // console.log(response.config);
            return response.status;


        } catch (error) {

            // if (error.response) {
            //     // The request was made and the server responded with a status code
            //     // that falls out of the range of 2xx
            //     console.log(error.response.data);
            //     console.log(error.response.status);
            //     console.log(error.response.headers);
            // } else if (error.request) {
            //     // The request was made but no response was received
            //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            //     // http.ClientRequest in node.js
            //     console.log(error.request);
            // } else {
            //     // Something happened in setting up the request that triggered an Error
            //     console.log('Error', error.message);
            // }

            // console.error(error);
            // username available
            return 404;
        }

    }

}


export async function loadJSON() {
    return await $.getJSON(json)
        .then(data => {
            // console.log(data);
            return data;
        })
        .catch(err => {
            console.log(err);
        });
}