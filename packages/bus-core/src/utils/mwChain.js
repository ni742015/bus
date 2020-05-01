// mw {name:'', opt: {}, middleware: () => {}}
class MiddlewareChain {
	constructor(mw) {
		this.mw = mw
	}
	_indexOf(name) {
		for (let index = 0; index < this.mw.length; index++) {
			if(name === this.mw[index].name) {
				return index
			}
		}

		return -1
	}
	value() {
		return this.mw
	}
	getMiddlewares() {
		return this.mw.map(mw => mw.middleware(mw.opt))
	}
	add(mw, index) {
		if(index !== undefined && index >= 0) {
			this.mw.splice(index, 0, mw)
		} else {
			this.mw.push(mw)
		}
	}
	before(name, mw) {
		let index = this._indexOf(name)
		this.add(mw, index)
	}
	after(name, mw) {
		let index = this._indexOf(name)
		this.add(mw, index + 1)
	}
	set(name, cb) {
		let index = this._indexOf(name)
		let mw = this.mw[index]

		if(typeof cb === 'function') {
			this.mw[index] = cb(mw) || mw
		} else {
			this.mw[index] = cb
		}
	}
	setOpt(name, opt) {
		this.set(name, (mw) => {
			if(typeof opt === 'function') {
				mw.opt = opt(mw.opt) || opt
			} else {
				mw.opt = opt
			}
			return mw
		})
	}
}

module.exports = MiddlewareChain
