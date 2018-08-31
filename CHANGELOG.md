# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.1.0"></a>
# [2.1.0](https://github.com/mselerin/yang-schematics/compare/v2.0.0...v2.1.0) (2018-08-31)


### Features

* app-layout directly inside app-root ([bc5786d](https://github.com/mselerin/yang-schematics/commit/bc5786d))
* Moving layout outside features ([a851f35](https://github.com/mselerin/yang-schematics/commit/a851f35))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/mselerin/yang-schematics/compare/v1.2.2...v2.0.0) (2018-06-26)


### Bug Fixes

* array types (any[]) ([5b0b932](https://github.com/mselerin/yang-schematics/commit/5b0b932))
* component name not required (passed as first argument is OK) ([3c48940](https://github.com/mselerin/yang-schematics/commit/3c48940))
* Creating feature/module/component inside other feature/module ([#2](https://github.com/mselerin/yang-schematics/issues/2)) ([d161d81](https://github.com/mselerin/yang-schematics/commit/d161d81))
* service schematic aware of project / lib ([904326d](https://github.com/mselerin/yang-schematics/commit/904326d))
* SharedModule should be imported inside AppModule ([f105461](https://github.com/mselerin/yang-schematics/commit/f105461))
* unit test for component should use NO_ERROR_SCHEMA and not import modules ([7722c27](https://github.com/mselerin/yang-schematics/commit/7722c27))
* yang-schematics should extends angular-schematics ([bd5b7a5](https://github.com/mselerin/yang-schematics/commit/bd5b7a5))


### Code Refactoring

* Routes constant name inside feature is now 'ROUTES' ([6463e68](https://github.com/mselerin/yang-schematics/commit/6463e68))


### Features

* directive schematic aware of project / lib ([4a2ad50](https://github.com/mselerin/yang-schematics/commit/4a2ad50))
* feature schematic aware of project / lib ([c8e228a](https://github.com/mselerin/yang-schematics/commit/c8e228a))
* feature spec file ([e30ac43](https://github.com/mselerin/yang-schematics/commit/e30ac43))
* generate custom module files ([38649b9](https://github.com/mselerin/yang-schematics/commit/38649b9))
* generate directives inside modules ([0a9f439](https://github.com/mselerin/yang-schematics/commit/0a9f439))
* generate pipes inside modules ([6d20d89](https://github.com/mselerin/yang-schematics/commit/6d20d89))
* module schematic ([3fc4d32](https://github.com/mselerin/yang-schematics/commit/3fc4d32))
* module schematic (resolve [#1](https://github.com/mselerin/yang-schematics/issues/1)) ([c9a626c](https://github.com/mselerin/yang-schematics/commit/c9a626c))
* module schematic aware of project / lib ([3fdcf82](https://github.com/mselerin/yang-schematics/commit/3fdcf82))
* module schematic aware of project / lib ([05345eb](https://github.com/mselerin/yang-schematics/commit/05345eb))
* pipe schematic aware of project / lib ([8a5858a](https://github.com/mselerin/yang-schematics/commit/8a5858a))
* yang-schematics now extends angular-schematics ([d393fd2](https://github.com/mselerin/yang-schematics/commit/d393fd2))


### Reverts

* extends ([fade034](https://github.com/mselerin/yang-schematics/commit/fade034))


### BREAKING CHANGES

* Routes constant name inside feature is now 'ROUTES'
* yang-schematics now extends angular-schematics



<a name="1.2.2"></a>
## [1.2.2](https://github.com/mselerin/yang-schematics/compare/v1.2.1...v1.2.2) (2018-05-18)


### Bug Fixes

* add project options in every schematics to be compatible with the Angular's Schematics ([0198e2c](https://github.com/mselerin/yang-schematics/commit/0198e2c))
* travis build ([fa37b9e](https://github.com/mselerin/yang-schematics/commit/fa37b9e))


### Misc
* add unit-tests for every schematics
* add project option for every schematics to be compliant with @schematics/angular 


<a name="1.2.1"></a>
## [1.2.1](https://github.com/mselerin/yang-schematics/compare/v1.2.0...v1.2.1) (2018-05-17)


### Bug Fixes

* default directory for ng-new ([6e9e92e](https://github.com/mselerin/yang-schematics/commit/6e9e92e))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/mselerin/yang-schematics/compare/v1.1.1...v1.2.0) (2018-05-16)


### Bug Fixes

* correctly update environment.ts files ([f04ba1e](https://github.com/mselerin/yang-schematics/commit/f04ba1e))


### Features

* ng-new schematics
([fb0b543](https://github.com/mselerin/yang-schematics/commit/fb0b543), [166e20f](https://github.com/mselerin/yang-schematics/commit/166e20f), [553a0d7](https://github.com/mselerin/yang-schematics/commit/553a0d7))



<a name="1.1.1"></a>
## [1.1.1](https://github.com/mselerin/yang-schematics/compare/v1.1.0...v1.1.1) (2018-05-14)


### Bug Fixes

* Adding yang-schematics in package.json inside init schematic ([b9a680e](https://github.com/mselerin/yang-schematics/commit/b9a680e))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/mselerin/yang-schematics/compare/v1.0.3...v1.1.0) (2018-05-11)


### Features

* add 'route' option for component generation ([3306d60](https://github.com/mselerin/yang-schematics/commit/3306d60))



<a name="1.0.3"></a>
## [1.0.3](https://github.com/mselerin/yang-schematics/compare/v1.0.2...v1.0.3) (2018-05-11)


### Bug Fixes

* no home route from init ([d08e86e](https://github.com/mselerin/yang-schematics/commit/d08e86e))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/mselerin/yang-schematics/compare/v1.0.1...v1.0.2) (2018-05-11)


### Bug Fixes

* removed header and footer component in layout module ([8abd5c4](https://github.com/mselerin/yang-schematics/commit/8abd5c4))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/mselerin/yang-schematics/compare/v1.0.0...v1.0.1) (2018-05-11)


### Bug Fixes

* unit test ([f743736](https://github.com/mselerin/yang-schematics/commit/f743736))
* yarnrc not needed anymore ([d81e00b](https://github.com/mselerin/yang-schematics/commit/d81e00b))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/mselerin/yang-schematics/compare/v0.1.1...v1.0.0) (2018-05-11)



<a name="0.1.1"></a>
## [0.1.1](https://github.com/mselerin/yang-schematics/compare/v0.1.0...v0.1.1) (2018-05-11)


### Bug Fixes

* devDependencies ([bbd48d5](https://github.com/mselerin/yang-schematics/commit/bbd48d5))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/mselerin/yang-schematics/compare/v0.0.1...v0.1.0) (2018-05-11)


### Features

* add ng-add schematic ([6f87bb1](https://github.com/mselerin/yang-schematics/commit/6f87bb1))



<a name="0.0.1"></a>
## [0.0.1](https://github.com/mselerin/yang-schematics/compare/f3925a4...v0.0.1) (2018-05-10)

> Initial release

### Bug Fixes

* force overwrite ([94bdd78](https://github.com/mselerin/yang-schematics/commit/94bdd78))


### Features

* directive, pipe and service ([b7934d9](https://github.com/mselerin/yang-schematics/commit/b7934d9))
* feature and component ([f3925a4](https://github.com/mselerin/yang-schematics/commit/f3925a4))
* merging header and footer inside layout ([760b748](https://github.com/mselerin/yang-schematics/commit/760b748))
* new application ([4ed1924](https://github.com/mselerin/yang-schematics/commit/4ed1924))
* using [@schematics/angular](https://github.com/angular/devkit) for component, service, directive and pipe ([62c4368](https://github.com/mselerin/yang-schematics/commit/62c4368))
