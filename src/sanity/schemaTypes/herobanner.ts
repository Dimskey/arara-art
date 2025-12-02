import { defineType, defineField } from "sanity";

export default defineType({
  name: "heroBanner",
  title: "Hero Banner",
  type: "document",
  fields: [
    // MULTI LANGUAGE TITLE
    defineField({
      name: "title_id",
      title: "Title (Indonesian)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title_en",
      title: "Title (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // MULTI LANGUAGE DESCRIPTION
    defineField({
      name: "description_id",
      title: "Description (Indonesian)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description_en",
      title: "Description (English)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    // IMAGE
    defineField({
      name: "image",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "link",
      title: "CTA Link (Optional)",
      type: "url",
    }),

    // OPTIONAL ORDERING
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
});
