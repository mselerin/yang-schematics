# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [4.2.0](https://github.com/mselerin/yang-schematics/compare/v4.1.1...v4.2.0) (2021-01-20)


### 🐛 Bug Fixes

* modules inside shared should be in its own 'modules' folder (like components, directives and pipes) ([3a6d3af](https://github.com/mselerin/yang-schematics/commit/3a6d3af735a50fba2e37447e792e23af9aff3a98))
* modules inside shared should only import the BaseModule ([f80837d](https://github.com/mselerin/yang-schematics/commit/f80837dda6fce39f17b68a641fa1e8a3c93b2797))


### 🚀 Features

* switching from `ngx-build-plus` to `@angular-builders/custom-webpack` ([dbea75c](https://github.com/mselerin/yang-schematics/commit/dbea75c2df4fe56e155288708e996e62413733e1))
* **component:** allow global configuration for flat and skipImport parameters ([c1f95b1](https://github.com/mselerin/yang-schematics/commit/c1f95b149cf4d7face3e8721a51f9c0e9212befb))
* **directive:** allow global configuration for flat and skipImport parameters ([fb93b9b](https://github.com/mselerin/yang-schematics/commit/fb93b9ba4f2a87101de9e2e54ca3c8a8a3ed4d97))
* **pipe:** allow global configuration for flat and skipImport parameters ([d68122b](https://github.com/mselerin/yang-schematics/commit/d68122b07f616becdf4a3eecc14ea34683254548))
* **service:** allow global configuration for flat and skipImport parameters ([271bc4e](https://github.com/mselerin/yang-schematics/commit/271bc4ed59c6579eb27fb48b2149b4f2ddcb9ff9))
* allow the creation of a component when creating a new module ([03f2685](https://github.com/mselerin/yang-schematics/commit/03f2685a758d0efbf5db234c12b970ac01ad75ac))

### [4.1.1](https://github.com/mselerin/yang-schematics/compare/v4.1.0...v4.1.1) (2020-11-14)


### 🐛 Bug Fixes

* **jest:** removing all Karma dependencies ([6c402f5](https://github.com/mselerin/yang-schematics/commit/6c402f5cb24c17677c378d42b6694c7bd5a08870))

## [4.1.0](https://github.com/mselerin/yang-schematics/compare/v4.0.0...v4.1.0) (2020-11-12)


### 🚀 Features

* update to Angular 11 ([038da16](https://github.com/mselerin/yang-schematics/commit/038da16288ea0aa246b71d3322614554042d3129))

## [4.0.0](https://github.com/mselerin/yang-schematics/compare/v3.9.0...v4.0.0) (2020-07-17)


### ⚠ BREAKING CHANGES

* generating a new feature now create a component by default
* The component options 'style' & 'template' are removed in favor of 'inlineStyle' & 'inlineTmplate' (from Angular)
    
### 🔧 Refactor

* changing default values & options for inline-style (false) + inline-template (true) ([c6ad724](https://github.com/mselerin/yang-schematics/commit/c6ad724d49f5e2e618b31ee4719f1ed9dc535ca0))
* Merge pull request #24 from mselerin/chore/clean-options ([68f0c55](https://github.com/mselerin/yang-schematics/commit/68f0c552a1701da3c0ae14a9793e6c330d7077bd)), closes [#24](https://github.com/mselerin/yang-schematics/issues/24)


### 🚀 Features

* adding a BaseModule for the AppComponent & Layouts ([e7f50b7](https://github.com/mselerin/yang-schematics/commit/e7f50b7a4ae3c4a7dddbab35c342f7f0a151c587))
* create a component by default with features ([b2136ab](https://github.com/mselerin/yang-schematics/commit/b2136ab58ec72ad9e59c47fea7337979f701ce3e))
* new i18n schematic + removing ngx-translate from the init schematic ([16bf926](https://github.com/mselerin/yang-schematics/commit/16bf9261d074a60522076887b0afb4833c3a29b9))


### 🐛 Bug Fixes

* all options from ng-new should be passed to the original schematic ([240466d](https://github.com/mselerin/yang-schematics/commit/240466d8b3b5e84b40639dcbba51f1a5031ea7e6))
* logger service compatible with strict mode ([fcc9540](https://github.com/mselerin/yang-schematics/commit/fcc9540284d56cdbc2243e739f9015b49a4482cc))
* smart path for generating elements ([b4c3129](https://github.com/mselerin/yang-schematics/commit/b4c3129f3a4008ad3a2539f85ed0c44f0b10509b))

## [3.9.0](https://github.com/mselerin/yang-schematics/compare/v3.8.1...v3.9.0) (2020-07-08)


### 🚀 Features

* Angular 10 compatibility ([ec70573](https://github.com/mselerin/yang-schematics/commit/ec705738753dd0d7f625b489280ecd31070822b7))

### [3.8.1](https://github.com/mselerin/yang-schematics/compare/v3.8.0...v3.8.1) (2020-02-14)


### 🐛 Bug Fixes

* 'inlineStyles' and 'inlineTemplate' config inside angular.json are ignored ([3a95ed9](https://github.com/mselerin/yang-schematics/commit/3a95ed9aaf5b2d33b4343a46050e82a7cb9efb79))

## [3.8.0](https://github.com/mselerin/yang-schematics/compare/v3.7.0...v3.8.0) (2020-02-07)


### 🚀 Features

* upgrade deps for Angular 9 ([4cf42dd](https://github.com/mselerin/yang-schematics/commit/4cf42ddf2708404859bfc988d4727347112d03ac))
* **jest:** add '@testing-library/jest-dom' with the jest schematics ([426effd](https://github.com/mselerin/yang-schematics/commit/426effddcd23981c5e1233193c7f925475cb6a4c))


### 🐛 Bug Fixes

* jest roots should point to 'src' ([4edd615](https://github.com/mselerin/yang-schematics/commit/4edd61592dc8d51b774cc372d6ef91877fbd93e1))
* padding for the main container should be '1rem' all around ([50c5a26](https://github.com/mselerin/yang-schematics/commit/50c5a26a684800496b64cd2e21886fd2780c949b))
* prevent 'addSplashItem' to throw an exception during unit-test ([12f9441](https://github.com/mselerin/yang-schematics/commit/12f94415ad130c99fdde7a54406a647b4dc811b5))
* using "manifest.name" in the footer ([98904dc](https://github.com/mselerin/yang-schematics/commit/98904dcd7a693014e3e14e68639e2d04d948607a))

## [3.7.0](https://github.com/mselerin/yang-schematics/compare/v3.6.0...v3.7.0) (2019-10-04)


### 🐛 Bug Fixes

* dependencies sorted by keys after initialization ([61b5a0d](https://github.com/mselerin/yang-schematics/commit/61b5a0d))
* e2e generation ([5672c0a](https://github.com/mselerin/yang-schematics/commit/5672c0a))
* no longer need for a special spec.ts for component ([df81125](https://github.com/mselerin/yang-schematics/commit/df81125))
* unit-test for init schematic ([2690dc0](https://github.com/mselerin/yang-schematics/commit/2690dc0))


### 🚀 Features

* add Jest Schematic ([15a447f](https://github.com/mselerin/yang-schematics/commit/15a447f))
* add proxy schematics ([aefa41c](https://github.com/mselerin/yang-schematics/commit/aefa41c))

## [3.6.0](https://github.com/mselerin/yang-schematics/compare/v3.5.2...v3.6.0) (2019-10-02)


### 🐛 Bug Fixes

* code indentation managed inside CodeUtils ([e71ceaf](https://github.com/mselerin/yang-schematics/commit/e71ceaf))
* fixed lint and tests ([397f9ae](https://github.com/mselerin/yang-schematics/commit/397f9ae))
* using Buffer.from() instead of new Buffer() ([8bc5279](https://github.com/mselerin/yang-schematics/commit/8bc5279))
* using CodeUtils.readSourceFile instead of CodeUtils.getSourceFile ([338132d](https://github.com/mselerin/yang-schematics/commit/338132d))


### 🚀 Features

* using ts-morph instead of ts-simple-ast ([166ffd3](https://github.com/mselerin/yang-schematics/commit/166ffd3))

### [3.5.2](https://github.com/mselerin/yang-schematics/compare/v3.5.1...v3.5.2) (2019-10-01)


### 🐛 Bug Fixes

* app declaration inside ConfigService ([a49c3cc](https://github.com/mselerin/yang-schematics/commit/a49c3cc))



## [3.5.1](https://github.com/mselerin/yang-schematics/compare/v3.5.0...v3.5.1) (2019-07-15)

### 🔧 Misc

* Update ngx-build-plus to 8.1.x


## [3.5.0](https://github.com/mselerin/yang-schematics/compare/v3.4.2...v3.5.0) (2019-06-04)


### 🐛 Bug Fixes

* do not import HttpClientModule inside SharedModule ([afd7ac4](https://github.com/mselerin/yang-schematics/commit/afd7ac4))
* unit test with runSchematicAsync ([613baed](https://github.com/mselerin/yang-schematics/commit/613baed))


### 🚀 Features

* Angular 8 lazy-loading syntax ([27cadb4](https://github.com/mselerin/yang-schematics/commit/27cadb4))
* Moving styles from src/assets/styles to src/styles ([eac82f3](https://github.com/mselerin/yang-schematics/commit/eac82f3))



## [3.4.2](https://github.com/mselerin/yang-schematics/compare/v3.4.1...v3.4.2) (2019-02-21)


### 🐛 Bug Fixes

* removing temp fix for https://github.com/manfredsteyer/ngx-build-plus/issues/70 is resolved ([c8c5f5a](https://github.com/mselerin/yang-schematics/commit/c8c5f5a))



<a name="3.4.1"></a>
## [3.4.1](https://github.com/mselerin/yang-schematics/compare/v3.4.0...v3.4.1) (2019-02-12)


### 🐛 Bug Fixes

* temp fix until https://github.com/manfredsteyer/ngx-build-plus/issues/70 is resolved ([d55309a](https://github.com/mselerin/yang-schematics/commit/d55309a))



<a name="3.4.0"></a>
# [3.4.0](https://github.com/mselerin/yang-schematics/compare/v3.3.2...v3.4.0) (2019-02-04)


### 🚀 Features

* move dependencies outside of code & remove rxjs-compat ([09a8d67](https://github.com/mselerin/yang-schematics/commit/09a8d67))
* update to @angular/cli 7.3.0


<a name="3.3.2"></a>
## [3.3.2](https://github.com/mselerin/yang-schematics/compare/v3.3.1...v3.3.2) (2018-12-14)


### 🐛 Bug Fixes

* removing .npmrc with save-exact (not needed anymore with package-lock.json) ([0f19f15](https://github.com/mselerin/yang-schematics/commit/0f19f15))



<a name="3.3.1"></a>
## [3.3.1](https://github.com/mselerin/yang-schematics/compare/v3.3.0...v3.3.1) (2018-12-14)


### 🐛 Bug Fixes

* removing unnecessary dependencies ([6c9b7d3](https://github.com/mselerin/yang-schematics/commit/6c9b7d3))



<a name="3.3.0"></a>
# [3.3.0](https://github.com/mselerin/yang-schematics/compare/v3.2.0...v3.3.0) (2018-11-28)


### 🐛 Bug Fixes

* no-prompt for routing when generating app ([b3cff31](https://github.com/mselerin/yang-schematics/commit/b3cff31))


### 🚀 Features

* removing app.session (should be replaced with a real state manager) ([20687ab](https://github.com/mselerin/yang-schematics/commit/20687ab))
* update to schematics 7.1 ([52f4b71](https://github.com/mselerin/yang-schematics/commit/52f4b71))
* using ngx-build-plus to generate the app-manifest.json and expose it as an 'APP_MANIFEST' symbol ([1c2707f](https://github.com/mselerin/yang-schematics/commit/1c2707f))



<a name="3.2.0"></a>
# [3.2.0](https://github.com/mselerin/yang-schematics/compare/v3.1.0...v3.2.0) (2018-10-22)


### 🐛 Bug Fixes

* app-config.json is not a valid json file ([0e0369c](https://github.com/mselerin/yang-schematics/commit/0e0369c))
* ConfigService & Manifest loading should log error when not found ([1bca802](https://github.com/mselerin/yang-schematics/commit/1bca802))
* default styles for component ([a6a8f0c](https://github.com/mselerin/yang-schematics/commit/a6a8f0c))
* Removing 'multilang' property (unused) ([78b353a](https://github.com/mselerin/yang-schematics/commit/78b353a))


### 🚀 Features

* Adding ReactiveFormsModule to SharedModule ([bb6af7b](https://github.com/mselerin/yang-schematics/commit/bb6af7b))
* better layout ([3e4841d](https://github.com/mselerin/yang-schematics/commit/3e4841d))
* better layout ([095cab9](https://github.com/mselerin/yang-schematics/commit/095cab9))
* dependencies versions in package.json are no longer fixed, thanks to package-lock.json :-) ([d63683b](https://github.com/mselerin/yang-schematics/commit/d63683b))
* update to Angular 7 ([30588cb](https://github.com/mselerin/yang-schematics/commit/30588cb))



<a name="3.1.0"></a>
# [3.1.0](https://github.com/mselerin/yang-schematics/compare/v3.0.0...v3.1.0) (2018-10-18)


### 🐛 Bug Fixes

* addImport should add a namedImport if not starting with * ([6c8e951](https://github.com/mselerin/yang-schematics/commit/6c8e951))


### 🚀 Features

* adding '--prod' flag to the build script ([123bea2](https://github.com/mselerin/yang-schematics/commit/123bea2))
* converting 'initializers' as simple function ([5449e52](https://github.com/mselerin/yang-schematics/commit/5449e52))



<a name="3.0.0"></a>
# [3.0.0](https://github.com/mselerin/yang-schematics/compare/v2.5.0...v3.0.0) (2018-10-17)


### 🚀 Features

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


### ⚠ BREAKING CHANGES

* ConfigService API Change



<a name="2.5.0"></a>
# [2.5.0](https://github.com/mselerin/yang-schematics/compare/v2.4.0...v2.5.0) (2018-10-16)


### 🚀 Features

* add routing capability to module schematic ([5c65d84](https://github.com/mselerin/yang-schematics/commit/5c65d84))
* extending Angular Schematics for options ([0443466](https://github.com/mselerin/yang-schematics/commit/0443466))



<a name="2.4.0"></a>
# [2.4.0](https://github.com/mselerin/yang-schematics/compare/v2.3.1...v2.4.0) (2018-10-15)


### 🐛 Bug Fixes

* prebuild.js not included ([e275853](https://github.com/mselerin/yang-schematics/commit/e275853))
* remove unused schematics from collection.json ([1cb37ef](https://github.com/mselerin/yang-schematics/commit/1cb37ef))
* unit test ([aa0c05f](https://github.com/mselerin/yang-schematics/commit/aa0c05f))


### 🚀 Features

* add default app-manifest.json with ng-new ([04db3a2](https://github.com/mselerin/yang-schematics/commit/04db3a2))
* LoggerService not longer exported (use createLogger() function instead) ([317bd0f](https://github.com/mselerin/yang-schematics/commit/317bd0f))
* options for styles & template read the [@schematics](https://github.com/schematics)/angular:component config values ([0b3d001](https://github.com/mselerin/yang-schematics/commit/0b3d001))



<a name="2.3.0"></a>
# [2.3.0](https://github.com/mselerin/yang-schematics/compare/v2.2.2...v2.3.0) (2018-10-13)


### 🚀 Features

* Services are now generated inside app/services ([41c5e96](https://github.com/mselerin/yang-schematics/commit/41c5e96))


### ⚠ BREAKING CHANGES

* Services folder moved from app/core/services to app/services



<a name="2.2.2"></a>
## [2.2.2](https://github.com/mselerin/yang-schematics/compare/v2.2.1...v2.2.2) (2018-10-05)


### 🐛 Bug Fixes

* FEATURE_ROUTES no longer need in app-routing ([1782a3f](https://github.com/mselerin/yang-schematics/commit/1782a3f))



<a name="2.2.1"></a>
## [2.2.1](https://github.com/mselerin/yang-schematics/compare/v2.2.0...v2.2.1) (2018-09-25)

### 🔧 Misc
* Dependencies update


<a name="2.2.0"></a>
# [2.2.0](https://github.com/mselerin/yang-schematics/compare/v2.1.0...v2.2.0) (2018-09-07)


### 🚀 Features

* default value for skip-install = true ([a8a1202](https://github.com/mselerin/yang-schematics/commit/a8a1202))
* setting yang-schematics as default schematic ([405b2c5](https://github.com/mselerin/yang-schematics/commit/405b2c5))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/mselerin/yang-schematics/compare/v2.0.0...v2.1.0) (2018-08-31)


### 🚀 Features

* app-layout directly inside app-root ([bc5786d](https://github.com/mselerin/yang-schematics/commit/bc5786d))
* Moving layout outside features ([a851f35](https://github.com/mselerin/yang-schematics/commit/a851f35))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/mselerin/yang-schematics/compare/v1.2.2...v2.0.0) (2018-06-26)


### 🐛 Bug Fixes

* array types (any[]) ([5b0b932](https://github.com/mselerin/yang-schematics/commit/5b0b932))
* component name not required (passed as first argument is OK) ([3c48940](https://github.com/mselerin/yang-schematics/commit/3c48940))
* Creating feature/module/component inside other feature/module ([#2](https://github.com/mselerin/yang-schematics/issues/2)) ([d161d81](https://github.com/mselerin/yang-schematics/commit/d161d81))
* service schematic aware of project / lib ([904326d](https://github.com/mselerin/yang-schematics/commit/904326d))
* SharedModule should be imported inside AppModule ([f105461](https://github.com/mselerin/yang-schematics/commit/f105461))
* unit test for component should use NO_ERROR_SCHEMA and not import modules ([7722c27](https://github.com/mselerin/yang-schematics/commit/7722c27))
* yang-schematics should extends angular-schematics ([bd5b7a5](https://github.com/mselerin/yang-schematics/commit/bd5b7a5))


### 🔧 Refactoring

* Routes constant name inside feature is now 'ROUTES' ([6463e68](https://github.com/mselerin/yang-schematics/commit/6463e68))


### 🚀 Features

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


### 🔧 Reverts

* extends ([fade034](https://github.com/mselerin/yang-schematics/commit/fade034))


### ⚠ BREAKING CHANGES

* Routes constant name inside feature is now 'ROUTES'
* yang-schematics now extends angular-schematics



<a name="1.2.2"></a>
## [1.2.2](https://github.com/mselerin/yang-schematics/compare/v1.2.1...v1.2.2) (2018-05-18)


### 🐛 Bug Fixes

* add project options in every schematics to be compatible with the Angular's Schematics ([0198e2c](https://github.com/mselerin/yang-schematics/commit/0198e2c))
* travis build ([fa37b9e](https://github.com/mselerin/yang-schematics/commit/fa37b9e))


### 🔧 Misc
* add unit-tests for every schematics
* add project option for every schematics to be compliant with @schematics/angular 


<a name="1.2.1"></a>
## [1.2.1](https://github.com/mselerin/yang-schematics/compare/v1.2.0...v1.2.1) (2018-05-17)


### 🐛 Bug Fixes

* default directory for ng-new ([6e9e92e](https://github.com/mselerin/yang-schematics/commit/6e9e92e))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/mselerin/yang-schematics/compare/v1.1.1...v1.2.0) (2018-05-16)


### 🐛 Bug Fixes

* correctly update environment.ts files ([f04ba1e](https://github.com/mselerin/yang-schematics/commit/f04ba1e))


### 🚀 Features

* ng-new schematics
([fb0b543](https://github.com/mselerin/yang-schematics/commit/fb0b543), [166e20f](https://github.com/mselerin/yang-schematics/commit/166e20f), [553a0d7](https://github.com/mselerin/yang-schematics/commit/553a0d7))



<a name="1.1.1"></a>
## [1.1.1](https://github.com/mselerin/yang-schematics/compare/v1.1.0...v1.1.1) (2018-05-14)


### 🐛 Bug Fixes

* Adding yang-schematics in package.json inside init schematic ([b9a680e](https://github.com/mselerin/yang-schematics/commit/b9a680e))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/mselerin/yang-schematics/compare/v1.0.3...v1.1.0) (2018-05-11)


### 🚀 Features

* add 'route' option for component generation ([3306d60](https://github.com/mselerin/yang-schematics/commit/3306d60))



<a name="1.0.3"></a>
## [1.0.3](https://github.com/mselerin/yang-schematics/compare/v1.0.2...v1.0.3) (2018-05-11)


### 🐛 Bug Fixes

* no home route from init ([d08e86e](https://github.com/mselerin/yang-schematics/commit/d08e86e))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/mselerin/yang-schematics/compare/v1.0.1...v1.0.2) (2018-05-11)


### 🐛 Bug Fixes

* removed header and footer component in layout module ([8abd5c4](https://github.com/mselerin/yang-schematics/commit/8abd5c4))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/mselerin/yang-schematics/compare/v1.0.0...v1.0.1) (2018-05-11)


### 🐛 Bug Fixes

* unit test ([f743736](https://github.com/mselerin/yang-schematics/commit/f743736))
* yarnrc not needed anymore ([d81e00b](https://github.com/mselerin/yang-schematics/commit/d81e00b))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/mselerin/yang-schematics/compare/v0.1.1...v1.0.0) (2018-05-11)



<a name="0.1.1"></a>
## [0.1.1](https://github.com/mselerin/yang-schematics/compare/v0.1.0...v0.1.1) (2018-05-11)


### 🐛 Bug Fixes

* devDependencies ([bbd48d5](https://github.com/mselerin/yang-schematics/commit/bbd48d5))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/mselerin/yang-schematics/compare/v0.0.1...v0.1.0) (2018-05-11)


### 🚀 Features

* add ng-add schematic ([6f87bb1](https://github.com/mselerin/yang-schematics/commit/6f87bb1))



<a name="0.0.1"></a>
## [0.0.1](https://github.com/mselerin/yang-schematics/compare/f3925a4...v0.0.1) (2018-05-10)

> Initial release

### 🐛 Bug Fixes

* force overwrite ([94bdd78](https://github.com/mselerin/yang-schematics/commit/94bdd78))


### 🚀 Features

* directive, pipe and service ([b7934d9](https://github.com/mselerin/yang-schematics/commit/b7934d9))
* feature and component ([f3925a4](https://github.com/mselerin/yang-schematics/commit/f3925a4))
* merging header and footer inside layout ([760b748](https://github.com/mselerin/yang-schematics/commit/760b748))
* new application ([4ed1924](https://github.com/mselerin/yang-schematics/commit/4ed1924))
* using [@schematics/angular](https://github.com/angular/devkit) for component, service, directive and pipe ([62c4368](https://github.com/mselerin/yang-schematics/commit/62c4368))
