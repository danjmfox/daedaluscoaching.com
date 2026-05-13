export function useComposedPage(path: string) {
  return useAsyncData(`composed-page:${path}`, async () => {
    const page = await queryCollection("pages").path(path).first();
    if (!page?.blocks) return { page, blocks: [] };
    const blocks = await Promise.all(
      (page.blocks as string[]).map((slug: string) =>
        queryCollection("blocks").path(`/blocks/${slug}`).first(),
      ),
    );
    return { page, blocks: blocks.filter(Boolean) };
  });
}
