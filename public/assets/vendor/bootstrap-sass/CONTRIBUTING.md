# Contributing to bootstrap-sass

## Asset Changes

Any changes to `bootstrap-sass` assets (scss, javascripts, fonts) should be checked against the `convert` rake task.
For usage instructions, see the [README](/README.md).

If something is broken in the converter, it's preferable to update the converter along with the asset itself.


## Bugs

A bug is a _demonstrable problem_ that is caused by the code in the
repository. Good bug reports are extremely helpful - thank you!

Guidelines for bug reports:

1. **Does it belong here?** &mdash; is this a problem with bootstrap-sass, or
   it an issue with [twbs/bootstrap](https://github.com/twbs/bootstrap)?
   We only distribute a direct port and will not modify files if they're not
   changed upstream.

2. **Use the GitHub issue search** &mdash; check if the issue has already been
   reported.

3. **Isolate the problem** &mdash; ideally create a [reduced test
   case](http://css-tricks.com/6263-reduced-test-cases/) and a live example.

A good bug report shouldn't leave others needing to chase you up for more
information. Please try to be as detailed as possible in your report. What is
your environment? What steps will reproduce the issue? What browser(s) and OS
experience the problem? What would you expect to be the outcome? All these
details will help people to fix any potential bugs.

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
> `<url>` (a link to the reduced test case)
>
> Any other information you want to share that is relevant to the issue being
> reported. This might include the lines of code that you have identified as
> causing the bug, and potential solutions (and your opinions on their
> merits).

**[File a bug report](https://github.com/twbs/bootstrap-sass/issues/)**


## Pull requests

**We will not accept pull requests that modify the SCSS beyond fixing bugs caused by *our* code!**

We use a [converter script][converter-readme] to automatically convert upstream bootstrap, written in LESS, to Sass.

Issues related to styles or javascript but unrelated to the conversion process should go to [twbs/bootstrap][upstream].

Pull requests that fix bugs caused by our code should not modify the SCSS directly, but should patch the converter instead.

Good pull requests - patches, improvements, new features - are a fantastic
help. They should remain focused in scope and avoid containing unrelated
commits. If your contribution involves a significant amount of work or substantial
changes to any part of the project, please open an issue to discuss it first.

Make sure to adhere to the coding conventions used throughout a project
(indentation, accurate comments, etc.). Please update any documentation that is
relevant to the change you're making.

## Do not…

Please **do not** use the issue tracker for personal support requests (use
[Stack Overflow](http://stackoverflow.com/)).

Please **do not** derail or troll issues. Keep the
discussion on topic and respect the opinions of others.

*props [html5-boilerplate](https://github.com/h5bp/html5-boilerplate/blob/master/CONTRIBUTING.md)*

[upstream]: https://github.com/twbs/bootstrap
[converter-readme]: https://github.com/twbs/bootstrap-sass/blob/master/README.md#upstream-converter
