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

@Entity()
export class Ads extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Length(3, 100)
  title!: string;

  @Column()
  @IsInt()
  price!: number;

  @Column()
  imgUrl!: string;

  @Column({ nullable: true })
  @Length(0, 5000)
  @ValidateIf((object, value) => !!value)
  description!: string;

  @ManyToOne(() => Categories, (categories) => categories.ads)
  categories!: Categories;

  @CreateDateColumn()
  createdAt!: Date;
}
