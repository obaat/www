module.exports = function (plop) {
  // controller generator
  plop.setGenerator('component', {
    description: 'new component',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'component name please'
    }],
    actions: [{
        type: 'add',
        path: 'src/{{name}}.js',
        templateFile: 'src/templates/component.hbs'
    }]
  });
};
