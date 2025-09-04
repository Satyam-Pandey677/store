import { asyncHandler } from "../utils/asyncHandler.js";
import Product from "../models/product.model.js"
import Order from "../models/order.model.js"

function calcPrices (orderItem){
    const itemsPrice = orderItem.reduce((acc, item) => acc + item.price * item.qty, 0)

    const shippingPrice  = itemsPrice >100 ? 0  :10;
    const taxRate = 0.15;
    const taxPrice = (itemsPrice * taxRate).toFixed(2)

    const totalPrice = (
        itemsPrice + shippingPrice + parseInt(taxPrice)
    ).toFixed(2)

    return {
        itemsPrice: parseInt(itemsPrice.toFixed(2)),
        shippingPrice : parseInt(shippingPrice.toFixed(2)),
        taxPrice:parseInt(taxPrice),
        totalPrice:parseInt(totalPrice)
    }

    
}

const createOrder = asyncHandler(async(req, res) => {
    try {
        const {orderItems, shippingAddress, paymentMethod} = req.body

        if(orderItems && orderItems.length === 0){
            res.status(400)
            throw new Error("No order items")
        }

        const itemsFromDB = await Product.find({
            _id: {$in:orderItems.map((x) => x._id)}
        })

        const dbOrderItems  = orderItems.map((itemFromClient) => {
            const matchingItemFromDB = itemsFromDB.find((itemsFromDB) => 
                itemsFromDB._id.toString() === itemFromClient._id)

            if(!matchingItemFromDB){
                res.status(400)
                throw new Error(`Product not found ${itemFromClient._id}`);
            }

            return {
                ...itemFromClient,
                product: itemFromClient._id,
                price:matchingItemFromDB.price,
                _id:undefined
            }
            })

           

            const {itemsPrice, taxPrice, shippingPrice, totalPrice} = calcPrices(dbOrderItems)

            console.log(calcPrices(dbOrderItems))

            console.log(typeof totalPrice)
            console.log(itemsPrice)

            const order = new Order({
                orderItems: dbOrderItems,
                user:req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            })

            const createOrder = await order.save()
            res.status(201).json(createOrder)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})


const getAllOrders = asyncHandler(async(req, res) => {
    try {
        const orders = await Order.find({}).populate("user", "id username");
        res.json(orders)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

const getUserOrder = asyncHandler(async(req, res) => {
    try {
        const orders = await Order.find({user: req.user._id})
        res.json(orders)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})


const countTotalOrders = asyncHandler(async(req, res) => {
    try {
        const totalOrder = await Order.countDocuments()

        res.json({ totalOrder })
    } catch (error) {
        res.status(500).json({error:error.message})

    }
})

const calculateTotalSales = asyncHandler(async(req, res) => {
    try {
        const order = await Order.find();
        const totalSales = order.reduce((sum, order) => sum+order.totalPrice, 0);
        res.json({totalSales})
    } catch (error) {
        res.status(500)
        .json({error:error.message})
    }
})


const calculateTotalSalesByDate = asyncHandler(async(req, res)=>{
    try {
        const salesByDate = await Order.aggregate([
            {
                $match:{
                    isPaid:true
                },
            },
            {
                $group:{
                    _id:{
                        $dateToString: {format: '%Y-%m-%d', date: '$paidAt'}
                    },
                    totalSales: {$sum:"$totalPrice"}
                },
            },
        ]) 

        res.json({salesByDate})
    } catch (error) {
        res.status(500)
        .json({error:error.message})
    }
})

const findOrderById = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params
        const order = await Order.findById(id).populate("user", "username email")

        if(order){
            res.json({order})
        }else{
            res.status(404)
            throw new Error("Order not Found")
        }

    } catch (error) {
        res.status(500)
        .json({error:error.message})
    }
})


const markOrderAsPaid = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params

        const order = await Order.findById(id)

        if(order){
            order.isPaid = true
            order.paidAt = Date.now()
            order.paymentResult = {
                id,
                status:req.body.status,
                update_time:req.body.update_time,
                email_address: req.body.payer.email_address
            }

            const updateOrder = await order.save()
            res.status(200).json(updateOrder)
        }else{
            res.status(400)
            throw new Error("Order not found")
        }
    } catch (error) {
        res.status(500)
        .json({error:error.message})
    }
})

const markOrderAsDelivered = asyncHandler(async(req, res)=> {
    try {
        const {id} = req.params;
        
        const order = await Order.findById(id)

        if(order){
            order.isDelivered = true;
            order.deliveredAt = Date.now()

            const updatedOrder = await order.save()
            res.json(updatedOrder)
        }else{
            res.status(404)
            throw new Error({error: "Order notr found"})
        }

    } catch (error) {
        res.status(500)
        throw new Error({error: error.message})
    }
})

const testingPut = asyncHandler(async(req, res) => {
    res.send("Api is woring")
})

export {
    createOrder,
    getAllOrders,
    getUserOrder,
    countTotalOrders,
    calculateTotalSales,
    calculateTotalSalesByDate,
    findOrderById,
    markOrderAsPaid,
    markOrderAsDelivered,
    testingPut
}