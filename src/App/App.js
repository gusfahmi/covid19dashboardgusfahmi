import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import WorldData from "./WorldData";
import View from "./View";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' component={Home} exact />
				<Route path='/world' component={WorldData} />
				<Route path='/view/:CountryCode' component={View} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
