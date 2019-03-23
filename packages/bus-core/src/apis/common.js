module.exports = ({
	example,
	model,
	tag,
	info: {
		pathname,
		name,
		baseUrl
	},
	decorator: {
		request,
		summary,
		body,
		// middlewares,
		path,
		description,
		query,
		responses
	},
	// ApiError,
	// ApiErrorNames
}) => {
	// let lowcase_pathname = pathname.replace(/[A-Z]/, str => `_${str.toLowerCase()}`)
	let lowcase_pathname = baseUrl || pathname.replace(/[A-Z]/, str => str.toLowerCase())

	function rename(target) {
		if(target.name !== pathname) {
			Object.defineProperty(target, 'name', {get(){
				return pathname.replace(/^[a-z]/, (str) => str.toUpperCase())
			}})
		}
	}
	class Common {
		@rename
		static test() {}

		@rename
		@request('GET', `/${lowcase_pathname}/{_id}`)
		@summary(`获取${name}详情`)
		@description('_id不能为空')
		@tag
		@path({
			_id: {
				type: 'string',
				required: true
			}
		})
		@responses(example)
		static async get(ctx) {
			const {_id} = ctx.params

			return model
				.findById({_id})
				.then(row => {
					ctx.body = row
				})
		}


		@rename
		@request('GET', `/${lowcase_pathname}`)
		@summary(`获取${name}列表`)
		@tag
		@query({
			page: {
				type: 'number',
				require: true,
				description: '页码'
			},
			page_count: {
				type: 'number',
				require: true,
				description: '页数'
			},
			filter: {
				type: 'string',
				description: '过滤条件'
			},
		})
		@responses({
			rows: [example],
			total: {type: 'number'}
		})
		static async query(ctx) {
			const {filter} = ctx.query
			const find = {}
			if(filter) {
				find.name = model.regexp(filter)
			}
			const rows = await model
				.find(find)
				.paging(ctx.query)
			const total = await model.countDocuments(find)
			ctx.body = {
				rows,
				total,
			}
		}


		@rename
		@request('POST', `/${lowcase_pathname}`)
		@summary(`新建${name}`)
		@tag
		@body(example)
		@responses(example)
		static async create(ctx) {
			return model(ctx.request.body).save().then(row => ctx.body = row)
		}


		@rename
		@request('PUT', `/${lowcase_pathname}/{_id}`)
		@summary(`修改${name}`)
		@tag
		@path({
			_id: {
				type: 'string',
				required: true
			}
		})
		@body(example)
		@responses(example)
		static async put(ctx) {
			const { params: {_id}, request: {body}} = ctx
			console.log('_id', _id);

			return model.findByIdAndUpdate(_id, body, {new: true}).then(row => ctx.body = row)
		}


		@rename
		@request('DELETE', `/${lowcase_pathname}/{_id}`)
		@summary(`删除${name}`)
		@tag
		@path({
			_id: {
				type: 'string',
				required: true
			}
		})
		static async delete(ctx) {
			const { params: {_id}} = ctx
			return model.findByIdAndRemove(_id).then(row => ctx.body = row)
		}


		@rename
		@request('DELETE', `/${lowcase_pathname}/batch`)
		@summary(`批量删除${name}`)
		@tag
		@body({
			ids: {
				type: 'array',
				required: true,
				example: []
			}
		})
		static async deleteBatch(ctx) {
			const { body: {ids}} = ctx.request
			return model.deleteMany({_id: {$in: ids}})
				.then(row => ctx.body = row)
		}

	}


	return Common
}
