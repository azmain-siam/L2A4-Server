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
  ]);

  return revenueData;
};

export const orderService = {
  createOrder,
  calculateRevenue,
};
