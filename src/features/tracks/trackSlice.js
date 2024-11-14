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
      //Get a single track
      query: (id) => "/tracks/" + id,
      transformResponse: (response) => response.data,
      transformErrorResponse: (response) => response.data.error,
      providesTags: ["track"],
    }),
    updateTrack: build.mutation({
      //Update a track
      query: (track) => ({
        url: `/tracks/${track.id}`,
        method: "PUT",
        body: track,
      }),
      invalidatesTags: ["track"],
    }),
    addTrack: build.mutation({
      //Post a track to a user's library
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
      //Delete a track from the user's library
      query: (id) => ({
        url: "tracks/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["track"],
    }),
  }),
});

export const {
  useGetTracksQuery,
  useGetTrackQuery,
  useAddTrackMutation,
  useDeleteTrackMutation,
  useUpdateTrackMutation,
} = trackApi;
