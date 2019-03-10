const jwt = require('jsonwebtoken')
const {unless} = require('./index.js')

class Token {
	constructor(props = {secret: '', rules: []}) {
		this.rules = props.rules || []
		this.secret = props.secret || ''
	}

	create = (info, expiresIn, secret = this.secret) => {
		return jwt.sign(info, secret, {
			expiresIn: expiresIn
		})
	}

	decode = (token, secret = this.secret) => {
		if(token) {
			let data = jwt.decode(token, secret)
			if (data && data.exp > new Date()/1000) {
				return data
			}
		}
	}

	addCheckRules = (rules) => {
		let type = Object.prototype.toString.call(rules)
		if(type === '[object Array]') {
			this.rules = this.rules.concat(rules)
		} else if (type === '[object String]') {
			this.rules.push(rules)
		}
	}

	checkUrl = ({url, method}) => {
		return url.indexOf('swagger-') < 0 && !unless({url, method}, this.rules)
	}

}

module.exports = Token
