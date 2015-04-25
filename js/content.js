function init (options) {

    if (!options) {
        throw new Error('Chrome Bitbucket CI Status is not configured. Please visit the options page');
    }

    // Obtain the current branch
    var branch = document.querySelector('.branch a').text;

    // Call all the providers and get statuses for all the enabled ones.
    shippableStatus(branch, options);
}

function shippableStatus (branch, options) {

    if (!options.shippableProjectId) {
        return; // Shippable is not enabled
    }

    var reviewersGroup   = document.querySelector('.reviewers-group');
    var insertBeforeNode = document.querySelector('.reviewers-group').parentNode.childNodes[5];

    var buildStatusGroup = document.createElement('div');
        buildStatusGroup.setAttribute('class', 'clearfix reviewers-group');
        buildStatusGroup.innerHTML = '' +
            '<dt>Shippable</dt>' +
            '<dd class="participants">' +
                '<ol>' +
                    '<li>' +
                        '<img ' +
                            'style="margin-top: 7px;"' +
                            'src="https://api.shippable.com/projects/' + options.shippableProjectId + '/badge?branchName=' + branch +'">' +
                    '</li>' +
                    '</ol>' +
            '</dd>'
        ;

    reviewersGroup.parentNode.insertBefore(buildStatusGroup, insertBeforeNode);
}

function onOptionsLoaded(options) {
    init(options);
}

// Get the stored options
chrome.storage.sync.get("shippableProjectId", onOptionsLoaded);
