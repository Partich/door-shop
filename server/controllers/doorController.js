import { v4 } from "uuid";
import path from "path";
import { fileURLToPath } from 'url';
import models from "../models/models.js";
const { DoorInfo, Door } = models;

class DoorController {
  async create(req, res, next) {
    try {
      console.log(req.body)
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = v4() + ".jpg";
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      img.mv(path.join(__dirname, '..', 'static', fileName));
      
      const door = await Door.create({ name, price, brandId, typeId, img: fileName });

      if (info) {
        console.log(info)
        info = JSON.parse(info);
        console.log(info)
        info.forEach((i) =>
          DoorInfo.create({
            title: i.title,
            description: i.description,
            doorId: door.id,
          })
        );
      }

      return res.json(door);
    } catch (e) {
      next(e.message);
    }
  }

  async getAll(req, res) {
    let { typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let doors;
    if (!typeId) {
      doors = await Door.findAndCountAll({ limit, offset });
    }
    if (typeId) {
      doors = await Door.findAndCountAll({ where: { typeId }, limit, offset });
    }
    return res.json(doors);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const door = await Door.findOne({
      where: { id },
      include: [{ model: DoorInfo, as: "info" }],
    });
    return res.json(door);
  }
}

export default new DoorController();
