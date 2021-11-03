import * as React from 'react';
import { useEffect, useState } from 'react';
import { Text, Image, StyleSheet, ScrollView, RefreshControl, FlatList, SafeAreaView, ImageSourcePropType } from 'react-native';
import { getMarkets, Coin } from '../api/coinGecko';

import Table from './Table'

import { useStoreContext } from '../store/StoreProvider'

export default function CoinList() {
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState<Coin[]>([]);

  const date = new Date();
  const day = date.toDateString();
  const time = date.toLocaleTimeString();

  const filterAmount = 30;

  const store = useStoreContext();

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

  const [sortCat,setSortCat] = React.useState("none")

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
    >
      <Text style={{color: 'white', paddingBottom: 5}}>{`Logged in as: ${store.username}`}</Text>
      <Table
        data={data}
        filterAmount={filterAmount}
        sortCat={sortCat}
        setSortCat={setSortCat}
        ></Table>
    </ScrollView>
  );
}



