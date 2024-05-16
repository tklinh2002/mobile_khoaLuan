import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ContractProgess from "./contractProgess";
import { useContract } from "../../../hook/hook";
import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../utils/context";

const ContractProgessScreen = () => {
  const { infoLogin, login, logout } = useContext(AuthContext);
  const { getContractsByFreelancerId } = useContract({ freelancerId: infoLogin?.user?.id+'' });
  if (getContractsByFreelancerId.isLoading) {
    return <Text>Loading...</Text>;
  }
  const contracts = getContractsByFreelancerId.data.filter(
    (contract: any) => contract && contract.status == 1
  );
  console.log("contracts", contracts);
  return (
    <ScrollView>
      {contracts && contracts.length > 0 ? (
        contracts.map((contract: any) => (
          <ContractProgess key={contract?.id} contract={contract} />
        ))
      ) : (
        <Text>Không có hợp đồng</Text>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({});
export default ContractProgessScreen;
