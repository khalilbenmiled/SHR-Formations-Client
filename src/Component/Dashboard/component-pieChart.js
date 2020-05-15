import React from 'react';
import { Pie } from 'react-chartjs-2';

export default function FullWidthTabs(props) {

    return (
        <Pie
            data={props.data}
            width={0}
            height={250}
            options={{ maintainAspectRatio: false }}
        />
        // <Bar
        //     data={props.data}
        //     width={0}
        //     height={250}
        //     options={{ maintainAspectRatio: false }}
        // />
    );
}


