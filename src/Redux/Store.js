import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import TotalDataCovidReducer from "./dataSlice";
import TotalIndonesiaData from "./IndonesiaSlice";
import WorldSlice from "./WorldSlice";
import WorldConfirmed from "./WorldConfirmed";
import WorldSearchSlice from "./WorldSearchSlice";
import SearchStatusSlice from "./searchStatusSlice";
import LoadingStatusSlice from "./loadingSlice";

export default configureStore({
	reducer: {
		TOTAL_COVID_DATA: TotalDataCovidReducer,
		TOTAL_INDONESIA_DATA: TotalIndonesiaData,
		WORLD_DATA: WorldSlice,
		WORLD_CONFIRMED: WorldConfirmed,
		WORLD_SEARCH_CONFIRMED: WorldSearchSlice,
		SEARCH_STATUS: SearchStatusSlice,
		LOADING_STATUS: LoadingStatusSlice,
	},
	middleware: (getDefaultMiddleware) => {
		getDefaultMiddleware({
			serializableCheck: false,
		});
	},
});
