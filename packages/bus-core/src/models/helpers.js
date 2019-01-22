module.exports = {
	like: {
		type: 'query',
		func(str, attr = 'name') {
			if(str)
				return this.where({ [attr]: new RegExp(str.replace(/[*.?+$^[\](){}|/\\]/g, str => `\\${str}`), 'i') })
			else
				return this
		}
	},
	paging: {
		type: 'query',
		func({page, page_count, sort = {'created_date': -1}}) {
			const start = (page - 1) * page_count
			return this
				.sort(sort)
				.skip(start)
				.limit(parseInt(page_count))
		}
	},
	regexp: {
		type: 'statics',
		func(str) {
			return new RegExp(str.replace(/[*.?+$^[\](){}|/\\]/g, str => `\\${str}`), 'i')
		}
	}
}
