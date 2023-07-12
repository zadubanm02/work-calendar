import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import SelectedDateView from "../components/SelectedDateView";

export default function DayDetailScreen() {
  return (
    <ScrollView>
      <SelectedDateView />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
