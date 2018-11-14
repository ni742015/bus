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

class Schema {
	constructor(props = {}) {
		this.onInitSchema = props.onInitSchema
		this.datas = []
	}

	// data {name: '', schema: {}}
	add = (data) => {
		this.datas.push(data)
	}

	init = async () => {
		try {
			let schemas = {}, examples = {}
			// console.log('this.datas', this.datas)

			for (const {name, schema} of this.datas) {
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
				}, schema)

				// hook
				if(this.onInitSchema) {
					let formatedData = await this.onInitSchema(name, data)
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
			console.warn('Init Schemas Error', error)
			throw error
		}
	}
}

module.exports = Schema
