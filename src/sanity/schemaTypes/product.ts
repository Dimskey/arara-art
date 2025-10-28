import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Bahasa Indonesia", value: "id" },
        ],
        layout: "radio",
      },
      initialValue: "en",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "title",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      options: { layout: "grid" },
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: "discountPrice",
      title: "Discount Price",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
    }),

    defineField({
      name: "shopeeLink",
      title: "Shopee Link",
      type: "url",
    }),

    defineField({
      name: "tokopediaLink",
      title: "Tokopedia Link",
      type: "url",
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "language",
      media: "images.0",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle === "id" ? "Bahasa Indonesia" : "English",
        media,
      };
    },
  },
});
