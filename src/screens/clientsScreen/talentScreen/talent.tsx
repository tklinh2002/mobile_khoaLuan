import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { TextInput } from "react-native-gesture-handler";
import IconEntypo from "react-native-vector-icons/Entypo";
import type { PickerItem } from "react-native-woodpicker";
import { Picker } from "react-native-woodpicker";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { useQueryClient } from "@tanstack/react-query";
const Talent = ({ navigation, talent }) => {
  const queryClient = useQueryClient();
  const [modalVisible, setModalVisible] = useState(false);
  const handInvite = () => {
    setModalVisible(true);
  };
  const [pickedData, setPickedData] = useState<PickerItem>();
  const user = {
    fullname: talent.last_name + " " + talent.first_name,
    avatar_url: talent.avatar_url || null,
    position: talent.position,
  };

  const listpost = queryClient.getQueryData(["listpost"])["data"] as any[];
  const data: PickerItem[] = listpost?.map((item) => ({
    label: item.title,
    value: item.id
  }));
  const listSkills = queryClient.getQueryData(["listSkills"]);
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Image
          source={
            user.avatar_url === null
              ? require("../../../assets/avatar_temp.jpg")
              : { uri: user.avatar_url }
          }
          style={{ width: 60, height: 60, borderRadius: 30, marginLeft: 10 }}
        />
        <View>
          <Text style={{ fontSize: 20 }}>{user.fullname}</Text>
          <Text style={{ fontSize: 20, color: "green" }}>{user.position}</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
        <Text style={styles.text}>4/5</Text>
        <Text style={styles.text}>1ETH</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "green" }]}
        onPress={handInvite}
      >
        <Text style={{ fontSize: 16, color: "white" }}>Mời ứng viên</Text>
      </TouchableOpacity>

      {/* modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.containerModal}>
            <View style={styles.contentModal}>
              <View>
                <Text
                  style={{
                    fontSize: 25,
                    marginHorizontal: 10,
                    marginVertical: 10,
                  }}
                >
                  Lời mời công việc
                </Text>
                <IconAntDesign
                  name="close"
                  size={30}
                  style={{ position: "absolute", top: 5, right: 5 }}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                />
              </View>
              <View style={[styles.info, { justifyContent: "flex-start" }]}>
                <Image
                  source={require("../../../assets/avatar_temp.jpg")}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    marginHorizontal: 5,
                  }}
                />
                <View>
                  <Text style={{ fontSize: 20 }}>Nguyễn Văn A</Text>
                  <Text style={{ fontSize: 20, color: "green" }}>
                    Front-end Developer
                  </Text>
                </View>
              </View>
              <Dropdown
                style={styles.dropdown}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select item"
                searchPlaceholder="Search..."
                value={pickedData}
                onChange={(item) => {
                  setPickedData(item.value);
                }}
              />
              <Text style={styles.text}>Tin nhắn</Text>
              <TextInput multiline numberOfLines={5} style={styles.input} />

              <TouchableOpacity
                style={[styles.button, { backgroundColor: "green" }]}
              >
                <Text style={[styles.text, { color: "white" }]}>
                  Gửi lời mời
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    marginHorizontal: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  containerModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  contentModal: {
    width: "90%",
    height: "70%",
    backgroundColor: "white",
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 10,
    marginVertical: 10,
    height: 300,
  },
  dropdown: {
    borderColor: "black",
    borderWidth: 1,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default Talent;
