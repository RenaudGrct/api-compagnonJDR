const corsOptions = {
  origin: process.env.BACKEND_LOCAL_URL,
  preflightContinue: false,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionSuccessStatus: 200
};

module.exports = corsOptions;