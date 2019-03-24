import Api from 'bus-core/api'
import glob from 'glob'
const path = require('path')
const api = new Api()

const paths = glob.sync(path.resolve(__dirname, './!(index.js)'))

for (const path of paths) {
	const name = path.split('/').pop().replace('.js', '')
	const apiClass = require(`./${name}`).default

	api.add({name, apiClass})
}

export default api
