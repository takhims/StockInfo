import React from 'react';
import axios from 'axios';


class Form extends React.Component{
	state = {
		name: '',
		value: null,
		lowestValue: null,
		highestValue: null,
		submitted: false,
		fetchedNames:[],
		isPasswordModalShown: true,
		password: '',
	};

	// socket = null;

	componentDidMount() {
		this.fetchNames()
		// this.socket = io('https://lolol.run-ap-south1.goorm.io');
		
		// this.socket.on('connect', () => {
		// 	console.log('connected with the server!');
		// });
		
		// this.socket.on('message', (data) => {
		// 	console.log(data);
		// 	// Form expects a reference to landing's func, this reference can be passed as a prop from the app.
		// });
	}
	
	handleChange = (e) => this.setState({ [e.target.name]: e.target.value });
	

	handleSubmit = async (e) => {
		e.preventDefault();
		const { name, value, lowestValue, highestValue } = this.state;
		
		 //add api call here
		 const response = await axios.put("/", {
		 name,
 		 value,
		 lowestValue,
		 highestValue,
		});
		console.log(response)
		
	}
	
	 submitHandler = () => {
		//let submitted = this.state.submitted
		this.setState({submitted: true})
	 setTimeout(() => {this.setState({submitted: false})}, 2000)
		// console.log('RUNS2', submitted)
	}
	
	fetchNames = async () =>{
		await axios.get("/")
		.then((response)=> {
			const data = response.data;
			this.setState({ fetchedNames: data})
			console.log("data has been received");
		})
		.catch(() => {
			alert("Error retrieving data");
		});
	}
		
	renderNames(names){
		return names.map(name => (
			<option value={name.stockName} key={name.stockName}>{name.stockName}</option>
		))
	}
	
	
	render(){
		// var pass = 'biginishoot'
		// var p = prompt('Password: ')
		// while(p !== pass){
		// 	p = prompt('Try Again')
		// 	if(p === pass){
		// 		break
		// 	}
		// }
		let submitted = this.state.submitted;
		if (this.state.isPasswordModalShown) {
			return (
				<div>
					<h1 id="password">Password?</h1>
					<div id="idpass" className="ui container">

						<div className="ui input">
							<input
								className= "ui input"
								onChange={this.handleChange}
								name="password"
								value={this.state.password}
								type="password"
								placeholder="Type Password"
								style={{'margin': '0 7.5px' }}

							/>
						</div>

						<button  className="ui yellow button large" id="passbutton" style={{'margin': '0 7.5px 0 7.5px'}}
							onClick={() => {
								if (this.state.password == '3640') {
									this.setState({ isPasswordModalShown: false })
								} else {
									alert('Wrong password!');
								}
							}}
						type="submit">Enter</button>
					</div>
				</div>
			)
		}
		return (
			<React.Fragment>
				<form id = "formPadding" onSubmit={this.handleSubmit}>
				<h1 className="heading" id={submitted ? 'heading-green':'heading-yellow'}>{submitted ? 'Submitted!' : 'Update Stock Information'}</h1>
					<div className="ui inverted form" id={submitted ? 'form-green': 'form-yellow'} >
					  <div className="three fields">
						<div className="field">
						  <label>Stock Name</label>
						   <select className="ui dropdown" onChange={this.handleChange} value={this.state.name} name="name">
							   <option value="">Select Stock</option>
							   {this.renderNames(this.state.fetchedNames)}
							</select>
						</div>
						  <br/>
						<div className="field">
						  <label>Current Value</label>
						  <input type="text" placeholder="Current Value" onChange={this.handleChange} name="value" value={this.state.value} />
						</div>
						<div className="field">
						  <label>Lowest Value</label>
						  <input type="text" placeholder="Lowest Value" onChange={this.handleChange} name="lowestValue" value={this.state.lowestValue} />
						</div>
						<div className="field">
						  <label>Highest Value</label>
						  <input type="text" placeholder="Highest Value" onChange={this.handleChange} name="highestValue" value={this.state.highestValue} />
						</div>
						<div className="ui inverted segment" id="submitButton">
							<input type="submit" className="ui yellow button large" placeholder="Yellow" onClick={this.submitHandler} id={submitted ? 'submit-green':'submit-yellow'}/>  
						</div>
					  </div>
					</div>
			</form>
			</React.Fragment>
		)
	}
}

export default Form