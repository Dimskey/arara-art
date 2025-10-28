import { defineField, defineType } from "sanity";

export const news = defineType({
  name: "news",
  title: "News",
  type: "document",
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Indonesian", value: "id" },
        ],
        layout: "radio",
      },
      initialValue: "id",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "date",
      title: "Published Date",
      type: "datetime",
    }),
    defineField({
      name: "body",
      title: "Body Content",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
