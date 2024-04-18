import { CondensedTeam } from "../../models/Member"
import { Team } from "../../models/Team"
import apiClient from "../../services/training-application-api-slice"

export const teamApiSlice = apiClient.injectEndpoints({
  endpoints: (build) => ({
    getAllTeams: build.query<Team[], void>({
      query: () => "/teams",
      providesTags: ["Team"]
    }),
    getAllTeamsCondensed: build.query<CondensedTeam[], void>({
      query: () => "/condensed-teams",
      providesTags: ["Team"]
    }),
    getTeamById: build.query<Team, string>({
      query: (id) => `/teams/${id}`,
      providesTags: ["Team"]
    }),
    // CREATE
    createTeam: build.mutation<Team, Partial<Team>>({
      query: (body) => ({
        url: "/teams",
        method: "POST",
        body
      }),
      invalidatesTags: ["Team"]
    }),
    // UPDATE
    updateTeam: build.mutation<Team, Partial<Team>>({
      query: (body) => ({
        url: `/teams/${body.pkId}`,
        method: "PUT",
        body
      }),
      invalidatesTags: ["Team", "Member"]
    }),
    // DELETE
    deleteTeam: build.mutation<void, string>({
      query: (id) => ({
        url: `/teams/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Team"]
    })
  }),
  overrideExisting: false
})

export const {
  useGetAllTeamsQuery,
  useGetAllTeamsCondensedQuery,
  useGetTeamByIdQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation
} = teamApiSlice

