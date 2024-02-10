const { Schema, default: mongoose } = require("mongoose");

const UserSchema = new Schema({
    first_name: { type: String, required: false },
    last_name: { type: String, required: false },
    auth0_uid: { type: String, required: true },
    nessie_id: { type: String, required: false },
    registered: { type: Boolean, default: false },
});

UserSchema.set("timestamps", true);

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;
