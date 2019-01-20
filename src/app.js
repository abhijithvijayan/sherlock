import Axios from 'axios';
import json from './sites.json';


// axios requests
export default class Sites {
    constructor(username, url) {
        this.username = username;
        this.url = url;
    }

    async getUserName(value) {
        let errorMsg = value.errorMsg || 'Not Found';

        let cors = 'https://cors-anywhere.herokuapp.com/';
        let checkURL = this.url.replace('{}', this.username);

        try {
            const response = await Axios({
                url: `${cors}${checkURL}`,
                timeout: 10000
            });
            // console.log(response.data);
            // Status: 200 But not exist
            // console.log(errorMsg);
            if (response.data.includes(`${errorMsg}`)) {
                // console.log("String found!!");
                return 404;
            } 
            // else if (window.location.href !== value.errorUrl) {
            //     console.log(response.request);
            //     return 404;
            // }
            // console.log(response.status);
            return response.status;


        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
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