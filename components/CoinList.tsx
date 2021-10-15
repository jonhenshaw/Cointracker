import React, { useState } from 'react';
import { useEffect } from 'react';
import { Image, StyleSheet, ScrollView, RefreshControl, FlatList, SafeAreaView, ImageSourcePropType } from 'react-native';
import { Text, View } from './Themed';
import { getMarkets, Coin } from '../api/coinGecko';
import { Line } from 'react-native-svg';

export default function CoinList() {
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState<Coin[]>([]);

  const date = new Date();
  const day = date.toDateString();
  const time = date.toLocaleTimeString();

  const filterAmount = 30;

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
    return (data.slice(0, filterAmount).map((pair: Coin) =>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            lightColor={pair.price_change_percentage_24h >= 0 ? 'green' : 'red'}
            darkColor={pair.price_change_percentage_24h >= 0 ? 'green' : 'red'}>
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData().then(() => setRefreshing(false));
  }, []);

  async function getData() {
    getMarkets()
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  const isPositive = (number: number): boolean => number >= 0 ? true : false;

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
    >
      {renderHeaders()}
      {lineBreak()}
      {renderPairs()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
