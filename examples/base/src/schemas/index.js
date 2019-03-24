import Schema from 'bus-core/schema'
import glob from 'glob'
const path = require('path')
const schema = new Schema()

const paths = glob.sync(path.resolve(__dirname, './!(index.js)'))

for (const path of paths) {
	const name = path.split('/').pop().replace('.js', '')
	const _schema = require(`./${name}`).default

	schema.add({name, schema: _schema})
}

export default schema
