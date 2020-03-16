import React from 'react';
import BarCharts from "./barChart"
import DoughnutChart from "./doughnutChart"
import Card from '@material-ui/core/Card';
import LineChart from "./lineChart"
import "./dashboard.css"
export default function Dashboard(props) {


    return (
        <div className="container container-dashboard">
            <div className="row">
                <div className="col-lg-4">
                    <Card>
                        <DoughnutChart />
                    </Card>
                </div>
                <div className="col-lg-4">
                    <Card>
                        <DoughnutChart />
                    </Card>
                </div>
                <div className="col-lg-4">
                    <Card>
                        <DoughnutChart />
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <Card >
                        <LineChart />
                    </Card>
                </div>
                <div className="col-lg-6">
                    <Card >
                        <BarCharts />
                    </Card>
                </div>
            </div>


        </div>
    )
}