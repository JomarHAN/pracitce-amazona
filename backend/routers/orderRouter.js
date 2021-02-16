import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAdmin, isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'name');
    res.send(orders)
}))

orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.send(orders)
}))

orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
        res.status(400).send({ message: "Cart is empty" })
    } else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id
        })

        const createOrder = await order.save()
        res.status(201).send({ message: "New Order is created", order: createOrder })
    }
}))

orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.send(order)
    } else {
        res.status(401).send({ message: "Order not Found" })
    }
}))

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
        const updateOrder = await order.save();
        res.send({
            message: "Order paid",
            order: updateOrder
        })
    } else {
        res.status(404).send({ message: "Order not Found" })
    }
}))

orderRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        const deleteOrder = await order.remove()
        res.send({ message: "Order deleted", order: deleteOrder })
    } else {
        res.status(404).send({ message: "Order not Found" })
    }
}))

orderRouter.put('/:id/deliver', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now()
        const updateOrder = await order.save()
        res.send({ message: "Order Delivered", order: updateOrder })
    } else {
        res.status(404).send({ message: "Order not Found" })
    }
}))

export default orderRouter;