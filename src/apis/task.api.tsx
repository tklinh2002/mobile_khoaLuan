import AsyncStorage from "@react-native-async-storage/async-storage";
import http from "../utils/http";
import {
  AddCommentRequest,
  ClientConfirmUpdateStatusRequest,
  CreateJobTaskRequest,
  freelancerUpdateStatusTask,
} from "./type.task.api";

const getTasksApi = async (token, id) => {
  return await http.httpjson.get(`/api/v1/job/${id}/task`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// deadline: format(data.deadline, "yyyy-MM-dd"),
// id job
const createTaskApi = async (token, data: CreateJobTaskRequest) => {
  const { id, ...rest } = data;
  return await http.httpjson.post(`/api/v1/job/${id}/new-task`, rest, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// id task
const updateTaskApi = async (token, params: CreateJobTaskRequest) => {
  const { id, ...rest } = params;
  return await http.httpjson.put(`/api/v1/job/task/${id}`, rest, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const getDetailTaskApi = async (token, id) => {
  return await http.httpjson.get(`/api/v1/job/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const freelancerUpdateStatusTaskApi = async (
  token,
  data: freelancerUpdateStatusTask
) => {
  const { id, ...rest } = data;
  return await http.httpjson.post(`/api/v1/job/task/${id}/set-status`, rest, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const clientConfirmTaskApi = async (
  token,
  data: ClientConfirmUpdateStatusRequest
) => {
  const { id, confirm_status } = data;
  return await http.httpjson.post(
    `/api/v1/job/task/${id}/confirm-status`,
    confirm_status,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
// id task
const deleteTaskApi = async (token, id) => {
  return await http.httpform.delete(`/api/v1/job/task/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// id task
// data formdata content
const createCommentTaskApi = async (token, data: AddCommentRequest) => {
  const { task_id, ...rest } = data;
  return await http.httpjson.post(
    `/api/v1/job/task/${task_id}/add-cmt-task`,
    rest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export {
  getTasksApi,
  createTaskApi,
  getDetailTaskApi,
  createCommentTaskApi,
  deleteTaskApi,
  clientConfirmTaskApi,
  freelancerUpdateStatusTaskApi,
  updateTaskApi,
};
