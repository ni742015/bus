import Model from 'bus-core/model'
import glob from 'glob'
const path = require('path')
const model = new Model()

const paths = glob.sync(path.resolve(__dirname, './!(index.js)'))

for (const path of paths) {
	const name = path.split('/').pop().replace('.js', '')
	const _model = require(`./${name}`).default

	model.add({name, model: _model})
}

export default model
