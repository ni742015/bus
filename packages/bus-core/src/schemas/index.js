function exampleForamt(data) {
	const newData = Object.assign({}, data)
	// const newData = _.cloneDeep(data)
	for (const key in newData) {
		if (newData.hasOwnProperty(key)) {
			const item = newData[key]
			// console.log(item);

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

	init = async ({hooks}) => {
		try {
			let schemas = {}, examples = {}

			for (const {name, schema} of this.datas) {
				let data = Object.assign({
					// creator_name: {
					// 	type: String,
					// },
					// creator_id: {
					// 	type: String,
					// },
					// last_modifier_name: {
					// 	type: String,
					// },
					// last_modifier_id: {
					// 	type: String,
					// },
					created_date: {
						type: Date,
						typeSwagger: 'string',
					},
					updated_date: {
						type: Date,
						typeSwagger: 'string',
					}
				}, schema)

				// hook
				if(hooks.onInitSchema) {
					let formatedData = await hooks.onInitSchema(name, data)
					data = formatedData ? formatedData : data
				}
				// console.log('schema name:', name)
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
