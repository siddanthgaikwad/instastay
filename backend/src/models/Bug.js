import mongoose from "mongoose"

const BugSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    bug : {
        type: String,
        required: true,
    }
});

const Bug = mongoose.model("Bug",BugSchema)

export default Bug;