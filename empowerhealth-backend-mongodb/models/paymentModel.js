const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Schema for the payment
const razorSchema = new Schema({
    rpayCustomerId: { type: String, required: true },
    orderId: { type: String, required: true },
    status: {
        type: String, enum: ["created", "authorized", "captured", "refunded", "failed"], default: "created"
    },
    userId: { type: Schema.Types.ObjectId, ref: 'users' } // user model name may vary confirm it
}, { timestamps: true })



module.exports = mongoose.model("payment", razorSchema)