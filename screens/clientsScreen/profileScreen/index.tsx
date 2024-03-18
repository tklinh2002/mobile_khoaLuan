import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native-gesture-handler";
const ProfileScreen = ({ navigation }) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={{flexDirection:"row", justifyContent:"center", paddingHorizontal:10}}>
          <Text style={{ fontSize: 30, fontWeight: "bold", flex: 1 }}>Tài khoản</Text>
          <TouchableOpacity style={styles.button}>
            <IconAntDesign
              name="edit"
              size={30}
              color="green"
              onPress={() => {
                navigation.navigate("EditProfile");
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <Image
            source={require("D:\\Code\\KLTN\\timViec\\assets\\avatar_temp.jpg")}
            style={{
              width: 120,
              height: 120,
              borderRadius: 30,
              marginLeft: 10,
              alignSelf: "center",
            }}
          />

          <View>
            <Text
              style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}
            >
              Tên
            </Text>
            <Text style={styles.text}>Nguyễn Văn A</Text>
            <Text
              style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}
            >
              Email
            </Text>
            <Text style={styles.text}>tklinh@gmail.com</Text>
            <Text
              style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}
            >
              Số điện thoại
            </Text>
            <Text style={styles.text}>0961613087</Text>
            <Text
              style={[styles.text, { color: "#C0C0C0", fontWeight: "bold" }]}
            >
              Địa chỉ
            </Text>
            <Text style={styles.text}>Bình Dương</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  info: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  button: {
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
  },
});
export default ProfileScreen;
