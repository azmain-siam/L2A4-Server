import User from "./user.model";

const getAllUsers = async () => {
  const result = await User.find();
  return result;
};

const getUserById = async (userId: string) => {
  const result = await User.findById(userId);
  return result;
};

const updateUserStatus = async (userId: string, status: string) => {
  const result = await User.findByIdAndUpdate(
    userId,
    { status },
    { new: true }
  );

  return result;
};

const updateUserAddress = async (userId: string, address: string) => {
  const result = await User.findByIdAndUpdate(
    userId,
    { address },
    { new: true }
  );

  return result;
};

export const userService = {
  getAllUsers,
  getUserById,
  updateUserStatus,
  updateUserAddress,
};
