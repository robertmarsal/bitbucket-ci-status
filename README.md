![Bitbucket CI Status](/asset/banner.png)

Chrome extension that allows viewing the build status of continuous integration systems, directly into the Bitbucket pull requests.

## Installation
Navigate to the store page and click "Add to Chrome" https://chrome.google.com/webstore/detail/bitbucket-ci-status/pnojfigoiifnjfghcpnmopcokhebgbnl?hl=en-GB&gl=GB

## Configuration
Once installed visit the "Options" page of the extension and set up your repositories.

## Providers

All providers require a project to be specified, but some have special requirements. Providers must be enabled for each repository you are going to use.

### Shippable

To enable a Shippable project, besides the project name you must specify the project id. You can obtain this from the url of your project: https://app.shippable.com/projects/{projectid}. Put the project id in the extra option for the repository.

### Travis CI

Travis has no special requiremens, so the extra options can be empty
