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
		needCommonApi: true,
		ApiClass: class User {
			
		}
	}
}
