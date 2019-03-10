import Schema from "bus-core/schema"
import user from "./user"

const schema = new Schema()
schema.add({name: 'user', schema: user})

export default schema
