// auth.api.ts
import { User } from "../types/user";
import http from "../utils/http";

export const loginAuth = (userName: string, password: string) =>
  http.httpjson.post("/api/v1/login", {
    userName: userName,
    password: password,
  });

export const registerAuth = (data) => {
  return http.httpjson.post("/api/v1/register", {
    userName: data.userName,
    email: data.email,
    password: data.password,
    phoneNum: data.phoneNum,
    typeUser: data.typeUser,
    lastName: data.lastName,
    firstName: data.firstName,
    address: data.address,
    company: data.company,
  });
};

// const token =
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RpbXZpZWNpdHMuaWQudm4vYXBpL3YxL2xvZ2luIiwiaWF0IjoxNzExNjI4Mjk3LCJleHAiOjE3MTE2MzE4OTcsIm5iZiI6MTcxMTYyODI5NywianRpIjoiYjZLMUtWN0s4ZWdqalNucSIsInN1YiI6IjQiLCJwcnYiOiIyMmNjMzQwNGIzMjdiYjAxNzNmMTE5NTA1MmVhNjY1NzJhMjkzMTFjIiwidXNlcl90eXBlIjoiZnJlZWxhbmNlciIsInVzZXJfaW5mbyI6eyJpZCI6NCwidXNlcm5hbWUiOiJhZG1pbkZyZWVsYW5jZXIiLCJlbWFpbCI6Ik1pbmhIdXllblRyYW4xMTAyQGdtYWlsLmNvbSIsImRhdGVfb2ZfYmlydGgiOm51bGwsImVtYWlsX3ZlcmlmaWVkX2F0IjoiMjAyNC0wMy0yMVQxNDowNzowMi4wMDAwMDBaIiwiZmlyc3RfbmFtZSI6Ikh1eWVuIiwibGFzdF9uYW1lIjoiVHJhbiBUaGkgTWluaCIsInBob25lX251bSI6IjAzODczMzY2OTkiLCJhZGRyZXNzIjoiNjBDIFRow61jaCBC4butdSDEkMSDbmcsIEfDsiBW4bqlcCwgSENNIiwicG9zaXRpb24iOm51bGwsInNleCI6IjAiLCJpbnRybyI6bnVsbCwiYXZhdGFyX3VybCI6IiIsImV4cGVjdGVkX3NhbGFyeSI6bnVsbCwiYXZhaWxhYmxlX3Byb3Bvc2FsIjpudWxsLCJzdGF0dXMiOiIxIiwiaXNfY29tcGxldGVkX3Byb2ZpbGUiOiIwIiwiZ29vZ2xlX2lkIjpudWxsLCJvdHAiOm51bGwsIm90cF9leHAiOm51bGwsImJhbmtfYWNjb3VudCI6bnVsbCwiY3JlYXRlZF9hdCI6IjIwMjQtMDMtMjFUMTQ6MDY6NDIuMDAwMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDI0LTAzLTI4VDA4OjM4OjE5LjAwMDAwMFoifX0.OnB0FVWujswwp7qWWQgUG_gdBOaFkV4axhZ-XUj3RZE";
export const getListSkill = (token) =>
  http.httpjson.get("/api/v1/administrator/skill", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: 1,
      num: 100,
      search: "",
    },
  });
  export const getImage = (uri, type, mime)=>{
    const blob = {
      uri: uri,
      type: type,
      name: mime,
    } as any;
    const formData = new FormData();
    formData.append("sign", blob);
    return http.httpform.post("/api/v1/upload-file",formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },

    })
  }
