export async function getNews() : Promise<any> {
  return await fetch('https://cryptopanic.com/api/v1/posts/?auth_token=00acdae478217c11590b61a982ac2e2a5af47c40&public=true')
    .then((response) => response.json())
}

export interface ICryptoPanicResponse {
  error: any,
  results: Array<INews>
}

export interface INews {
  title: string,
  url: string,
  published_at: string
}