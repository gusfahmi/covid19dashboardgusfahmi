import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
	name: "TOTAL_COVID_DATA",
	initialState: {
		total: "",
	},
	reducers: {
		setTotalData: (state, action) => {
			state.total = action.payload;
		},

		setEmptyData: (state) => {
			state.total = "";
		},
	},
});

export const { setTotalData, setEmptyData } = dataSlice.actions;
export default dataSlice.reducer;
