module.exports = {
	filter_request_body(body) {
		const newData = {}
		function copyKeys(obj, excludes) {
			for (const key in obj) {
				if (obj.hasOwnProperty(key)) {
					if(!excludes.some(v => key === v)){
						newData[key] = obj[key]
					}
				}
			}
			return newData
		}
		if (body) {
			return copyKeys(body, ['created_date', 'updated_date', 'creator_name', 'creator_id', 'last_modifier_name', 'last_modifier_id', '_id'])
		}
	},
	compact(arg) {
		let result
		// console.log('compact', Object.prototype.toString.call(arg))
		if (Object.prototype.toString.call(arg) === '[object Object]') {
			result = {}
			for (const name in arg) {
				if (arg[name]) {
					result[name] = arg[name]
				}
			}
		} else if (Object.prototype.toString.call(arg) === '[object Array]') {
			result = []
			arg.forEach(element => {
				element && result.push(element)
			})
		}
		return result
	},
	unless({url, method}, paths) {
		function isUrlMatch(p, url) {
			var ret = (typeof p === 'string' && p === url) || (p instanceof RegExp && !!p.exec(url))
			if (p instanceof RegExp) {
				p.lastIndex = 0
			}

			if (p && p.url) {
				ret = isUrlMatch(p.url, url)
			}
			return ret
		}

		function isMethodMatch(methods, m) {
			if (!methods) {
				return true
			}

			methods = oneOrMany(methods)

			return methods.indexOf(m) > -1
		}

		function oneOrMany(elementOrArray) {
			return !elementOrArray || Array.isArray(elementOrArray) ?
				elementOrArray : [elementOrArray]
		}

		return paths.some(function (p) {
			var methods = p.methods || oneOrMany(p.method)
			return isUrlMatch(p, url) && isMethodMatch(methods, method)
		})
	}
}
