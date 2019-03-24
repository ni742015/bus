import bus from '../index.js'

export default ({
	examples,
	models,
	tag,
	decorator: {
		request,
		summary,
		body,
		// middlewares,
		// path,
		// description,
		query,
		responses
	},
	ApiError,
	ApiErrorNames
}) => {
	const userModel = models.user
	const userExample = examples.user

	class User {
		@request('POST', '/user/login')
		@summary('login api')
		@tag
		@body({
			username: {
				type: 'string',
				description: 'username'
			},
			password: {
				type: 'string',
				description: 'password'
			},
		})
		static async login(ctx) {
			const {username, password} = ctx.request.body
			const user = await userModel.findOne({username, password})

			if(user) {
				let data = {fullName: user.fullName}
				let token = bus.Token.create(data, '30d')

				ctx.body = {
					user: data,
					token
				}
			} else {
				throw new ApiError(ApiErrorNames.RESOURCES_EXIST)

			}
		}

		@request('POST', '/user/register')
		@summary('register api')
		@tag
		@body(userExample)
		@responses(userExample)
		static async register(ctx) {
			return userModel(ctx.request.body).save() // just for demo, never save user.password without encrypt
				.then(user => ctx.body = user)
				.catch(err => {
					throw new ApiError(null, 500, err.message)
				})
		}

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

	}

	return {
		commonApiConfig: { // inherit common api
			name: '用户',
		},
		ApiClass: User
	}
}
