import { createSlice } from "@reduxjs/toolkit";

export const WorldConfirmed = createSlice({
	name: "WORLD_CONFIRMED",
	initialState: {
		WORLD_CONFIRMED: [],
	},

	reducers: {
		setWorldConfirmed: (state, action) => {
			state.WORLD_CONFIRMED = action.payload;
		},

		setEmptyWorldConfirmed: (state) => {
			state.WORLD_CONFIRMED = [];
		},
	},
});

export const {
	setWorldConfirmed,
	setEmptyWorldConfirmed,
} = WorldConfirmed.actions;
export default WorldConfirmed.reducer;
