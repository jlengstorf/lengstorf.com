Hoverboard Child Theme Starter Kit
==================================

This is the starter kit for any theme to be built on [Hoverboard][hoverboard]. 
You don't have to use this child theme to work with Hoverboard, but it makes 
your life a little easier if you do.


Documentation
-------------

For documentation, check out [the wiki][wiki].


Issues
------

To view or report issues, please use [the issue tracker][issues].

Before you submit the issue, please search to make sure it doesn't already exist.


Changelog
---------

### 1.1.2

* Enabled LESS source maps and configured autoprefixr to work properly with them

### 1.1.1

* Improved TGM plugin requirements to be more relevant
* Updated Bootstrap to the latest version
* Cleaned up the `Gruntfile.js`

### 1.1.0

* Added TGM-Plugin-Activation for requiring WordPress plugins

### 1.0.3

* Improvements to the Grunt workflow

### 1.0.2

* Improved the Hoverboard byline in the stylesheet
* Moved `grunt-cli` to `devDependencies` in `package.json`
* Minor refactoring

### 1.0.1

* Updated `package.json` with devDependencies, moved some dependencies to dev
* Added grunt-todo for tracking todos during development
* Added grunt-tinypng for compressing PNGs automatically
* Added grunt-jshint to avoid JS issues
* Added grunt-autoprefixer for handling CSS prefixes on the fly
* Minor tweaks to `main.js`
* Updated `.gitignore` to skip `file_sigs.json` and `todo.md`

### 1.0.0

* Initial release


Versioning
----------

For transparency and insight into our release cycle, and for striving to maintain backward compatibility, this theme will be maintained under the Semantic Versioning guidelines as much as possible.

Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backward compatibility bumps the major (and resets the minor and patch)
* New additions without breaking backward compatibility bumps the minor (and resets the patch)
* Bug fixes and misc changes bumps the patch

For more information on SemVer, please visit [http://semver.org/](http://semver.org/).


Authors
-------

**Jason Lengstorf**

+ [http://twitter.com/jlengstorf](http://twitter.com/jlengstorf)
+ [http://github.com/jlengstorf](http://github.com/jlengstorf)

**Alex Newman**

+ [http://twitter.com/thedotmack](http://twitter.com/thedotmack)
+ [http://github.com/thedotmack](http://github.com/thedotmack)


Copyright and License
---------------------

Copyright 2014 Copter Labs, Inc.

[hoverboard]: http://github.com/copterlabs/hoverboard
[wiki]: https://github.com/copterlabs/hoverboard-child/wiki
[issues]: https://github.com/copterlabs/hoverboard-child/issues
