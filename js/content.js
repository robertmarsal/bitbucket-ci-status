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

        for (var i = 0; i < options[repo].length ; i++) {

            var badgeUrl = options[repo][i].badgeUrl.replace(/%BRANCH%/, branch);

            appendStatus(
                'Build Status',
                '<a href="' + options[repo][i].projectUrl + '" target="_blank">' +
                '<img src="' + badgeUrl + '">' +
                '</a>'
            )
        }
    }
}

/**
 * Appends a new CI status to the pull request.
 *
 * @param vendor
 * @param status
 */
function appendStatus(label, status) {

    var reviewersGroup   = document.querySelector('.reviewers-group');
    var insertBeforeNode = document.querySelector('.reviewers-group').parentNode.childNodes[5];

    // Check if the status exists already, create if not
    var buildStatusGroup = document.getElementById('bitbucket-ci-status');

    if (buildStatusGroup === null) {
        buildStatusGroup = document.createElement('div');
        buildStatusGroup.setAttribute('id', 'bitbucket-ci-status');
        buildStatusGroup.setAttribute('class', 'clearfix reviewers');
    }

    buildStatusGroup.innerHTML = '' +
        '<dt>' + label + '</dt>' +
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

    setInterval(function() {init(options.options);}, 60000);
}

// Get the stored options
chrome.storage.sync.get("options", onOptionsLoaded);
