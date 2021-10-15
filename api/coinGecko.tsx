export async function getMarkets() : Promise<any> {
  return await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
    .then((response) => response.json())
}

export interface Coin {
  id: string,
  name: string,
  symbol: string,
  current_price: number,
  image: string,
  market_cap: number,
  market_cap_rank: number,
  price_change_percentage_24h: number,
}