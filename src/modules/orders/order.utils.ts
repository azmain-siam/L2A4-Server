import shurjopay from "shurjopay";
import config from "../../config";

shurjopay.config(
  config.sp.sp_endpoint,
  config.sp.sp_password,
  config.sp.sp_prefix,
  config.sp.sp_return_url,
  config.sp.sp_username
);
