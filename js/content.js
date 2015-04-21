// Obtain the current branch
var branch = document.querySelector('.branch a').text;

// Obtain the SVG
var request = new XMLHttpRequest(); // new XML request
request.open("GET", "https://api.shippable.com/projects/552416e65ab6cc1352bb01a8/badge?branchName=" + branch, false);
request.send(null); // get the SVG file

var svg = request.responseXML.getElementsByTagName("svg")[0];

var shippableStatus = svg.childNodes[4].textContent;

if (shippableStatus === 'buildshippable') {

}
