import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ContractComplete from "./contractComplete";
const ContractCompleteScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <ContractComplete />
    </ScrollView>
  );
};
const styles = StyleSheet.create({});
export default ContractCompleteScreen;
