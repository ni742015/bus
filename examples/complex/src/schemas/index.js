import Scheam from "bus-core/schema"
import user from "./user"

const scheam = new Scheam()
scheam.add({name: 'user', scheam: user})

export default scheam
