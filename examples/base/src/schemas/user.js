const mongoose = require('mongoose')

module.exports = {
	username: {
		type: String,
		example: 'admin', // use for swagger
		unique: true,
		required: true
	},
    name: {
		type: Object,
        first: String,
        last: String
    },
	role_id: {
		type: mongoose.Types.ObjectId,
		typeSwagger: String, // use for swagger
		example: 'role',
        ref: 'Role'
	},
}
