/**
 * Makes an API request with the given parameters
 * @param {Object} meta - Request configuration
 * @param {string} meta.url - API endpoint URL (without the base URL)
 * @param {string} [meta.method="GET"] - HTTP method
 * @param {Object} [meta.params] - URL query parameters
 * @param {Object} [meta.headers] - Custom request headers
 * @param {Object} [meta.data] - Request body data
 * @param {string} [meta.token] - Authentication token
 * @param {boolean} [meta.includeCredentials=false] - Whether to include credentials
 * @returns {Promise<Object>} Response data with status
 */
export default async function apiRequest(meta) {
  if (!meta || typeof meta !== "object") {
    throw new Error("API request configuration is required");
  }

  const {
    url,
    method = "GET",
    params,
    headers = {},
    data,
    token,
    includeCredentials = false,
    ...restOptions
  } = meta;

  if (!url || typeof url !== "string") {
    throw new Error("URL is required for API request");
  }

  // Build URL with parameters
  //   let urlWithParams = "/api-proxy" + url;
  let urlWithParams = url;
  if (params && Object.keys(params).length > 0) {

    const encodedParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        encodedParams.append(key, String(value));
      }
    });

    const queryString = encodedParams.toString();
    if (queryString) {
      urlWithParams += `?${queryString}`;
    }
  }

  // Determine base URL based on environment
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

  const fullUrl = new URL(urlWithParams, baseUrl).toString();

  // Prepare headers
  const requestHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...headers,
  };

  // Add authorization if token is provided
  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  // Determine if request should have a body
  const methodUpperCase = method.toUpperCase();
  const shouldHaveBody = !["GET", "HEAD"].includes(methodUpperCase);
  const body = shouldHaveBody && data ? JSON.stringify(data) : undefined;

  try {
    const response = await fetch(fullUrl, {
      method: methodUpperCase,
      headers: requestHeaders,
      body,
      credentials: includeCredentials || token ? "include" : "omit",
      ...restOptions,
    });

    // Handle different response types
    let responseData;
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json();
    } else if (contentType && contentType.includes("text/")) {
      responseData = { data: await response.text() };
    } else {
      responseData = { data: await response.blob() };
    }

    // Handle authentication errors
    if (response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    }

    // Return both the response data and status
    return {
      data:responseData,
      ok: response.ok,
      message: response.statusText,
      status: response.status,
    };
  } catch (error) {
    console.error("API request failed:", error);

    // Return a structured error response
    return {
      ok: false,
      message: error.message || "Network request failed",
      status: 0,
    };
  }
}