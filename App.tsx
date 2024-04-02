import React from "react";
import Navigation from "./navigation";
import { SafeAreaView, View, StatusBar, StyleSheet } from "react-native";
import { Provider } from "jotai";

export default function App() {
  return (
    <Provider>
      <View style={styles.container}>
        <StatusBar barStyle={"dark-content"} />
        <Navigation />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
