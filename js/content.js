/**
 * Main entry point for the extension.
 *
 * @param options
 */
function init (options) {

    if (!options) {
        throw new Error('Bitbucket CI Status is not configured. Please visit the options page');
    }

    var repo = document.querySelector('#repo-avatar-link').getAttribute('href');
        repo = repo.substr(1);

    // Obtain the current branch
    var branch = document.querySelector('.branch a').text;

    if (repo in options) {
        console.log(options);
        for (var i = 0; i < options[repo].length ; i++) {
            if (options[repo][i].provider === 'Shippable') {
                shippableStatus(branch, options[repo][i].extra);
            }
            if (options[repo][i].provider === 'Travis CI') {
                travisStatus(branch, repo);
            }
        }
    }
}

/**
 * Updates the "Shippable" status.
 *
 * @param options
 */
function shippableStatus (branch, projectId){

    if (!projectId) {
        return; // Shippable is not configured
    }

    appendStatus(
        'Shippable',
        '<a href="https://app.shippable.com/projects/' + projectId + '" target="_blank">' +
        '<img src="https://api.shippable.com/projects/' + projectId + '/badge?branchName=' + branch +'">' +
        '</a>'
    );
}

function travisStatus(branch, repo){

    if (!repo) {
        return;
    }

    appendStatus(
        'Travis CI',
        '<a href="https://travis-ci.org/' + repo + '/builds/" target="_blank">' +
        '<img src="https://api.travis-ci.org/' + repo + '.svg?branch=' + branch + '">' +
        '</a>'
    );

}

/**
 * Appends a new CI status to the pull request.
 *
 * @param vendor
 * @param status
 */
function appendStatus(vendor, status) {

    var reviewersGroup   = document.querySelector('.reviewers-group');
    var insertBeforeNode = document.querySelector('.reviewers-group').parentNode.childNodes[5];

    var buildStatusGroup = document.createElement('div');
        buildStatusGroup.setAttribute('class', 'clearfix');
        buildStatusGroup.innerHTML = '' +
            '<dt>' + vendor + '</dt>' +
            '<dd class="participants">' +
                '<ol>' +
                    '<li>' + status + '</li>' +
                '</ol>' +
            '</dd>'
    ;

    reviewersGroup.parentNode.insertBefore(buildStatusGroup, insertBeforeNode);
}

/**
 * Gets called once the options have been loaded and initialises the extension.
 *
 * @param options
 */
function onOptionsLoaded(options) {
    init(options.options);
}

// Get the stored options
chrome.storage.sync.get("options", onOptionsLoaded);
