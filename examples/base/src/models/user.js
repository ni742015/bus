
module.exports = (schema, models) => {
	schema
		.virtual('fullName').get(function () {
			return this.name.first + ' ' + this.name.last;
		});

}
