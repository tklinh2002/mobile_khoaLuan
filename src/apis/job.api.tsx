import { Job } from "../types/job";
import http from "../utils/http";

export const createJobApi = async (job: Job, token: string) => {
  const formData = new FormData();
  formData.append("title", job.title);
  formData.append("desc", job.desc);
  formData.append("content", job.content);
  formData.append("bids", job.bids.toString());
  const formatDate =
    job.deadline.getFullYear() +
    "-" +
    (job.deadline.getMonth() + 1) +
    "-" +
    job.deadline.getDate();
  formData.append("deadline", formatDate);
  formData.append("status", 1 + "");
  // add skill
  const skilltemp = [];
  job.skill.forEach((skill) => {
    skilltemp.push(skill.id);
  });
  formData.append("skill", skilltemp.toString());

  // add file
  if (job.content_file) {
    formData.append("content_file", job.content_file);
  }
  if (job.thumbnail) {
    formData.append("thumbnail", job.thumbnail);
  }

  return await http.httpform.post("/api/v1/client/job/create-job", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
//edit job
export const editJobApi = async (job: Job, token: string) => {
  const formData = new FormData();
  // formData.append("title", job.title);
  formData.append("desc", job.desc);
  formData.append("content", job.content);
  // formData.append("bids", job.bids.toString());
  const date = new Date(job.deadline);
  const formatDate =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  formData.append("deadline", formatDate);
  formData.append("status", job.status + "");
  // add skill
  const skilltemp = [];
  job["skills"].forEach((skill) => {
    skilltemp.push(skill.id);
  });
  formData.append("skill", skilltemp.toString());

  // add file
  if (job.content_file) {
    formData.append("content_file", job.content_file);
  }
  if (job.thumbnail) {
    formData.append("thumbnail", job.thumbnail);
  }

  return await http.httpform.post(
    `/api/v1/client/job/update-jobs/${job.id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getListMyPostApi = (page, num, status, token) => {
  return http.httpjson.get(`/api/v1/client/job/my-jobs`, {
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

// api chung cho freelancer và client
export const getJobApi = (id: string, token: string) => {
  return http.httpjson.get(`/api/v1/job/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deletePostApi = (id: string, token: string) => {
  return http.httpjson.delete(`/api/v1/client/job/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const recrultConfirmApi = (id: string) => {
  //// đọc ko hiểu nên ko làm
};

export const inviteFreelancerApi = (
  job_id,
  freelancer_id,
  mail_invite,
  token,
  title
) => {
  const formData = new FormData();
  formData.append("job_id", job_id + "");
  formData.append("freelancer_id", freelancer_id);
  formData.append("mail_invite", mail_invite);
  formData.append("title", title);

  return http.httpform.post(`/api/v1/client/freelancers/invite`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const upLoadSignatureApi = (job_id, signature, token) => {
  const formData = new FormData();
  const blod = new Blob([signature], { type: "image/png" });
  formData.append('sign', blod, 'uploaded_image.png')
  return http.httpform.post(`/api/v1//upload-file`, signature);
};
