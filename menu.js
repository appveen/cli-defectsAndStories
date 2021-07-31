const inquirer = require("inquirer");
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

var e = {}

e.select = async (message, options) => {
	options.splice(options.length - 1 , 0, new inquirer.Separator(), );
  let response = await inquirer.prompt([{ type: 'list', name: 'mode', message: message, choices: options }])
  return response.mode
};

e.question = async (message) => {
  let response = await inquirer.prompt([{ type: 'input', name: 'mode', message: message}])
  return response.mode
};

e.password = async (message) => {
  let response = await inquirer.prompt([{ type: 'password', name: 'mode', message: message}])
  return response.mode
};

e.autocomplete = async (message, options) => {
  options = options.sort();
  let response = await inquirer.prompt([{
    type: 'autocomplete',
    name: 'mode',
    message: message,
    pageSize: 5,
    source: (_ans, _input) => {
      _input = _input || '';
      return new Promise(_res => _res(options.filter(_n => _n.indexOf(_input) > -1)));
    }
  }])
  return response.mode
};

module.exports = e;