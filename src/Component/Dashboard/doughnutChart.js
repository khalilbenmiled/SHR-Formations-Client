import React, { Component } from "react"
import { Doughnut } from 'react-chartjs-2';
import axios from "axios"
import querystring from 'querystring'
import ComponentTabs from "./component-tabs"

class DoughnutChart extends Component {

	constructor(props) {
		super(props)
		this.state = {
			rating : {}
		}
	}
	componentDidMount() {
		const input = {
			id : 219
		}
		axios.post("http://localhost:8585/formations/reporting/rating", querystring.stringify(input), {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		}).then(res => {
			if(res.data.Formation) {
				const data = {
					labels: [
						'Mediocre',
						'Mauvais',
						'Passable',
						'Bien',
						"Excellent"
					],
					datasets: [{
						data: [
							res.data.Formation.rating.star1, 
							res.data.Formation.rating.star2, 
							res.data.Formation.rating.star3,
							res.data.Formation.rating.star4,
							res.data.Formation.rating.star5,   
						],
						backgroundColor: [
							'#FF6384',
							'#36A2EB',
							'#FFCE56',
							'#CD5C5C',
							'#000000'

						],
						hoverBackgroundColor: [
							'#FF6384',
							'#36A2EB',
							'#FFCE56',
							'#CD5C5C',
							'#000000'
						]
					}]
				};
				this.setState({
					rating : data
				})
			}
		})
	}

	render() {
		return (
			<Doughnut data={this.state.rating} />
		)
	}
}

export default DoughnutChart