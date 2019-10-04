'use strict';

const searchURL = 'https://api.github.com'

function displayResults(responseJson) {
    $('.results-list').empty();

    for (let i = 0; i < responseJson.length; i++) {
        $('.results-list').append(
            `<li><h3><a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].name}</a></h3></li>`
        );
    }

    $('.results').removeClass('hidden');
}

function getUserRepos(query) {
    // use fetch() to GET user repos from GitHub API

    const url = searchURL + '/users/' + query + '/repos';
    console.log(url)
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
            $('.results-list').empty();
            $('.results-list').append(`<li><h3>${err.message}</h3></li>`);
            $('.results').removeClass('hidden');
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