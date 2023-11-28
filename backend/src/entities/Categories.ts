import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Length, Min } from "class-validator";
import { Ads } from "./Ads";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Categories extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;
  @Column()
  @Length(5, 20)
  @Field()
  name!: string;

  @Column({ nullable: true })
  @Field()
  link!: string;

  @OneToMany(() => Ads, (ads) => ads.categories)
  @Field(() => [Ads])
  ads!: Ads[];
}

@InputType()
export class CategoriesCreateInput extends BaseEntity {
  @Field()
  name!: string;
}
