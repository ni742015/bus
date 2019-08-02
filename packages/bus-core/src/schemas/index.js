const mongoose = require('mongoose')

function exampleForamt(data) {
	const newData = Object.assign({}, data)
	// const newData = _.cloneDeep(data)
	for (const key in newData) {
		if (newData.hasOwnProperty(key)) {
			const item = newData[key]
			// console.log(item);
			if (item.type) {
				// typeSwagger
				item.type = item.typeSwagger || item.type.name.toLowerCase()
			} else {
				item.type = item.name.toLowerCase()
			}
		}
	}
	return newData
}

class Schema {
	constructor(props = {}) {
		this.onInitSchema = props.onInitSchema
		this.datas = []
	}

	// data {name: '', schema: {}}
	add = data => {
		this.datas.push(data)
	}

	init = async ({ hooks }) => {
		let schemas = {},
			examples = {}

		for (const { name, schema } of this.datas) {
			try {
				let data = schema(mongoose, mongoose.Schema)
				// hook
				if (hooks.onInitSchema) {
					let formatedData = await hooks.onInitSchema.call(this, name, data)
					data = formatedData ? formatedData : data
				}
				// console.log('schema name:', name)
				schemas[name] = data
				examples[name] = exampleForamt(data)
			} catch (error) {
				console.warn(`Init Schemas Error: ${name}`, error)
				throw error
			}
		}

		return {
			schemas,
			examples
		}
	}
}

module.exports = Schema
