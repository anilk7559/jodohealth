const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require('../models/paymentModel')
const User = require('../models/userModel')
const helper = require("../config/helper");
let paymentController = {};

// create new razorpay instance
let rzp = new Razorpay({
    key_id: process.env.KEY_ID, 
    key_secret: process.env.KEY_SECRET, 
});


/**
 * create checkout for order products
 */
paymentController.createOrder = async (req, res) => {
    try {
        let { amount, currency, rpayCustomerId } = req.body;

        let options = {
            amount: amount,
            currency,
            receipt: await helper.nanoid()
        };
        console.log(options, "payment options")
        let order = await rzp.orders.create(options);
        if (!order) {
            helper.error400(res, "Failed to create user order")
        }
        let userId = "66b9fcc5ff53cf3409ff2da3"
        let saveOrderDetails = await Payment.create({ userId, rpayCustomerId, orderId: order.id })
        console.log(order, "User order details");
        console.log(saveOrderDetails, "user order details");
        helper.success(res, "order created successfully", order)
    } catch (err) {
        console.log(err)
        helper.error500(res, "Internal server error")
    }
};

/**
 * verify the payment made by customer
 */
paymentController.verifyPayment = async (req, res) => {
    try {
        let body = `${req.body.razorpayOrderId}|${req.body.razorpayPaymentId}`;
        let expectedSignature = crypto.createHmac('sha256', process.env.KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === req.body.razorpaySignature) {
            console.log("Signature verified successfully");

            // Update payment status to 'captured'
            const payment = await Payment.findOneAndUpdate(
                { orderId: req.body.razorpayOrderId, status: 'created' },
                { status: 'captured' },
                { new: true }
            );

            if (payment) {
                // Update user subscription status to subscribed (0)
                await User.findOneAndUpdate(
                    { _id: payment.userId },
                    { subscription_status: 0 }
                );

                helper.success(res, "Payment verified and subscription updated successfully");
            } else {
                helper.error404(res, "Payment record not found or already processed");
            }
        } else {
            helper.error404(res, "Payment verification failed");
        }
    } catch (err) {
        helper.error500(res, "Internal server error");
    }
}


/**
 * Webhook used to handle the different kind of payment not the payment verification 
 * because it's handled by the api. if we also handle here then it might create the conflict
 */
paymentController.webhookEventMonitor = async (req, res) => {
    try {
        const body = req.body;
        const razorpayWebhookSecret = process.env.WEBHOOK_SECRET;
        const payload = JSON.stringify(req.body);
        const expectedSignature = req.get("X-Razorpay-Signature");

        // Generate a signature to verify with the Razorpay signature
        const generateSignature = crypto
            .createHmac("sha256", razorpayWebhookSecret)
            .update(payload)
            .digest("hex");

        if (generateSignature === expectedSignature) {
            console.log("Webhook verified successfully");
            console.log("Received webhook event:", body.event);
            console.log("Webhook payload:", body.payload);

            // Handle the webhook event based on its type
            switch (body.event) {
                case "payment.captured": // Sent when a payment is successfully captured
                    console.log("payment.captured:", body.payload.payment.entity);
                    await Payment.findOneAndUpdate(
                        { orderId: body.payload.payment.entity.order_id },
                        { status: "captured" },
                        { new: true }
                    );
                    break;

                case "payment.failed": // Sent when a payment fails
                    console.log("payment.failed:", body.payload.payment.entity);
                    await Payment.findOneAndUpdate(
                        { orderId: body.payload.payment.entity.order_id },
                        { status: "failed" },
                        { new: true }
                    );
                    break;

                case "payment.refunded": // Sent when a payment is refunded
                    console.log("payment.refunded:", body.payload.payment.entity);
                    await Payment.findOneAndUpdate(
                        { orderId: body.payload.payment.entity.order_id },
                        { status: "refunded" },
                        { new: true }
                    );
                    break;

                case "payment.authorized": // Sent when a payment is authorized
                    console.log("payment.authorized:", body.payload.payment.entity);
                    await Payment.findOneAndUpdate(
                        { orderId: body.payload.payment.entity.order_id },
                        { status: "authorized" },
                        { new: true }
                    );
                    break;

                default:
                    console.log("Unhandled event:", body.event);
            }
            helper.success(res, "Event handled successfully")
        } else {
            helper.error400(res, "Invalid signature")
        }
    } catch (error) {
        console.log("Error occurred:", error);
        helper.error500(res, "Internal server error");
    }
};




module.exports = paymentController