import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ContractSign from "./contractSign";

import { useContract } from "../../../hook/hook";
import { useQueryClient } from "@tanstack/react-query";

const ContractSignScreen = () => {
  const queryClient = useQueryClient();
  const infoLogin = queryClient.getQueryData(["infoLogin"]) as any;
  const { getContractsByFreelancerId } = useContract({freelancerId:infoLogin?.user?.id+''});
  if (getContractsByFreelancerId.isLoading) {
    return <Text>Loading...</Text>;
  }
  const contracts = getContractsByFreelancerId?.data.filter(
    (contract: any) => contract && contract.status == 0
  );
  // console.log(contracts);  
  return (
    <ScrollView>
      {contracts && contracts.length > 0 ? (
        contracts.map((contract: any) => (
          <ContractSign key={contract?.id} contract={contract} />
        ))
      ) : (
        <Text>Không có hợp đồng</Text>
      )}
    </ScrollView>
  );
};
export default ContractSignScreen;
