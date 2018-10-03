[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/yang-schematics.svg)](https://www.npmjs.com/package/yang-schematics)
[![Build Status](https://travis-ci.org/mselerin/yang-schematics.svg?branch=master)](https://travis-ci.org/mselerin/yang-schematics)

# Yang Schematics
> Yet Another Angular Generator - Powered by Schematics


## Installation
> _(You have pre-installed [node.js](https://nodejs.org/), right ?)_

Install Yang-Schematics using [npm](https://www.npmjs.com/) `npm install -g yang-schematics`.


## Usage
Generate your new project inside any folder:

```bash
ng new my-awesome-project -c yang-schematics
```

This will create a new folder `my-awesome-project` containing a fresh Angular application, powered with the YANG structure. 

Next : install dependencies and run the project :
```bash
cd my-awesome-project
npm install
npm run start
```

Browse to http://localhost:4200.
That's all !


## Schematics

*The default schematics for this project is 'yang-schematics'.  
If you have changed it, don't forget to append `yang-schematics:` before every schematic call.*

### Feature
`ng g feature my-super-feature` (or `ng g f...`)  
Generates a complete feature under app/features.

##### Options
* `--component` : Add a new 'my-super-feature' component. Options from the 'component' schematic are available.


***
### Component
`ng g component my-nice-component` (or `ng g c...`)  
Generates a component under the current directory.

`ng g component shared/my-shared-component`  
Generates a component under `app/shared/components`.

`ng g component my-super-feature/my-feature-component`  
Generates a component under `app/features/my-super-feature/my-feature-component`.



##### Options
* `--styles` : Add a `name.component.scss`
* `--template` : Add a `name.component.html`
* `--flat` : Does not create a sub-folder for the component


***
### Service
`ng g service my-cool-service` (or `ng g s...`)  
Generates a service under app/services.

***
### Directive
`ng g directive my-small-directive` (or `ng g d...`)  
Generates a stub directive under app/shared/directives.

***
### Pipe
`ng g pipe my-nice-pipe` (or `ng g p...`)  
Generates a pipe under app/shared/pipes.



## License
MIT © [Michel Selerin](https://github.com/mselerin)


[npm-image]: https://badge.fury.io/js/yang-schematics.svg
[npm-url]: https://npmjs.org/package/yang-schematics
[travis-image]: https://travis-ci.org/mselerin/yang-schematics.svg?branch=master
[travis-url]: https://travis-ci.org/mselerin/yang-schematics
[daviddm-image]: https://david-dm.org/mselerin/yang-schematics.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/mselerin/yang-schematics
