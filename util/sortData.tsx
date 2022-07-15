import { Coin } from '../api/coinGecko';

interface SortOrder {
  "asc": string,
  "desc": string,
}

export const sortData = (data: Coin[], sortCat: String) => {

  var sortOrder : Record<string, 'asc' | 'desc'> = {
    'coin': 'asc',
    'price': 'asc',
    '24hr': 'asc',
    'cap': 'asc'
  }

  switch (sortCat) {
    case 'coin':
      data.sort((a, b) => {
        var nameA = a.name[0].toUpperCase();
        var nameB = b.name[0].toUpperCase();
        return nameA.localeCompare(nameB)
      });
    break;
    case 'price':
      alert(sortOrder['price'])
      if (sortOrder['price'] == 'asc') {
        data.sort((a, b) => b.current_price-a.current_price)
        sortOrder['price'] = 'desc';
      }
      else {
        data.sort((a, b) => a.current_price-b.current_price);
        sortOrder['price'] = 'asc';
      }
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
