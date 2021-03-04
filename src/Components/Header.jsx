import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	Grid,
	IconButton,
	InputAdornment,
	InputBase,
	Drawer,
	ListItem,
	ListItemText,
	List,
	useTheme,
	useMediaQuery,
	ListItemIcon,
	Typography,
} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import CachedIcon from "@material-ui/icons/Cached";
import SearchIcon from "@material-ui/icons/Search";
import { MenuOutlined, Public } from "@material-ui/icons";

import { useDispatch, useSelector } from "react-redux";
import { setEmptyData } from "../Redux/dataSlice";
import {
	setEmptyWorldConfirmed,
	setWorldConfirmed,
} from "../Redux/WorldConfirmed";

import { setSearchStatus } from "../Redux/searchStatusSlice";
import { setLoadingStatus } from "../Redux/loadingSlice";

const styles = makeStyles((theme) => ({
	rootToolbar: {
		padding: 10,
	},
	AppBar: {
		//zIndex: theme.zIndex.drawer + 1,
		boxShadow: "none",
		backgroundColor: "#222930",
	},

	// Drawer: {
	// 	width: 250,
	// 	flexShrink: 1,
	// },
	DrawerContainer: {
		width: 250,
	},

	leftAppBar: {
		display: "flex",
		alignItems: "center",
	},

	rightAppBar: {
		display: "flex",
		alignItems: "center",
		background: "#4aaee7",
	},

	headerIconRight: {
		float: "right",
	},
}));

const Capitalize = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function Header({ from, refresh }) {
	const [isOpen, setIsOpen] = useState(false);
	const Styles = styles();
	const theme = useTheme();

	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	//console.log(isMobile);

	const WorldConfirmedSearch = useSelector(
		(state) => state.WORLD_SEARCH_CONFIRMED.WORLD_LIST_CONFIRMED
	);
	const dispatch = useDispatch();

	const searchCountry = (e) => {
		const query = Capitalize(e.target.value);

		const data = WorldConfirmedSearch.Countries.filter(({ Country }) =>
			Country.includes(query)
		);

		dispatch(setWorldConfirmed({ Countries: data }));
		dispatch(setSearchStatus(query));
	};

	const refreshData = () => {
		if (refresh === "World") {
			dispatch(setEmptyWorldConfirmed(""));
		} else if (refresh === "View") {
			dispatch(setLoadingStatus(true));
		} else {
			dispatch(setEmptyData(""));
		}
	};

	const searchComponent = (from) => {
		if (from === "World") {
			return (
				<>
					<InputBase
						style={{
							color: "#fff",
							width: "100%",
							marginLeft: 15,
							alignSelf: "center",
						}}
						onChange={searchCountry}
						startAdornment={
							<InputAdornment position='start'>
								<SearchIcon />
							</InputAdornment>
						}
						placeholder='Search Country'
					/>
				</>
			);
		}
	};

	return (
		<>
			<AppBar position='fixed' className={Styles.AppBar}>
				<Toolbar>
					<Grid container className={Styles.rootToolbar}>
						<Grid item xs={8} sm={8} className={Styles.leftAppBar}>
							<Link to='/'>
								<img
									src='/assets/images/coronavirus.png'
									style={{ width: 30 }}
								/>
							</Link>

							{searchComponent(from)}
						</Grid>
						<Grid item xs={4} sm={4}>
							{isMobile ? (
								<>
									<IconButton
										onClick={() => setIsOpen(!isOpen)}
										className={Styles.headerIconRight}>
										<MenuOutlined style={{ color: "#fff" }} />
									</IconButton>
								</>
							) : (
								<div>
									<IconButton
										onClick={() => refreshData()}
										className={Styles.headerIconRight}>
										<CachedIcon style={{ color: "#fff" }} />
										<Typography
											style={{ color: "#fff", marginLeft: 10 }}>
											Refresh Data
										</Typography>
									</IconButton>

									<Link to={from === "View" ? "../world" : "/world"}>
										<IconButton className={Styles.headerIconRight}>
											<Public style={{ color: "#fff" }} />
											<Typography
												style={{ color: "#fff", marginLeft: 10 }}>
												World Data
											</Typography>
										</IconButton>
									</Link>
								</div>
							)}
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>

			<Drawer
				anchor='right'
				variant='temporary'
				open={isOpen}
				onEscapeKeyDown={() => setIsOpen(!isOpen)}
				onBackdropClick={() => setIsOpen(!isOpen)}
				className={Styles.Drawer}>
				<div className={Styles.toolbar} />

				<div className={Styles.DrawerContainer}>
					<List>
						<ListItem
							button
							onClick={() => {
								refreshData();
								setIsOpen(!isOpen);
							}}>
							<ListItemIcon>
								<CachedIcon />
							</ListItemIcon>
							<ListItemText primary='Refresh Data' />
						</ListItem>

						<Link
							to={from === "View" ? "../world" : "/world"}
							style={{ textDecoration: "none", color: "#757575" }}>
							<ListItem
								button
								onClick={() => {
									setIsOpen(!isOpen);
								}}>
								<ListItemIcon>
									<Public />
								</ListItemIcon>
								<ListItemText primary='World Data' />
							</ListItem>
						</Link>
					</List>
				</div>
			</Drawer>
		</>
	);
}
