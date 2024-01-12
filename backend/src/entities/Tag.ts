import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Length } from "class-validator";
import { Ads } from "./Ads";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ length: 100 })
  @Length(3, 100)
  @Field()
  name!: string;

  @ManyToMany(() => Ads, (ads) => ads.tags)
  @Field(() => [Ads])
  ads!: Ads[];
}

@InputType()
export class TagCreateInput extends BaseEntity {
  @Field()
  name!: string;
}
