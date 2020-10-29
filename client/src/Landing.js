import React from 'react'
import axios from 'axios'


class Landing extends React.Component{
	// state = {
	// 	stocks: []
	// };

	//Fetching Stocks
	
	getStocks = () => {
		axios.get("/")
		.then((response)=> {
			const data = response.data;
			this.props.updateStocks(data);
			console.log("data has been received");
		})
		.catch(() => {
			alert("Error retrieving data");
		});
	}
	
	//function to display stocks 
	
	
	componentDidMount = () => {
		this.getStocks();
	}
	
	displayStock(stocks, index){
		return stocks.map((stock) => (
			
				<tr key={stock.stockName}>
					<td>{stock.stockName}</td>
					<td>{stock.currentValue}</td>
					<td>{stock.lowestValue}</td>
					<td>{stock.highestValue}</td>
				</tr>
							
		)
			
		);
	}	
		
	render(){
		// console.log('State: ', this.state)
		return(
		<div>
			<div className='ui container' style={{ paddingTop: "40px"}}>
                <table className="ui striped unstackable table">
                    <thead>
                        <tr>
                            <th>STOCK</th>
                            <th>CURRENT PRICE</th>
                            <th>LOW</th>
                            <th>HIGH</th>
                        </tr>
                    </thead>
					<tbody>
                       
							{this.displayStock(this.props.stocks)}
						
					</tbody>
				</table>	
				
				
		</div>
		</div>
		)
	}
}

export default Landing