import api from "../../store/api";

const playlistApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Get all playlists (public, no authentication required)
    getPlaylists: build.query({
      query: () => "/playlists", // This should work for public playlists
      transformResponse: (response) => response,
      providesTags: ["playlist"],
    }),

    // Get playlists by user (with authentication)
    getUserPlaylists: build.query({
      query: (id) => ({
        url: `/users/playlists`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Make sure token is set
        },
      }),
      transformResponse: (response) => response,
      providesTags: ["playlist"],
    }),

    // Get specified playlist
    getPlaylist: build.query({
      query: (id) => `/playlists/${id}`,
      transformResponse: (response) => response, // Assumes the response contains the `playlist` object
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

    // Post a new playlist
    addPlaylist: build.mutation({
      query: (playlist) => ({
        url: "/playlists",
        method: "POST",
        body: playlist,
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["playlist"],
    }),

    // Delete a playlist
    deletePlaylist: build.mutation({
      query: (id) => ({
        url: `/playlists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["playlist"],
    }),

    // Play a playlist
    playPlaylist: build.mutation({
      query: (id) => ({
        url: `/playlists/play/${id}`, // Ensure this route is correct in the backend
        method: "POST", // To trigger playback
      }),
      invalidatesTags: ["playlist"],
    }),

    // Share a playlist
    sharePlaylist: build.mutation({
      query: (id) => ({
        url: `/playlists/share/${id}`, // Ensure this route is correct in the backend
        method: "POST", // To create a shareable Link
      }),
      invalidatesTags: ["playlist"],
    }),
  }),
});

// Export the hooks to use in your components
export const {
  useGetPlaylistsQuery,
  useGetUserPlaylistsQuery,
  useGetPlaylistQuery,
  useAddPlaylistMutation,
  useDeletePlaylistMutation,
  useEditPlaylistMutation,
  useSharePlaylistMutation,
  usePlayPlaylistMutation,
} = playlistApi;
