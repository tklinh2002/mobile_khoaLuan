import { Job } from "../types/job";
import http from "../utils/http";

export const getListJobApiF = (
  page,
  num,
  skills,
  keyword,
  bids,
  proposal,
  deadline,
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
      bids: bids,
      proposal: proposal,
      deadline: deadline,
    },
  });
};

export const applyJobApi = (job_id, proposal, coverLetter, file, token) => {
  const formdata = new FormData();
  formdata.append("jobId", job_id);
  formdata.append("proposal", proposal);
  formdata.append("coverLetter", coverLetter);
  formdata.append("attachments", file, `file_${new Date().getTime()}`);
  console.log(formdata);
  return http.httpform.post(`/api/v1/freelancer/job/apply`, {
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: "multipart/form-data",
    },
    data: formdata,
  });
};

export const jobApllied = (token: string) => {
  return http.httpjson.get(`/api/v1/freelancer/job/applied`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
