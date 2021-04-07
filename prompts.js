module.exports = [
  {
    name: 'baseUrl',
    type: "input",
    message: "專案路徑(base url), ex: /202104_project-name:",
    validate: input => input.startsWith('/'),
    default: "/"
  }
]