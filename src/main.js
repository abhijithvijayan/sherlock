import 'bootstrap';
import './sass/main.scss';
import Sites, { loadJSON } from './app';


// UI controller
let UIController = (function () {

    const DOMStrings = {
        username: 'username__holder',
        submit_btn: '.username__submit--button'
    };


    return {
        getDOMStrings: () => {
            return DOMStrings;
        }
    };

})();


// Username Handler
let handleController = (function () {


    return {

        searchUserName: (username, url, sitename) => {

            const user = new Sites(username, url);
            user.getUserName()
                .then(result => {
                    if (result === 404) {
                        console.log(`${sitename}: Username Available!`);
                    } else if (result === 200) {
                        console.log(`${sitename}: Username Taken!`);
                    } else {
                        console.log(`Status Code: ${result}`);
                    }
                });

        }

    }

})();

// Global APP controller
let appController = (function (UICtrl, handleCtrl) {
    let DOM;
    DOM = UICtrl.getDOMStrings();


    let startSearch = (jsonObj) => {
        let username, url, sitename;
        
        username = document.getElementById(DOM.username).value;

        // traverse json
        Object.entries(jsonObj).forEach(([key, value]) => {
            // console.log(key);
            // console.log(value);
            sitename = key;
            url = value.url;    
            handleCtrl.searchUserName(username, url, sitename);
        });

    };


    let extractJSON = () => {

        loadJSON()
            .then(jsonObj => {
                startSearch(jsonObj);
                //  console.log(jsonObj);
            })
            .catch(err => {
                console.log(err);
            });
    };


    let setUpEventListeners = () => {

        // key press
        document.addEventListener('keypress', (e) => {
            let keyCode = e.which || e.keyCode;
            // enter key
            if (keyCode === 13) {
                extractJSON();
            }
        });

        // search button
        document.querySelector(DOM.submit_btn).addEventListener('click', extractJSON);

    };


    return {

        init: () => {
            setUpEventListeners();
        }
    };


})(UIController, handleController);

// initialize
appController.init();