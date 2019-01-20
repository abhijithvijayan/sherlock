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

        searchUserName: (username, url) => {

            const user = new Sites(username, url);
            user.getUserName()
                .then(result => {
                    if (result === 404) {
                        console.log('Username Available!');
                    } else if (result === 200) {
                        console.log('Username Taken!');
                    } else {
                        console.log(`Status Code: ${result}`);
                    }
                });

        }





        // const github = new Sites(`${username}`, 'https://api.github.com/users/');
        // github.getUserName()
        //     .then(result => {
        //         console.log(`Github: Status Code: ${result}`);
        //     });

    }

})();

// Global APP controller
let appController = (function (UICtrl, handleCtrl) {
    let DOM;
    DOM = UICtrl.getDOMStrings();

    let startSearch = (dataJSON) => {
        let username = document.getElementById(DOM.username).value;
        let url = dataJSON.Instagram.url;

        handleCtrl.searchUserName(username, url);

        url = dataJSON.GitHub.url;
        handleCtrl.searchUserName(username, url);
        
        url = dataJSON.Twitter.url;
        handleCtrl.searchUserName(username, url);
        
        url = dataJSON.Facebook.url;
        handleCtrl.searchUserName(username, url);

        url = dataJSON.Reddit.url;
        handleCtrl.searchUserName(username, url);
    };

    let extractJSON = () => {

        loadJSON()
            .then(dataJSON => {
                startSearch(dataJSON);
                //  console.log(dataJSON);
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