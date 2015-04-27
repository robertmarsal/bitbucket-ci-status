/**
 * Adds a new row.
 */
function addOptions() {

    var tableBody = document.getElementById('options-tbody');

    var provider = document.querySelector('#provider');
    var project  = document.querySelector('#project');
    var extra    = document.querySelector('#extra');

    var tr = document.createElement('tr');
    tr.className = 'option';
    tr.innerHTML = '' +
        '<td>' + String(provider.value) + '</td>' +
        '<td>' + String(project.value) + '</td>' +
        '<td>' + String(extra.value) + '</td>' +
        '<td><button class="delete">Delete</button></td>';

    tableBody.insertBefore(tr, tableBody.children[tableBody.children.length - 1]);

    // Clear the current values
    provider.value = 'Shippable';
    project.value  = '';
    extra.value    = '';

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
    var shippableProjectId = document.getElementById('shippableProjectId').value;

    // Store the option
    chrome.storage.sync.set({
        shippableProjectId: shippableProjectId
    }, function() {
        // Display feedback
        var status = document.getElementById('save');
        status.textContent = 'Options saved';
        setTimeout(function() {
            status.textContent = 'Save';
        }, 1500);
    });
}

/**
 * Restores the already saved options.
 */
function restoreOptions() {
    chrome.storage.sync.get({
        shippableProjectId: 'Project ID'
    }, function(items) {
        document.getElementById('shippableProjectId').value = items.shippableProjectId;
    });
}
/*
// Attach the document ready listener
document.addEventListener('DOMContentLoaded', restoreOptions);
*/

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
