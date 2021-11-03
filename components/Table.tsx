import * as React from 'react';
import { useEffect } from 'react';
import { Image, StyleSheet, ScrollView, RefreshControl, FlatList, SafeAreaView, ImageSourcePropType } from 'react-native';
import { Text, View } from './Themed';
import { getMarkets, Coin } from '../api/coinGecko';

interface TableProps {
  data: Coin[],
  filterAmount: number
}

const sortData = (data:Coin[], sortCat:String) => {
  
  switch(sortCat) {
     case 'coin': {
      data.sort((a, b) => {
        var nameA = a.name.toUpperCase(); 
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
     }
     case 'price': {
       data.sort((a,b) => { return a.current_price - b.current_price} )
     }
     case '24hr': {
       data.sort((a,b) => { return a.price_change_percentage_24h - b.price_change_percentage_24h}  )
     }
     case 'cap': {
      data.sort((a,b) => { return a.market_cap - b.market_cap}  )
     }
  }
  return data
}

export const isPositive = (number: number): boolean => number >= 0 ? true : false;

export default function Table(props: TableProps) {

  const [sortCat,setSortCat] = React.useState("none")

  function lineBreak() {
    return (
      <View
        style={{
          borderBottomColor: 'white',
          borderBottomWidth: 1,
          marginTop: 10,
          marginBottom: 10
        }}
      />
    )
  }

  function renderHeaders() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 40, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Text onPress={()=>{setSortCat("coin")}} style={styles.symbol}>Coin
          </Text>
        </View>
        <View style={{ width: 90 }}>
          <Text onPress={()=>{setSortCat("price")}} style={styles.price}>Price
          </Text>
        </View>
        <View style={{ width: 70 }}>
          <Text onPress={()=>{setSortCat("24hr")}} style={styles.percentage}>24hr
          </Text>
        </View>
        <View>
          <Text onPress={()=>{setSortCat("cap")}} style={styles.marketCap}>Market Cap
          </Text>
        </View>
      </View>
    )
  }

  function renderPairs() {

    let coinListData = props.data.slice(0, props.filterAmount)

    coinListData = sortData(coinListData, sortCat)
    
    
    return (coinListData.map((pair: Coin) =>
      <View style={{ flexDirection: 'row', alignItems: 'center' }} key={pair.id}>
        <View style={{ width: 45, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Image style={styles.tinyLogo} source={{
            uri: pair.image,
          }}></Image>
          <Text
            style={styles.symbol}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)">
            {pair.symbol.toUpperCase()}
          </Text>
        </View>
        <View style={{ width: 90 }}>
          <Text
            style={styles.price}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)">
            {`$${pair.current_price}`}
          </Text>
        </View>
        <View style={{ width: 70 }}>
          <Text style={styles.percentage}
            lightColor={isPositive(pair.price_change_percentage_24h) ? 'green' : 'red'}
            darkColor={isPositive(pair.price_change_percentage_24h) ? 'green' : 'red'}>
            {`${pair.price_change_percentage_24h.toFixed(2)}%`}
          </Text>
        </View>
        <View>
          <Text
            style={styles.marketCap}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)">
            {`$${Number(pair.market_cap).toLocaleString()}`}
          </Text>
        </View>
      </View>
    ))
  }

  return (
    <View>
      {renderHeaders()}
      {lineBreak()}
      {renderPairs()}
    </View>
  )

}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 15,
    height: 15
  },
  getStartedContainer: {
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  symbol: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'left',
  },
  price: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'right'
  },
  percentage: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'right',
    marginRight: 10
  },
  marketCap: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'right',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});