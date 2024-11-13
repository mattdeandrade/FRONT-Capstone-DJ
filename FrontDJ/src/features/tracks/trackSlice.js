import api from "../../store/api";

const trackApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTracks: build.query({
      //Get user's tracks
      query: () => `/users/tracks`,
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response.data.error,
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
      query: (getFile) => {
        const formData = new FormData();
        formData.append("mp3", getFile);
        return {
          url: "/tracks",
          method: "POST",
          body: formData,
        };
      },
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
