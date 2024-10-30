const trackApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTracks: build.query({
      query: () => "/tracks",
      transformResponse: (response) => response,
      // transformErrorResponse: (response) => response.data.error,
      providesTags: ["track"],
    }),
    getTrack: build.query({
      query: (id) => "/tracks/" + id,
      transformResponse: (response) => response.data,
      transformErrorResponse: (response) => response.data.error,
      providesTags: ["track"],
    }),
    updateTrack: build.mutation({
      query: (track) => ({
        url: `/tracks/${track.id}`,
        method: "PUT",
        body: track,
      }),
      invalidatesTags: ["track"],
    }),
    addTrack: build.mutation({
      query: (track) => ({
        url: "/tracks",
        method: "POST",
        body: track,
      }),
      invalidatesTags: ["track"],
    }),
    deleteTrack: build.mutation({
      query: (id) => ({
        url: "tracks/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["track"],
    }),
  }),
});
// When exporting queries, you put the words "use" and "query"
// around whatever name you chose above when injecting endpoints
export const {
  useGetTracksQuery,
  useGetTrackQuery,
  useAddTrackMutation,
  useDeleteTrackMutation,
  useUpdateTrackMutation,
} = trackApi;
