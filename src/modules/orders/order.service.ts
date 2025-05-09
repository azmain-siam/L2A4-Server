import { IOrder } from "./order.interface";
import Order from "./order.model";

const createOrder = async (order: IOrder) => {
  const result = await Order.create(order);

  return result;
};

const getAllOrders = async () => {
  const orders = await Order.find()
    .populate("products.productId")
    .populate("user");

  return orders;
};

const getOrdersByUserId = async (userId: string) => {
  const orders = await Order.find({ user: userId }).populate(
    "products.productId"
  );

  return orders;
};

const updateOrderStatus = async (orderId: string, status: string) => {
  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );

  return order;
};

const calculateRevenue = async () => {
  const revenueData = await Order.aggregate([
    {
      $match: { status: { $ne: "cancelled" } }, // Only count non-cancelled orders
    },
    {
      $unwind: "$products",
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$products.totalPrice" },
      },
    },
  ]);

  const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;
  return totalRevenue;
};

const calculateRevenueAdmin = async () => {
  const [revenueResult, completedCount] = await Promise.all([
    Order.aggregate([
      { $match: { status: { $eq: "delivered" } } },
      // { $unwind: "$products" },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]),
    Order.countDocuments({ status: "delivered" }),
  ]);
  // console.log(revenueResult);
  const totalRevenue =
    revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

  return {
    totalRevenue,
    totalCompletedOrders: completedCount,
  };
};

export const orderService = {
  createOrder,
  getAllOrders,
  getOrdersByUserId,
  calculateRevenue,
  calculateRevenueAdmin,
  updateOrderStatus,
};
