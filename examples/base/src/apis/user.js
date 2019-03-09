module.exports = ({
	examples,
	models,
	tag,
	decorator: {
		request,
		summary,
		body,
		middlewares,
		path,
		description,
		query,
		responses
	},
	ApiError,
	ApiErrorNames
}) => {
	const userModel = models.user
	const userExample = examples.user

	class User {
		@request('GET', '/users')
		@summary('获取用户信息')
		@tag
		@query({
			filter: {
				type: 'string',
				description: 'username filter'
			},
		})
		@responses([userExample])
		// cover common api 
		static async query(ctx) {
			const {filter} = ctx.query
			return userModel.like(filter, 'username') // this function is inherit from bus helper
				.then(user => ctx.body = user)
				.catch(err => {
					throw new ApiError(null, 400, err.message)
				})
		}

		@request('PUT', '/users/{_id}')
		@summary('获取用户信息')
		@tag
		@path({
			_id: {
				type: 'ObjectId',
				required: true
			}
		})
		@body(userExample)
		@responses(userExample)
		// cover common api 
		static async put(ctx) {
			const { params: {_id}, request: {body}} = ctx
			return model.findByIdAndUpdate(_id, body, {new: true})
				.then(row => ctx.body = row)
				.catch(err => {
					throw new ApiError(ApiErrorNames.SERVER_ERROR)
				})
		}
	}

	return {
		name: 'user',
		needCommonApi: true, // inherit common api
		ApiClass: User
	}
}
