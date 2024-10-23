import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razropay from "razorpay";
import crypto from "crypto";

const razropay = new Razropay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// placing user order from frontend
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      status: "Food Processing",
      payment: false,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const razorpayOrder = await razropay.orders.create(options);

    res.json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      orderId: newOrder._id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in payments" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, paymentId, razorpayOrderId, signature } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpayOrderId + "|" + paymentId)
    .digest("hex");

  if (generatedSignature === signature) {
    await orderModel.findByIdAndUpdate(orderId, {
      payment: true,
      status: "Food Processing",
    });

    res.status(200).json({
      success: true,
      message: "Payment verified successfully!",
      orderId,
    });
  } else {
    res
      .status(400)
      .json({ success: true, message: "Payment verification failed!" });
  }
};

// User orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Listing orders for adming panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// API for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
