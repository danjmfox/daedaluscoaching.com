// Frontmatter metadata only — body rendering is a shell concern (ContentRenderer)
export type ContentPage = {
  title: string;
  description?: string;
};

export type ContentPort = (path: string) => Promise<ContentPage | null>;
