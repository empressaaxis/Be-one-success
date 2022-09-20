import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();


const mongoDbConnect = () => {
    mongoose.connect(process.env.DB_URI, {
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
