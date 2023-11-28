import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Categories, CategoriesCreateInput } from "../entities/Categories";
import { validate } from "class-validator";

@Resolver(Categories)
export class CategoriessResolver {
  @Query(() => [Categories])
  async allCategories(): Promise<Categories[]> {
    const category = Categories.find({
      relations: { ads: true },
    });
    return category;
  }

  @Query(() => Categories, { nullable: true })
  async category(@Arg("id", () => ID) id: number): Promise<Categories | null> {
    const category = await Categories.findOne({
      where: { id: id },
    });
    return category;
  }

  @Mutation(() => Categories)
  async createCategories(
    @Arg("data", () => CategoriesCreateInput) data: CategoriesCreateInput
  ): Promise<Categories> {
    const newCategories = new Categories();
    Object.assign(newCategories, data);

    const errors = await validate(newCategories);
    if (errors.length === 0) {
      await newCategories.save();
      return newCategories;
    } else {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }
  }

  @Mutation(() => Categories, { nullable: true })
  async deleteCategories(
    @Arg("id", () => ID) id: number
  ): Promise<Categories | null> {
    const category = await Categories.findOne({ where: { id: id } });
    if (category) {
      await category.remove();
      category.id = id;
    }
    return category;
  }
}
