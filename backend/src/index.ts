import "reflect-metadata";
import express from "express";
import { dataSource } from "./dataSource";
import { Ads } from "./entities/Ads";
import { Categories } from "./entities/Categories";
import { validate } from "class-validator";
import { AdsControl } from "./controllers/AdsControl";
import { CategortiesControl } from "./controllers/CategoriesControl";

// db.get("PRAGMA foreign_keys = ON;");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

const adsController = new AdsControl();
app.get("/ads", adsController.getAll);
app.get("/ads/:id", adsController.getOne);
app.post("/ads", adsController.createOne);
app.delete("/ads/:id", adsController.deleteOne);
app.patch("/ads/:id", adsController.patchOne);
app.put("/ads/:id", adsController.updateOne);

const categoriesController = new CategortiesControl();
app.get("/categories", categoriesController.getAll);
app.get("/categories/:id", categoriesController.getOne);
app.post("/categories", categoriesController.createOne);
app.delete("/categories/:id", categoriesController.deleteOne);
app.patch("/categories/:id", categoriesController.patchOne);
app.put("/categories/:id", categoriesController.updateOne);

app.listen(5000, async () => {
  await dataSource.initialize();
  console.log("Server launch on http://localhost:5000");
});
