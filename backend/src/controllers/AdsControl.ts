// import { Request, Response } from "express";
// import { Controller } from "./index";
// import { Ads } from "../entities/Ads";
// import { validate } from "class-validator";

// export class AdsControl extends Controller {
//   getAll = async (req: Request, res: Response) => {
//     Ads.find({
//       relations: {
//         categories: true,
//       },
//     })
//       .then((ads) => {
//         res.send(ads);
//       })
//       .catch((err) => {
//         console.error(err);
//         res.status(500).send();
//       });
//   };

//   getOne = async (req: Request, res: Response) => {
//     try {
//       const ad = await Ads.findOne({
//         where: { id: Number(req.params.id) },
//         relations: {
//           categories: true,
//         },
//       });
//       res.send(ad);
//     } catch (err: any) {
//       console.error(err);
//       res.status(500).send();
//       console.log(err, "ici");
//     }
//   };
//   createOne = async (req: Request, res: Response) => {
//     try {
//       const newAd = new Ads();
//       newAd.description = req.body.description;
//       newAd.title = req.body.title;
//       newAd.price = req.body.price;
//       newAd.imgUrl = req.body.imgUrl;
//       newAd.categories = req.body.categories;

//       const errors = await validate(newAd);
//       if (errors.length === 0) {
//         await newAd.save();
//         res.send(newAd);
//       } else {
//         res.status(400).json({ errors: errors });
//       }
//     } catch (err) {
//       console.error(err);
//       res.status(500).send();
//     }
//   };

//   deleteOne = async (req: Request, res: Response) => {
//     try {
//       const ads = await Ads.findOne({ where: { id: Number(req.params.id) } });
//       if (ads) {
//         await ads.remove();
//         res.status(204).send();
//       } else {
//         res.status(404).send();
//       }
//     } catch (err: any) {
//       console.error(err);
//       res.status(500).send();
//     }
//   };

//   patchOne = async (req: Request, res: Response) => {
//     try {
//       const ad = await Ads.findOne({ where: { id: Number(req.params.id) } });

//       if (ad) {
//         Object.assign(ad, req.body, { id: ad.id });
//         const errors = await validate(ad);
//         if (errors.length === 0) {
//           await ad.save();
//           res.status(204).send();
//         } else {
//           res.status(400).json({ errors: errors });
//         }
//       } else {
//         res.status(404).send();
//       }
//     } catch (err: any) {
//       console.error(err);
//       res.status(500).send();
//     }
//   };
// }
