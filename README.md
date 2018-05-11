[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/mselerin/yang-schematics.svg?branch=master)](https://travis-ci.org/mselerin/yang-schematics)

# Yang Schematics
> Yet Another Angular Generator - Powered by Schematics


## Installation
> _(You have pre-installed [node.js](https://nodejs.org/), right ?)_

Install Yang-Schematics using [yarn](https://yarnpkg.com/) `yarn global add yang-schematics` or using [npm](https://www.npmjs.com/) `npm install -g yang-schematics`.


## Usage
Generate your new project inside any folder:

```bash
ng new my-awesome-project
```

This will create a new folder `my-awesome-project` containing a fresh Angular application.
Just go inside this folder and initialize this project with Yang:
```bash
cd my-awesome-project
ng g yang-schematics:init
```

Next : install dependencies and run the project :
```bash
yarn
yarn start
```

Browse to http://localhost:4200.
That's all !


## Schematics

### Feature
`ng g yang-schematics:feature my-super-feature`
Generates a complete feature under app/features.

##### Options
* `--component` : Add a new 'my-super-feature' component. Options from the 'component' schematic are available.


***
### Component
`ng g yang-schematics:component my-nice-component`  
Generates a component under the current directory.

`ng g yang-schematics:component my-shared-component --shared`  
OR `ng g yang-schematics:component shared/my-shared-component`  
Generates a component under `app/shared/components`.

`ng g yang-schematics:component my-feature-component --feature my-super-feature`  
OR `ng g yang-schematics:component my-super-feature/my-feature-component`  
Generates a component under `app/features/my-super-feature/my-feature-component`.



##### Options
* `--styles` : Add a `name.component.scss`
* `--template` : Add a `name.component.html`
* `--flat` : Does not create a sub-folder for the component


***
### Service
`ng g yang-schematics:service my-cool-service`  
Generates a service under app/services.

***
### Directive
`ng g yang-schematics:directive my-small-directive`  
Generates a stub directive under app/shared/directives.

***
### Pipe
`ng g yang-schematics:directive my-nice-pipe`  
Generates a pipe under app/shared/pipes.


## License
MIT © [Michel Selerin]()


[npm-image]: https://badge.fury.io/js/yang-schematics.svg
[npm-url]: https://npmjs.org/package/yang-schematics
[travis-image]: https://travis-ci.org/mselerin/yang-schematics.svg?branch=master
[travis-url]: https://travis-ci.org/mselerin/yang-schematics
[daviddm-image]: https://david-dm.org/mselerin/yang-schematics.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/mselerin/yang-schematics
