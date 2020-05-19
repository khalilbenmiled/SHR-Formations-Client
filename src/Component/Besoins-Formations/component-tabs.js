import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ComponentStepper from "./component-stepper"
import ListAltIcon from '@material-ui/icons/ListAlt';
import CreateIcon from '@material-ui/icons/Create';
import ComponentListBesoins from "./component-list-besoins"
import DescriptionIcon from '@material-ui/icons/Description';
import ComponentFilterRapports from "./component-filter-rapport"
import PublishIcon from '@material-ui/icons/Publish';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import besoinPublier from "../../images/besoinPublier.jpg"
import ComponentModalDetailsBesoin from "./component-modal-detailsBesoin"
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};



const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',

  },
  rootCard: {
    backgroundImage: `url(${besoinPublier})`,
    boxShadow: "0px 0px 3px",
    margin: "8px 0"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  buttonDetails: {
    backgroundColor: "#E67A0A",
    color: "white",
    "&:focus": {
      outline: "none"
    },
    "&:hover": {
      backgroundColor: "#E67A0A",
      color: "white"
    }
  },
  buttonPublier: {
    cursor: "pointer",
    backgroundColor: "#B51B10",
    color: "white",
    "&:focus": {
      outline: "none"
    },
    "&:hover": {
      backgroundColor: "#B51B10",
      color: "white"
    }
  },

}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(JSON.parse(localStorage.user).role === "SERVICEFORMATIONS" ? 1 : 0);
  const [open, setOpen] = React.useState(false);
  const [besoinPublier, setBesoinPublier] = React.useState(false);
  const [nbrPrevus, setNbrPrevus] = React.useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  const openModalDetails = besoinPublier => {
    let inc = 0
    besoinPublier.listBesoins.map(b => {
      if (b.nbrPrevu === 0) {
        inc++
      } else {
        inc = inc + b.nbrPrevu
      }
      return null
    })

    setBesoinPublier(besoinPublier)
    setNbrPrevus(inc)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }



  return (
    <div className={classes.root} >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          inkbarstyle={{ background: '#B51B10' }}
          style={{ color: "#B51B10" }}
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab hidden={JSON.parse(localStorage.user).role === "SERVICEFORMATIONS" ? true : false} style={{ outline: "none" }} label={JSON.parse(localStorage.user).role === "MANAGER" ? "Publier les besoins" : "Saisi des besoins"} icon={JSON.parse(localStorage.user).role === "MANAGER" ? <PublishIcon /> : <CreateIcon />} />
          <Tab style={{ outline: "none" }} label="Consulter les besoins" icon={<ListAltIcon />} />
          <Tab hidden={JSON.parse(localStorage.user).role === "COLLABORATEUR" ? true : false} style={{ outline: "none" }} label="Rapports" icon={<DescriptionIcon />} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >

        <TabPanel value={value} index={0} dir={theme.direction} >
          {JSON.parse(localStorage.user).role === "MANAGER" ?

            <div className="row">
              {props.listBesoinsPublier.map((besoinPublier, index) => {
                return (
                  <div key={index} className="col-lg-3" >

                    <Card className={classes.rootCard} >
                      <CardContent>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                          <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Action de formation
                        </Typography>
                          <PublishIcon onClick={props.openPublierBesoin.bind(this, besoinPublier)} className={classes.buttonPublier} size="small" />
                        </div>

                        <Typography style={{ color: "#B51B10" }} variant="h5" component="h2">
                          {besoinPublier.theme}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                          Quarter {besoinPublier.quarter}
                        </Typography>
                        <Typography variant="body2" component="p">


                        </Typography>
                      </CardContent>
                      <CardActions style={{ float: "right" }}>
                        <Button className={classes.buttonDetails} onClick={openModalDetails.bind(this, besoinPublier)} size="small">Détails</Button>
                      </CardActions>
                    </Card>
                  </div>

                )
              })}

            </div>


            :
            <ComponentStepper
              themes={props.themes}
              onChangeTheme={props.onChangeTheme}
              actionSelected={props.actionSelected}
              modules={props.modules}
              projets={props.projets}
              radioSelected={props.radioSelected}
              stepper={props.stepper}
              moduleSelected={props.moduleSelected}
              getModules={props.getModules}
              getNbrPrevus={props.getNbrPrevus}
              getProjet={props.getProjet}
              addBesoin={props.addBesoin}
              addAction={props.addAction}
              addModule={props.addModule}
              addProjet={props.addProjet}
              onChangeTrimeter={props.onChangeTrimeter}
              mesCollaborateurs={props.mesCollaborateurs}
              getCollaborateurs={props.getCollaborateurs}

            />
          }

        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          <ComponentListBesoins
            listBesoins={props.listBesoins}
            projets={props.projets}
            onValiderBesoin={props.onValiderBesoin}
            openAlertRemoveBesoin={props.openAlertRemoveBesoin}
            openAlertAnnulerBesoin={props.openAlertAnnulerBesoin}
            validerByManager={props.validerByManager}
            annulerByManager={props.annulerByManager}
            addProjet={props.addProjet}
          />
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
          <ComponentFilterRapports themes={props.allThemes} projets={props.projets} filter={props.filter} rapports={props.rapports} />
        </TabPanel>

      </SwipeableViews>
      <ComponentModalDetailsBesoin open={open} handleClose={handleClose} besoinPublier={besoinPublier} nbrPrevus={nbrPrevus} />
    </div>


  );
}
