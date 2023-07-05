import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function AddNoteScreen() {
  const navigation = useNavigation();
  const [text, onChangeText] = React.useState("");
  const onClose = () => {
    onChangeText("");
    return navigation.goBack();
  };

  const onSubmit = () => {
    // SAVE to DB

    onChangeText("");
    return navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 5,
        }}
      >
        <Pressable onPress={onClose}>
          <AntDesign name="closecircleo" size={26} color="black" />
        </Pressable>
        <Text style={styles.text}>Pridať poznámku</Text>
        <View />
      </View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Text poznamky"
        multiline
        numberOfLines={15}
      />
      <Pressable style={styles.addButton}>
        <Text style={styles.addText}>Pridať</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    height: 180,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontSize: 18,
  },
  addButton: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#000",
    margin: 10,
    borderRadius: 10,
  },
  addText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
