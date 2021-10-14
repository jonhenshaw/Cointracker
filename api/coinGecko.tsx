export async function getMarkets() : Promise<any> {
  return await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
    .then((response) => response.json())
}

export interface Coin {
  id: string,
  symbol: string,
  current_price: string,
  image: string
}