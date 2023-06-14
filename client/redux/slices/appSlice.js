import { createSlice, current } from "@reduxjs/toolkit"

const appSlice = createSlice({
  name: "app",
  initialState: {
    section: "Inbox",
    currentTag: "",
    currentTagId: "",
    searchQuery: "",
  },
  reducers: {
    setSection(state, action) {
      state.section = action.payload
    },
    setCurrentTag(state, action) {
      state.currentTag = action.payload.currentTag
      state.currentTagId = action.payload.currentTagId
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload
    },
  },
})

export const { setSection, setCurrentTag, setSearchQuery } = appSlice.actions

export default appSlice.reducer
