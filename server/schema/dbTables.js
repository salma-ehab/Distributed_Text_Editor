import mongoose from "mongoose";

const dbTable = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    content: {
        type: Object,
        required: true
    }
});

const docTable = mongoose.model('docTable', dbTable);

export default docTable;
