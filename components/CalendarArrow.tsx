import { StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  direction: "left" | "right";
};

const CalendarArrow: React.FC<Props> = ({ direction }) => {
  return direction === "right" ? (
    <AntDesign name="rightcircleo" size={24} color="black" />
  ) : (
    <AntDesign name="leftcircleo" size={24} color="black" />
  );
};

export default CalendarArrow;

const styles = StyleSheet.create({});
