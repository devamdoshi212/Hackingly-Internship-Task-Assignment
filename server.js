const express = require("express");
const cors = require("cors");
const auth = require("./middlewares/auth");
const wikipediaRoutes = require("./routes/wikipediaRoutes");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/search", wikipediaRoutes);

app.get("/try", auth, async (req, res) => {
  console.log("Hello from server");
  res.status(200).json({
    message: "Success",
  });
});

app.listen(9999, () => {
  console.log("Server started at 9999");
});
