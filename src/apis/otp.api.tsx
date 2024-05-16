import http from "../utils/http";

export const sendOtpApi = (token) => {
  return http.httpjson.post("/api/v1/send-otp", null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const verifyOtpApi = (token, otp) => {
  return http.httpform.post(
    "/api/v1/verify-otp",
    { otp: otp },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
