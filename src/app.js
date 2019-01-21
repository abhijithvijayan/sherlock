import 'bootstrap';
import './sass/main.scss';
import Sites, { loadJSON } from './sherlock';


// UI controller
let UIController = (function () {

    const DOMStrings = {
        username: 'username__holder',
        submit_btn: '.username__submit--button'
    };

    const updateContent = (id, className, url) => {
        let el = document.getElementById(id);
        el.classList.add(className);
        el.setAttribute('href', url);
    };

    return {

        updateUI: (sitename, status, url) => {
            if (status === 'avail') {
                updateContent(sitename, 'bg-avail', url);
            } else if (status === 'taken') {
                updateContent(sitename, 'bg-taken', url);
            } else if (status === 'invalid') {
                updateContent(sitename, 'bg-grey', url);
            } else if (status === 'error') {
                updateContent(sitename, 'bg-red', url);
            }
        },


        getDOMStrings: () => {
            return DOMStrings;
        }
    };

})();


// Username Handler
let handleController = (function (UICtrl) {

    return {

        searchUserName: (username, key, value) => {
            let url = value.url, sitename = key;
            const user = new Sites(username, url);
            user.getUserName(value)
                .then(result => {
                    if (result.statusCode === 404 || result.statusCode === 410) {
                        //   console.log(`${sitename}: Username Available!`);
                        UICtrl.updateUI(sitename, 'avail', result.origUrl);

                    } else if (result.statusCode === 200) {
                        // console.log(`${sitename}: Username Taken!`);
                        UICtrl.updateUI(sitename, 'taken', result.profileUrl);
                    } else if (result.statusCode === 504) {
                        UICtrl.updateUI(sitename, 'error', result.origUrl);
                    } else {
                        console.log(`Status: ${result}`);
                    }
                });

        }

    }

})(UIController);

// Global APP controller
let appController = (function (UICtrl, handleCtrl) {
    let DOM;
    DOM = UICtrl.getDOMStrings();


    let startSearch = (jsonObj) => {
        let username;
        username = document.getElementById(DOM.username).value;

        // traverse json
        Object.entries(jsonObj).forEach(([key, value]) => {
            // console.log(key);
            // console.log(value);

            if (username.length >= value.minChar) {
                handleCtrl.searchUserName(username, key, value);
            } else {
                // length < min required
                UICtrl.updateUI(key, 'invalid', value.urlMain);
            }
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