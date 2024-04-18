import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const apiClient = createApi({
  tagTypes: ["Member", "Team", "Role"],
  reducerPath: "trainingApplicationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${window.location.origin}/training-application/api`,
    fetchFn: async (...args) => {
      return fetch(...args)
    },
    prepareHeaders: (headers) => {
      return headers }
  }),
  endpoints: () => ({})

})

export default apiClient
