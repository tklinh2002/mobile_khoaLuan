import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
const Invite = () => {
  const i = 0;
  const status = {
    0: {
      color: "#FFA500",
      text: "Chờ xác nhận",
    },
    1: {
      color: "#0866FF",
      text: "Đã xác nhận",
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Image
          source={require("../../../assets/avatar_temp.jpg")}
          style={{ width: 60, height: 60, borderRadius: 30, marginLeft: 10 }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 20 }}>Nguyễn Văn A</Text>
          <Text style={{ fontSize: 20, color: "green" }}>
            Front-end Developer
          </Text>
        </View>
      </View>
      <View style={styles.containerFooter}>
        <Text style={styles.text}>Đánh giá: 4/5</Text>
        <Text style={styles.text}>Tổng thu nhập: 1ETH</Text>
      </View>
      <View style={styles.containerFooter}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: status[i].color, width: 125 },
          ]}
        >
          <Text style={{ fontSize: 16, color: "white" }}>{status[i].text}</Text>
        </TouchableOpacity>
        {status[i].text === "Đã xác nhận" ? (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "green" }]}
          >
            <Text style={{ fontSize: 16, color: "white" }}>Taọ hợp đồng</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity style={[styles.button, { backgroundColor: "red" }]}>
          <Text style={{ fontSize: 16, color: "white" }}>Thu hồi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginVertical: 10,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
  },
  containerFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Invite;
