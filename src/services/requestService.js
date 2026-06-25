import api from "./api";

export const getRequests = async () => {
  const response = await api.get("/requests");
  return response.data;
};

export const createRequest = async (data) => {
  const response = await api.post(
    "/purchase-request",
    data
  );

  return response.data;
};

export const approveRequest = async (
  requestId
) => {

  const response = await api.post(
    "/approve",
    {
      request_id: requestId,
      manager: "Nguyen Van A",
    }
  );

  return response.data;
};

export const rejectRequest = async (
  requestId,
  comment
) => {

  const response = await api.post(
    "/reject",
    {
      request_id: requestId,
      manager: "Nguyen Van A",
      comment,
    }
  );

  return response.data;
};
