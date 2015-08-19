/**
 * Adds a new row.
 */
function addOptions() {

    var tableBody = document.getElementById('options-tbody');

    var project    = document.querySelector('#project');
    var badgeUrl   = document.querySelector('#badge-url');
    var projectUrl = document.querySelector('#project-url');

    var tr = document.createElement('tr');
    tr.className = 'option';
    tr.innerHTML = '' +
        '<td>' + String(project.value) + '</td>' +
        '<td>' + String(badgeUrl.value) + '</td>' +
        '<td>' + String(projectUrl.value) + '</td>' +
        '<td><button class="delete">Delete</button></td>';

    tableBody.insertBefore(tr, tableBody.children[tableBody.children.length - 1]);

    // Clear the current values
    project.value    = '';
    badgeUrl.value   = '';
    projectUrl.value = '';

    attachDeleteListeners(); // Re-attach the delete event listeners
}

/**
 * Removes an existing row.
 */
function deleteOptions() {

    var row = this.parentNode.parentNode;

    row.parentNode.removeChild(row);
}

/**
 * Stores the new options.
 */
function saveOptions() {

    var options = {};

    var optionsRows = document.getElementsByClassName('option');

    var project, badgeUrl, projectUrl;

    for (var i = 0; i < optionsRows.length; i++) {

        project    = optionsRows[i].children[0].textContent;
        badgeUrl   = optionsRows[i].children[1].textContent;
        projectUrl = optionsRows[i].children[2].textContent;

        if (!options[project]) {
            options[project] = [];
        }

        options[project].push({
            badgeUrl: badgeUrl,
            projectUrl: projectUrl
        });
    }

    // Store the options
    chrome.storage.sync.set({
        options: options
    }, function() {
        // Close the options window once the options have been saved
        window.close();
    });
}

/**
 * Restores the already saved options.
 */
function restoreOptions() {
    chrome.storage.sync.get("options", function(items) {

        var tableBody = document.getElementById('options-tbody');

        for (var project in items.options) {
            if (items.options.hasOwnProperty(project)) {
                for (var provider in items.options[project]) {
                    var tr = document.createElement('tr');
                    tr.className = 'option';
                    tr.innerHTML = '' +
                    '<td>' + String(project) + '</td>' +
                    '<td>' + String(items.options[project][provider].badgeUrl) + '</td>' +
                    '<td>' + String(items.options[project][provider].projectUrl) + '</td>' +
                    '<td><button class="delete">Delete</button></td>';

                    tableBody.insertBefore(tr, tableBody.children[tableBody.children.length - 1]);
                }
            }
        }

        attachDeleteListeners(); // Re-attach the delete event listeners
    });
}

// Attach the document ready listener
document.addEventListener('DOMContentLoaded', restoreOptions);

function attachDeleteListeners() {
    var deleteButtons = document.getElementsByClassName('delete');
    for (var i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', deleteOptions);
    }
}

// Attach the add, delete and save event listeners
document.getElementById('add').addEventListener('click', addOptions);
document.getElementById('save').addEventListener('click', saveOptions);
attachDeleteListeners();
