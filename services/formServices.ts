import { TApiResponse, TForm, TFormRespose } from "@/types";
import apiRequest from "@/utils/apiRequest";
import { useMutation } from "@tanstack/react-query";

const FORM_SUBMISSION_URL = "/api/form"

export function FormSubmission(){
  return useMutation({
    mutationFn: async ({ uid , body }: { uid: string , body: TForm }) => {
      const response: TApiResponse<TFormRespose> = (await apiRequest({
        url: FORM_SUBMISSION_URL,
        params: {
          id: uid
        },
        data: body,
        method: "POST",
      })) as TApiResponse<TFormRespose>;

      if (!response.ok) {
        throw new Error(response.data?.error || response.data?.message || "Failed to fetch cod payment redirection link");
      }
      
      return response.data;
    },
  });
}