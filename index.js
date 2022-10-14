// load the project dependencies
const express = require("express"),
  cookieParser = require("cookie-parser"),
  compression = require("compression"),
  cors = require("cors"),
  { sequelize } = require("./models"),
  errorHander = require("./middleware/error");
// load project enviroment variables
require("dotenv").config();
// initilize the app
const app = express();
const PORT = process.env.PORT || 5000;
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public/"));
app.use(compression());
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());
app.disable("x-powered-by");
// load routes
const auth = require("./routes/auth");
const users = require("./routes/users");
const hospitals = require("./routes/hospitals");
// mount the router to the url's
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/hospitals", hospitals);
app.use(errorHander);

// running the app on process port or 5000 port as default
app.listen(PORT, async () => {
  console.log(`Running on ${PORT}`);
  await sequelize.authenticate();
  console.log(`database connected ...`);
});
