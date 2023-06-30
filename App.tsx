import React from "react";
import Navigation from "./navigation";
import { SafeAreaView, View, StatusBar, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
