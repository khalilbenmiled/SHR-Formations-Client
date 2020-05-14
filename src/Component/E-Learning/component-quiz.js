import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';
import ComponentModalQuizCollaborateur from "./component-modal-quiz-collaborateur"

const useStyles = makeStyles({
    root: {
        width: '100%',
        boxShadow: "0px 0px 1.5px",
        backgroundColor: "#E9EBEC",
        padding: "10px"
    },
    expansionPanel: {
        width: "99.9%",
        "&:disabled": {
            backgroundColor: "red"
        }
    },
    expansionPanelSummary: {
        borderBottom: "1px solid #DCDCDC",
        height: "0px"
    },
    formControlLabel: {

    },
    buttonCommencer: {
        backgroundColor: "green",
        color: 'white',
        width: "100px",
        marginLeft: "90%",
        marginTop: "20px",
        "&:hover": {
            backgroundColor: "green",
            color: 'white',
        },
        "&:focus": {
            outline: "none",
            border: "none"
        }
    }
});

export default function ActionsInExpansionPanelSummary(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState();
    const quizs = props.quizCollaborateurs
    const [openQuiz, setOpenQuiz] = React.useState(false);
    const [listQuestions, setListQuestion] = React.useState([]);
    const [idQuiz, setIdQuiz] = React.useState("");
    const [idFormation, setIdFormation] = React.useState("");
    const [nomQuiz, setNomQuiz] = React.useState("");
    
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const openModalQuiz = (quiz) => {
        setListQuestion(quiz.listQuestions)
        setIdFormation(quiz.idFormation)
        setIdQuiz(quiz.id)
        setNomQuiz(quiz.nomQuiz)
        setOpenQuiz(true)
    }

    const closeModalQuiz = () => {
        setOpenQuiz(false)
    }



    return (
        <div className={classes.root}>

            {quizs.map((quiz, index) => {
                return (
                    <div key={index}>
                        <ExpansionPanel key={index} square expanded={expanded === index} onChange={handleChange(index)} className={classes.expansionPanel} size="small">
                            <ExpansionPanelSummary
                                className={classes.expansionPanelSummary}
                                expandIcon={<ExpandMoreIcon />}
                                aria-label="Expand"
                                aria-controls="additional-actions1-content"
                                id="additional-actions1-header"
                            >
                                <Typography>
                                    {quiz.nomQuiz} 
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{ width: "100%", display: " flex", flexDirection: "column", borderBottom: "10px solid #DCDCDC" }}>
                                <p>Formation : {props.formations.find(f => f.id === quiz.idFormation).nomTheme}</p>
                                <p>{quiz.nbrQuestion} questions</p>
                                <Button onClick={openModalQuiz.bind(this, quiz)} size="small" variant="contained" className={classes.buttonCommencer} > Commencer</Button>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                )
            })}




            <ComponentModalQuizCollaborateur
                open={openQuiz}
                handleClose={closeModalQuiz}
                listQuestions={listQuestions}
                idQuiz={idQuiz}
                nomQuiz={nomQuiz}
                passerQuiz={props.passerQuiz}
                idFormation={idFormation}
                rateFormation={props.rateFormation}
            />
        </div>
    );
}
