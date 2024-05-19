import { useContractRead, useContractWrite } from "wagmi";
import { abi } from "../../abi";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { sendOtpApi, verifyOtpApi } from "../apis/otp.api";
import { Alert } from "react-native";
import {
  confirmAfterFreelancerSignaContractApi,
  getListJobApiF,
  jobAplliedAPI,
} from "../apis/job.apiF";
import {
  clientConfirmTaskApi,
  createCommentTaskApi,
  createTaskApi,
  deleteTaskApi,
  freelancerUpdateStatusTaskApi,
  getTasksApi,
  updateTaskApi,
} from "../apis/task.api";
import {
  AddCommentRequest,
  ClientConfirmUpdateStatusRequest,
  CreateJobTaskRequest,
  INotiParams,
  freelancerUpdateStatusTask,
} from "../apis/type.task.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { acceptInviteApi, getListInviteApi } from "../apis/invite.api";
import { getNotificationApi, sendNoticationApi } from "../apis/noti.api";
import { useContext } from "react";
import { AuthContext } from "../utils/context";

type dataContract = {
  freelancerId?: string;
  client_id?: string;
  contract_id?: string;
};
export const useContract = (data: dataContract) => {
  if (data.freelancerId != undefined) {
    const getContractsByFreelancerId = useContractRead({
      abi,
      address: "0x70a0327000D117490FC5bD3edE0318d17F8e930e",
      functionName: "getContractsByFreelancerId",
      args: [data.freelancerId],
      select(data) {
        const processedData = (data as any[])?.map((contract) => {
          const processedContract = { ...contract };
          for (const key in processedContract) {
            if (typeof processedContract[key] == "bigint") {
              processedContract[key] = processedContract[key].toString();
            }
          }
          return processedContract;
        });
        return [...processedData];
      },
    });
    return { getContractsByFreelancerId };
  }

  if (data.client_id != undefined) {
    const getContractsByClientId = useContractRead({
      abi,
      address: "0x70a0327000D117490FC5bD3edE0318d17F8e930e",
      functionName: "getContractsByClientId",
      args: [data.client_id],
      select(data) {
        const processedData = (data as any[])?.map((contract) => {
          const processedContract = { ...contract };
          for (const key in processedContract) {
            if (typeof processedContract[key] == "bigint") {
              processedContract[key] = processedContract[key].toString();
            }
          }
          return processedContract;
        });
        return [...processedData];
      },
    });
    return { getContractsByClientId };
  }
  if (data.contract_id != undefined) {
    const getContractDetailByIndex = useContractRead({
      abi,
      address: "0x70a0327000D117490FC5bD3edE0318d17F8e930e",
      functionName: "getContractDetailByIndex",
      args: [data.contract_id],
      select(data: any) {
        return {
          title: data.title,
          bids: Number(data.bids),
          description: data.description,
          jobIdcurent: Number(data.jobIdcurent),
          client_address: data.client,
          client_id: Number(data.clientId),
          signatureClient: data.signatureC,
          freelancer_address: data.freelancer,
          freelancer_id: Number(data.freelancerId),
          signatureFreelancer: data.signatureF,
          status: Number(data.status),
          cancelReason: data.cancelReason,
        };
      },
    });
    const reportCompletion = useContractWrite({
      abi,
      address: "0x70a0327000D117490FC5bD3edE0318d17F8e930e",
      functionName: "reportCompletion",
      args: [data.contract_id],
    } as any);

    const rejectCompletion = useContractWrite({
      abi,
      address: "0x70a0327000D117490FC5bD3edE0318d17F8e930e",
      functionName: "rejectCompletion",
      args: [data.contract_id],
    } as any);
    const finalizeContract = useContractWrite({
      abi,
      address: "0x70a0327000D117490FC5bD3edE0318d17F8e930e",
      functionName: "finalizeContract",
      args: [data.contract_id],
    } as any);
    const FreelancerNoSign = useContractWrite({
      abi,
      address: "0x70a0327000D117490FC5bD3edE0318d17F8e930e",
      functionName: "FreelancerNoSign",
      args: [data.contract_id],
    } as any);
    return {
      getContractDetailByIndex,
      reportCompletion,
      rejectCompletion,
      finalizeContract,
      FreelancerNoSign,
    };
  }
};

export const useDetailContract = (jobId) => {
  const getJobInfoByCurrentJobId = useContractRead({
    abi,
    address: "0x70a0327000D117490FC5bD3edE0318d17F8e930e",
    functionName: "getJobInfoByCurrentJobId",
    args: [jobId],
    select(data) {
      return {
        contract_id: Number(data[0]),
        title: data[1],
        description: data[2],
        signature_freelancer: data[3],
        signature_client: data[4],
        bids: Number(data[5]),
        status: data[6],
        address_client: data[7],
        address_freelancer: data[8],
        freelancer_id: Number(data[9]), // freelancer_id
        client_id: Number(data[10]), // client_id
      };
    },
  });
  return { getJobInfoByCurrentJobId };
};

export const useOTP = () => {
  const { infoLogin, login, logout } = useContext(AuthContext);
  const token = infoLogin["access_token"];
  // const token =
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RpbXZpZWNpdHMuaWQudm4vYXBpL3YxL2xvZ2luIiwiaWF0IjoxNzE1NDk0MTUzLCJleHAiOjM3NzE1NDk0MTUzLCJuYmYiOjE3MTU0OTQxNTMsImp0aSI6Indta1REVUhBNksxbHdmWVEiLCJzdWIiOiIxMCIsInBydiI6IjIyY2MzNDA0YjMyN2JiMDE3M2YxMTk1MDUyZWE2NjU3MmEyOTMxMWMiLCJ1c2VyX3R5cGUiOiJmcmVlbGFuY2VyIiwidXNlcl9pbmZvIjp7ImlkIjoxMCwidXNlcm5hbWUiOiJ0a2xpbmgzMTIwMDIiLCJlbWFpbCI6InRrbGluaDMxMjAwMkBnbWFpbC5jb20iLCJkYXRlX29mX2JpcnRoIjoiMjAwMi0wMi0xMSIsImVtYWlsX3ZlcmlmaWVkX2F0IjoiMjAyNC0wNC0wN1QxMzoxNDo1Mi4wMDAwMDBaIiwiZmlyc3RfbmFtZSI6IlRyYW4iLCJsYXN0X25hbWUiOiJMaW5oIiwicGhvbmVfbnVtIjoiMDk2MTYxMzA4OSIsImFkZHJlc3MiOiJCaW5oIER1b25nIiwicG9zaXRpb24iOm51bGwsInNleCI6IjAiLCJpbnRybyI6IkFiYyBsw6AgY8OhaSBnw6wgw6EsIGvhu7kgbsSDbmcgbmhlLCB0w7RpIGPDsyBuaGnhu4F1IGvhu7kgbsSDbmcgbOG6r20uIiwiYXZhdGFyX3VybCI6Imh0dHBzOi8vdGltdmllY2l0cy5pZC52bi9zdG9yYWdlL2NsaWVudC93Z2dieEsxbnY3cTNTWWtaWVJDeVF5VWZ2WWc5Q0lXZHZuZlhnbjZGLnBuZyIsInN0YXR1cyI6IjEiLCJjaXRpemVuX2lkZW50aWZpY2F0aW9uX3VybCI6bnVsbCwiY2l0aXplbl9pZGVudGlmaWNhdGlvbl9pZCI6bnVsbCwiaXNfY29tcGxldGVkX3Byb2ZpbGUiOiIwIiwiZ29vZ2xlX2lkIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyNC0wNC0wN1QxMzoxNDoxNC4wMDAwMDBaIiwidXBkYXRlZF9hdCI6IjIwMjQtMDQtMDlUMTU6MzI6MDUuMDAwMDAwWiJ9fQ.LkHdPhLp0mHptptdfQgjLF11FJ27D-nOI_nkdkKrjrA";
  const sendOtp = useMutation({
    mutationKey: ["sendOtp"],
    mutationFn: () => sendOtpApi(token),
  });

  const verifyOtp = useMutation({
    mutationKey: ["verifyOtp"],
    mutationFn: async (otp: string) => await verifyOtpApi(token, otp),
  });
  const confirmAfterFreelancerSignaContract = useMutation({
    mutationKey: ["confirmAfterFreelancerSignaContract"],
    mutationFn: async (job_id: string) =>
      await confirmAfterFreelancerSignaContractApi(token, job_id),
  });
  return { sendOtp, verifyOtp, confirmAfterFreelancerSignaContract };
};
export const useTask = (taskID?: string) => {
  const { infoLogin, login, logout } = useContext(AuthContext);
  const token = infoLogin["access_token"];

  const getTasks = useQuery({
    queryKey: ["getTasks", taskID],
    queryFn: async () => await getTasksApi(token, taskID),
  });

  const createTask = useMutation({
    mutationKey: ["createTask"],
    mutationFn: (dataTask: CreateJobTaskRequest) =>
      createTaskApi(token, dataTask),
  });
  //id task
  const updateTask = useMutation({
    mutationKey: ["updateTask"],
    mutationFn: (dataTask: CreateJobTaskRequest) =>
      updateTaskApi(token, dataTask),
  });
  const freelancerUpdateStatusTask = useMutation({
    mutationKey: ["freelancerUpdateStatusTask"],
    mutationFn: (dataF: freelancerUpdateStatusTask) =>
      freelancerUpdateStatusTaskApi(token, dataF),
  });

  const clientConfirmTask = useMutation({
    mutationKey: ["clientConfirmTask"],
    mutationFn: (dataC: ClientConfirmUpdateStatusRequest) =>
      clientConfirmTaskApi(token, dataC),
  });

  const createCommentTask = useMutation({
    mutationKey: ["createCommentTask"],
    mutationFn: (dataComment: AddCommentRequest) =>
      createCommentTaskApi(token, dataComment),
  });
  const deleteTask = useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: (task_id: string) => deleteTaskApi(token, task_id),
  });
  return {
    getTasks,
    createTask,
    freelancerUpdateStatusTask,
    clientConfirmTask,
    createCommentTask,
    updateTask,
    deleteTask,
  };
};
type dataAccept = {
  jobid: string;
  status: number;
};
export const useJobInvite = () => {
  const { infoLogin, login, logout } = useContext(AuthContext);
  const token = infoLogin["access_token"];

  const getListInvite = useQuery({
    queryKey: ["getListInvite"],
    queryFn: async () => await getListInviteApi(token),
  });

  const acceptInvite = useMutation({
    mutationKey: ["acceptInvite"],
    mutationFn: (data: dataAccept) =>
      acceptInviteApi(token, data.jobid, data.status),
  });
  return { getListInvite, acceptInvite };
};

export const useNotification = () => {
  const { infoLogin, login, logout } = useContext(AuthContext);
  const token = infoLogin["access_token"];
  const getNotification = useQuery({
    queryKey: ["getNotification"],
    queryFn: async () => await getNotificationApi(token),
    refetchInterval: 45000,
  });
  const sendNotication = useMutation({
    mutationKey: ["sendNotication"],
    mutationFn: (params: INotiParams) => sendNoticationApi(token, params),
  });
  return { getNotification, sendNotication };
};

export const useJob = (page) => {
  const queryClient = useQueryClient();
  const { infoLogin, login, logout } = useContext(AuthContext);
  const token = infoLogin["access_token"];

  const jobApplied = useQuery({
    queryKey: ["jobApplied"],
    queryFn: async () =>
      jobAplliedAPI(token).then((res) => {
        queryClient.setQueryData(["jobApplied"], res.data.data);
        return res.data.data;
      }),
  });

  const getListJob = useQuery({
    queryKey: ["jobs", page],
    queryFn: async () =>
      getListJobApiF(page, 10, null, null, token).then((res) => res.data),
  });
  return { jobApplied, getListJob };
};
