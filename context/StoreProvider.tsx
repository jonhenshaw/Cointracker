import React, { createContext, useContext, useState } from "react"

const defaultValue : ContextState = {
  username: "",
  token: "",
  setToken: () => {},
  setUsername: () => {}
}

interface ContextState {
  username: string,
  token: string,
  setToken: (token: string) => void,
  setUsername: (username: string) => void
}

export function StoreProvider(props: any) {
  const [token, setToken] = useState<string>(defaultValue.token);
  const [username, setUsername] = useState<string>(defaultValue.username);

  const storeData = { token, setToken, username, setUsername }

  return <StoreContext.Provider value={storeData} {...props}/>
}

export const StoreContext = createContext<ContextState>(defaultValue);

export function useStoreContext() {
  return useContext(StoreContext);
}