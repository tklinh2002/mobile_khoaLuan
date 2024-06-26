import { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import type { PickerItem } from "react-native-woodpicker";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inviteFreelancerApi } from "../../../apis/job.api";
import { TextInput } from "react-native-paper";
import ModalLoading from "../../component/modalLoading";
import { sendNoticationApi } from "../../../apis/noti.api";
import { useNotification } from "../../../hook/hook";
import { INotiParams } from "../../../apis/type.task.api";
import { AuthContext } from "../../../utils/context";
const Talent = ({ navigation, talent }) => {
  const queryClient = useQueryClient();
  const [modalVisible, setModalVisible] = useState(false);
  const [mail_invite, setMail_invite] = useState("");
  const { infoLogin, login, logout } = useContext(AuthContext);
  const token = infoLogin["access_token"];
  const [title, setTitle] = useState(
    `Lời mời làm việc từ ${infoLogin["user"]?.username}`
  );
  const { sendNotication } = useNotification();
  const inviteFreelancer = useMutation({
    mutationKey: ["inviteFreelancer"],
    mutationFn: () =>
      inviteFreelancerApi(
        pickedData.value,
        talent["id"],
        mail_invite,
        token,
        title
      ),
    onError: (err) => {
      Alert.alert("Gửi lời mời thất bại", err["response"].data.data.title);
    },
    onSuccess: (res) => {
      const data: INotiParams = {
        title: `Lời mời làm việc từ ${infoLogin["user"]?.username}`,
        message: mail_invite,
        smail: 1,
        linkable: `/freelancer/job/${pickedData.value}`,
        imagefile: null,
        user_type: "freelancer",
        user_id: talent["id"],
      };
      sendNotication
        .mutateAsync(data)
        .then(() => {
          console.log("Gửi thông báo thành công");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
      Alert.alert("Gửi lời mời thành công");
      setModalVisible(false);
      return res;
    },
  });
  const handInvite = async () => {
    if (!pickedData) {
      Alert.alert("Chưa chọn bài đăng");
      return;
    }
    if (mail_invite === "") {
      Alert.alert("Chưa nhập tin nhắn");
      return;
    }

    await inviteFreelancer.mutateAsync();
  };
  const user = {
    fullname: talent.last_name + " " + talent.first_name,
    avatar_url: talent.avatar_url || null,
    position: talent.position,
  };
  const listpost = queryClient.getQueryData(["listpost"])["data"] as any[];
  // console.log("listpost "+ listpost[0].id);
  const [pickedData, setPickedData] = useState<PickerItem>();
  const data: PickerItem[] = listpost?.map((item) => ({
    label: item.title,
    value: item.id,
  }));
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
          <Text style={{ fontSize: 20, color: "green" }}>
            {talent?.username}
          </Text>
          <Text style={{ fontSize: 20, color: "green" }}>{user.position}</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      ></View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "green" }]}
        onPress={() => setModalVisible(true)}
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
                    marginRight: 10,
                  }}
                />
                <View>
                  <Text style={{ fontSize: 20 }}>{user.fullname}</Text>
                  <Text style={{ fontSize: 20, color: "green" }}>
                    {talent?.username}
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
                  setPickedData(item);
                }}
              />
              <TextInput
                label={"Tin nhắn"}
                mode="outlined"
                multiline
                numberOfLines={5}
                style={styles.input}
                value={mail_invite}
                onChangeText={(t) => setMail_invite(t)}
              />
              <TouchableOpacity
                onPress={handInvite}
                style={[styles.button, { backgroundColor: "green" }]}
              >
                <Text style={[styles.text, { color: "white" }]}>
                  Gửi lời mời
                </Text>
              </TouchableOpacity>
            </View>
            <ModalLoading visible={inviteFreelancer.isPending} />
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
    justifyContent: "flex-start",
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
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "white",
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
