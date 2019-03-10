import mongoose from 'mongoose'

export default {
	username: {
		type: String,
		example: 'admin', // use for swagger
		unique: true,
		required: true
	},
    name: {
		type: Object,
        first: String,
		last: String,
		example: {
			first: 'haha',
			last: 'hehe',
		}, // use for swagger
		
    },
	role_id: {
		type: mongoose.Types.ObjectId,
		typeSwagger: String, // use for swagger
		example: 'role',
        ref: 'Role'
	},
}
