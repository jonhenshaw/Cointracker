import React, { useState } from 'react';
import { useEffect } from 'react';
import { Image, StyleSheet, ScrollView, RefreshControl, FlatList, SafeAreaView, ImageSourcePropType } from 'react-native';
import { Text, View } from './Themed';
import { getMarkets, Coin } from '../api/coinGecko';

export default function CoinList() {
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState<Coin[]>([]);

  const date = new Date();
  const day = date.toDateString();
  const time = date.toLocaleTimeString();

  function renderPairs() {
    var filteredData: any = data.slice(0, 50);
    return (filteredData.map((pair: Coin) =>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} key={pair.id}>
        <Image style={styles.tinyLogo} source={{
          uri: pair.image,
        }}></Image>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          {pair.symbol.toUpperCase()}
        </Text>
        <Text
          style={styles.price}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          {pair.current_price}
        </Text>
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
      <Text style={{ marginBottom: 10 }}>
        Last updated: {day} {time}
      </Text>
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
    width: 20,
    height: 20,
    marginRight: 5
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
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'left',
  },
  price: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'right',
    marginLeft: 10
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
