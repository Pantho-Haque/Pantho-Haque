import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const body = await req.json();

  //   const endpoint = config.parcel.host + apiEndpoints.codTracking.info(id);
  //   const headers = {
  //     "content-type": "application/json",
  //   };

  //   try {
  //     const response = await axios.post(endpoint, { payment_method }, { headers, timeout: 10000 });
  //     return NextResponse.json(response.data);
  //   } catch (error) {
  //     console.error("Error fetching cod payment redirection link:", error);
  //     if (axios.isAxiosError(error)) {
  //       return NextResponse.json(
  //         {
  //           error:
  //             error.response?.data?.error ||
  //             "Failed to fetch cod payment redirection link",
  //         },
  //         { status: error.response?.status || 500 },
  //       );
  //     }
  //     return NextResponse.json(
  //       { error: "Failed to fetch cod payment redirection link" },
  //       { status: 500 },
  //     );
  //   }
  return NextResponse.json({ message: "Success", body, id });
}
