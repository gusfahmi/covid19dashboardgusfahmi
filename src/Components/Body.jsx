import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, Paper, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setTotalData } from "../Redux/dataSlice";
import { setTotalIndonesia } from "../Redux/IndonesiaSlice";

const styles = makeStyles({
	cardContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		padding: "10px",
		textAlign: "center",
	},
});
function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Body() {
	const [malaysia, setMalaysia] = useState("");
	const [singapore, setSingapore] = useState("");
	const [thailand, setThailand] = useState("");
	const [brunei, setBrunei] = useState("");
	const [philippines, setPhilippines] = useState("");
	const Styles = styles();

	//TOTAL_COVID_DATA comes from variable in ../Redux/Store.js
	const total = useSelector((state) => state.TOTAL_COVID_DATA.total);
	const dispatch = useDispatch();

	const indonesia = useSelector((state) => state.TOTAL_INDONESIA_DATA.total);

	useEffect(() => {
		axios.get("https://covid19.mathdro.id/api").then((res) => {
			dispatch(setTotalData(numberWithCommas(res.data.confirmed.value)));
		});

		axios
			.get("https://covid19.mathdro.id/api/countries/indonesia")
			.then((res) => {
				dispatch(
					setTotalIndonesia(numberWithCommas(res.data.confirmed.value))
				);
			});

		axios
			.get("https://covid19.mathdro.id/api/countries/malaysia")
			.then((res) => {
				setMalaysia(numberWithCommas(res.data.confirmed.value));
			});

		axios
			.get("https://covid19.mathdro.id/api/countries/singapore")
			.then((res) => {
				setSingapore(numberWithCommas(res.data.confirmed.value));
			});

		axios
			.get("https://covid19.mathdro.id/api/countries/thailand")
			.then((res) => {
				setThailand(numberWithCommas(res.data.confirmed.value));
			});
		axios
			.get("https://covid19.mathdro.id/api/countries/brunei")
			.then((res) => {
				setBrunei(numberWithCommas(res.data.confirmed.value));
			});
		axios
			.get("https://covid19.mathdro.id/api/countries/philippines")
			.then((res) => {
				setPhilippines(numberWithCommas(res.data.confirmed.value));
			});
	}, [total]);

	return (
		<>
			<Grid container style={{ padding: "10px", marginTop: 80 }}>
				<Typography
					variant='h4'
					style={{
						margin: "0px auto",
						fontWeight: "bold",
						marginBottom: 10,
					}}>
					COVID 19 DATA
				</Typography>

				<Grid item xs={12}>
					<Link
						to='/world'
						style={{ color: "#000", textDecoration: "none" }}>
						<Paper className={Styles.cardContainer}>
							<img
								src='/assets/images/world.png'
								style={{ width: 100, marginBottom: 10 }}
							/>

							{total.length === 0 ? (
								<Skeleton animation='wave' width={100} height={40} />
							) : (
								<Typography variant='h4'>{total}</Typography>
							)}

							<Typography>Total Case Around The World</Typography>
						</Paper>
					</Link>
				</Grid>

				<Grid container spacing={3} style={{ marginTop: 15 }}>
					<Grid item xs={12} sm={4}>
						<Link
							to='/view/ID'
							style={{ color: "#000", textDecoration: "none" }}>
							<Paper className={Styles.cardContainer}>
								<img
									src='/assets/images/indonesia.png'
									style={{ width: 100, marginBottom: 10 }}
								/>
								{total.length === 0 ? (
									<Skeleton animation='wave' width={100} height={40} />
								) : (
									<Typography variant='h4'>{indonesia}</Typography>
								)}
								<Typography>Total Case in Indonesia</Typography>
							</Paper>
						</Link>
					</Grid>

					<Grid item xs={12} sm={4}>
						<Link
							to='/view/MY'
							style={{ color: "#000", textDecoration: "none" }}>
							<Paper className={Styles.cardContainer}>
								<img
									src='/assets/images/malaysia.png'
									style={{ width: 100, marginBottom: 10 }}
								/>
								{total.length === 0 ? (
									<Skeleton animation='wave' width={100} height={40} />
								) : (
									<Typography variant='h4'>{malaysia}</Typography>
								)}
								<Typography>Total Case in Malaysia</Typography>
							</Paper>
						</Link>
					</Grid>

					<Grid item xs={12} sm={4}>
						<Link
							to='/view/ID'
							style={{ color: "#000", textDecoration: "none" }}>
							<Paper className={Styles.cardContainer}>
								<img
									src='/assets/images/singapore.png'
									style={{ width: 100, marginBottom: 10 }}
								/>
								{total.length === 0 ? (
									<Skeleton animation='wave' width={100} height={40} />
								) : (
									<Typography variant='h4'>{singapore}</Typography>
								)}
								<Typography>Total Case in Singapore</Typography>
							</Paper>
						</Link>
					</Grid>

					<Grid item xs={12} sm={4}>
						<Link
							to='/view/TH'
							style={{ color: "#000", textDecoration: "none" }}>
							<Paper className={Styles.cardContainer}>
								<img
									src='/assets/images/thailand.png'
									style={{ width: 100, marginBottom: 10 }}
								/>
								{total.length === 0 ? (
									<Skeleton animation='wave' width={100} height={40} />
								) : (
									<Typography variant='h4'>{thailand}</Typography>
								)}
								<Typography>Total Case in Thailand</Typography>
							</Paper>
						</Link>
					</Grid>

					<Grid item xs={12} sm={4}>
						<Link
							to='/view/BN'
							style={{ color: "#000", textDecoration: "none" }}>
							<Paper className={Styles.cardContainer}>
								<img
									src='/assets/images/brunei.png'
									style={{ width: 100, marginBottom: 10 }}
								/>
								{total.length === 0 ? (
									<Skeleton animation='wave' width={100} height={40} />
								) : (
									<Typography variant='h4'>{brunei}</Typography>
								)}
								<Typography>Total Case in Brunei</Typography>
							</Paper>
						</Link>
					</Grid>

					<Grid item xs={12} sm={4}>
						<Link
							to='/view/PH'
							style={{ color: "#000", textDecoration: "none" }}>
							<Paper className={Styles.cardContainer}>
								<img
									src='/assets/images/philippines.png'
									style={{ width: 100, marginBottom: 10 }}
								/>
								{total.length === 0 ? (
									<Skeleton animation='wave' width={100} height={40} />
								) : (
									<Typography variant='h4'>{philippines}</Typography>
								)}
								<Typography>Total Case in Philippines</Typography>
							</Paper>
						</Link>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
}
