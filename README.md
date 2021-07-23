# Semver foobar

The purpose of this repo is to showcase how [semver](https://semver.org) specification can be implemented for
convenient, every day usage.

Additionally, [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification is being used as the
commit style preset of choice. This could be swapped for any other supported style (`angular`, `atom`, `codemirror`
, `ember`, `eslint`, `express`, `jquery`, `jshint`).

The actual app is just a simple Node Express web server with `/` GET endpoint to return `foobar` JSON response.

# Ingredients

## semantic-release

This [package](https://semantic-release.gitbook.io/semantic-release/) is a core of fully automated semver versioning. It
uses various plugins to end 2 end automate process of semver enforcement, packaging, management of the release and
change logs, maintainer notifications, etc...

Plugins used:

* [@semantic-release/commit-analyzer](https://github.com/semantic-release/commit-analyzer/) - analyzes commit messages
  to determine the next semantic version.
* [@semantic-release/release-notes-generator](https://github.com/semantic-release/release-notes-generator) - generates
  release notes based on the commit messages since the last release.
* [@semantic-release/changelog](https://github.com/semantic-release/changelog) - creates and updates a CHANGELOG.md file
  based on the release notes generated.
* [@semantic-release/npm](https://github.com/semantic-release/npm) - Updates the version in package.json
* [@semantic-release/github](https://github.com/semantic-release/github) - creates a GitHub release titled and tagged
  with the new version. It also adds a comment to any Issues and Pull Requests linked in the commit message.
* [@semantic-release/git](https://github.com/semantic-release/git) - commits the files modified in the previous steps (
  `CHANGELOG.md`, `package.json`, and `yarn.lock`) back to the repository.

### Usage

Semantic release can be used in 2 modes:

1. Dry-run - allows users to preview the release, without actually doing it (`yarn release:dry`)
2. Standard - shows the release preview and ships it (`yarn:release`)

> Either way, `GITHUB_TOKEN` environment variable is required, in order to create Github related changes.

## commitlint

This [package](https://commitlint.js.org/#/) is used as a wrapper around `git commit` which will enforce usage of
conventionalcommits commit style.

There are 2 variations of this package:

1. `CLI` - enforces interaction strictly through cli static commands
2. `prompt` - allows users to have interactive prompt when commiting, which also validates data on fly
    - This variation is used in the repository, but could easily be swapped for the `CLI`

As commitlint also supports various commit
presets, [config-conentional](https://www.npmjs.com/package/@commitlint/config-conventional) has been added to ensure
that commitlint knows how to work with conventional commits style.

### Usage

Consumption of the commitlint is really straightforward, instead of `git commit`, just run `yarn commit` which will
bring up the interactive prompt to ask for more details on the commit. Afterwards, just continue with regular `git push`
flow.

## Github Actions Workflow

In order to achieve unsupervised, fully automated releases, the repository also contains GH
Actions [workflow](.github/workflows/release.yml) which runs `semantic-release` on any push to the `main` branch.

> The workflow automagically injects the value of `GITHUB_TOKEN` to the CI environment.