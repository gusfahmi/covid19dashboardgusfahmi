import { createSlice } from "@reduxjs/toolkit";

export const LoadingStatus = createSlice({
	name: "LOADING_STATUS",
	initialState: {
		STATUS: false,
	},
	reducers: {
		setLoadingStatus: (state, action) => {
			state.STATUS = action.payload;
		},
	},
});

export const { setLoadingStatus } = LoadingStatus.actions;
export default LoadingStatus.reducer;
