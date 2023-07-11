import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

type Props = {
  note: string;
  onDelete: () => void;
};

export default function NoteRow({ note, onDelete }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{note}</Text>
      <Pressable onPress={onDelete}>
        <Feather name="trash-2" size={24} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    marginVertical: 10,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    flexWrap: "wrap",
  },
});
