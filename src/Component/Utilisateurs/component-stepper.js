import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ComponentListTeamLead from "./component-list-teamlead"

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    icon: {
        color: "#D5D5D5",
        "&$activeIcon": {
            color: "#B51B10"
        },
        "&$completedIcon": {
            color: "#B51B10"
        }
    },
    activeIcon: {},
    completedIcon: {},
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        backgroundColor: "#B51B10",
        color: "white",
        "&:hover": {
            backgroundColor: "#B51B10",
            color: "white"
        },
        "&:focus": {
            outline: "none"
        }
    },
    buttonBack: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        "&:focus": {
            outline: "none"
        }
    },
    rootSession: {
        width: '100%',
        boxShadow: "0px 0px 1.5px",
        backgroundColor: "#FAFAFA",
        padding: "10px"
    },
    buttonStyles: {
        border: "1px solid #B51B10",
        marginLeft: "780px",
        marginTop: "5px",
        color: "#B51B10",
        "&:focus": {
            outline: "none"
        }
    },
    title: {
        fontSize: "16px",
        color: "#3D707E",
        marginLeft: "240px",
        marginBottom: "30px"
    }
}));

function getSteps() {
    return ['Informations', 'Equipe'];
}

export default function HorizontalLabelPositionBelowStepper(props) {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [activeContent, setActiveContent] = React.useState(0);
    const steps = getSteps();

    const [nom, setNom] = React.useState("");
    const [prenom, setPrenom] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [adresse, setAdresse] = React.useState("");
    const [tel, setTel] = React.useState("");
    const [role, setRole] = React.useState("");
    const [bu, setBu] = React.useState("");
    const [newUser, setNewUser] = React.useState({
        nom: "",
        prenom: "",
        email: "",
        adresse: "",
        tel: "",
        bu: "",
        role: ""
    });

    const [teamlead, setTeamlead] = React.useState("");
    const [manager, setManager] = React.useState("");

    const roles = [
        { title: "COLLABORATEUR" },
        { title: "TEAMLEAD" },
        { title: "MANAGER" },
        { title: "SERVICEFORMATIONS" }
    ]

    const bus = [
        { title: "RD" },
        { title: "CS" },
        { title: "Prodops" }
    ]

    const onChangeNom = (e) => {
        setNom(e.target.value)
    }

    const onChangePrenom = (e) => {
        setPrenom(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangeAdresse = (e) => {
        setAdresse(e.target.value)
    }

    const onChangeTel = (e) => {
        setTel(e.target.value)
    }

    const onChangeRole = (e, value) => {
        if (value != null) {
            setRole(value.title)
        } else {
            setRole("")
        }

    }

    const onChangeBu = (e, value) => {
        if (value != null) {
            setBu(value.title)
        } else {
            setBu("")
        }

    }

    const onChangeTL = (e, value) => {
        if (value != null) {
            setTeamlead(value)
        } else {
            setTeamlead("")
        }

    }

    const onChangeMG = (e, value) => {
        if (value != null) {
            setManager(value)
        } else {
            setManager("")
        }

    }

    const handleNext = () => {
        if (activeStep === 0) {
            const utilisateur = {
                nom: nom,
                prenom: prenom,
                email: email,
                adresse: adresse,
                tel: tel,
                bu: bu,
                role: role
            }
            setNewUser(utilisateur)
        }
        if (activeStep === 1) {
            const obj = {
                user: newUser,
                teamlead: teamlead,
                manager: manager
            }
            props.addUtilisateur(obj)
            props.handleClose()

        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setActiveContent((prevActiveStep) => prevActiveStep + 1)
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setActiveContent((prevActiveStep) => prevActiveStep - 1)
    };

    const verifForm = () => {
        if (nom === "" || prenom === "" || email === "" || role === "" || role === null || bu === "" || bu === null) {
            return 1
        } else {
            return 0
        }
    }



    return (
        <div className={classes.root}>

            <Stepper activeStep={activeStep} alternativeLabel >
                {steps.map((label) => (
                    <Step key={label} >
                        <StepLabel StepIconProps={{ classes: { root: classes.icon, active: classes.activeIcon, completed: classes.completedIcon } }}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div hidden={activeContent === 0 ? false : true} className="row" style={{ width: "98%", margin: "auto", backgroundColor: "#FAFAFA", boxShadow: "0px 0px 1px", padding: "30px 10px" }}>
                <div className="row">
                    <div className="col-lg-4 col-md-4 " >
                        <div className="input-group mb-3 ">
                            <TextField onChange={onChangeNom} size="small" label="Nom" variant="outlined" style={{ width: 260, backgroundColor: "white" }}  > </TextField>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 " >
                        <div className="input-group mb-3 ">
                            <TextField onChange={onChangePrenom} size="small" label="Prenom" variant="outlined" style={{ width: 260, backgroundColor: "white" }}  > </TextField>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 " >
                        <div className="input-group mb-3 ">
                            <TextField onChange={onChangeEmail} size="small" label="Email" variant="outlined" style={{ width: 260, backgroundColor: "white" }}   > </TextField>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-4">
                        <div className="input-group mb-3 ">
                            <TextField onChange={onChangeAdresse} size="small" label="Adresse" variant="outlined" style={{ width: 260, backgroundColor: "white" }}  > </TextField>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 " >
                        <div className="input-group mb-3 ">
                            <TextField onChange={onChangeTel} size="small" label="Telephone" variant="outlined" style={{ width: 260, backgroundColor: "white" }} > </TextField>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 " >
                        <div className="input-group mb-3 ">
                            <Autocomplete
                                size="small"
                                options={bus}
                                getOptionLabel={(option) => option.title}
                                onChange={onChangeBu}
                                style={{ width: 260, backgroundColor: "white" }}
                                renderInput={(params) => <TextField {...params} label="BU" variant="outlined" />}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 " >
                        <div className="input-group mb-3 ">
                            <Autocomplete
                                size="small"
                                options={roles}
                                getOptionLabel={(option) => option.title}
                                onChange={onChangeRole}
                                style={{ width: 540, backgroundColor: "white" }}
                                renderInput={(params) => <TextField {...params} label="ROLE" variant="outlined" />}
                            />
                        </div>
                    </div>
                </div>
            </div>


            <div hidden={activeContent === 1 ? false : true} className="row" style={{ width: "98%", margin: "auto", backgroundColor: "#FAFAFA", boxShadow: "0px 0px 1px", padding: "30px 10px" }}>
                <div className="col-lg-12 col-md-12">
                    {newUser.role === "COLLABORATEUR"
                        ?
                        <>
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <h4 className={classes.title}>Sélectionnez un teamlead a ce collaborateur</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <Autocomplete
                                        size="small"
                                        options={props.listTeamLead}
                                        getOptionLabel={(option) => option.nom + " " + option.prenom}
                                        onChange={onChangeTL}
                                        style={{ marginLeft: "250px", width: 300, backgroundColor: "white" }}
                                        renderInput={(params) => <TextField {...params} label="TEAMLEAD" variant="outlined" />}
                                    />
                                </div>
                            </div>
                        </>
                        : newUser.role === "TEAMLEAD"

                            ?
                            <>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <h4 className={classes.title}>Sélectionnez un manager a ce team-lead</h4>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <Autocomplete
                                            size="small"
                                            options={props.listManager}
                                            getOptionLabel={(option) => option.nom + " " + option.prenom}
                                            onChange={onChangeMG}
                                            style={{ marginLeft: "250px", width: 300, backgroundColor: "white" }}
                                            renderInput={(params) => <TextField {...params} label="Manager" variant="outlined" />}
                                        />
                                    </div>
                                </div>
                            </>

                            : newUser.role === "MANAGER"
                                ?
                                <div className="row" >
                                    <div className="col-lg-12 col-md-12">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12">
                                                <h4 className={classes.title}>Sélectionnez ces team lead</h4>
                                            </div>
                                        </div>

                                        <div className="row" >
                                            <div className="col-lg-12 col-md-12">
                                                <ComponentListTeamLead
                                                    listFreeTeamLead={props.listFreeTeamLead}
                                                    teamleadSelected={props.teamleadSelected}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                :
                                ""
                    }
                </div>
            </div>



            <div style={{ position: "fixed", top: "82%" }}>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                    </div>
                ) : (
                        <div style={{ marginTop: "30px" }}>
                            <div>
                                <Button
                                    size="small"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.buttonBack}
                                >
                                    Retour
                                </Button>
                                <Button
                                    size="small"
                                    disabled={
                                        activeStep === 0 && verifForm() === 1 ? true : false
                                    }
                                    variant="contained" color="primary" onClick={handleNext} className={classes.button}
                                >
                                    {activeStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
                                </Button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}
