import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
} else {
    console.log('MONGODB_URI is set.');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
    console.log('Initialized new global mongoose cache.');
}

async function dbConnect() {
    console.log('dbConnect called.');

    if (cached.conn) {
        console.log('Using existing database connection.');
        return cached.conn;
    }

    if (!cached.promise) {
        console.log('No existing connection promise. Creating a new database connection.');
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log('Database connected successfully.');
            return mongoose;
        }).catch((error) => {
            console.error('Database connection failed:', error);
            throw error; // Rethrow the error to be caught by the calling function
        });
    } else {
        console.log('Existing connection promise found. Waiting for it to resolve.');
    }

    try {
        cached.conn = await cached.promise;
        console.log('Database connection established.');
        return cached.conn;
    } catch (error) {
        console.error('Error waiting for database connection:', error);
        throw error; // Rethrow the error to be caught by the calling function
    }
}

export default dbConnect;
