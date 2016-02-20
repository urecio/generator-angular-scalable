# generator-angular-scalable [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Scaffolding for large apps

## Installation

First, install [Yeoman](http://yeoman.io) and generator-angular-scalable using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-angular-scalable
```

Then generate your new project:

```bash
yo angular-scalable
```

Available subgenerators:

```bash
yo angular-scalable:module
yo angular-scalable:controller
yo angular-scalable:directive
yo angular-scalable:view
yo angular-scalable:filter
yo angular-scalable:factory
yo angular-scalable:service
yo angular-scalable:stylesheet
```

## Directory organisation

```
- app
   / assets
   / common
       / app
   / components
       / component1
           / component1.module.js
           / component1.module.spec.js
           / styles
                / module.styles
                    / component1.scss (stylesheet)
                    / imports (components stylesheets)
                        / component1.scss (stylesheet)
                   / controllers
                      / component.controller.js
                      / component.controller.spec.js
                   / directives
                      / component.directive.js
                      / component.directive.spec.js
                   / services
                      / component.service.js
                      / component.service.spec.js
                   / views
                      / component.view.html
   / Test
      / karma.conf.js
      / coverage
```

## Some features

### Working with different APIS

There is a grunt task to setup a constant with the base url of those APIs, so that you can run:
- `grunt ngconstant:dev` to work with your alpha API
- `grunt ngconstant:beta` to work with your beta API
- Or `grunt serve:dev` to serve directly with that API

### Extra options

* Bootstrap
* Protractor

### Other notes

- When you create a module with styles, it will update the `includeSourceFiles` variable in the Gruntfile. This is to automatically include sub partials into the main stylesheet of the module using `grunt includeSources`. If you manually remove a module, you should also remove it from this variable, otherwise the task will attemp to create the file.

## Getting To Know Yeoman

Yeoman has a heart of gold. He&#39;s a person with feelings and opinions, but he&#39;s very easy to work with. If you think he&#39;s too opinionated, he can be easily convinced. Feel free to [learn more about him](http://yeoman.io/).

## License

BSD-2-Clause-FreeBSD © [Unai Recio](mydeveloperlife.com)


[npm-image]: https://badge.fury.io/js/generator-angular-scalable.svg
[npm-url]: https://npmjs.org/package/generator-angular-scalable
[daviddm-image]: https://david-dm.org/urecio/generator-angular-scalable.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/urecio/generator-angular-scalable
