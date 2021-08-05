export async function getTickerInformation(pairs : string[]) : Promise<any> {
    return await fetch(`https://api.kraken.com/0/public/Ticker?pair=${pairs.join()}`)
      .then((response) => response.json())
}

export interface IKrakenResponse {
  error: any,
  result: any
}