/* eslint-disable no-unused-vars */
export default (schema, models) => {
	schema
		.virtual('fullName').get(function () {
			return this.name.first + ' ' + this.name.last
		})

}
