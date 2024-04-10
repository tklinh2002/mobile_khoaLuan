import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import JobApply from "./jobApply";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { jobAplliedAPI } from "../../../apis/job.apiF";
const JobApplyScreen = () => {
  const queryClient = useQueryClient();
  const infoLogin = queryClient.getQueryData(["infoLogin"]);
  const token = infoLogin["access_token"];
  const jobApplied = useQuery({
    queryKey: ["jobApplied", 1],
    queryFn: async () =>
      jobAplliedAPI(token, 1).then((res) => {
        queryClient.setQueryData(["jobApplied", 1], res.data.data);
        return res.data.data;
      }),
  });
  if(jobApplied.isLoading){
    return <Text>Loading...</Text>
  }
  return (
    <ScrollView>
      {jobApplied.data.map((job) => (
        <JobApply job={job} key={job.id} />
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({});
export default JobApplyScreen;
