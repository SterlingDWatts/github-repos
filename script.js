'use strict';

const searchURL = 'https://api.github.com'

function displayRelults(responseJson) {
    
}

function getUserRepos(query) {
    // use fetch() to GET user repos from GitHub API

    const url = searchURL + '/users/' + query + '/repos';
    console.log(url);
    const options = {
        headers: new Headers({
            "Accept": "application/vnd.github.v3+json"
        })
    }

    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            console.log(err.message);
        })
}

function handleSubmit() {
    // listen for submit and run functions for search
    
    $('form').on('submit', function(e) {
        e.preventDefault();
        const searchTerm = $('input').val();
        console.log(searchTerm);
        getUserRepos(searchTerm);
    })
}

function loadStartFunctions() {
    // run event listeners

    handleSubmit();
}

$(loadStartFunctions());