## **TLDR;** Create a test case using [this CodePen template](http://codepen.io/rosskevin/pen/VvRgrN) when submitting an issue.

# Contributing

Looking to contribute something to bootsrap-material-design? **Here's how you can help.**

Please take a moment to review this document in order to make the contribution
process easy and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of
the developers managing and developing this open source project. In return,
they should reciprocate that respect in addressing your issue or assessing
patches and features.


## Using the issue tracker

The [issue tracker](https://github.com/FezVrasta/bootstrap-material-design/issues) is
the preferred channel for [bug reports](#bug-reports), [features requests](#feature-requests)
and [submitting pull requests](#pull-requests), but please respect the following
restrictions:

* Please **do not** use the issue tracker for personal support requests. [Stack
  Overflow `bootstrap-material-design`](https://stackoverflow.com/questions/tagged/bootstrap-material-design) tag) is the best place to get help.

* Please **do not** open issues without a [reduced test case](https://css-tricks.com/reduced-test-cases/) 
    and a live example using [this CodePen](http://codepen.io/rosskevin/pen/VvRgrN). Failure to submit a test case may result in the issue being closed.

* Please **do not** open issues without clearly stating the problem and desired result. [See the bug reports section](#bug-reports) for more information on creating effective issues.

* Please **do not** derail or troll issues. Keep the discussion on topic and respect the opinions of others.

* Please **do not** open issues or pull requests regarding the code in dependencies such as:
  [`Bootstrap`](https://github.com/twbs/bootstrap) (open them in their respective repositories).  

* Please **do not** leave resolved issues open e.g. a question that has been answered.


## Bug reports

A bug is a _demonstrable problem_ that is caused by the code in the repository.
Good bug reports are extremely helpful, so thanks!

Guidelines for bug reports:

0. **Validate and lint your code** &mdash; [validate your HTML](http://html5.validator.nu)
   and [lint your HTML](https://github.com/twbs/bootlint) to ensure your
   problem isn't caused by a simple error in your own code.

1. **Use the GitHub issue search** &mdash; check if the issue has already been
   reported.

2. **Check if the issue has been fixed** &mdash; try to reproduce it using the
   latest `master` or development branch in the repository.

3. **Isolate the problem** &mdash; and create a [reduced test
   case](https://css-tricks.com/reduced-test-cases/) and a live example.
   [This CodePen](http://codepen.io/rosskevin/pen/VvRgrN) is a starter template.


A good bug report shouldn't leave others needing to chase you up for more
information. Please try to be as detailed as possible in your report. What is
your environment? What steps will reproduce the issue? What browser(s) and OS
experience the problem? Do other browsers show the bug differently? What
would you expect to be the outcome? All these details will help people to fix
any potential bugs.

Example:

> Short and descriptive example bug report title
>
> A summary of the issue and the browser/OS environment in which it occurs. If
> suitable, include the steps required to reproduce the bug.
>
> 1. This is the first step
> 2. This is the second step
> 3. Further steps, etc.
>
> `<url>` - a link to the reduced test case (via the [CodePen template](http://codepen.io/rosskevin/pen/VvRgrN))
>
> Any other information you want to share that is relevant to the issue being
> reported. This might include the lines of code that you have identified as
> causing the bug, and potential solutions (and your opinions on their
> merits).

## Issues and labels

Our bug tracker utilizes several labels to help organize and identify issues. Here's what they represent and how we use them:

- `bug confirmed` - Issues that have been confirmed with a reduced test case and identify a bug in Bootstrap.
- `docs & examples` - Issues for improving or updating our documentation or examples.
- `feature` - Issues asking for a new feature to be added, or an existing one to be extended or modified. New features require a minor version bump (e.g., `v3.0.0` to `v3.1.0`).
- `enhancement` - Issues for improving existing features
- `grunt` - Issues with our included JavaScript-based Gruntfile, which is used to run all our tests, concatenate and compile source files, and more.
- `help wanted` - Issues we need or would love help from the community to resolve.
- `js` - Issues stemming from our compiled or source JavaScript files.

For a complete look at our labels, see the [project labels page](https://github.com/FezVrasta/bootstrap-material-design/labels).

## Why was my issue summarily closed?
Please don't take this the wrong way, but we receive a lot of issues and in order to effectively help, we need you to follow the guidelines written above.

We try our best to maintain a great project, and do so with a considerable amount of our personal time and effort.  Following these guidelines facilitates an efficient way to communicate about bugs or simply help. Failure to follow these guidelines leads to confusion and wasted time.  

Many times, we find that the process of creating the codepen test case solves the user's problem, and shows that an interaction with code outside this library are causing undesirable side effects.

If you do not take the time to read and follow these guidelines (including submitting a reduced test case with _our codepen template_), then why should we take more time to help you?

## Feature requests

Feature requests are welcome. But take a moment to find out whether your idea
fits with the scope and aims of the project and the [Google Material Design specification itself](http://www.google.com/design/spec/material-design/introduction.html). It's up to *you* to make a strong
case to convince the project's developers of the merits of this feature. Please
provide as much detail and context as possible.


## Pull requests

Good pull requests—patches, improvements, new features—are a fantastic
help. They should remain focused in scope and avoid containing unrelated
commits.

**Please ask first** before embarking on any significant pull request (e.g.
implementing features, refactoring code, porting to a different language),
otherwise you risk spending a lot of time working on something that the
project's developers might not want to merge into the project.

Please adhere to the [coding guidelines](#code-guidelines) used throughout the
project (indentation, accurate comments, etc.) and any other requirements
(such as test coverage).

**In general, do not edit `dist` or `sass` files
directly!** Those files are automatically generated. You should edit the
source files in [`/less/`](https://github.com/FezVrasta/bootstrap-material-design/tree/master/less)
and/or [`/scripts/`](https://github.com/FezVrasta/bootstrap-material-design/tree/master/scripts) instead.

Similarly, when contributing to documentation, you should edit the
documentation source files in
[the `/docs/` directory of the `master` branch](https://github.com/FezVrasta/bootstrap-material-design/tree/master/docs).
**Do not edit the `gh-pages` branch.** That branch is generated from the
documentation source files and is managed separately by the bootstrap-material-design Team.

Adhering to the following process is the best way to get your work
included in the project:

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

3. Create a new topic branch (off the main project development branch) to
   contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Commit your changes in logical chunks with messages written in english. Please adhere to these [git commit
   message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
   or your code is unlikely be merged into the main project. Use Git's
   [interactive rebase](https://help.github.com/articles/interactive-rebase)
   feature to tidy up your commits before making them public.

5. Locally merge (or rebase) the upstream development branch into your topic branch:

   ```bash
   git pull [--rebase] upstream master
   ```

6. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

7. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
    with a clear title and description against the `master` branch.

**IMPORTANT**: By submitting a patch, you agree to allow the project owners to
license your work under the terms of the [MIT License](LICENSE) (if it
includes code changes) and under the terms of the
[Creative Commons Attribution 3.0 Unported License](docs/LICENSE)
(if it includes documentation changes).


## Code guidelines

### HTML

[Adhere to the Code Guide.](http://codeguide.co/#html)

- Use tags and elements appropriate for an HTML5 doctype (e.g., self-closing tags).
- Use CDNs and HTTPS for third-party JS when possible. We don't use protocol-relative URLs in this case because they break when viewing the page locally via `file://`.
- Use [WAI-ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) attributes in documentation examples to promote accessibility.

### CSS

[Adhere to the Code Guide.](http://codeguide.co/#css)

- When feasible, default color palettes should comply with [WCAG color contrast guidelines](http://www.w3.org/TR/WCAG20/#visual-audio-contrast).
- Except in rare cases, don't remove default `:focus` styles (via e.g. `outline: none;`) without providing alternative styles. See [this A11Y Project post](http://a11yproject.com/posts/never-remove-css-outlines/) for more details.

### JS

- No semicolons (in client-side JS)
- 2 spaces (no tabs)
- strict mode
- "Attractive"

### Checking coding style

Run `grunt build` before committing to ensure your changes follow our coding standards.


## License

By contributing your code, you agree to license your contribution under the [MIT License](LICENSE).
By contributing to the documentation, you agree to license your contribution under the [Creative Commons Attribution 3.0 Unported License](docs/LICENSE).

## Building documentation

1. Checkout the master branch from the project root directory 

    ```bash
    $ git checkout master
    ```
    
1. Bundle install (if not already done)
    ```bash
    $ bundle install
    ```

1. Checkout the `gh-pages` branch in `_gh_pages` directory

    ```bash
    $ git clone git@github.com:FezVrasta/bootstrap-material-design.git -b gh-pages _gh_pages
    ```
    
    **rosskevin only note** when ready kill all files and commit a clean gh-pages directory for a clean start.
    
    The `_gh_pages` directory is already in `.gitignore` so we are just fine.

1. Copy the latest code to the `docs/dist` (if not already done)
    ```bash
    $ grunt docs
    ```

1. Let's test changes to the documentation:

    ```bash
    $ jekyll serve
    ```
1. Browse to [http://127.0.0.1:9001/](http://127.0.0.1:9001/)

1. Make some changes to files in the `docs` directory and review them

1. Commit and push the newly generated site on github:

    ```bash
    $ cd _gh_pages
    $ git add .
    $ git commit -m "First generation"
    $ git push
    ```
