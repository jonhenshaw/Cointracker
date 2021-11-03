import { Coin } from '../api/coinGecko';

export const sortData = (data: Coin[], sortCat: String) => {
  switch (sortCat) {
    case 'coin': 
      data.sort((a, b) => {
        var nameA = a.name[0].toUpperCase();
        var nameB = b.name[0].toUpperCase();
        return nameA.localeCompare(nameB)
      });
    break;
    case 'price': 
      data.sort((a, b) => { return  b.current_price-a.current_price; });
      break;
    case '24hr': 
      data.sort((a, b) => { return  b.price_change_percentage_24h - a.price_change_percentage_24h; });
      break;
    case 'cap': 
      data.sort((a, b) => { return b.market_cap - a.market_cap ; });
      break;
    default:
      break;
    }
  return data;
};
