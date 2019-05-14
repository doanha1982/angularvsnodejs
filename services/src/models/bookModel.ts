import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
export const BookSchema = new Schema({
    isbn: {
        type: String,
        required: 'Enter ISBN number'
    },
    title: {
        type: String,
        required: 'Enter book title'
    },
    author: {
        type: String,
        required: 'Enter author name'
    },
    publish: {
        type: Date,
        default: Date.now
    }
});