import http from "../utils/http";

// thông tin freelancer
export const getListFreelancerApi = (
  page: number,
  num: number,
  keyword: string,
  skill: string,
  expected_salary: string,
  token: string
) => {
  return http.httpjson.get("/api/v1/client/freelancers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: page,
      num: num,
      keyword: keyword,
      skill: skill,
      expected_salary: expected_salary,
    },
  });
};

export const getInfoUserApi = (token: string) => {
  return http.httpjson.get(`/api/v1/client/info`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateInfoUserApi = (infoUser: any, token: string) => {
  const data = new FormData();
  data.append("phone_num", infoUser.phoneNum);
  data.append("address", infoUser.address);
  data.append("introduce", infoUser.introduce);
  data.append("avatar", infoUser.avatar);
  return http.httpform.post(`/api/v1/client/info/update`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDetailInfoApi = (
  token: string,
  userType: string,
  user_id: string
) => {
  return http.httpjson.get(`/api/v1/info-user?id=${user_id}&typeUser=${userType}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
