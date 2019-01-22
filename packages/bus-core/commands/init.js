const { prompt } = require('inquirer')
const loadExample = require('../utils/load-example')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')

let tplList = require(`${__dirname}/tpl.json`)

const question = [
	{
		type: 'input',
		name: 'name',
		message: 'Template name:(base default)',
		validate (val) {
			if (tplList[val] || val === '') {
				return true
			} else if (!tplList[val]) {
				return 'This template doesn\'t exists.'
			}
		}
	},
	{
		type: 'input',
		name: 'project',
		message: 'Project name:',
		validate (val) {
			if (val !== '') {
				return true
			}
			return 'Project name is required!'
		}
	}
]

module.exports = prompt(question).then(({ name = 'base', project }) => {

	const spinner = ora('Downloading template...')

	spinner.start()

	return loadExample({projectName: project, example: name})
		.then(() => {
			spinner.stop()
	  	console.log(chalk.green('New project has been initialized successfully!'))
		})
		.catch(err => {
	  	console.log(chalk.red(`Error downloading: ${err.message}`))
		})

})
