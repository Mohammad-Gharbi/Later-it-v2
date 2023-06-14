import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Article"],
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => "/getArticles",
      providesTags: ["Article"],
    }),
    addArticle: builder.mutation({
      query: (articleURL) => ({
        url: "/addArticle",
        method: "POST",
        body: articleURL,
      }),
      invalidatesTags: ["Article"],
    }),

    deleteArticle: builder.mutation({
      query: (articleId) => ({
        url: "/deleteArticle",
        method: "POST",
        body: articleId,
      }),
      invalidatesTags: ["Article"],
    }),

    updateStatus: builder.mutation({
      query: ({ articleId, status }) => ({
        url: "/updateStatus",
        method: "POST",
        body: { articleId, status },
      }),
      invalidatesTags: ["Article"],
    }),

    addNewTag: builder.mutation({
      query: ({ tagName }) => ({
        url: "/addNewTag",
        method: "POST",
        body: { tagName },
      }),
      invalidatesTags: ["Article"],
    }),

    tagArticle: builder.mutation({
      query: ({ articleId, tag }) => ({
        url: "/tagArticle",
        method: "POST",
        body: { articleId, tag },
      }),
      invalidatesTags: ["Article"],
    }),

    getTag: builder.query({
      query: () => "/getTag",
      providesTags: ["Article"],
    }),

    deleteTag: builder.mutation({
      query: ({ tagId }) => ({
        url: "/deleteTag",
        method: "POST",
        body: { tagId },
      }),
      invalidatesTags: ["Article"],
    }),
    removeTagArticle: builder.mutation({
      query: ({ articleId, tag }) => ({
        url: "/removeTagArticle",
        method: "POST",
        body: { articleId, tag },
      }),
      invalidatesTags: ["Article"],
    }),
  }),
})

export const {
  useGetArticlesQuery,
  useAddArticleMutation,
  useDeleteArticleMutation,
  useUpdateStatusMutation,
  useTagArticleMutation,
  useGetTagQuery,
  useAddNewTagMutation,
  useDeleteTagMutation,
  useRemoveTagArticleMutation,
} = apiSlice
