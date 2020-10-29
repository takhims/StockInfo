import React from "react"
import Form from "./Form"
import {BrowserRouter, Route} from 'react-router-dom'
import io from 'socket.io-client';
import Landing from "./Landing"
import Header from "./Header"


class App extends React.Component{
	state = {
		stocks: [],
	}

	socket = null;

	componentDidMount() {
		this.socket = io("/");
		
		this.socket.on('connect', (abcd) => {
			this.socket.on('update_stock', (data) => {
				console.log('update_stock', data);
				this.setState({
					stocks: this.state.stocks.map((item) => {
						const { stockName, currentValue, lowestValue, highestValue } = JSON.parse(data);
						if (item.stockName === stockName) {
							return {
								...item,
								currentValue,
								lowestValue,
								highestValue,
							};
						}
						return item;
					}),
				})
			})
			console.log('connected with the server!');
		});
		
		
	}
	
	// send a reference to form from app. the form can execute that function with the updated stock.
	// now the reference that was passed form app to form , was actually present at landing.js.
	// so the function present at landing.js is invoked through the reference passed by app to form , at the form.
	// Upon execution, the relavant state can be changed at landing.js
	
    render(){
        return(
            <div>
				
				<BrowserRouter>
					<Header/>
					<Route path="/" exact>
						<Landing
							updateStocks={stocks => this.setState({ stocks })}
							stocks={this.state.stocks}
						/>
					</Route>
					<Route path="/edit" exact>
						<Form />
					</Route>
				</BrowserRouter>
            </div>
        )
    }
}

export default App;