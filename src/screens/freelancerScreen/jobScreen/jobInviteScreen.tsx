import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import JobInvite from "./jobInvite";
import { useQueryClient } from "@tanstack/react-query";
import { useJobInvite } from "../../../hook/hook";
const JobInviteScreen = () => {
  const queryClient = useQueryClient();
  const jobApplied = queryClient.getQueryData(["jobApplied"]) as any;
  const { getListInvite } = useJobInvite();
  if (getListInvite.isLoading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <ScrollView>
      {[getListInvite.data?.data?.data?.data].length > 0 ? (
        getListInvite.data?.data?.data?.data.map((job: any, index: number) => (
          <JobInvite key={index} job={job} />
        ))
      ) : (
        <Text style={{ textAlign: "center" }}>Không có lời mời nào</Text>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({});
export default JobInviteScreen;
