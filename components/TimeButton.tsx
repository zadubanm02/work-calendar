import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  time: string;
  active?: boolean;
};

export default function TimeButton({ active, time }: Props) {
  return (
    <Pressable
      style={[
        styles.container,
        { backgroundColor: active ? "#000" : "rgb(226 232 240)" },
      ]}
    >
      <Text style={[styles.text, { color: active ? "#fff" : "#000" }]}>
        {time}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 7,
    borderRadius: 5,
    margin: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});