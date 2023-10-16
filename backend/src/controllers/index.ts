import { Request, Response } from "express";

export class Controller {
  getAll = async (req: Request, res: Response) => {
    console.log(this);
    this.notImplemented(req, res);
  };

  getOne = async (req: Request, res: Response) => {
    this.notImplemented(req, res);
  };

  createdOne = async (req: Request, res: Response) => {
    this.notImplemented(req, res);
  };

  deleteOne = async (req: Request, res: Response) => {
    this.notImplemented(req, res);
  };

  patchOne = async (req: Request, res: Response) => {
    this.notImplemented(req, res);
  };

  updateOne = async (req: Request, res: Response) => {
    this.notImplemented(req, res);
  };

  notImplemented = (req: Request, res: Response): void => {
    res.status(404).json({
      message: "The controller seems to be missing",
    });
  };
}
