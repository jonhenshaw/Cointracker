import React, { useState } from 'react';
import { useEffect } from 'react';
import { Image, StyleSheet, ScrollView, RefreshControl, FlatList, SafeAreaView, ImageSourcePropType } from 'react-native';
import { Text, View } from './Themed';
import * as Icons from '../assets/icons/index'

import { getTickerInformation, IKrakenResponse } from '../api/kraken';

export default function CoinList() {
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState<IKrakenResponse>();
  const [pairs, setPairs] = useState(['BTCUSD', 'ETHUSD', 'ADAUSD', 'DOGEUSD', 'MATICUSD', 'BCHUSD', 'LTCUSD', 'XLMUSD']);

  const date = new Date();
  const day = date.toDateString();
  const time = date.toLocaleTimeString();

  var pairMap: Record<string, string> = {
    'BTCUSD': 'XXBTZUSD',
    'ETHUSD': 'XETHZUSD',
    'ADAUSD': 'ADAUSD',
    'DOGEUSD': 'XDGUSD',
    'MATICUSD': 'MATICUSD',
    'BCHUSD': 'BCHUSD',
    'LTCUSD': 'XLTCZUSD',
    'XLMUSD': 'XXLMZUSD'
  }

  var iconMap: Record<string, ImageSourcePropType> = {
    'BTCUSD': Icons.btc,
    'ETHUSD': Icons.eth,
    'ADAUSD': Icons.ada,
    'DOGEUSD': Icons.doge,
    'MATICUSD': Icons.matic,
    'BCHUSD': Icons.bch,
    'LTCUSD': Icons.ltc,
    'XLMUSD': Icons.xlm
  }

  function renderPairs() {
    return (pairs.map((pair, index) =>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} key={index}>
        <Image style={styles.tinyLogo} source={iconMap[pair]}></Image>
        <Text
          key={index}
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          {pair.replace('USD', '')}: ${data != undefined ? JSON.stringify(parseFloat(data.result[pairMap[pair]].c[0])) : ""}
        </Text>
      </View>
    ))
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData().then(() => setRefreshing(false));
  }, []);

  async function getData() {
    getTickerInformation(pairs)
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
