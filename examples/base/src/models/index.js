import Model from "bus/model"
import user from "./user"

class _Model extends Model {
    constructor(props) {
        super(props)
    }
}

const model = new _Model()
model.add({name: 'user', model: user})

export default model
