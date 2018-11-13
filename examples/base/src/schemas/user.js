module.exports = {
	username: {
		type: String,
		example: 'admin',
		unique: true,
		required: true
	},
	password: {
		type: String,
		example: 'admin',
		required: true
	},
}
