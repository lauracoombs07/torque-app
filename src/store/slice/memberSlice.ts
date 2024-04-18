import { Member, MemberCreate, MemberUpdate } from "../../models/Member"
import apiClient from "../../services/training-application-api-slice"

export const memberApiSlice = apiClient.injectEndpoints({
  endpoints: (build) => ({
    getAllMembers: build.query<Member[], void>({
      query: () => "/members",
      providesTags: ["Member"]
    }),
    getMemberById: build.query<Member, string>({
      query: (id) => `/members/${id}`,
      providesTags: ["Member"]
    }),
    createMember: build.mutation<MemberCreate, any>({
      query: (body) => ({
        url: "/members",
        method: "POST",
        body
      }),
      invalidatesTags: ["Member"]
    }),
    updateMember: build.mutation<MemberUpdate, any>({
      query: (body) => ({
        url: `/members/${body.id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: ["Member"]
    }),
    deleteMember: build.mutation<void, string>({
      query: (id) => ({
        url: `/members/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Member"]
    })
  }),
  overrideExisting: false
})

export const {
  useGetAllMembersQuery,
  useGetMemberByIdQuery,
  useCreateMemberMutation,
  useUpdateMemberMutation,
  useDeleteMemberMutation
} = memberApiSlice

