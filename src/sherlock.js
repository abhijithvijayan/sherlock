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
                timeout: 30000
            });
            // console.log(response.data);
            // Status: 200 But not exist
            // console.log(errorMsg);
            if (response.data.includes(errorMsg)) {
                // console.log("String found!!");

                return {
                    statusCode: 404,
                    origUrl: value.urlMain
                };
            }
            // else if (window.location.href !== value.errorUrl) {
            //     console.log(response.request);
            //     return 404;
            // }
            // console.log(response.status);
            // FOUND
            return {
                statusCode: response.status,
                profileUrl: checkURL
            };

        } catch (error) {
            if (error.code === 'ECONNABORTED') {
                return {
                    statusCode: 504,
                    origUrl: value.urlMain
                };
            }
            else if (error.response) {
                return {
                    statusCode: error.response.status,
                    origUrl: value.urlMain
                };
            } else {
                return {
                    statusCode: 404,
                    origUrl: value.urlMain
                };
            }
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