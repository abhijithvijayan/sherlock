import Axios from 'axios';
import json from './sites.json';


// axios requests
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
            // needed
            // console.log(response.data);

            // console.log(response.status);
            // console.log(response.statusText);
            // console.log(response.headers);
            // console.log(response.config);
            return response.status;


        } catch (error) {

            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.headers);

                // needed
                // console.log(error.response.status);

                return error.response.status;

                // } else if (error.request) {
                //     // The request was made but no response was received
                //     console.log(error.request);
            } else {
                // needed
                // console.log('Error', error.message);

                return 404;
            }

            // console.error(error);
        }

    }

}


// json -> object
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