import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Touchable,
  TouchableNativeFeedback,
  Keyboard,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
} from "react-native";

import { useContext, useState } from "react";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import Job from "../clientsScreen/contractScreen/job";
import { useContract } from "../../hook/hook";
import { getDetailInfoApi } from "../../apis/info.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../utils/context";

const ModalDetailContract = ({ setmodalvisiable, contract }) => {
  const { getContractDetailByIndex } = useContract({
    contract_id: contract?.id,
  });
  console.log("contract?", contract?.id);
  console.log("contract?", contract);
  console.log("getContractDetailByIndex", getContractDetailByIndex.data);
  const queryClient = useQueryClient();
  const { infoLogin, login, logout } = useContext(AuthContext);
  const token = infoLogin["access_token"];
  const clientRes = useQuery({
    queryKey: ["client", getContractDetailByIndex.data?.client_id + ""],
    queryFn: () =>
      getDetailInfoApi(
        token,
        "client",
        getContractDetailByIndex.data?.client_id + ""
      ),
    enabled: !getContractDetailByIndex.isLoading,
  });
  const freelancerRes = useQuery({
    queryKey: ["freelancer", getContractDetailByIndex.data?.freelancer_id + ""],
    queryFn: () =>
      getDetailInfoApi(
        token,
        "freelancer",
        getContractDetailByIndex.data?.freelancer_id + ""
      ),
    enabled: !getContractDetailByIndex.isLoading,
  });
  const i = contract?.status;
  const status = {
    0: {
      text: "Freelancer chưa ký",
      color: "#C46E41",
    },
    1: {
      text: "Đang thực hiện", // freelancer ký
      color: "#0866FF",
    },
    2: {
      text: "Chờ xác nhận hoàn thành", // freelancer báo hoàn thành
      color: "#00AD85",
    },
    3: {
      text: "Đã hoàn thành", // client xác nhận hợp đồng và kết thúc
      color: "green",
    },
    4: {
      text: "Freelancer hủy", // freelancer hủy
      color: "red",
    },
    5: {
      text: "Client hủy", // client hủy
      color: "red",
    },
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
              Chi tiết hợp đồng
            </Text>
            <IconAntDesign
              name="close"
              size={30}
              color="black"
              onPress={() => setmodalvisiable(false)}
            />
          </View>
          {getContractDetailByIndex.isLoading ? (
            <View style={styles.container}>
              <ActivityIndicator size="large" color="black" />
            </View>
          ) : (
            <>
              <Text style={[styles.textInfo, { color: status[i].color }]}>
                Trạng thái hợp đồng: {status[i].text}
              </Text>
              {[4, 5].includes(i) && (
                <Text style={styles.textInfo}>
                  Lý do hủy: {getContractDetailByIndex.data.cancelReason}
                </Text>
              )}
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
                  Địa chỉ ví: {getContractDetailByIndex.data.freelancer_address}
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
                  Địa chỉ ví: {getContractDetailByIndex.data.client_address}
                </Text>
              </View>
              <Text style={styles.textInfo}>Chữ ký của freelancer:</Text>
              {getContractDetailByIndex.data.signatureFreelancer != "" ? (
                <Image
                  source={{
                    uri: `https://my-final.s3.ap-southeast-1.amazonaws.com/my-final/${getContractDetailByIndex.data.signatureFreelancer}`,
                  }}
                  style={{ width: 150, height: 150, alignSelf: "center" }}
                  resizeMode="contain"
                />
              ) : (
                <Text style={[styles.textInfo, { fontStyle: "italic" }]}>
                  Chưa ký tên
                </Text>
              )}
              <Text style={styles.textInfo}>Chữ ký của client:</Text>
              {getContractDetailByIndex.data.signatureClient != "" ? (
                <Image
                  source={{
                    uri: `https://my-final.s3.ap-southeast-1.amazonaws.com/my-final/${getContractDetailByIndex.data.signatureClient}`,
                  }}
                  style={{ width: 150, height: 150, alignSelf: "center" }}
                  resizeMode="contain"
                />
              ) : (
                <Text style={[styles.textInfo, { fontStyle: "italic" }]}>
                  Chưa ký tên
                </Text>
              )}
            </>
          )}
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
export default ModalDetailContract;
