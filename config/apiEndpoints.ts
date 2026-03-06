/**
 * API Endpoints configuration
 * All API endpoints should be defined here for consistency
 */

const apiEndpoints = {
  posts: {
    list: () => "/posts",
    getById: (id: number) => `/posts/${id}`,
    create: () => "/posts",
    update: (id: number) => `/posts/${id}`,
    delete: (id: number) => `/posts/${id}`,
  },
};

export default apiEndpoints;
