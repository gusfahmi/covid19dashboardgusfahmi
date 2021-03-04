import "./App.css";
import { CssBaseline, makeStyles } from "@material-ui/core";
import Header from "../Components/Header";
import Body from "../Components/Body";

const styles = makeStyles({
	root: {
		display: "flex",
	},
});

function Home() {
	const Styles = styles();

	return (
		<div className={Styles.root}>
			<Header from='home' />
			<CssBaseline />
			<Body />
		</div>
	);
}

export default Home;
