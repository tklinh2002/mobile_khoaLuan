import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity, Image } from "react-native";
import { Button, Dialog, RadioButton, TextInput } from "react-native-paper";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
const ChoiceRoleScreen = ({ navigation }) => {
  const [role, setRole] = useState("client");
  const [visible, setVisible] = useState(false);
  const queryClient = useQueryClient();

  const handNext = () => {
    const data = {
      userName: null,
      email: null,
      password: null,
      phoneNum: null,
      typeUser: role,
      lastName: null,
      firstName: null,
      address: null,
    };
    queryClient.setQueryData(["user_register"], data);
  };
  return (
    <View style={styles.container}>
      <View style={{ width: "95%", height: "12%", justifyContent: "center" }}>
        <IconAntDesign
          name="left"
          size={25}
          color="#0866FF"
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>FreelanceVN</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 25, fontWeight: "bold", marginTop: 20 }}>
            Chọn vai trò
          </Text>
        </View>
        {/* button radio */}
        <View>
          <RadioButton.Group
            onValueChange={(newValue) => {
              setRole(newValue);
              console.log(newValue);
            }}
            value={role}
          >
            <View style={styles.containerRadio}>
              <View style={styles.radio}>
                <RadioButton value="client" />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.text}>Client</Text>
                <Text> Tìm kiếm freelancer và tạo bài đăng</Text>
              </View>
            </View>
            <View style={styles.containerRadio}>
              <View style={styles.radio}>
                <RadioButton value="freelancer" />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.text}>Freelancer</Text>
                <Text> Tìm kiếm công việc</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>

        {/* button next */}
        <Button
          mode="contained"
          onPress={() => {
            handNext();
            navigation.navigate("SignUp");
          }}
          style={[styles.button, { backgroundColor: "green" }]}
        >
          <View>
            <Text style={{ fontSize: 20, color: "white" }}>Tiếp theo</Text>
          </View>
        </Button>

        <Button
          mode="contained"
          onPress={() => {}}
          style={[styles.button, { backgroundColor: "#0866FF" }]}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 20, color: "white" }}>
              Tiếp theo với google
            </Text>
            <Image
              source={require("../../assets/google.png")}
              style={{ width: 20, height: 20, padding: 10, marginLeft: 10 }}
            />
          </View>
        </Button>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    color: "#0866FF",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
  },
  button: {
    borderRadius: 30,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  containerRadio: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "green",
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 10,
    marginVertical: 30,
  },
  radio: {
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 10,
  },
});
export default ChoiceRoleScreen;
