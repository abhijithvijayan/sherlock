import axios from 'axios';
import json from './sites.json';


// axios requests
export default class Sites {

    constructor(username, url) {
        this.username = username;
        this.url = url;
    }

    async getUserName(value) {
        let errorMsg = value.errorMsg || 'Not Found';
        // CORS proxy (temporary)
        let cors = 'https://cors-anywhere.herokuapp.com/';
        let checkURL = this.url.replace('{}', this.username);

        try {
            const response = await axios({
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
                return error.response.status;
            } else {
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