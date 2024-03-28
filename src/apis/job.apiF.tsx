import { Job } from "../types/job";
import http from "../utils/http";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RpbXZpZWNpdHMuaWQudm4vYXBpL3YxL2xvZ2luIiwiaWF0IjoxNzExNjI4Mjk3LCJleHAiOjE3MTE2MzE4OTcsIm5iZiI6MTcxMTYyODI5NywianRpIjoiYjZLMUtWN0s4ZWdqalNucSIsInN1YiI6IjQiLCJwcnYiOiIyMmNjMzQwNGIzMjdiYjAxNzNmMTE5NTA1MmVhNjY1NzJhMjkzMTFjIiwidXNlcl90eXBlIjoiZnJlZWxhbmNlciIsInVzZXJfaW5mbyI6eyJpZCI6NCwidXNlcm5hbWUiOiJhZG1pbkZyZWVsYW5jZXIiLCJlbWFpbCI6Ik1pbmhIdXllblRyYW4xMTAyQGdtYWlsLmNvbSIsImRhdGVfb2ZfYmlydGgiOm51bGwsImVtYWlsX3ZlcmlmaWVkX2F0IjoiMjAyNC0wMy0yMVQxNDowNzowMi4wMDAwMDBaIiwiZmlyc3RfbmFtZSI6Ikh1eWVuIiwibGFzdF9uYW1lIjoiVHJhbiBUaGkgTWluaCIsInBob25lX251bSI6IjAzODczMzY2OTkiLCJhZGRyZXNzIjoiNjBDIFRow61jaCBC4butdSDEkMSDbmcsIEfDsiBW4bqlcCwgSENNIiwicG9zaXRpb24iOm51bGwsInNleCI6IjAiLCJpbnRybyI6bnVsbCwiYXZhdGFyX3VybCI6IiIsImV4cGVjdGVkX3NhbGFyeSI6bnVsbCwiYXZhaWxhYmxlX3Byb3Bvc2FsIjpudWxsLCJzdGF0dXMiOiIxIiwiaXNfY29tcGxldGVkX3Byb2ZpbGUiOiIwIiwiZ29vZ2xlX2lkIjpudWxsLCJvdHAiOm51bGwsIm90cF9leHAiOm51bGwsImJhbmtfYWNjb3VudCI6bnVsbCwiY3JlYXRlZF9hdCI6IjIwMjQtMDMtMjFUMTQ6MDY6NDIuMDAwMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDI0LTAzLTI4VDA4OjM4OjE5LjAwMDAwMFoifX0.OnB0FVWujswwp7qWWQgUG_gdBOaFkV4axhZ-XUj3RZE";
export const getListJobApiF = (
  page,
  num,
  skills,
  keyword,
  bids,
  proposal,
  deadline
) => {
  return http.get("/api/v1/freelancer/job", {
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

export const applyJobApi = (job_id, proposal, cvUrl) => {
  return http.post(`/api/v1/freelancer/job/apply`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    param: {
      job_id: job_id,
      proposal: proposal,
      cvUrl: cvUrl,
    },
  });
};
