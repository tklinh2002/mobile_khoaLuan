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
  formData.append("min_proposals", job.min_proposals.toString());
  formData.append("status", 1 + "");
  // add skill
  job.skill.forEach((skill, index) => {
    formData.append(`skill[${index}][skill_id]`, skill.id.toString());
    formData.append(`skill[${index}][skill_name]`, skill.name);
    formData.append(`skill[${index}][point]`, skill.point.toString());
  });

  // add file
  if (job.content_file) {
    formData.append("content_file", job.content_file);
  }
  if (job.thumbnail) {
    formData.append("thumbnail", job.thumbnail);
  }
  console.log(formData);

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
  // formData.append("min_proposals", job.min_proposals.toString());
  formData.append("status", job.status + "");
  // add skill
  console.log("job  " + job["skills"]);
  job["skills"].forEach((skill, index) => {
    formData.append(`skill[${index}][skill_id]`, skill.skill_id.toString());
    formData.append(`skill[${index}][skill_name]`, skill.skill_name);
    formData.append(`skill[${index}][point]`, 100 + "");
  });

  // add file
  if (job.content_file) {
    formData.append("content_file", job.content_file);
  }
  if (job.thumbnail) {
    formData.append("thumbnail", job.thumbnail);
  }
  console.log(formData);

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
  token
) => {
  const formData = new FormData();
  formData.append("job_id", job_id+"");
  formData.append("freelancer_id", freelancer_id);
  formData.append("mail_invite", mail_invite);
  console.log(formData);
  return http.httpform.post(`/api/v1/client/freelancers/invite`,formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
