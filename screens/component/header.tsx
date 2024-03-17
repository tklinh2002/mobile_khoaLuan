import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { DrawerActions, useNavigation } from '@react-navigation/native';
const Header = () => {
  const nav = useNavigation();
  return (
    <View
      style={{ width: "100%",alignItems:"flex-end", height:80, flexDirection: "row", marginBottom: 10}}
    >
      <TouchableOpacity onPress={() => nav.dispatch(DrawerActions.openDrawer()) }>
        <Image
          source={require("D:\\Code\\KLTN\\timViec\\assets\\avatar_temp.jpg")}
          style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }}
        />
      </TouchableOpacity>
      <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold", marginLeft:20 }}>
        Linh (Client)
      </Text>
    
    </View>
  );
};
export default Header;
