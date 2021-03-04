import { createSlice } from "@reduxjs/toolkit";

export const SearchStatusSlice = createSlice({
	name: "SEARCH_STATUS",
	initialState: {
		SEARCH_STATUS: "",
	},
	reducers: {
		setSearchStatus: (state, action) => {
			state.SEARCH_STATUS = action.payload;
		},
	},
});

export const { setSearchStatus } = SearchStatusSlice.actions;
export default SearchStatusSlice.reducer;
