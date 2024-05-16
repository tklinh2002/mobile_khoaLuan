import http from "../utils/http";
import { INotiParams } from "./type.task.api";

const sendNoticationApi = async (token, params: INotiParams) => {
  return http.httpform.postForm<any>(
    `/api/v1/notifications`,
    {
      title: params.title,
      message: params.message,
      linkable: params.linkable,
      smail: params.smail,
      imagefile: params.imagefile,
      user_type: params.user_type,
      user_id: params.user_id,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const getNotificationApi = async (token) => {
  return http.httpjson.get(`/api/v1/notifications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { sendNoticationApi, getNotificationApi };
