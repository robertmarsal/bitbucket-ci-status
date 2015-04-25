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

function restoreOptions() {
    chrome.storage.sync.get({
        shippableProjectId: 'Project ID'
    }, function(items) {
        document.getElementById('shippableProjectId').value = items.shippableProjectId;
    });
}

// Attache the document ready listener
document.addEventListener('DOMContentLoaded', restoreOptions);

// Attach the save event listener
document.getElementById('save').addEventListener('click', saveOptions);
