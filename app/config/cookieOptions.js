const cookieOptions = {
  httpOnly:true,
  sameSite: "None"
};

if (process.env.NODE_ENV === "prod") {
  cookieOptions.secure = true;
}

module.exports = cookieOptions;