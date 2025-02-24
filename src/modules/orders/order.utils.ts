import Shurjopay from "shurjopay";
import config from "../../config";

const shurjopay = new Shurjopay();

shurjopay.config(
  config.sp.sp_endpoint,
  config.sp.sp_password,
  config.sp.sp_prefix,
  config.sp.sp_return_url,
  config.sp.sp_username
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makePayment = async (paymentPayload: any) => {
  const payment = await shurjopay.makePayment(
    paymentPayload,
    (response) => console.log(response),
    (error) => console.log(error)
  );

  console.log(payment);
  return payment;
};

export const orderUtils = {
  makePayment,
};
