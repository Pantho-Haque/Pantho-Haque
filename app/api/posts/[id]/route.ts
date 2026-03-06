import axios from "axios";
import config from "@/config";
import apiEndpoints from "@/config/apiEndpoints";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  if(!id){
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  const endpoint = config.api.host + apiEndpoints.posts.getById(Number(id));

  const headers = {
    "content-type": "application/json",
  };

  try {
    const response = await axios.get(endpoint, { headers, timeout: 10000 });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching post:", error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error:
            error.response?.data?.error ||
            "Failed to fetch post",
        },
        { status: error.response?.status || 500 },
      );
    }
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 },
    );
  }
}
