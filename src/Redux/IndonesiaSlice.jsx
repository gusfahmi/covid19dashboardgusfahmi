import { createSlice } from "@reduxjs/toolkit";

export const IndonesiaSlice = createSlice({
	name: "INDONESIA_TOTAL_DATA",
	initialState: {
		total: "",
	},
	reducers: {
		setTotalIndonesia: (state, action) => {
			state.total = action.payload;
		},

		setEmptyIndonesia: (state) => {
			state.total = "";
		},
	},
});

export const { setTotalIndonesia, setEmptyIndonesia } = IndonesiaSlice.actions;
export default IndonesiaSlice.reducer;
