const glob = require('glob')
const path = require('path')

function exampleForamt(data) {
	const newData = Object.assign({}, data)
	// const newData = _.cloneDeep(data)
	for (const key in newData) {
		if (newData.hasOwnProperty(key)) {
			const item = newData[key]
			// typeSwagger
			item.type = item.typeSwagger || item.type.name.toLowerCase()
		}
	}
	return newData
}

async function Schema(paths, field) {
	try {
		const schemas = {}
		const examples = {}
		const onInitSchema = this.onInitSchema

		console.log('paths', process.cwd())

		for (const path of paths) {
			const name = path.split('/').pop().replace('.js', '')
			const schemaData = require(`../${field}/${name}.js`)

			let data = Object.assign({
				creator_name: {
					type: String,
				},
				creator_id: {
					type: String,
				},
				last_modifier_name: {
					type: String,
				},
				last_modifier_id: {
					type: String,
				},
				created_date: {
					type: Date,
				},
				updated_date: {
					type: Date,
				}
			}, schemaData)

			// hook
			if(onInitSchema) {
				let formatedData = await onInitSchema(name, data)
				data = formatedData ? formatedData : data
			}

			schemas[name] = data
			examples[name] = exampleForamt(data)

		}

		return {
			schemas,
			examples
		}
	} catch (error) {
		console.warn(error)

	}

}

module.exports = Schema
