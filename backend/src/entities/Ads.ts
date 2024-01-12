import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsInt, Length, ValidateIf } from "class-validator";
import { Categories } from "./Categories";
import { Tag } from "./Tag";
import { Field, ID, InputType, Int, ObjectType } from "type-graphql";
import { User } from "./User";

@Entity()
@ObjectType()
export class Ads extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Length(3, 100)
  @Field()
  title!: string;

  @Column()
  @IsInt()
  @Field()
  price!: number;

  @Column({ nullable: true })
  @Field()
  imgUrl!: string;

  @Column({ nullable: true })
  @Length(0, 5000)
  @ValidateIf((object, value) => !!value)
  @Field()
  description!: string;

  @ManyToOne(() => Categories, (categories) => categories.ads)
  @Field(() => Categories, { nullable: true })
  categories!: Categories;

  @ManyToMany(() => Tag, (tag) => tag.ads)
  @JoinTable()
  @Field(() => [Tag])
  tags!: Tag[];

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.ads)
  @Field(() => User)
  createdBy!: User;
}

@InputType()
export class ObjectId {
  @Field(() => ID)
  id!: number;
}

@InputType()
export class AdsCreateInput {
  @Field()
  title!: string;

  @Field(() => Int)
  price!: number;

  @Field({ nullable: true })
  imgUrl!: string;

  @Field({ nullable: true })
  description!: string;

  @Field({ nullable: true })
  categories!: ObjectId;

  @Field(() => [ObjectId], { nullable: true })
  tags!: ObjectId[];
}

@InputType()
export class AdsUpdateInput {
  @Field()
  title!: string;

  @Field(() => Int, { nullable: true })
  price!: number;

  @Field({ nullable: true })
  imgUrl!: string;

  @Field({ nullable: true })
  description!: string;

  @Field({ nullable: true })
  categories!: ObjectId;

  @Field(() => [ObjectId], { nullable: true })
  tags!: ObjectId[];
}

@InputType()
export class AdsWhere {
  @Field(() => [ID], { nullable: true })
  categories?: number[];

  @Field(() => String, { nullable: true })
  searchTitle?: string;

  @Field(() => Int, { nullable: true })
  priceGte?: number;

  @Field(() => Int, { nullable: true })
  priceLte?: number;
}
