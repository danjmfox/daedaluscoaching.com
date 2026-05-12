import type { ContentPage } from "~/core/content/content-port";

export function usePageContent(path: string) {
  const { data: rawDoc } = useAsyncData(path, () =>
    queryCollection("content").path(path).first(),
  );

  const page = computed<ContentPage | null>(() =>
    rawDoc.value
      ? {
          title: rawDoc.value.title as string,
          description: rawDoc.value.description as string | undefined,
        }
      : null,
  );

  return { page, rawDoc };
}
