![Bitbucket CI Status](/asset/banner.png)

Chrome extension that allows viewing the build status of continuous integration systems, directly into the Bitbucket pull requests.

## Installation
Navigate to the store page and click "Add to Chrome" https://chrome.google.com/webstore/detail/bitbucket-ci-status/pnojfigoiifnjfghcpnmopcokhebgbnl?hl=en-GB&gl=GB

## Configuration
Once installed visit the "Options" page of the extension and set up your repositories.

### Project
The project is your namespace and project on Bitbucket. For example, if your 
organisation is called organisation and your project is called test your project
field must be organisation/test.

### Badge URL
The badge URL is supplied by your CI provider. It usually has the following 
format: http://ci.provider.com/build-status/image/1?branch=feature-test.
Please store the badge url replacing the branch name with **%BRANCH%**. This 
will then get replaced with each branch on the pull request page.
The final url should be something like: 
**http://ci.provider.com/build-status/image/1?branch=%BRANCH%**.

### Project URL
When the badge is clicked it will redirect to this url.
