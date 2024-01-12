import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsEmail, Matches } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Ads } from "./Ads";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ length: 255, unique: true })
  @Field()
  email!: string;

  @Column({ length: 255 })
  hashedPassword!: string;

  @OneToMany(() => Ads, (ads) => ads.createdBy)
  @Field(() => Ads)
  ads!: Ads[];
}

@InputType()
export class UserCreateInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @Matches(/^.{8,50}$/)
  password!: string;
}

// @InputType()
// export class ObjectId {
//   @Field(() => ID)
//   id!: number;
// }

// @InputType()
// export class userUpdateInput {
//   @Field()
//   title!: string;

//   @Field(() => Int, { nullable: true })
//   price!: number;

//   @Field({ nullable: true })
//   imgUrl!: string;

//   @Field({ nullable: true })
//   description!: string;

//   @Field({ nullable: true })
//   categories!: ObjectId;

//   @Field(() => [ObjectId], { nullable: true })
//   tags!: ObjectId[];
// }
