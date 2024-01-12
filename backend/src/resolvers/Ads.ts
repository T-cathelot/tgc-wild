import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Ads, AdsCreateInput, AdsUpdateInput, AdsWhere } from "../entities/Ads";
import { validate } from "class-validator";
import { merge } from "../utils";
import { In, LessThanOrEqual, Like, MoreThanOrEqual } from "typeorm";

@Resolver(Ads)
export class AdsResolver {
  @Query(() => [Ads])
  async allAds(
    @Ctx() context: { req: any; res: any },
    @Arg("where", { nullable: true })
    where?: AdsWhere,
    @Arg("take", () => Int, { nullable: true }) take?: number,
    @Arg("skip", () => Int, { nullable: true }) skip?: number
  ): Promise<Ads[]> {
    const queryWhere: any = {};

    if (where?.categories) {
      queryWhere.categories = { id: In(where.categories) };
    }

    if (where?.searchTitle) {
      queryWhere.title = Like(`%${where.searchTitle}%`);
    }

    if (where?.priceGte) {
      queryWhere.price = MoreThanOrEqual(Number(where.priceGte));
    }

    if (where?.priceLte) {
      queryWhere.price = LessThanOrEqual(Number(where.priceLte));
    }

    /* const order: any = {};
    if (
      typeof req.query.orderByTitle === "string" &&
      ["ASC", "DESC"].includes(req.query.orderByTitle)
    ) {
      order.title = req.query.orderByTitle; // req.query.orderByTitle = ASC | DESC
    }

    if (
      typeof req.query.orderByPrice === "string" &&
      ["ASC", "DESC"].includes(req.query.orderByPrice)
    ) {
      order.price = req.query.orderByPrice; // req.query.orderByTitle = ASC | DESC
    } */

    const ads = await Ads.find({
      take: take ?? 50,
      skip,
      where: queryWhere,
      //order,
      relations: {
        categories: true,
        tags: true,
        createdBy: true,
      },
    });
    return ads;
  }

  @Query(() => Int)
  async allAdsCount(
    @Arg("where", { nullable: true }) where?: AdsWhere
  ): Promise<number> {
    const queryWhere: any = {};

    if (where?.categories) {
      queryWhere.categories = { id: In(where.categories) };
    }

    if (where?.searchTitle) {
      queryWhere.title = Like(`%${where.searchTitle}%`);
    }

    if (where?.priceGte) {
      queryWhere.price = MoreThanOrEqual(Number(where.priceGte));
    }

    if (where?.priceLte) {
      queryWhere.price = LessThanOrEqual(Number(where.priceLte));
    }

    /* const order: any = {};
    if (
      typeof req.query.orderByTitle === "string" &&
      ["ASC", "DESC"].includes(req.query.orderByTitle)
    ) {
      order.title = req.query.orderByTitle; // req.query.orderByTitle = ASC | DESC
    }

    if (
      typeof req.query.orderByPrice === "string" &&
      ["ASC", "DESC"].includes(req.query.orderByPrice)
    ) {
      order.price = req.query.orderByPrice; // req.query.orderByTitle = ASC | DESC
    } */

    const count = await Ads.count({
      where: queryWhere,
    });
    return count;
  }
  @Authorized()
  @Query(() => Ads, { nullable: true })
  async ad(@Arg("id", () => ID) id: number): Promise<Ads | null> {
    const ad = await Ads.findOne({
      where: { id: id },
      relations: { categories: true, tags: true },
    });
    return ad;
  }

  @Authorized()
  @Mutation(() => Ads)
  async createAds(
    @Ctx() context: any,
    @Arg("data", () => AdsCreateInput) data: AdsCreateInput
  ): Promise<Ads> {
    const newAds = new Ads();
    Object.assign(newAds, data, {
      createdBy: context.user,
    });

    const errors = await validate(newAds);
    if (errors.length === 0) {
      await newAds.save();
      return newAds;
    } else {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }
  }

  @Authorized()
  @Mutation(() => Ads, { nullable: true })
  async updateAds(
    @Ctx() context: any,
    @Arg("id", () => ID) id: number,
    @Arg("data") data: AdsUpdateInput
  ): Promise<Ads | null> {
    const ad = await Ads.findOne({
      where: { id: id },
      relations: { tags: true, createdBy: true },
    });

    console.log("User in context:", context.user);

    if (ad && ad.createdBy.id === context.user?.id) {
      merge(ad, data);
      const errors = await validate(ad);
      if (errors.length === 0) {
        await Ads.save(ad);
        return await Ads.findOne({
          where: { id: id },
          relations: {
            categories: true,
            tags: true,
          },
        });
      } else {
        throw new Error(`Error occured: ${JSON.stringify(errors)}`);
      }
    } else {
      return null;
    }
  }

  @Mutation(() => Ads, { nullable: true })
  async deleteAds(@Arg("id", () => ID) id: number): Promise<Ads | null> {
    const ads = await Ads.findOne({ where: { id: id } });
    if (ads) {
      await ads.remove();
      ads.id = id;
    }
    return ads;
  }
}
