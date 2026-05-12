export type ContentPage = {
  title: string
  body: string
}

export type ContentPort = (path: string) => Promise<ContentPage | null>
