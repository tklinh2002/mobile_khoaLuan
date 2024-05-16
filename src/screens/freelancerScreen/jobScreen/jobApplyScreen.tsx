import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import JobApply from "./jobApply";
import { useQuery, useQueryClient } from "@tanstack/react-query";
const JobApplyScreen = () => {
  const queryClient = useQueryClient();
  const jobApplied = queryClient.getQueryData(["jobApplied"]) as any;
  return (
    <ScrollView>
      {jobApplied?.data.map(
        (job) =>
          (job.job_ap_status == 1 || job.job_ap_status == -1) && (
            <JobApply job={job} key={job.id} />
          )
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({});
export default JobApplyScreen;
