import { createSlice } from "@reduxjs/toolkit";

export const WorldSearchSlice = createSlice({
	name: "WORLD_SEARCH_SLICE",
	initialState: {
		WORLD_LIST_CONFIRMED: [],
	},
	reducers: {
		setWorldConfirmedSearch: (state, action) => {
			state.WORLD_LIST_CONFIRMED = action.payload;
		},
	},
});

export const { setWorldConfirmedSearch } = WorldSearchSlice.actions;
export default WorldSearchSlice.reducer;
