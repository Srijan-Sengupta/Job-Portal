import { default as mongoose } from "mongoose";

const adminSchema = mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true },
	full_name: { type: String, required: false },
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
