import React from "react";
import { createSlice } from "@reduxjs/toolkit";

export const WorldSlice = createSlice({
	name: "world",
	initialState: {
		wordLists: [],
	},
	reducers: {
		setWorldLists: (state, action) => {
			state.wordLists = action.payload;
		},
		setEmptyWorld: (state) => {
			state.worldLists = [];
		},
	},
});

export const { setWorldLists, setEmptyWorld } = WorldSlice.actions;
export default WorldSlice.reducer;
