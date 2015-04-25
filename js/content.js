/**
 * Main entry point for the extension.
 *
 * @param options
 */
function init (options) {

    if (!options) {
        throw new Error('Chrome Bitbucket CI Status is not configured. Please visit the options page');
    }

    // Call all the providers and get statuses for all the enabled ones.
    shippableStatus(options);
}

/**
 * Updates the "Shippable" status.
 *
 * @param options
 */
function shippableStatus (options) {

    if (!options.shippableProjectId) {
        return; // Shippable is not enabled
    }

    // Obtain the current branch
    var branch = document.querySelector('.branch a').text;

    appendStatus(
        'Shippable',
        '<img src="https://api.shippable.com/projects/' + options.shippableProjectId + '/badge?branchName=' + branch +'">'
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

    init(options);
}

// Get the stored options
chrome.storage.sync.get("shippableProjectId", onOptionsLoaded);
