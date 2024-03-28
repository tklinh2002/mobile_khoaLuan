import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
const Skill = ({skill}) => {
  return (
    <TouchableOpacity style={styles.skill} >
      <Text style={{ color: "white", fontSize: 18, marginRight: 5 }}>{skill.name}</Text>
    </TouchableOpacity>
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
