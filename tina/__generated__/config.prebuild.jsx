// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: "main",
  clientId: process.env.TINA_PUBLIC_CLIENT_ID ?? "",
  token: process.env.TINA_TOKEN ?? "",
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "images", publicFolder: "public" } },
  schema: {
    collections: [
      {
        name: "articles",
        label: "Articles",
        path: "src/content/articles",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Title", required: true, isTitle: true },
          { type: "datetime", name: "date", label: "Date", required: true },
          {
            type: "string",
            name: "tag",
            label: "Tag",
            required: true,
            options: ["DEEP DIVE", "TOOLS", "OPINION"]
          },
          { type: "string", name: "excerpt", label: "Excerpt (max 200 chars)", required: true },
          { type: "string", name: "readTime", label: "Read Time (e.g. 5 min read)", required: true },
          { type: "rich-text", name: "body", label: "Body", isBody: true }
        ]
      },
      {
        name: "log",
        label: "Daily Log",
        path: "src/content/log",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Title", required: true, isTitle: true },
          { type: "datetime", name: "date", label: "Date", required: true },
          { type: "string", name: "summary", label: "One-line summary (max 100 chars)", required: true },
          { type: "rich-text", name: "body", label: "Body", isBody: true }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
