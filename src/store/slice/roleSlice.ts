import { Role } from "../../models/Role"
import apiClient from "../../services/training-application-api-slice"

export const roleApiSlice = apiClient.injectEndpoints({
  endpoints: (build) => ({
    getAllRoles: build.query<Role[], void>({
      query: () => "/roles",
      providesTags: ["Role"]
    })
  }),
  overrideExisting: false
})

export const { useGetAllRolesQuery } = roleApiSlice
