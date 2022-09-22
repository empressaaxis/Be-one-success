import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

let DB_CONNECTION;

if(process.env.NODE_ENV === 'isTesting'){
    DB_CONNECTION=process.env.TEST_DB_CONNECTION
}else{
    DB_CONNECTION=process.env.DB_URI
}

const mongoDbConnect = () => {
    mongoose.connect(DB_CONNECTION, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    
    mongoose.connection
        .once('open', () => console.log('Database Connected :-)'))
        .on('error', (error) => {
            console.log('Error ', error);
        });
}

export default mongoDbConnect;
