import mongoose from "mongoose";

const deleteAllDataInUsers = async () => {
    const collections = mongoose.connection.collections;
    for(const key in collections){
        const collection = collections[key];
        await collection.deleteMany();
    }
}

export default deleteAllDataInUsers;
