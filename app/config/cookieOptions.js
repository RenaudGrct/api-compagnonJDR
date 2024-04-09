const cookieOptions = {
  httpOnly:true,
  sameSite: "None",
  partitioned: true,
  secure : process.env.NODE_ENV === "prod"
};

module.exports = cookieOptions;