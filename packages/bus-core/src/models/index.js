const mongoose = require('mongoose')
const helpers = require('./helpers')

class Models {
	constructor(props = {}) {
		this.onInitModels = props.onInitModels
		this.datas = []
		this.models = {}
	}

	// data {name: '', model: {}}
	add = (data) => {
		this.datas.push(data)
	}

	init = async ({schemas, hooks}) => {
		try {
			const models = {}

			for (const name in schemas) {
				let Schema = mongoose.Schema(schemas[name], {
					timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' }
				})

				// 用model拓展Schema
				for(const {name: m_name, model} of this.datas) {
					if(name === m_name) {
						model(Schema, models)
					}
				}

				// set staticFuncs
				for (const key in helpers) {
					if (helpers.hasOwnProperty(key)) {
						const { type, func } = helpers[key]
						Schema[type][key] = func
					}
				}

				// hook
				if(hooks.onInitModels) {
					let formatedSchema = await hooks.onInitModels(name, Schema)
					Schema = formatedSchema ? formatedSchema : Schema
				}

				models[name] = mongoose.model(name.replace(/^\S/, s => s.toUpperCase()), Schema)
			}

			this.models = models
			return models
		} catch (error) {
			console.warn('Init Models Error', error)
			throw error
		}
	}
}

module.exports = Models
