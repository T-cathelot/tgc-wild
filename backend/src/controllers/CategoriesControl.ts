import { Request, Response } from "express";
import { Controller } from "./index";
import { Ads } from "../entities/Ads";
import { validate } from "class-validator";
import { Categories } from "../entities/Categories";

export class CategortiesControl extends Controller {
  getAll = async (req: Request, res: Response) => {
    Categories.find()
      .then((categories) => {
        res.send(categories);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send();
      });
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const ad = await Categories.findOne({
        where: { id: Number(req.params.id) },
      });
      res.send(ad);
    } catch (err: any) {
      console.error(err);
      res.status(500).send();
    }
  };
  createOne = async (req: Request, res: Response) => {
    try {
      const newCategories = new Categories();
      newCategories.name = req.body.name;

      const errors = await validate(newCategories);
      if (errors.length === 0) {
        await newCategories.save();
        res.send(newCategories);
      } else {
        res.status(400).json({ errors: errors });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  };

  deleteOne = async (req: Request, res: Response) => {
    try {
      const categories = await Categories.findOne({
        where: { id: Number(req.params.id) },
      });
      if (categories) {
        await categories.remove();
        res.status(204).send();
      } else {
        res.status(404).send();
      }
    } catch (err: any) {
      console.error(err);
      res.status(500).send();
    }
  };

  patchOne = async (req: Request, res: Response) => {
    try {
      const categories = await Categories.findOne({
        where: { id: Number(req.params.id) },
      });

      if (categories) {
        Object.assign(categories, req.body, { id: categories.id });
        const errors = await validate(categories);
        if (errors.length === 0) {
          await categories.save();
          res.status(204).send();
        } else {
          res.status(400).json({ errors: errors });
        }
      } else {
        res.status(404).send();
      }
    } catch (err: any) {
      console.error(err);
      res.status(500).send();
    }
  };
}
