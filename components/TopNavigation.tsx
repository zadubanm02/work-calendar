import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { mapDayString } from "../lib/utils";

type Props = {
  headerDay?: string;
};

export default function TopNavigation({ headerDay }: Props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" />
      </Pressable>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
        {mapDayString(headerDay ?? "") ?? "Dnes"}
      </Text>
      <View style={{ marginHorizontal: 10 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 30,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
