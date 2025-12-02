"use client";

import Image from "next/image";
import { PortableTextComponents } from "@portabletext/react";

export const portableComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const url = value.url || "";

      return (
        <figure className="my-10 w-full">
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
            <Image
              src={url}
              alt={value.alt || "News Image"}
              fill
              className="object-cover"
            />
          </div>

          {value.caption && (
            <figcaption className="text-center text-sm text-gray-500 mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },

  block: {
    normal: ({ children }) => (
      <p className="leading-relaxed mb-6">{children}</p>
    ),

    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mt-12 mb-4">{children}</h2>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
  },
};
