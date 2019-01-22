const got = require('got')
const mkdir = require('make-dir')
const tar = require('tar')

// Stream and untar the archive, keeping only the requested example
const fetchAndExtract = ({ projectName, example }) =>
	new Promise((resolve, reject) => {
		got
			.stream('https://codeload.github.com/ni742015/bus/tar.gz/master')
			.on('error', reject)
			.pipe(
				tar.extract(
					{
						// Extract to the project name
						cwd: projectName,
						strip: 3
					},
					[
						// We only care about this dir
						`bus-master/examples/${example}`
					]
				)
			)
			.on('error', reject)
			.on('end', () => resolve())
	})

module.exports = function loadExample(opts) {
	const { projectName, example } = opts

	return mkdir(projectName)
		.then(() => fetchAndExtract({ projectName, example }))
}
