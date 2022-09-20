import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    names: String,
    phone: String,
    email: String,
    password: String,
    type: String,
})

const usersModal = mongoose.model('Users', usersSchema);

export default usersModal;
