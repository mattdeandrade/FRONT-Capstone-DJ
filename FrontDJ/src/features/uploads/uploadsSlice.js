import api from "../../store/api";

const uploadApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUploads: build.query({
      //Get user's uploads
      query: () => `/users/uploads`,

      transformResponse: (response) => response,
      transformErrorResponse: (response) => response.data.error,
      providesTags: ["upload"],
    }),
    getUpload: build.query({
      query: (id) => "/uploads/" + id,
      transformResponse: (response) => response.data,
      transformErrorResponse: (response) => response.data.error,
      providesTags: ["upload"],
    }),
    updateUpload: build.mutation({
      query: (upload) => ({
        url: `/uploads/${upload.id}`,
        method: "PUT",
        body: upload,
      }),
      invalidatesTags: ["upload"],
    }),
    addUpload: build.mutation({
      query: (upload) => ({
        url: "/uploads",
        method: "POST",
        body: upload,
      }),
      invalidatesTags: ["upload"],
    }),
    deleteUpload: build.mutation({
      query: (id) => ({
        url: "upload/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["upload"],
    }),
  }),
});
// When exporting queries, you put the words "use" and "query"
// around whatever name you chose above when injecting endpoints
export const {
  useGetUploadsQuery,
  useGetUploadQuery,
  useAddUploadMutation,
  useDeleteUploadMutation,
  useUpdateUploadMutation,
} = uploadApi;
