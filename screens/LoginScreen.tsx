import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Button, ScrollView, SafeAreaView } from 'react-native';

import { useStoreContext } from '../context/StoreProvider'

interface LoginCredentials {
  username: string,
  password: string
}

async function loginUser(credentials: LoginCredentials) {
  var token = fetch('http://192.168.0.139:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(data => data.json())

  return await token;
}

export default function LoginScreen(props: {}) {
  const store = useStoreContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await loginUser({ username, password })
      .then(result => {
        store.setUsername(username)
        store.setToken(result.token)
      });
  }

  return store.token == "" ? (
    <SafeAreaView style={styles.view}>
      <View style={styles.login}>
        <Text style={styles.loginText}>Please log in</Text>
        <View style={{ width: 200 }}>
          <View>
            <TextInput style={styles.input} placeholder="Username" autoCompleteType="username" value={username} onChangeText={setUsername} />
          </View>
          <View>
            <TextInput style={styles.input} placeholder="Password" autoCompleteType="password" value={password} onChangeText={setPassword} />
          </View>
        </View>
        <View style={{ borderWidth: 1, borderRadius: 20, borderColor: 'white' }}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </View>
    </SafeAreaView>
  )  : <View></View>
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  login: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    color: 'red'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    color: 'white'
  },
  loginText: {
    color: 'white'
  }
})