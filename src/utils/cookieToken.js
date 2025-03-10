const getJwtToken = require("../helper/getJwtToken");

const cookieToken = (cart, res) => {
  const token = getJwtToken(user?., user?.email);
  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true, // Will work over HTTPS
    sameSite: "None", // Allows cross-site cookies
  };

  res.status(200).cookie("cart_key", token, options).json({
    success: true,
    token,
    message: "Cart Create Successful",
    user, // Fixed: Ensured proper syntax for `user`
  });
};

module.exports = cookieToken;
