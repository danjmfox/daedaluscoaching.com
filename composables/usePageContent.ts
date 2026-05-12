import type { ContentPage } from '~/core/content/content-port'

export async function usePageContent(path: string): Promise<ContentPage | null> {
  const page = await queryCollection('content').path(path).first()
  if (!page) return null
  return {
    title: page.title as string,
    body: page.body as string,
  }
}
