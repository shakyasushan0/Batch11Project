import Order from "../models/orders.js";
import Product from "../models/products.js";

const addOrder = async (req, res) => {
  const { orderItems, shippingAddress, shippingCharge } = req.body;
  const orderItemsFromDb = await Product.find({
    _id: { $in: orderItems.map((item) => item.productId) },
  });

  const newOrderItems = orderItems.map((item) => {
    const actualItem = orderItemsFromDb.find((i) => i._id == item.productId);
    return {
      ...item,
      price: actualItem.price,
    };
  });

  const itemPrice = newOrderItems
    .reduce((total, item) => total + Number(item.qty) * Number(item.price), 0)
    .toFixed(2);

  const totalPrice = (Number(itemPrice) + Number(shippingCharge)).toFixed(2);
  const order = await Order.create({
    orderItems: newOrderItems,
    shippingAddress,
    shippingCharge,
    itemPrice,
    totalPrice,
    user: req.user._id,
  });
  res.send({ message: "Order placed successfully", orderId: order._id });
};

const getOrders = async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
};

const getMyOrders = async (req, res) => {};

export { addOrder, getOrders };
