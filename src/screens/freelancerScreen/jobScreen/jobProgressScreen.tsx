import { View, Text, ScrollView } from "react-native";
import Job from "../../clientsScreen/postScreen/job";
import JobProgress from "./jobProgress";
import { useQueryClient } from "@tanstack/react-query";

const JobProgressScreen = () => {
  const queryClient = useQueryClient();
  const jobApplied = queryClient.getQueryData(["jobApplied"]) as any;
  return (
    <ScrollView>
      {jobApplied?.data.map(
        (job) =>
          job.job_ap_status == 3 && (
            // status == 3 là job đã được chấp nhận
            <JobProgress key={job.id} job={job} />
          )
      )}
    </ScrollView>
  );
};
export default JobProgressScreen;
