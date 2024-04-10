import { Job } from "../types/job";
import http from "../utils/http";

export const getListJobApiF = (
  page,
  num,
  skills,
  keyword,
  token
) => {
  return http.httpjson.get("/api/v1/freelancer/job", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: page,
      num: num,
      skills: skills,
      keyword: keyword,
      status: 1
    },
  });
};

export const applyJobApi = (job_id, proposal, coverLetter, file, token) => {
  const formdata = new FormData();
  formdata.append("jobId", job_id);
  formdata.append("proposal", proposal);
  formdata.append("coverLetter", coverLetter);
  formdata.append("attachments", file);
  console.log(formdata);
  return http.httpform.post(`/api/v1/freelancer/job/apply`,formdata, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const jobAplliedAPI = (token: string) => {
  return http.httpjson.get(`/api/v1/freelancer/job/applied`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    
  });
}
