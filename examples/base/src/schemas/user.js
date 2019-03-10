// import mongoose from 'mongoose'

export default {
	username: {
		type: String,
		example: 'admin', // use for swagger
		unique: true,
		required: true
	},
	password: {
		type: String,
	},
    name: {
		type: Object,
        first: String,
		last: String,
		example: { // use for swagger
			first: 'haha',
			last: 'hehe',
		},
    },
	// role_id: {
	// 	type: mongoose.Types.ObjectId,
	// 	typeSwagger: String, // use for swagger
	// 	example: 'role',
    //     ref: 'Role'
	// },
}
