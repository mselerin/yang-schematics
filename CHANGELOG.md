# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.4.2](https://github.com/mselerin/yang-schematics/compare/v3.4.1...v3.4.2) (2019-02-21)


### Bug Fixes

* removing temp fix for https://github.com/manfredsteyer/ngx-build-plus/issues/70 is resolved ([c8c5f5a](https://github.com/mselerin/yang-schematics/commit/c8c5f5a))



<a name="3.4.1"></a>
## [3.4.1](https://github.com/mselerin/yang-schematics/compare/v3.4.0...v3.4.1) (2019-02-12)


### Bug Fixes

* temp fix until https://github.com/manfredsteyer/ngx-build-plus/issues/70 is resolved ([d55309a](https://github.com/mselerin/yang-schematics/commit/d55309a))



<a name="3.4.0"></a>
# [3.4.0](https://github.com/mselerin/yang-schematics/compare/v3.3.2...v3.4.0) (2019-02-04)


### Features

* move dependencies outside of code & remove rxjs-compat ([09a8d67](https://github.com/mselerin/yang-schematics/commit/09a8d67))
* update to @angular/cli 7.3.0


<a name="3.3.2"></a>
## [3.3.2](https://github.com/mselerin/yang-schematics/compare/v3.3.1...v3.3.2) (2018-12-14)


### Bug Fixes

* removing .npmrc with save-exact (not needed anymore with package-lock.json) ([0f19f15](https://github.com/mselerin/yang-schematics/commit/0f19f15))



<a name="3.3.1"></a>
## [3.3.1](https://github.com/mselerin/yang-schematics/compare/v3.3.0...v3.3.1) (2018-12-14)


### Bug Fixes

* removing unnecessary dependencies ([6c9b7d3](https://github.com/mselerin/yang-schematics/commit/6c9b7d3))



<a name="3.3.0"></a>
# [3.3.0](https://github.com/mselerin/yang-schematics/compare/v3.2.0...v3.3.0) (2018-11-28)


### Bug Fixes

* no-prompt for routing when generating app ([b3cff31](https://github.com/mselerin/yang-schematics/commit/b3cff31))


### Features

* removing app.session (should be replaced with a real state manager) ([20687ab](https://github.com/mselerin/yang-schematics/commit/20687ab))
* update to schematics 7.1 ([52f4b71](https://github.com/mselerin/yang-schematics/commit/52f4b71))
* using ngx-build-plus to generate the app-manifest.json and expose it as an 'APP_MANIFEST' symbol ([1c2707f](https://github.com/mselerin/yang-schematics/commit/1c2707f))



<a name="3.2.0"></a>
# [3.2.0](https://github.com/mselerin/yang-schematics/compare/v3.1.0...v3.2.0) (2018-10-22)


### Bug Fixes

* app-config.json is not a valid json file ([0e0369c](https://github.com/mselerin/yang-schematics/commit/0e0369c))
* ConfigService & Manifest loading should log error when not found ([1bca802](https://github.com/mselerin/yang-schematics/commit/1bca802))
* default styles for component ([a6a8f0c](https://github.com/mselerin/yang-schematics/commit/a6a8f0c))
* Removing 'multilang' property (unused) ([78b353a](https://github.com/mselerin/yang-schematics/commit/78b353a))


### Features

* Adding ReactiveFormsModule to SharedModule ([bb6af7b](https://github.com/mselerin/yang-schematics/commit/bb6af7b))
* better layout ([3e4841d](https://github.com/mselerin/yang-schematics/commit/3e4841d))
* better layout ([095cab9](https://github.com/mselerin/yang-schematics/commit/095cab9))
* dependencies versions in package.json are no longer fixed, thanks to package-lock.json :-) ([d63683b](https://github.com/mselerin/yang-schematics/commit/d63683b))
* update to Angular 7 ([30588cb](https://github.com/mselerin/yang-schematics/commit/30588cb))



<a name="3.1.0"></a>
# [3.1.0](https://github.com/mselerin/yang-schematics/compare/v3.0.0...v3.1.0) (2018-10-18)


### Bug Fixes

* addImport should add a namedImport if not starting with * ([6c8e951](https://github.com/mselerin/yang-schematics/commit/6c8e951))


### Features

* adding '--prod' flag to the build script ([123bea2](https://github.com/mselerin/yang-schematics/commit/123bea2))
* converting 'initializers' as simple function ([5449e52](https://github.com/mselerin/yang-schematics/commit/5449e52))



<a name="3.0.0"></a>
# [3.0.0](https://github.com/mselerin/yang-schematics/compare/v2.5.0...v3.0.0) (2018-10-17)


### Features

* Add 'src/assets/styles' inside stylePreprocessorOptions ([a0c6f3a](https://github.com/mselerin/yang-schematics/commit/a0c6f3a))
* Adding a brand new Yang Logo ([976b5cd](https://github.com/mselerin/yang-schematics/commit/976b5cd))
* better default application styles & layout ([4ad7085](https://github.com/mselerin/yang-schematics/commit/4ad7085))
* Cleaning ConfigService & Initializer ([56ca71e](https://github.com/mselerin/yang-schematics/commit/56ca71e))
* ConfigService API Change ([7c96516](https://github.com/mselerin/yang-schematics/commit/7c96516))
* enhanced config service ([5544225](https://github.com/mselerin/yang-schematics/commit/5544225))
* expose addSplashItem as a function ([f9432d2](https://github.com/mselerin/yang-schematics/commit/f9432d2))
* Initial build date from the creation date ([f811db7](https://github.com/mselerin/yang-schematics/commit/f811db7))
* Initializers Factory to easily add new initializers class ([1e05232](https://github.com/mselerin/yang-schematics/commit/1e05232))
* Loading with splash text ([fe1765a](https://github.com/mselerin/yang-schematics/commit/fe1765a))
* Yang Logo as favicon ([52608b9](https://github.com/mselerin/yang-schematics/commit/52608b9))


### BREAKING CHANGES

* ConfigService API Change



<a name="2.5.0"></a>
# [2.5.0](https://github.com/mselerin/yang-schematics/compare/v2.4.0...v2.5.0) (2018-10-16)


### Features

* add routing capability to module schematic ([5c65d84](https://github.com/mselerin/yang-schematics/commit/5c65d84))
* extending Angular Schematics for options ([0443466](https://github.com/mselerin/yang-schematics/commit/0443466))



<a name="2.4.0"></a>
# [2.4.0](https://github.com/mselerin/yang-schematics/compare/v2.3.1...v2.4.0) (2018-10-15)


### Bug Fixes

* prebuild.js not included ([e275853](https://github.com/mselerin/yang-schematics/commit/e275853))
* remove unused schematics from collection.json ([1cb37ef](https://github.com/mselerin/yang-schematics/commit/1cb37ef))
* unit test ([aa0c05f](https://github.com/mselerin/yang-schematics/commit/aa0c05f))


### Features

* add default app-manifest.json with ng-new ([04db3a2](https://github.com/mselerin/yang-schematics/commit/04db3a2))
* LoggerService not longer exported (use createLogger() function instead) ([317bd0f](https://github.com/mselerin/yang-schematics/commit/317bd0f))
* options for styles & template read the [@schematics](https://github.com/schematics)/angular:component config values ([0b3d001](https://github.com/mselerin/yang-schematics/commit/0b3d001))



<a name="2.3.0"></a>
# [2.3.0](https://github.com/mselerin/yang-schematics/compare/v2.2.2...v2.3.0) (2018-10-13)


### Features

* Services are now generated inside app/services ([41c5e96](https://github.com/mselerin/yang-schematics/commit/41c5e96))


### BREAKING CHANGES

* Services folder moved from app/core/services to app/services



<a name="2.2.2"></a>
## [2.2.2](https://github.com/mselerin/yang-schematics/compare/v2.2.1...v2.2.2) (2018-10-05)


### Bug Fixes

* FEATURE_ROUTES no longer need in app-routing ([1782a3f](https://github.com/mselerin/yang-schematics/commit/1782a3f))



<a name="2.2.1"></a>
## [2.2.1](https://github.com/mselerin/yang-schematics/compare/v2.2.0...v2.2.1) (2018-09-25)

### Misc
* Dependencies update


<a name="2.2.0"></a>
# [2.2.0](https://github.com/mselerin/yang-schematics/compare/v2.1.0...v2.2.0) (2018-09-07)


### Features

* default value for skip-install = true ([a8a1202](https://github.com/mselerin/yang-schematics/commit/a8a1202))
* setting yang-schematics as default schematic ([405b2c5](https://github.com/mselerin/yang-schematics/commit/405b2c5))



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
