import { Job } from "../types/job";
import http from "../utils/http";

export const findSkillApi = (search: string, token:string) => {
  return http
    .get("/api/v1/administrator/skill", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: 1,
        num: 10,
        search: search,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const createJobApi = (job: Job, token:string) => {
  return http.post("/api/v1/client/job/create-job", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    param: {
      title: job.title,
      thumbnail: job.thumbnail,
      desc: job.desc,
      content: job.content,
      bids: job.content,
      deadline: job.deadline+"",
      skill: job.skill,
      status: job.status,
    },
  });
};
export const getListPostApi = (page, num, status, token) => {
  return http.get(`/api/v1/client/job/my-jobs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: page,
      num: num,
      status: status,
    },
  });
};

export const getJobApi = (id: string, token:string) => {
  return http.get(`/api/v1/job/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateJobApi = (id: string, job: Job, token:string) => {
  return http.post(`/api/v1/client/job/update-jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    param: {
      title: job.title,
      thumbnail: job.thumbnail,
      desc: job.desc,
      content: job.content,
      bids: job.content,
      deadline: job.deadline,
      skill: job.skill,
      status: job.status,
    },
  });
};

export const deletePostApi = (id: string) => {
  //// đọc ko hiểu nên ko làm
};

export const recrultConfirmApi = (id: string) => {
  //// đọc ko hiểu nên ko làm
};

export const inviteFreelancerApi = (job_id, freelancer_id, mail_invite, token) => {
  return http.post(`/api/v1/client/freelancers/invite`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    param: {
      job_id: job_id,
      freelancer_id: freelancer_id,
      mail_invite: mail_invite,
    },
  });
};
