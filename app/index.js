'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var SandboxGulpGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies({
          callback: function () {
            this.spawnCommand('sh', ['bitbucket.sh']);
          }.bind(this) // bind the callback to the parent scope
        });
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Sandbox Gulp generator!'));

    var prompts = [{
      name: 'projectName',
      message: 'Enter the project name:',
      default: this.env.cwd.split('/').slice(-1)[0]
    }];

    this.prompt(prompts, function(props) {
      this.projectName = props.projectName;

      done();
    }.bind(this));

  },

  app: function () {

    this.directory('html');
    this.directory('css');

    this.mkdir('js');
    this.mkdir('libs');

    this.template('_template.html', 'html/template.html');
  },

  projectfiles: function () {
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('_bitbucket.sh', 'bitbucket.sh');
    this.template('_sandbox.sublime-project', this.projectName + '.sublime-project');
    this.template('_LICENSE.md', 'LICENSE.md');
    this.template('_README.md', 'README.md');

    this.copy('gulpfile.js');
    this.copy('.bowerrc');
    this.copy('.gitignore');
  }
});

module.exports = SandboxGulpGenerator;
