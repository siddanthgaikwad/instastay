import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Types.ObjectId,
        ref : "User",
        required : true,
    },
    postId : {
        type : [mongoose.Types.ObjectId],
        ref : "Post",
        required : true,
    },
    title : {
        type: String,
        required : true,
    },
    name: {
        type: String,
        required: true,
    },
    price : {
        type : Number,
        required : true,
    },
    date : {
        type: Date,
        required : true,
    },

});

const Order = new mongoose.model("Order",OrderSchema);

export default Order;