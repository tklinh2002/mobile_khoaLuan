import React from "react";
import { View, Text, StyleSheet } from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
const Skill = () => {
  return (
    <View style={styles.skill}>
      <Text style={{ color: "white", fontSize: 18, marginRight: 5 }}>Java</Text>
      <IconAntDesign name="close" size={20} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  skill: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 8,
    marginHorizontal: 8,
    justifyContent: "center",
    backgroundColor: "green",
    flexDirection: "row",
    padding: 5,
    marginVertical: 3,
  },
});
export default Skill;
