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
