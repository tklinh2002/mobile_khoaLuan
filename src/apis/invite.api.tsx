import http from "../utils/http";

const getListInviteApi = (token) => {
  return http.httpjson.get("/api/v1/client/invite/list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const acceptInviteApi = (token, jobid, status: number) => {
  console.log("jobid", jobid);
  console.log("token", token);
  return http.httpjson.post(`/api/v1/client/invite/accept/${jobid}`,{status:status} ,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { getListInviteApi, acceptInviteApi };
