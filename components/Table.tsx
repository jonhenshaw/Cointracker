import * as React from 'react';
import { useEffect } from 'react';
import { Image, StyleSheet, ScrollView, RefreshControl, FlatList, SafeAreaView, ImageSourcePropType } from 'react-native';
import { Text, View } from './Themed';
import { getMarkets, Coin } from '../api/coinGecko';

interface TableProps {
  data: Coin[],
  filterAmount: number
}

export const isPositive = (number: number): boolean => number >= 0 ? true : false;

export default function Table(props: TableProps) {

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
          <Text style={styles.symbol}>Coin
          </Text>
        </View>
        <View style={{ width: 90 }}>
          <Text style={styles.price}>Price
          </Text>
        </View>
        <View style={{ width: 70 }}>
          <Text style={styles.percentage}>24hr
          </Text>
        </View>
        <View>
          <Text style={styles.marketCap}>Market Cap
          </Text>
        </View>
      </View>
    )
  }

  function renderPairs() {
    return (props.data.slice(0, props.filterAmount).map((pair: Coin) =>
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