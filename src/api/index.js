const express = require("express");
const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const apiRouter = express.Router();

apiRouter.use("/users", userRoute);
apiRouter.use("/category", categoryRoute);
apiRouter.use("/product", productRoute);
module.exports = apiRouter;
