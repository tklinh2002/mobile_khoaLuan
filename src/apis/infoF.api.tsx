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

export const getInfoUserFApi = (token: string) => {
  return http.httpjson.get(`/api/v1/freelancer/info`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateInfoUserFApi = (token: string, infoUser: any) => {
  const data = new FormData();
  data.append("phone_num", infoUser.phoneNum);
  data.append("address", infoUser.address);
  if(infoUser.introduce !== null){
    data.append("intro", infoUser.introduce);
  }
  if(infoUser.avatar !== null){
    data.append("avatar", infoUser.avatar);
  }
  const skilltemp = []
  infoUser["skill"].forEach((skill) => {
    skilltemp.push(skill.id);
  });
  data.append("skill", skilltemp.toString());

  return http.httpform.post(`/api/v1/freelancer/info/update`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
