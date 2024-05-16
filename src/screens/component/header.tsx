import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { Icon, Title } from "react-native-paper";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { useNotification } from "../../hook/hook";
import { formatTimePost } from "../../utils/format";
import { AuthContext } from "../../utils/context";
const Header = () => {
  const nav = useNavigation();
  const queryClient = useQueryClient();
  const [openNoti, setOpenNoti] = React.useState(false);
  const { getNotification } = useNotification();
  const { infoLogin, login, logout } = useContext(AuthContext);
  const handleLogout = async () => {
    await queryClient.clear();
    nav.reset({
      index: 0,
      routes: [{ name: "Start" } as never],
    });
  };
  return (
    <View
      style={{
        width: "100%",
        alignItems: "flex-end",
        height: 80,
        flexDirection: "row",
        marginBottom: 10,
      }}
    >
      <TouchableOpacity
        onPress={() => nav.dispatch(DrawerActions.openDrawer())}
      >
        <Image
          source={
            infoLogin["user"]?.avatar_url === null ||
            String(infoLogin["user"]?.avatar_url).trim().length === 0
              ? require("../../assets/avatar_temp.jpg")
              : { uri: infoLogin.user?.avatar_url }
          }
          style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }}
        />
      </TouchableOpacity>
      <View style={{ flex: 1 }}></View>
      <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        onPress={() => setOpenNoti(!openNoti)}
      >
        <IconAntDesign name="bells" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={handleLogout}>
        <IconAntDesign name="logout" size={30} color="black" />
      </TouchableOpacity>
      <ScrollView
        style={[styles.containerNoti, { display: openNoti ? "flex" : "none" }]}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", margin: 5 }}>
          Thông báo
        </Text>
        {getNotification.data?.data?.data.map((item) => (
          <View key={item?.id} style={styles.contentNoti}>
            <Text style={styles.titleNoti}>{item?.title}</Text>
            <Text style={styles.textNoti}>{item?.message}</Text>
            <Text>{formatTimePost(item?.created_at)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  containerNoti: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    top: 90,
    right: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
  },
  titleNoti: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
    color: "black",
  },
  contentNoti: {
    borderWidth: 0.5,
    padding: 10,
    marginTop: 10,
  },
  textNoti: {
    fontSize: 16,
    color: "black",
  },
});
export default Header;
