import 'bootstrap';
import './sass/main.scss';
import Sites, { loadJSON } from './sherlock';

let siteCount, counterFound, sitePassed;

// UI controller
const UIController = (() => {

    const DOMStrings = {
        username: 'username__holder',
        submit_btn: '.username__submit--button',
        spinner: '#progress__spinner',
        result: '#end__results',
        counter: 'found__counter',
        foundCount: 'total__sites--found',
        totalCount: 'total__sites--all',
        tooltip: 'data-original-title',
        short: 'Username too short',
        error: 'There was an error!',
        view: 'View Profile',
        nouser: 'No Such User found'
    };


    const colorStatus = ['bg-avail', 'bg-taken', 'bg-grey', 'bg-red'];


    const readytooltip = (id) => {
        $(`#${id}`).tooltip({ trigger: 'hover' });
    };


    const updateContent = (id, className, url, title) => {
        ++sitePassed;
        let el = document.getElementById(id);
        el.classList.add(className);
        // add to the child div
        if (className === colorStatus[0]) {
            el.parentNode.children[1].classList.add(colorStatus[0]);
        } else if (className === colorStatus[2]) {
            el.parentNode.children[1].classList.add(colorStatus[2]);
        }

        el.setAttribute('href', url);
        el.setAttribute('data-original-title', title);
        readytooltip(id);

        // console.log('sitepassed: ' + sitePassed);
        // console.log(siteCount === sitePassed);
        console.log('sitepassed: ' + sitePassed + ' sitecount:' + siteCount);
        if ((siteCount === sitePassed) === true) {
            // update UI
            UIController.updateCount(DOMStrings.foundCount, counterFound);
            UIController.updateCount(DOMStrings.totalCount, siteCount);
            $(DOMStrings.spinner).addClass('d-none');
            $(DOMStrings.result).removeClass('d-none');
        }

    };

    return {


        updateUI: (sitename, status, url) => {
            if (status === 'avail') {
                updateContent(sitename, colorStatus[0], url, DOMStrings.nouser);
            } else if (status === 'taken') {
                updateContent(sitename, colorStatus[1], url, DOMStrings.view);
            } else if (status === 'invalid') {
                updateContent(sitename, colorStatus[2], url, DOMStrings.short);
            } else if (status === 'error') {
                updateContent(sitename, colorStatus[3], url, DOMStrings.error);
            }
        },


        updateCount: (id, count) => {
            document.getElementById(id).textContent = count;
        },


        resetClass: () => {
            for (let className of colorStatus) {
                $('a').removeClass(className);
                $('div').removeClass(className);
                $('a').removeAttr(DOMStrings.tooltip);
            }
        },


        removeClass: (id, className) => {
            $(id).removeClass(className);
        },


        getDOMStrings: () => {
            return DOMStrings;
        }
    };

})();


// Username Handler
const handleController = ((UICtrl) => {

    let DOM = UICtrl.getDOMStrings();

    // searching process
    const searchUserName = async (username, key, value) => {
        let url = value.url, sitename = key, countTaken = 0;
        const user = new Sites(username, url);
        return user.getUserName(value)
            .then(result => {
                if (result.statusCode === 404 || result.statusCode === 410) {
                    UICtrl.updateUI(sitename, 'avail', result.origUrl);
                } else if (result.statusCode === 200) {
                    ++countTaken;
                    UICtrl.updateUI(sitename, 'taken', result.profileUrl);
                    return countTaken;
                } else if (result.statusCode === 504) {
                    UICtrl.updateUI(sitename, 'error', result.origUrl);
                } else {
                    console.log(`Status: ${result.statusCode}`);
                    UICtrl.updateUI(sitename, 'error', result.origUrl);
                }
            });
    };


    // Search Handler
    const startSearch = (jsonObj, username) => {
        counterFound = 0;
        siteCount = 0;
        // traverse json
        Object.entries(jsonObj).forEach(([key, value]) => {
            ++siteCount;
            // proceed if length satifies
            if (username.length >= value.minChar) {
                // start searching
                searchUserName(username, key, value).then(val => {
                    // sites count
                    if (!isNaN(val)) {
                        counterFound += val;
                        UICtrl.updateCount(DOM.counter, counterFound);
                    }
                    console.log("Found:"+ counterFound);
                });
            } else {
                // length < min required
                UICtrl.updateUI(key, 'invalid', value.urlMain);
            }
        });
    };


    return {

        // json extrator
        extractJSON: (username) => {
            // call async 
            loadJSON()
                .then(jsonObj => {
                    startSearch(jsonObj, username);
                });
            // .catch(err => {
            //     console.log(err);
            // });
        }

    }

})(UIController);


// Global APP controller
const appController = ((UICtrl, handleCtrl) => {

    let DOM = UICtrl.getDOMStrings(), username;

    // obtain from input
    const readUsername = () => {
        username = document.getElementById(DOM.username).value;
    };


    const start = () => {
        alert('You might face issue due to high traffic now. I am Working on it to fix it.');
        readUsername();
        sitePassed = 0;
        UICtrl.updateCount(DOM.counter, 0);
        UICtrl.removeClass(DOM.spinner, 'd-none');
        $(DOM.result).addClass('d-none');
        UICtrl.resetClass();
        handleCtrl.extractJSON(username);
    };


    // respond to events
    const setUpEventListeners = () => {

        // key press
        document.addEventListener('keypress', (e) => {
            let keyCode = e.which || e.keyCode;
            // enter key
            if (keyCode === 13) {
                start();
            }
        });

        // search button
        document.querySelector(DOM.submit_btn).addEventListener('click', start);

    };


    return {

        // start 
        init: () => {
            setUpEventListeners();
        }
    };


})(UIController, handleController);


// initialize
appController.init();