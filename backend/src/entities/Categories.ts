import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { IsInt, Length, IsEmail, Min, Max } from "class-validator";
import { Ads } from "./Ads";

@Entity()
export class Categories extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  @Length(5, 20)
  name!: string;

  @Column({ nullable: true })
  link!: string;

  @OneToMany(() => Ads, (ads) => ads.categories)
  ads!: Ads[];
}
