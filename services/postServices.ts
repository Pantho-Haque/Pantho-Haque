import apiEndpoints from "@/config/apiEndpoints";
import { TApiResponse, TPost } from "@/types";
import apiRequest from "@/utils/apiRequest";
import { useQuery } from "@tanstack/react-query";

const LIST_POSTS = "/api/posts"
const GET_POST_BY_ID = "/api/posts/"


export function GetPosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response: TApiResponse<TPost[]> = await apiRequest({
        url: LIST_POSTS,
        method: "GET",
      }) as TApiResponse<TPost[]>;

      if (!response.ok) {
        throw new Error(response.message || "Failed to fetch posts");
      }

      return response.data;
    },
  });
}

export function GetPostById(id: number) {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      const response: TApiResponse<TPost> = await apiRequest({
        url: GET_POST_BY_ID + id,
        method: "GET",
      }) as TApiResponse<TPost>;

      if (!response.ok) {
        throw new Error(response.message || "Failed to fetch post");
      }

      return response.data;
    },
  });
}


// export function CreatePost(){
//   return useMutation({
//     mutationFn: async ({ uid, payment_method }: { uid: string; payment_method: string | undefined }) => {
//       const response: TApiResponse<TPaymentRedirectionLink> = (await apiRequest({
//         url: COD_TRACKING_URL,
//         params: {
//           id: uid,
//           payment_method: payment_method
//         },
//         method: "POST",
//       })) as TApiResponse<TPaymentRedirectionLink>;

//       if (!response.ok) {
//         throw new Error(response.data?.error || "Failed to fetch cod payment redirection link");
//       }
      
//       return response.data;
//     },
//   });
// }
