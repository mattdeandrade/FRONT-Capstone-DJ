import api from "../../store/api";

const editApi = api.injectEndpoints({
  endpoints: (build) => ({
    getEdits: build.query({
      //Get user's edits
      query: () => `/users/edits`,

      transformResponse: (response) => response,
      transformErrorResponse: (response) => response.data.error,
      providesTags: ["edit"],
    }),
    getEdit: build.query({
      query: (id) => "/edits/" + id,
      transformResponse: (response) => response.data,
      transformErrorResponse: (response) => response.data.error,
      providesTags: ["edit"],
    }),
    updateEdit: build.mutation({
      query: (edit) => ({
        url: `/edits/${edit.id}`,
        method: "PUT",
        body: edit,
      }),
      invalidatesTags: ["edit"],
    }),
    addEdit: build.mutation({
      query: (edit) => ({
        url: "/edits",
        method: "POST",
        body: edit,
      }),
      invalidatesTags: ["edit"],
    }),
    deleteEdit: build.mutation({
      query: (id) => ({
        url: "edits/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["edit"],
    }),
  }),
});
// When exporting queries, you put the words "use" and "query"
// around whatever name you chose above when injecting endpoints
export const {
  useGetEditsQuery,
  useGetEditQuery,
  useAddEditMutation,
  useDeleteEditMutation,
  useUpdateEditMutation,
} = editApi;
