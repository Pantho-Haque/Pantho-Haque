import { TApiResponse, TResume } from "@/types";
import apiRequest from "@/utils/apiRequest";
import { useQuery } from "@tanstack/react-query";

 

const RESUME_URL = "/api/resume";

 export function GetResume() {
  return useQuery({
    queryKey: ["resume"],
    queryFn: async () => {
      const response: TApiResponse<TResume> = await apiRequest({
        url: RESUME_URL,
        method: "GET",
      }) as TApiResponse<TResume>;

      if (!response.ok) {
        throw new Error(response.message || "Failed to fetch posts");
      }

      return response.data;
    },
  });
}
