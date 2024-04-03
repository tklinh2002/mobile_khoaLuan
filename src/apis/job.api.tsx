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
  formData.append("status", 1+"");
  // Append each skill as a separate field
  // const skills =[]
  // job.skill.forEach((skill) => {
  //   skills.push({
  //     skill_id: skill.id+"",
  //     skill_name: skill.name,
  //     point: skill.point+"",
  //   })
  // });
  const skills = job.skill.map((skill) => ({
    skill_id: skill.id.toString(),
    skill_name: skill.name,
    point: skill.point.toString(),
  }));

  formData.append("skill", JSON.stringify(skills));
  // console.log(skills);
  // skills.forEach((skill) => {
  //   formData.append("skill[]", JSON.stringify(skill));
  // });
  // formData.append("skill", JSON.stringify(skills));
  
  const nameFile = `file_${new Date().getTime()}`;
  // Append content_file if it exists
  if (job.content_file) {
    formData.append("content_file", job.content_file);
  }
  const imgFile = `img_${new Date().getTime()}`;
  if(job.thumbnail){
    formData.append("thumbnail", job.thumbnail);
  }
  console.log(formData);

  return await http.httpform.post("/api/v1/client/job/create-job", formData,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
};
export const getListPostApi = (page, num, status, token) => {
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

export const updateJobApi = (id: string, job: Job, token: string) => {
  return http.httpjson.post(`/api/v1/client/job/update-jobs/${id}`, {
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
  return http.httpjson.post(`/api/v1/client/freelancers/invite`, {
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
