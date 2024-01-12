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
import { User, UserCreateInput } from "../entities/User";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import { ContextType } from "../Auth";

const argon2 = require("argon2");

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async allUsers(): Promise<User[]> {
    const user = await User.find({});
    return user;
  }

  @Query(() => User)
  async user(@Arg("id", () => ID) id: number): Promise<User | null> {
    const user = await User.findOne({ where: { id: id } });
    return user;
  }

  @Authorized()
  @Query(() => User)
  async me(@Ctx() context: ContextType): Promise<User> {
    return context.user as User;
  }

  @Mutation(() => User)
  async signup(
    @Arg("data", () => UserCreateInput) data: UserCreateInput
  ): Promise<User> {
    const errors = await validate(data);
    if (errors.length !== 0) {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }

    const existingUser = await User.findOneBy({ email: data.email });
    if (existingUser) {
      throw new Error(`User already exit`);
    }

    const newUser = new User();
    Object.assign(newUser, {
      email: data.email,
      hashedPassword: await argon2.hash(data.password),
    });

    await newUser.save();
    return newUser;
  }

  @Mutation(() => User, { nullable: true })
  async signin(
    @Ctx() context: { req: any; res: any },
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User | null> {
    const existingUser = await User.findOneBy({ email });
    if (existingUser) {
      if (argon2.verify(existingUser.hashedPassword, password)) {
        const token = jwt.sign(
          {
            userId: existingUser.id,
          },
          `${process.env.JWT_SECRET}`
        );

        const cookies = new Cookies(context.req, context.res);
        cookies.set("token", token, {
          httpOnly: true,
          secure: false,
          maxAge: 1000 * 60 * 24,
        });

        return existingUser;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  @Mutation(() => Boolean)
  async signout(@Ctx() context: ContextType): Promise<Boolean> {
    const cookies = new Cookies(context.req, context.res);
    cookies.set("token", "", {
      httpOnly: true,
      secure: false,
      maxAge: 0,
    });
    return true;
  }

  // //   @Mutation(() => User, { nullable: true })
  // //   async updateUser(
  // //     @Arg("id", () => ID) id: number,
  // //     @Arg("data") data: UserUpdateInput
  // //   ): Promise<User | null> {
  // //     const user = await User.findOne({
  // //       where: { id: id },
  // //       relations: { tags: true },
  // //     });

  //     if (user) {
  //       merge(user, data);
  //       const errors = await validate(ad);
  //       if (errors.length === 0) {
  //         await User.save(ad);
  //         return await User.findOne({
  //           where: { id: id },
  //           relations: {
  //             categories: true,
  //             tags: true,
  //           },
  //         });
  //       } else {
  //         throw new Error(`Error occured: ${JSON.stringify(errors)}`);
  //       }
  //     }
  //     return user;
  //   }

  //   @Mutation(() => User, { nullable: true })
  //   async deleteUser(@Arg("id", () => ID) id: number): Promise<Ads | null> {
  //     const user = await User.findOne({ where: { id: id } });
  //     if (user) {
  //       await user.remove();
  //       user.id = id;
  //     }
  //     return user;
  //   }
}
