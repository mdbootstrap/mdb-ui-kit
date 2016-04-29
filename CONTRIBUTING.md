## **TLDR;** Issues will be closed unless they are accompanied by a test case using one of our [CodePen templates](#codepen-templates).

# Contributing

Looking to contribute something to bootstrap-material-design? **Here's how you can help.**

Please take a moment to review this document in order to make the contribution process easy and effective for everyone involved.

Following these guidelines helps to communicate that you **respect the time of the developers** managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue or assessing patches and features.


## Using the issue tracker
The [issue tracker](https://github.com/FezVrasta/bootstrap-material-design/issues) is the preferred channel for [bug reports](#bug-reports), [features requests](#feature-requests) and [submitting pull requests](#pull-requests), but please respect the following restrictions:

* Please **do not** use the issue tracker for personal support requests. [Stack Overflow `bootstrap-material-design`](https://stackoverflow.com/questions/tagged/bootstrap-material-design) tag) is the best place to get help.

* Please **do not** derail or troll issues. Keep the discussion on topic and respect the opinions of others.
  
* Please **do not** post comments consisting solely of "+1" or ":thumbsup:". Use [GitHub's "reactions" feature](https://github.com/blog/2119-add-reactions-to-pull-requests-issues-and-comments)  instead. We reserve the right to delete comments which violate this rule.  

* Please **do not** open issues or pull requests regarding the code in dependencies such as: [`Bootstrap`](https://github.com/twbs/bootstrap) (open them in their respective repositories).
  
* Please **do not** open issues without clearly stating the problem and desired result. [See the bug reports section](#bug-reports) for more information on creating effective issues.

* Please **close your own issue** once it is resolved.


## Bug reports
A bug is a _demonstrable problem_ that is caused by the code in the repository. Good bug reports are extremely helpful, so thanks!

Guidelines for bug reports:

1. **Use the GitHub issue search** &mdash; check if the issue has already been reported.

2. **Check if the issue has been fixed** &mdash; try to reproduce it using the latest `master` or development branch in the repository.

3. **Isolate the problem** &mdash; create a [reduced test case](https://css-tricks.com/reduced-test-cases/) using one of **our** [Codepen templates](#codepen-templates).

A good bug report shouldn't leave others needing to chase you up for more information. Please try to be as detailed as possible in your report. What is your environment? What steps will reproduce the issue? What browser(s) and OS experience the problem? Do other browsers show the bug differently? What would you expect to be the outcome? All these details will help people to fix any potential bugs.

## Codepen templates
When submitting an issue, you must submit a Codepen demonstrating your issue.  Please be sure to use the template below that is specific for your version:

- [`v4` Codepen template](http://codepen.io/rosskevin/pen/eJMMVB)
- [`v3` Codepen template](http://codepen.io/rosskevin/pen/VvRgrN)


## Why was my issue summarily closed?
Please don't take this the wrong way, but we receive a lot of issues and in order to effectively help, we need you to follow the guidelines.

We try our best to maintain a great project, and do so with a considerable amount of our personal time and effort.  Following these guidelines facilitates an efficient way to communicate about bugs or simply help. Failure to follow these guidelines leads to confusion and wasted time.  

Many times, we find that the process of creating the [Codepen test case](#codepen-templates) solves the user's problem, and shows that an interaction with code outside this library are causing undesirable side effects.

If you do not take the time to read and follow these guidelines (including submitting a reduced test case with _**our** Codepen template_), then why should we take more time to help you?


## Feature requests
Feature requests are welcome, but take a moment to find out whether your idea fits with the scope and aims of the project and the [Google Material Design specification itself](http://www.google.com/design/spec/material-design/introduction.html). It's up to *you* to make a strong case to convince the project's developers of the merits of this feature. Please provide as much detail and context as possible.

## Pull requests
Good pull requests—patches, improvements, new features—are a fantastic help. They should remain focused in scope and avoid containing unrelated commits.

**Please ask first** before embarking on any significant pull request (e.g. implementing features, refactoring code, porting to a different language), otherwise you risk spending a lot of time working on something that the project's developers might not want to merge into the project.

Please adhere to the [coding guidelines](#code-guidelines) used throughout the project (indentation, accurate comments, etc.) and any other requirements (such as test coverage).

**In general, do not edit `dist` or `gh-pages` files directly!** Those files are automatically generated. 

Similarly, when contributing to the documentation, you should edit the documentation source files in the docs directory.

Adhering to the following process is the best way to get your work included in the project:

1. [Fork](https://help.github.com/fork-a-repo/) the project, clone your fork,
   and configure the remotes:

   ```bash
   # Clone your fork of the repo into the current directory
   git clone https://github.com/<your-username>/bootstrap-material-design.git
   # Navigate to the newly cloned directory
   cd bootstrap
   # Assign the original repo to a remote called "upstream"
   git remote add upstream https://github.com/FezVrasta/bootstrap-material-design.git
   ```

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout master
   git pull upstream master
   ```

3. Create a new topic branch (off the main project development branch) to contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Commit your changes in logical chunks with messages written in english. Please adhere to these [git commit message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html) or your code is unlikely be merged into the main project.

5. Locally merge (or rebase) the upstream development branch into your topic branch:

   ```bash
   git pull [--rebase] upstream master
   ```

6. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

7. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/) with a clear title and description against the `master` branch.  Referenc any open issue in the description so it is automatically linked.

**IMPORTANT**: By submitting a patch, you agree to allow the project owners to license your work under the terms of the [MIT License](LICENSE) (if it includes code changes) and under the terms of the [Creative Commons Attribution 3.0 Unported License](docs/LICENSE) (if it includes documentation changes).


## Code guidelines

### HTML
[Adhere to the Code Guide.](http://codeguide.co/#html)

- Use tags and elements appropriate for an HTML5 doctype (e.g., self-closing tags).
- Use CDNs and HTTPS for third-party JS when possible. We don't use protocol-relative URLs in this case because they break when viewing the page locally via `file://`.
- Use [WAI-ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) attributes in documentation examples to promote accessibility.

### Coding styles
Before committing ensure your changes follow our coding standards by running `gulp` for `v4` or `grunt dist docs` for `v3`.  This will run the various code style check tools and provide feedback.
