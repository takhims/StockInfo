import React from 'react'
import logo from './logo.png'
import {Link, BrowserRouter as Router, withRouter} from 'react-router-dom'


const Header = (props) => {
	
	return (
			<div className="nav-wrapper" style={{ backgroundColor: "#f6c90e"}}>
                <div style={{ backgroundColor: "#f6c90e", margin: "0", height: '85px', display: 'flex', justifyContent: "center", alignItems: 'center'}}>
					<Router>
					<Link to='/'>
						<img alt="logo" src = {logo} style={{ width: "280px" }} onClick={()=> {props.history.push('/')}}/>
					</Link>
					</Router>
                </div>                
            </div>
	)
}

export default withRouter(Header)