import React, { useEffect, useState } from "react";
import {
	Grid,
	CssBaseline,
	makeStyles,
	Typography,
	Paper,
	CircularProgress,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Header from "../Components/Header";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setLoadingStatus } from "../Redux/loadingSlice";

const Styles = makeStyles({
	wrapLoading: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100vh",
	},
	wrapView: {
		width: "100%",
		marginTop: 70,
		padding: 10,
	},
	wrapPaper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 10,
		margin: 10,
	},
	wrapTitle: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 10,
	},
});

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function View({ match }) {
	const styles = Styles();

	const { CountryCode } = match.params;

	const LOADING_STATUS = useSelector((state) => state.LOADING_STATUS.STATUS);
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);
	const [dataCountry, setDataCountry] = useState({});
	const [flag, setFlag] = useState("");

	useEffect(() => {
		setIsLoading(true);

		axios
			.get("https://api.covid19api.com/summary")
			.then((res) => {
				const summaries = res.data;
				const filterData = summaries.Countries.find(
					(data) => data.CountryCode === CountryCode.toUpperCase()
				);
				setDataCountry(filterData);
				document.title = filterData.Country.toUpperCase() + " | Covid 19";
				setIsLoading(false);
				dispatch(setLoadingStatus(false));
			})
			.catch((err) => (window.location = "../world"));

		axios
			.get("https://restcountries.eu/rest/v2/all")
			.then((res) => {
				const countries = res.data;
				const findFlag = countries.find(
					(country) => country.alpha2Code === CountryCode.toUpperCase()
				);
				setFlag(findFlag.flag);
			})
			.catch((err) => (window.location = "../world"));
	}, [LOADING_STATUS]);

	const {
		NewConfirmed,
		NewDeaths,
		NewRecovered,
		TotalConfirmed,
		TotalDeaths,
		TotalRecovered,
		Country,
	} = dataCountry;

	return (
		<>
			{isLoading ? (
				<div className={styles.wrapLoading}>
					<CssBaseline />
					<CircularProgress />
				</div>
			) : (
				<>
					<Header from='View' refresh='View' />
					<CssBaseline />
					<div className={styles.wrapView}>
						<Grid container>
							<div className={styles.wrapTitle}>
								<img src={flag} width={80} />
								<Typography
									variant='h5'
									style={{
										fontWeight: "bold",
										width: "100%",
										textAlign: "center",
										marginTop: 10,
									}}>
									{Country.toUpperCase()}
									<br />
								</Typography>
								<span>Today Data</span>
							</div>

							<Grid item xs={12} sm={12}>
								<Paper className={styles.wrapPaper}>
									<img
										src='/assets/images/hospital.png'
										width={60}
										style={{ marginBottom: 10 }}
									/>

									<Typography variant='h5'>
										{numberWithCommas(TotalConfirmed)}
									</Typography>

									<Typography>Total Case</Typography>
								</Paper>
							</Grid>
						</Grid>

						<Grid container>
							<Grid item sm={6} xs={12}>
								<Paper className={styles.wrapPaper}>
									<img
										src='/assets/images/death.png'
										width={60}
										style={{ marginBottom: 10 }}
									/>
									<Typography variant='h5'>
										{numberWithCommas(TotalDeaths)}
									</Typography>
									<Typography>Total Deaths</Typography>
								</Paper>
							</Grid>
							<Grid item sm={6} xs={12}>
								<Paper className={styles.wrapPaper}>
									<img
										src='/assets/images/recover.png'
										width={60}
										style={{ marginBottom: 10 }}
									/>
									<Typography variant='h5'>
										{numberWithCommas(TotalRecovered)}
									</Typography>
									<Typography>Total Recoverd</Typography>
								</Paper>
							</Grid>
						</Grid>

						<Grid container>
							<Grid item sm={4} xs={12}>
								<Paper className={styles.wrapPaper}>
									<img
										src='/assets/images/confirm.png'
										width={60}
										style={{ marginBottom: 10 }}
									/>
									<Typography variant='h5'>
										{numberWithCommas(NewConfirmed)}
									</Typography>
									<Typography>New Confirmed</Typography>
								</Paper>
							</Grid>
							<Grid item sm={4} xs={12}>
								<Paper className={styles.wrapPaper}>
									<img
										src='/assets/images/death.png'
										width={60}
										style={{ marginBottom: 10 }}
									/>
									<Typography variant='h5'>
										{numberWithCommas(NewDeaths)}
									</Typography>
									<Typography>New Deaths</Typography>
								</Paper>
							</Grid>
							<Grid item sm={4} xs={12}>
								<Paper className={styles.wrapPaper}>
									<img
										src='/assets/images/recover.png'
										width={60}
										style={{ marginBottom: 10 }}
									/>
									<Typography variant='h5'>
										{numberWithCommas(NewRecovered)}
									</Typography>
									<Typography>New Recovered</Typography>
								</Paper>
							</Grid>
						</Grid>
					</div>
				</>
			)}
		</>
	);
}
