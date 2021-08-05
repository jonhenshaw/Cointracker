import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, ScrollView, Linking, RefreshControl } from 'react-native';
import { Text, View } from './Themed';

import { getNews, ICryptoPanicResponse } from '../api/cryptoPanic';

export default function NewsFeed() {
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [newsFeed, setNewsFeed] = useState<ICryptoPanicResponse>();

  async function getData() {
    getNews()
      .then((json) => setNewsFeed(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getData();
  }, []);

  function renderNews() {
    if (newsFeed != undefined) {
      return newsFeed.results.sort(x => Date.parse(x.published_at)).map((item, index) =>
        <Text
          key={index}
          onPress={() => Linking.openURL(item.url)}>
          {item.title + "\n\n"}
        </Text>
      );
    }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData().then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      style={styles.getStartedContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      {renderNews()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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