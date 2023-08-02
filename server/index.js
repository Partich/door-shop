import express from "express";
import sequelize from "./db.js";
import cors from "cors";
import router from "./routes/routes.js"
import fileUpload from "express-fileupload";
import path from "path"
import { fileURLToPath } from 'url';

const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(fileUpload({}))
app.use('/', router)

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
