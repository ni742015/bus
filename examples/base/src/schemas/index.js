import Scheam from "bus-core/schema"
import user from "./user"

class _Scheam extends Scheam {
    constructor(props) {
        super(props)
    }
}
const scheam = new _Scheam()
scheam.add({name: 'user', scheam: user})

export default scheam
