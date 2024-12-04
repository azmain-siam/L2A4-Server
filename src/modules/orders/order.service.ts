import { IOrder } from "./order.interface";
import Order from "./order.model";

const createOrder = async (order: IOrder): Promise<IOrder> => {
  const result: IOrder = await Order.create(order);

  return result;
};

const calculateRevenue = async () => {
  const revenueData = await Order.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      // Unwind the productDetails array to get a single object
      $unwind: "$productDetails",
    },
    {
      $addFields: {
        orderRevenue: { $multiply: ["$productDetails.price", "$quantity"] },
      },
    },
    {
      $group: { _id: null, totalRevenue: { $sum: "$orderRevenue" } },
    },
  ]);

  const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

  return totalRevenue;
};

export const orderService = {
  createOrder,
  calculateRevenue,
};
