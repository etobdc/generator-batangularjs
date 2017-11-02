'use strict';

const Generator = require('yeoman-generator');
const Batangularjs = require('../core');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.args = args;
    this.opts = opts;
  }

  validateArgs() {
    if (this.args.length < 2) {
      this.env.error('Sintax error, you must use the sintax: batangularjs:layout <module> <component> [-t]');
    }
  }

  args() {
    this.module = Batangularjs.camelCase(this.args[0]);
    this.layoutName = Batangularjs.camelCase(this.args[1]);

    this.moduleName = 'app';
    if (this.module !== 'app') {
      this.moduleName += `.${this.module}`;
    }
  }

  folder() {
    let moduleFolder = Batangularjs.kebabCase(this.module.replace('.', '/'));
    this.dest = 'app/';
    if (this.module !== 'app') {
      this.dest += `${moduleFolder}/`;
    }
    if (this.opts.t) {
      this.dest += `layouts/`;
    }
  }

  writing() {
    let fileName = Batangularjs.camelCase(this.layoutName);
    this.fs.copyTpl(
      this.templatePath('layout.html'),
      this.destinationPath(`${this.dest}${fileName}.template.html`)
    );
    this.fs.copyTpl(
      this.templatePath('../../controller/templates/controller.js'),
      this.destinationPath(`${this.dest}${fileName}.controller.js`),
      {
        moduleName: this.moduleName,
        controllerName: Batangularjs.upperCaseFirst(this.layoutName)
      }
    );
  }
};