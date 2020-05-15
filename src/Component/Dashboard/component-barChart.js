import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function FullWidthTabs(props) {


    return (
        <Bar
            data={props.data}
            width={0}
            height={250}
            options={{ maintainAspectRatio: false }}
            
        />
    );
}
