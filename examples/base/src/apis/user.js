export default ({
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
		@request('GET', '/user')
		@summary('获取用户信息')
		@tag
		@query({
			filter: {
				type: 'string',
				description: 'username filter'
			},
		})
		@responses({
			rows: 'object',
			total: 'number'
		})
		// cover common api 
		static async query(ctx) {
			try {
				const {filter} = ctx.query
				const find = {}
				if(filter) {
					find.name = userModel.regexp(filter)
				}
				const rows = await userModel
					.find(find)
					.paging(ctx.query) // this function is inherit from bus helper
				const total = await userModel.countDocuments(find)
					
				ctx.body = {
					rows,
					total
				}
			} catch (error) {
				throw new ApiError(null, 500, error.message)
			}
		}

		@request('PUT', '/users/{_id}')
		@summary('获取用户信息')
		@tag
		@path({
			_id: {
				type: 'string',
				required: true
			}
		})
		@body(userExample)
		// cover common api 
		static async put(ctx) {
			const { params: {_id}, request: {body}} = ctx
			return userModel.findByIdAndUpdate(_id, body, {new: true})
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
