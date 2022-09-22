import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: Object,
    userType: String,
    resume: String,
    other_documents: Array,
});

const studentsModal = mongoose.model('Documents', usersSchema);

export default studentsModal;
