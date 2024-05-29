import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ContractComplete from "./contractComplete";
import { useContract } from "../../../hook/hook";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../utils/context";
const ContractCompleteScreen = ({ navigation }) => {
  const { infoLogin, login, logout } = useContext(AuthContext);
  const token = infoLogin["access_token"];
  const { getContractsByFreelancerId } = useContract({
    freelancerId: infoLogin?.user?.id + "",
  });
  if (getContractsByFreelancerId.isLoading) {
    return <Text>Loading...</Text>;
  }
  const contracts = getContractsByFreelancerId.data.filter(
    (contract: any) => contract && contract.status == 3
  );
  console.log('contracts',getContractsByFreelancerId.data);
  return (
    <ScrollView>
      {contracts && contracts.length > 0 ? (
        contracts.map((contract: any) => (
          <ContractComplete key={contract?.id} contract={contract} />
        ))
      ) : (
        <Text>Không có hợp đồng</Text>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({});
export default ContractCompleteScreen;
