const express = require("express")
const routes = require("./routes")
const cors = require("cors")

const port = process.env.ASTORIA_DEV_SERVER_PORT || 4000

const app = express()

app.use(cors());

routes.register(app);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
