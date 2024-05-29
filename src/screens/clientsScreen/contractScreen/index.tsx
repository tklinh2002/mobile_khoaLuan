import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Contract from "./contract";
import React, { useState } from "react";
import { useContract } from "../../../hook/hook";
import { useQueryClient } from "@tanstack/react-query";
const ContractScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handCreateJob = () => {
    setModalVisible(true);
  };
  const queryClient = useQueryClient();
  const infoLogin = queryClient.getQueryData(["infoLogin"]) as any;

  const { getContractsByClientId } = useContract({
    client_id: infoLogin?.user?.id,
  });
  return (
    <View style={{flex:1}}>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 10,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "500", flex: 1 }}>
          Danh sách hợp đồng
        </Text>
      </View>

      {getContractsByClientId.isLoading ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <ScrollView>
          {getContractsByClientId.data.length > 0 ? (
            <>
              {getContractsByClientId.data?.map((contract) => (
                <Contract key={contract.id} contract={contract} />
              ))}
            </>
          ) : (
            <Text
              style={{
                textAlign: "center",
                color: "gray",
                fontSize: 20,
                margin: 20,
              }}
            >
              Không có hợp đồng
            </Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 10,
    flexDirection: "row",
    marginRight: 20,
  },
});
export default ContractScreen;
