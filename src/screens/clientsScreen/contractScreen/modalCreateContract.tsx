import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Keyboard,
  ScrollView,
  Image,
  Modal,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { useQueryClient } from "@tanstack/react-query";
import SignatureBox from "../../component/signatureBox";
import { Button, Checkbox, TextInput } from "react-native-paper";
import { abi } from "../../../../abi";
import { useAccount, useContractWrite } from "wagmi";
import { W3mButton, Web3Modal } from "@web3modal/wagmi-react-native";
import { INotiParams } from "../../../apis/type.task.api";
import { useNotification, useOTP } from "../../../hook/hook";
import ModalPolicy from "../../component/modalPolici";
import ModalDetailJobContract from "../../component/modalDetailJobContract";
const ModalCreateContract = ({ setmodalvisiable, candidate }) => {
  const queryClient = useQueryClient();
  const infoLogin = queryClient.getQueryData(["infoLogin"]) as any;
  const [modalVisible, setModalVisible] = useState(false);
  const [signature, setSignature] = useState("");
  const [checked, setChecked] = useState(false);
  const { isConnected } = useAccount();
  const { sendNotication } = useNotification();
  const [modalDetailJob, setModalDetailJob] = useState(false);

  const [modalPolicy, setModalPolicy] = useState(false);

  const job = queryClient.getQueryData([
    "job",
    Number(candidate?.job_id),
  ] as any) as any;
  const createContract = useContractWrite({
    address: "0x9a48613E8053D7B7A473AE835A7cC4E09bC705E4",
    abi,
    functionName: "createContract",
    args: [
      job?.title,
      job?.desc,
      signature,
      Number(job?.bids),
      job?.id,
      candidate?.freelancer_id,
      job?.client_id,
    ],
    value: Number(job?.bids),
    onError: (error) => {
      if (error.message.includes("User rejected the transaction")) {
        console.log("User rejected contract creation.");
      } else {
        console.error("Error creating contract:", error);
      }
    },
  } as any);
  const handleCreateContract = async () => {
    if (signature == "") {
      Alert.alert("Error", "Vui lòng ký tên");
      return;
    }
    if (!isConnected) {
      Alert.alert("Error", "Vui lòng kết nối ví");
      return;
    }
    createContract
      .writeAsync()
      .then(() => {
        const data: INotiParams = {
          title: `Create contract ${job?.title} success`,
          message: job?.desc,
          smail: 1,
          linkable: `client/post/${job?.id}`,
          imagefile: null,
          user_type: "freelancer",
          user_id: candidate?.freelancer_id,
        };
        sendNotication
          .mutateAsync(data)
          .then(() => {
            console.log("Gửi thông báo thành công");
          })
          .catch((err) => {
            console.log(err.response.data);
          });
        Alert.alert("Success", "Tạo hợp đồng thành công");
        setmodalvisiable(false);
      })
      .catch((error) => {
        Alert.alert("Error", "Không thể tạo hợp đồng. Vui lòng thử lại sau.");
      });
  };

  return (
    <ScrollView>
      <TouchableNativeFeedback
        style={styles.container}
        onPress={Keyboard.dismiss}
      >
        <View style={styles.content}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={[
                styles.text,
                { flex: 1, textAlign: "center", paddingLeft: 30 },
              ]}
            >
              Tạo hợp đồng
            </Text>
            <IconAntDesign
              name="close"
              size={30}
              color="black"
              onPress={() => setmodalvisiable(false)}
            />
          </View>
          {/* kết nối ví */}
          <View>
            <Web3Modal />
            <W3mButton balance="show" />
          </View>
          <View style={styles.info}>
            <Text style={{ fontSize: 20 }}>Freelancer</Text>
            <Text style={styles.textInfo}>Username: {candidate?.username}</Text>
            <Text style={styles.textInfo}>Email: {candidate?.email}</Text>
          </View>
          <View style={styles.info}>
            <Text style={{ fontSize: 20 }}>Client</Text>
            <Text style={styles.textInfo}>
              Tên:{" "}
              {infoLogin?.user?.last_name + " " + infoLogin?.user?.first_name}
            </Text>
            <Text style={styles.textInfo}>Email: {infoLogin?.user?.email}</Text>
            <Text style={styles.textInfo}>
              Username: {infoLogin?.user?.username}
            </Text>
            <Text style={styles.textInfo}>
              Số điện thoại: {infoLogin?.user?.phone_num}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={{ fontSize: 20 }}>Chi tiết công việc</Text>
            <Text style={styles.textInfo}>{job?.title}</Text>
            <Text style={styles.textInfo}>Ngân sách: {job?.bids}</Text>
            <TouchableOpacity onPress={() => setModalDetailJob(true)}>
              <Text
                style={{
                  fontStyle: "italic",
                  color: "blue",
                  textAlign: "center",
                }}
              >
                Xem thêm ........
              </Text>
            </TouchableOpacity>
          </View>
          {/* Điều khoản hợp đồng */}

          <View style={[styles.info, { flexDirection: "row" }]}>
            <Text>Điều khoản hợp đồng:</Text>
            <TouchableOpacity onPress={() => setModalPolicy(true)}>
              <Text style={{ color: "blue", marginLeft: 10 }}>điều khoản</Text>
            </TouchableOpacity>
            <ModalPolicy
              visible={modalPolicy}
              onClose={() => setModalPolicy(false)}
            />
          </View>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <View style={{ borderWidth: 1 }}>
              <Checkbox
                status={checked ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
            </View>
            <Text style={styles.textInfo}>
              Đã đọc và đồng ý với điều khoản hợp đồng
            </Text>
          </View>
          {signature != "" ? (
            <Image
              source={{
                uri: `https://my-final.s3.ap-southeast-1.amazonaws.com/my-final/${signature}`,
              }}
              style={{ width: 150, height: 150, alignSelf: "center" }}
              resizeMode="contain"
            />
          ) : (
            <Text style={[styles.textInfo, { fontStyle: "italic" }]}>
              Chưa ký tên
            </Text>
          )}
          {checked ? (
            <>
              <View
                style={{
                  justifyContent: "space-around",
                  flexDirection: "row",
                  margin: 10,
                }}
              >
                <Button mode="outlined" onPress={() => setModalVisible(true)}>
                  Ký tên
                </Button>
                <Button mode="outlined" onPress={() => setSignature("")}>
                  Xóa chữ ký
                </Button>
              </View>
              <View
                style={{
                  justifyContent: "space-around",
                  flexDirection: "row",
                  margin: 10,
                }}
              >
                <Button mode="contained" onPress={handleCreateContract}>
                  Tạo hợp đồng
                </Button>
              </View>
            </>
          ) : null}
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
          >
            <View
              style={{
                flex: 1,
                borderColor: "black",
                borderWidth: 1,
                margin: 5,
                marginVertical: "10%",
                borderRadius: 20,
                backgroundColor: "white",
              }}
            >
              <SignatureBox
                setmodalvisiable={setModalVisible}
                setSignature={setSignature}
              />
            </View>
          </Modal>
          <Modal visible={modalDetailJob} animationType="slide" transparent={true}>
            <ModalDetailJobContract
              jobId={job?.id}
              setModalVisible={setModalDetailJob}
            />
          </Modal>
        </View>
      </TouchableNativeFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    marginTop: 40,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 30,
    marginHorizontal: 10,
    marginVertical: 5,
    alignSelf: "center",
    fontWeight: "bold",
  },
  button: {
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
  },
  containerTask: {
    marginHorizontal: 10,
    marginVertical: 10,
    flex: 1,
  },
  task: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputTask: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 7,
    marginHorizontal: 10,
    marginVertical: 10,
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    alignSelf: "center",
  },
  textInfo: {
    fontSize: 16,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  info: {
    marginVertical: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
export default ModalCreateContract;
