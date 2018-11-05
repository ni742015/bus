const mongoose = require('../utils/mongodb')
const helpers = require('./helpers')

module.exports = async function(paths) {
	const schema = this.schema
	const models = {}
	const onInitModels = this.onInitModels

	for (const name in schema) {
		let Schema = mongoose.Schema(schema[name], {
			timestamps: { createdAt: 'created_date', updatedAt: 'updated_date' }
		})

		for(const path of paths) {
			if(new RegExp(`${name}\\.(t|j)s$`).test(path)) {
				const modelExtend = require(path)
				modelExtend(Schema, models)
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
		if(onInitModels) {
			let formatedSchema = await onInitModels(name, Schema)
			Schema = formatedSchema ? formatedSchema : Schema
		}

		models[name] = mongoose.model(name.replace(/^\S/, s => s.toUpperCase()), Schema)
	}

	return Object.create(models)
}
