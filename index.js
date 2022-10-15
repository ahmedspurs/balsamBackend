// load the project dependencies
const express = require("express"),
  cookieParser = require("cookie-parser"),
  compression = require("compression"),
  cors = require("cors"),
  { sequelize } = require("./models"),
  rateLimit = require("express-rate-limit"),
  hpp = require("hpp"),
  helmet = require("helmet"),
  xss = require("xss-clean"),
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

// compress the response
app.use(compression());
// allow cors origin
app.use(
  cors({
    origin: "*",
  })
);
// rate limiring
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});
// hpp params pollution
app.use(hpp());
app.use(limiter);
// enable cookie parser
app.use(cookieParser());
// enable security headers
app.use(helmet());
app.use(xss());
// disable framework provider
app.disable("x-powered-by");
// load routes
const auth = require("./routes/auth");
const users = require("./routes/users");
const hospitals = require("./routes/hospitals");
const icus = require("./routes/icus");
// mount the router to the url's
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/hospitals", hospitals);
app.use("/api/v1/icus", icus);
app.use(errorHander);

// running the app on process port or 5000 port as default
app.listen(PORT, async () => {
  console.log(`Running on ${PORT}`);
  await sequelize.authenticate();
  console.log(`database connected ...`);
});
