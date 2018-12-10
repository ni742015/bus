import Api from "bus-core/api"
import user from "./user"

class _Api extends Api {
    constructor(props) {
        super(props)
    }
}

const api = new _Api()
api.add({name: 'user', apiClass: user})

export default api
