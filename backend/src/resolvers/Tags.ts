import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Tag, TagCreateInput } from "../entities/Tag";
import { validate } from "class-validator";

@Resolver(Tag)
export class TagsResolver {
  @Query(() => [Tag])
  async allTags(): Promise<Tag[]> {
    const tags = Tag.find({
      relations: { ads: true },
    });
    return tags;
  }
  @Query(() => Tag, { nullable: true })
  async tag(@Arg("id", () => ID) id: number): Promise<Tag | null> {
    const tag = await Tag.findOne({
      where: { id: id },
    });
    return tag;
  }

  @Mutation(() => Tag)
  async createTags(
    @Arg("data", () => TagCreateInput) data: TagCreateInput
  ): Promise<Tag> {
    const newTag = new Tag();
    Object.assign(newTag);

    const errors = await validate(newTag);
    if (errors.length === 0) {
      await newTag.save();
      return newTag;
    } else {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }
  }

  @Mutation(() => Tag, { nullable: true })
  async deleteTags(@Arg("id", () => ID) id: number): Promise<Tag | null> {
    const tag = await Tag.findOne({ where: { id: id } });
    if (tag) {
      await tag.remove();
      tag.id = id;
    }
    return tag;
  }
}
