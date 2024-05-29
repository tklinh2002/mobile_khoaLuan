import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Touchable,
  TouchableNativeFeedback,
  Keyboard,
  ScrollView,
  Image,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";

import { useContext, useEffect, useState } from "react";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { useDetailContract, useOTP } from "../../../hook/hook";
import { Button, Checkbox, TextInput } from "react-native-paper";
import SignatureBox from "../../component/signatureBox";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDetailInfoApi } from "../../../apis/info.api";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { abi } from "../../../../abi";
import ModalLoading from "../../component/modalLoading";
import { AuthContext } from "../../../utils/context";
import ModalPolicy from "../../component/modalPolici";
import ModalDetailJobContract from "../../component/modalDetailJobContract";

const ModalDetailSign = ({ setmodalvisiable, contract }) => {
  const [checked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [signature, setSignature] = useState("");
  const { isConnected } = useAccount();
  const { getJobInfoByCurrentJobId } = useDetailContract(contract?.jobIdcurent);
  const { infoLogin, login, logout } = useContext(AuthContext);
  const token = infoLogin["access_token"];
  const { confirmAfterFreelancerSignaContract } = useOTP();
  const [modalDetailJob, setModalDetailJob] = useState(false);
  const [modalPolicy, setModalPolicy] = useState(false);
  const [modalVisibleReason, setModalVisibleReason] = useState(false);
  const FreelancerNoSign = useContractWrite({
    abi,
    address: "0x9a48613E8053D7B7A473AE835A7cC4E09bC705E4",
    functionName: "FreelancerNoSign",
    args: [contract?.id, "Từ chối ký hợp đồng"],
  } as any);

  // console.log("contract", contract);
  const clientRes = useQuery({
    queryKey: ["client", getJobInfoByCurrentJobId.data?.client_id + ""],
    queryFn: () =>
      getDetailInfoApi(
        token,
        "client",
        getJobInfoByCurrentJobId.data?.client_id + ""
      ),
    enabled: !getJobInfoByCurrentJobId.isLoading,
  });
  const freelancerRes = useQuery({
    queryKey: ["freelancer", getJobInfoByCurrentJobId.data?.freelancer_id + ""],
    queryFn: () =>
      getDetailInfoApi(
        token,
        "freelancer",
        getJobInfoByCurrentJobId.data?.freelancer_id + ""
      ),
    enabled: !getJobInfoByCurrentJobId.isLoading,
  });
  const acceptContract = useContractWrite({
    address: "0x9a48613E8053D7B7A473AE835A7cC4E09bC705E4",
    abi,
    functionName: "acceptContract",
    args: [contract?.jobIdcurent, signature],
    value: (Number(getJobInfoByCurrentJobId.data?.bids) * 0.5).toString(),
  } as any);
  const handleCreateContract = async () => {
    confirmAfterFreelancerSignaContract
      .mutateAsync(contract?.jobIdcurent)
      .then((res) => {
        acceptContract
          .writeAsync()
          .then((res) => {
            Alert.alert("Ký hợp đồng thành công");
            setmodalvisiable(false);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleNoSignContract = async () => {
    await FreelancerNoSign.writeAsync()
      .then((res) => {
        Alert.alert("Từ chối hợp đồng thành công");
        setmodalvisiable(false);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Từ chối hợp đồng thất bại");
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
              Ký hợp đồng
            </Text>
            <IconAntDesign
              name="close"
              size={30}
              color="black"
              onPress={() => setmodalvisiable(false)}
            />
          </View>
          {getJobInfoByCurrentJobId.isLoading ? (
            <View style={styles.container}>
              <ActivityIndicator size="large" color="black" />
            </View>
          ) : (
            <>
              <View style={styles.info}>
                <Text style={{ fontSize: 20 }}>Freelancer</Text>
                <Text style={styles.textInfo}>
                  Tên:{" "}
                  {freelancerRes.data?.data?.data?.base_info?.first_name +
                    " " +
                    freelancerRes.data?.data?.data?.base_info?.last_name}
                </Text>
                <Text style={styles.textInfo}>
                  Email: {freelancerRes.data?.data?.data?.base_info?.email}
                </Text>
                <Text style={styles.textInfo}>
                  Số điện thoại:{" "}
                  {freelancerRes.data?.data?.data?.base_info?.phone_num}
                </Text>
                <Text style={styles.textInfo}>
                  Địa chỉ ví:{" "}
                  {getJobInfoByCurrentJobId.data?.address_freelancer}
                </Text>
              </View>
              <View style={styles.info}>
                <Text style={{ fontSize: 20 }}>Client</Text>
                <Text style={styles.textInfo}>
                  Tên:{" "}
                  {clientRes.data?.data?.data?.base_info?.first_name +
                    " " +
                    clientRes.data?.data?.data?.base_info?.last_name}
                </Text>
                <Text style={styles.textInfo}>
                  Email: {clientRes.data?.data?.data?.base_info?.email}
                </Text>
                <Text style={styles.textInfo}>
                  Số điện thoại:{" "}
                  {clientRes.data?.data?.data?.base_info?.phone_num}
                </Text>
                <Text style={styles.textInfo}>
                  Địa chỉ ví: {getJobInfoByCurrentJobId.data?.address_client}
                </Text>
              </View>
              <View style={styles.info}>
                <Text style={{ fontSize: 20 }}>Chi tiết công việc</Text>
                <Text style={styles.textInfo}>
                  {getJobInfoByCurrentJobId.data?.title}
                </Text>
                <Text style={styles.textInfo}>
                  Ngân sách: {getJobInfoByCurrentJobId.data?.bids}
                </Text>
                <TouchableOpacity>
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
              <ScrollView>
                <View style={[styles.info, { flexDirection: "row" }]}>
                  <Text>Điều khoản hợp đồng:</Text>
                  <TouchableOpacity onPress={() => setModalPolicy(true)}>
                    <Text style={{ color: "blue", marginLeft: 10 }}>
                      điều khoản
                    </Text>
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
              </ScrollView>
              {/* chữ ký */}
              <Text style={styles.textInfo}>Chữ ký của client:</Text>
              <Image
                source={{
                  uri: `https://my-final.s3.ap-southeast-1.amazonaws.com/my-final/${getJobInfoByCurrentJobId.data?.signature_client}`,
                }}
                style={{ width: 150, height: 150, alignSelf: "center" }}
                resizeMode="contain"
              />
              <Text style={styles.textInfo}>Chữ ký của freelancer:</Text>
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
                    <Button
                      mode="outlined"
                      onPress={() => setModalVisible(true)}
                    >
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
                      Ký hợp đồng
                    </Button>
                    <Button mode="contained" onPress={handleNoSignContract}>
                      Từ chối hợp đồng
                    </Button>
                  </View>
                </>
              ) : null}
            </>
          )}
          {/* modal chữ ký */}
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
          <ModalLoading
            visible={
              confirmAfterFreelancerSignaContract.isPending ||
              acceptContract.isLoading ||
              FreelancerNoSign.isLoading
            }
          />
          <Modal
            visible={modalDetailJob}
            animationType="slide"
            transparent={true}
          >
            <ModalDetailJobContract
              jobId={contract?.jobIdcurent}
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});
export default ModalDetailSign;
