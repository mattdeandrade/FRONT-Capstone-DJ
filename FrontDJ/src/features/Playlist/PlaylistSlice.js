import api from "../../store/api";

const playlistApi = api.injectEndpoints({
  endpoints: (build) => ({
    //Get all playlists
    getPlaylists: build.query({
      query: () => "/playlists",
      transformResponse: (response) => response,
      providesTags: ["playlist"],
    }),
    //Get specified playlist
    getPlaylist: build.query({
      query: (id) => `/playlists/${id}`,
      transformResponse: (response) => response.playlist,
      providesTags: ["playlist"],
    }),
    // Edit playlist (including adding tracks)
    editPlaylist: build.mutation({
      query: ({ id, trackIds }) => ({
        url: `/playlists/${id}`,
        method: "PATCH",
        body: { trackIds },
      }),
      invalidatesTags: ["playlist"],
    }),

    //Post a new playlist
    addPlaylist: build.mutation({
      query: (playlist) => ({
        url: "/playlists",
        method: "POST",
        body: playlist,
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["playlist"],
    }),
    //Delete a playlist
    deletePlaylist: build.mutation({
      query: (id) => ({
        url: `/playlists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["playlist"],
    }),
    //Play a playlist
    playPlaylist: build.mutation({
      query: (id) => ({
        url: `/playlists/play/${id}`, //have to confirm URL with the backend team
        method: "POST", // To trigger playback
      }),
      invalidatesTags: ["playlist"],
    }),
    //share a playlist
    sharePlaylist: build.mutation({
      query: (id) => ({
        url: `/playlists/share/${id}`,
        method: "POST", //To create a shareable Link
      }),
      invalidatesTags: ["playlist"],
    }),
  }),
});
// When exporting queries, you put the words "use" and "query"
// around whatever name you chose above when injecting endpoints
export const {
  useGetPlaylistsQuery,
  useGetPlaylistQuery,
  useAddPlaylistMutation,
  useDeletePlaylistMutation,
  useEditPlaylistMutation,
  useSharePlaylistMutation,
  usePlayPlaylistMutation,
} = playlistApi;
