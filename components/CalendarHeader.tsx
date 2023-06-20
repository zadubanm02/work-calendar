import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  headerText: string;
};

const CalendarHeader: React.FC<Props> = ({ headerText }) => {
  return (
    <View>
      <Text style={styles.text}>{headerText}</Text>
    </View>
  );
};

export default CalendarHeader;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
