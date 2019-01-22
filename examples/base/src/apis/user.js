module.exports = ({
	example,
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


	return {
		name: 'user',
		needCommonApi: true, // inherit common api
		ApiClass: class User {
			@request('GET', '/users')
			@summary('获取用户信息')
			@tag
			@query({
				filter: {
					type: 'string',
					description: 'username filter'
				},
			})
			// cover common api 
			static async query(ctx) {
				const {filter} = ctx.query
				return models.user.like(filter, 'username') // like function is inherit from bus helper
					.then(user => ctx.body = user)
					.catch(err => {
						throw new ApiError(null, 400, err.message)
					})
			}
		}
	}
}
