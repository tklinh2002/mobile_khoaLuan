import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useQueryClient } from "@tanstack/react-query";
import { Icon } from "react-native-paper";
import IconAntDesign from "react-native-vector-icons/AntDesign";
const Header = () => {
  const nav = useNavigation();
  const queryClient = useQueryClient();
  const infoLogin = queryClient.getQueryData(["infoLogin"]);
  const user = {
    name: infoLogin["user"].username || "Unknown",
    avatar: infoLogin["user"].avatar_url|| null,
    user_type: infoLogin["user_type"] || "client",
  }
  // const user = {
  //   name: "Unknown",
  //   avatar: null,
  //   user_type: "client",
  // }
  return (
    <View
      style={{ width: "100%",alignItems:"flex-end", height:80, flexDirection: "row", marginBottom: 10}}
    >
      <TouchableOpacity onPress={() => nav.dispatch(DrawerActions.openDrawer()) }>
        <Image
          source={(user?.avatar === null||String(user?.avatar).trim().length ===0)? require("../../assets/avatar_temp.jpg"): {uri: user.avatar}}
          style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }}
        />
      </TouchableOpacity>
      <Text style={{ textAlign: "left", fontSize: 20, fontWeight: "bold", marginLeft:20, flex:1 }}>
        {user?.name + " (" + user?.user_type+ ")"}
      </Text>
      <TouchableOpacity style={{marginHorizontal:10}} onPress={()=>{
      }}>
        <IconAntDesign name="bells" size={30} color="black" />
        </TouchableOpacity> 
      <TouchableOpacity
      style={{marginHorizontal:10}}
       onPress={()=>{
        nav.reset({
          index: 0,
          routes: [{ name: "Start" } as never],
        });
      }}>
        <IconAntDesign name="logout" size={30} color="black" />
        </TouchableOpacity> 
        
         
    </View>
  );
};
export default Header;
