import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Header from "./Header";
import {
	Grid,
	Typography,
	Paper,
	Select,
	FormControl,
	MenuItem,
	InputLabel,
	makeStyles,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { useSelector, useDispatch } from "react-redux";
import { setWorldLists } from "../Redux/WorldSlice";
import { setWorldConfirmed } from "../Redux/WorldConfirmed";
import { setWorldConfirmedSearch } from "../Redux/WorldSearchSlice";

import axios from "axios";

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function loadingSkeleton() {
	return (
		<>
			{[...Array(3)].map((data, index) => (
				<Grid item xs={12} sm={4} key={index}>
					<Paper
						style={{
							height: 200,
							padding: 10,
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Skeleton variant='circle' width={80} height={80} />
						<Skeleton variant='text' width={100} />
						<Skeleton variant='text' width={70} />
					</Paper>
				</Grid>
			))}
		</>
	);
}

const findFlag = (Arr, countryCode) => {
	const dataCountry = Arr.find((obj) => obj.alpha2Code === countryCode);
	return dataCountry.flag;
};

const Styles = makeStyles({
	wrapTitle: {
		width: "100%",
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
	},
	selectShow: {
		display: "block",
	},
	selectHide: {
		display: "hidden",
	},
});

export default function World() {
	const styles = Styles();
	const [sortirValue, setSortirValue] = useState("");

	const WorldLists = useSelector((state) => state.WORLD_DATA.wordLists);
	const WorldConfirmed = useSelector(
		(state) => state.WORLD_CONFIRMED.WORLD_CONFIRMED
	);
	const SearchStatus = useSelector(
		(state) => state.SEARCH_STATUS.SEARCH_STATUS
	);

	const dispatch = useDispatch();

	useEffect(() => {
		document.title = "World Data | Covid 19";
		setSortirValue("");
	}, [SearchStatus]);

	useEffect(() => {
		axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
			dispatch(setWorldLists(res.data));
		});

		axios
			.get("https://api.covid19api.com/summary")
			.then((res) => {
				const Countries = res.data.Countries;
				dispatch(setWorldConfirmed({ Countries: Countries }));
				dispatch(setWorldConfirmedSearch({ Countries: Countries }));
			})
			.catch((err) => {
				alert(
					"API Service is temporary unavailable, Please try again later."
				);

				window.location = "/";
			});
	}, []);

	const handleSortir = (e) => {
		setSortirValue(e.target.value);
		const sortirValue = e.target.value;

		let dataSortir = null;
		if (sortirValue === "Sort by Name - Descending") {
			dataSortir = WorldConfirmed.Countries.slice().sort((a, b) =>
				a.Country < b.Country ? 1 : -1
			);
		} else if (sortirValue === "Sort by Name - Ascending") {
			dataSortir = WorldConfirmed.Countries.slice().sort((a, b) =>
				a.Country > b.Country ? 1 : -1
			);
		} else if (sortirValue === "Sort by Total Confirmed - Descending") {
			dataSortir = WorldConfirmed.Countries.slice().sort(
				(a, b) => b.TotalConfirmed - a.TotalConfirmed
			);
		} else if (sortirValue === "Sort by Total Confirmed - Ascending") {
			dataSortir = WorldConfirmed.Countries.slice().sort(
				(a, b) => a.TotalConfirmed - b.TotalConfirmed
			);
		}

		dispatch(setWorldConfirmed({ Countries: dataSortir }));
	};

	return (
		<>
			<Header from='World' refresh='World' />

			<Grid container style={{ padding: 10, marginTop: 80 }}>
				<div className={styles.wrapTitle}>
					<Typography
						variant='h5'
						style={{
							fontWeight: "bold",
						}}>
						WORLD COVID 19 DATA
					</Typography>

					{WorldConfirmed.length === 0 ? (
						<Skeleton
							variant='rect'
							style={{ width: 150, height: 40, marginTop: 15 }}
						/>
					) : (
						<FormControl variant='outlined' style={{ marginTop: 15 }}>
							<InputLabel>Sort Data</InputLabel>
							<Select
								onChange={handleSortir}
								style={{ width: 250 }}
								value={sortirValue}
								label='Sort Data'>
								<MenuItem value='Sort by Name - Ascending'>
									Sort by Name - Ascending
								</MenuItem>
								<MenuItem value='Sort by Name - Descending'>
									Sort by Name - Descending
								</MenuItem>
								<MenuItem value='Sort by Total Confirmed - Ascending'>
									Sort by Total Confirmed - Ascending
								</MenuItem>
								<MenuItem value='Sort by Total Confirmed - Descending'>
									Sort by Total Confirmed - Descending
								</MenuItem>
							</Select>
						</FormControl>
					)}
				</div>

				<Grid container spacing={3} style={{ marginTop: 10, padding: 10 }}>
					{WorldConfirmed.length === 0
						? loadingSkeleton()
						: WorldConfirmed.Countries &&
						  WorldConfirmed.Countries.map(
								({ ID, CountryCode, TotalConfirmed, Country }) => (
									<Grid item xs={12} sm={4} key={ID}>
										<Link
											to={`/view/${CountryCode}`}
											style={{ textDecoration: "none" }}>
											<Paper
												style={{
													height: 200,
													padding: 10,
													display: "flex",
													flexDirection: "column",
													justifyContent: "center",
													alignItems: "center",
												}}>
												<img
													src={findFlag(WorldLists, CountryCode)}
													style={{ width: 80 }}
												/>

												<Typography
													variant='h5'
													style={{
														fontWeight: "bold",
														marginTop: 8,
													}}>
													{numberWithCommas(TotalConfirmed)}
												</Typography>
												<Typography
													style={{
														marginTop: 10,
														textAlign: "center",
													}}>
													{Country}
												</Typography>
											</Paper>
										</Link>
									</Grid>
								)
						  )}
				</Grid>
			</Grid>
		</>
	);
}
