import React from 'react';
import { Bar } from 'react-chartjs-2';

// const useStyles = makeStyles(theme => ({
//     root: {
//         backgroundColor: theme.palette.background.paper,
//         width: '100%',

//     },
//     rootCard: {
//         boxShadow: "0px 0px 3px",
//         margin: "8px 0"
//     },
//     bullet: {
//         display: 'inline-block',
//         margin: '0 2px',
//         transform: 'scale(0.8)',
//     },
//     title: {
//         fontSize: 14,
//     },
//     pos: {
//         marginBottom: 12,
//     },
//     buttonDetails: {
//         backgroundColor: "#E67A0A",
//         color: "white",
//         "&:focus": {
//             outline: "none"
//         },
//         "&:hover": {
//             backgroundColor: "#E67A0A",
//             color: "white"
//         }
//     },
//     buttonPublier: {
//         cursor: "pointer",
//         backgroundColor: "#B51B10",
//         color: "white",
//         "&:focus": {
//             outline: "none"
//         },
//         "&:hover": {
//             backgroundColor: "#B51B10",
//             color: "white"
//         }
//     },

// }));

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
