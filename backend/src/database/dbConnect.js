import mongoose from 'mongoose'

const connectToDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to database " + connection.connection.host);
    } catch (error) {
        console.log("error while connectig to database " + error);
        process.exit(1);
    }
}

export default connectToDb;