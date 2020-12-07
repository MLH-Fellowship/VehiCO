import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import NffLogo from '../assets/nff_logo.png';

const useStyles = makeStyles({
    paper: {
        borderRadius: "1vw",
        width: "600px",
        height: "350px",
        padding: "0.5vw"
    },
    donateButton: {
        padding: "0.8vw 1.5vw 0.8vw 1.5vw",
        fontSize: "1.5vw",
        borderRadius: "1vw",
        border: "none",
        outline: "none",
        color: "white",
        background: "#84C58B",
        '&:hover': {
            cursor: "pointer",
            transition: "transform 0.3s ease-out",
            transform: "scale(0.97)"
        },
    },
    modalTitle: {
        textAlign: "center"
    },
    modalContent: {
        height: "auto",
        display: "flex",
        justifyContent: "space-around",
        padding: 0,
        margin: 0,
    },
    co2report: {
        height: "10vw",
        textAlign: "center"
    },
    offreport: {
        height: "10vw",
        textAlign: "center"
    },
    arrowStyle: {
        marginTop: "15%",
        transform: "scale(2)",
        color: "grey"
    },
    logo: {
        height: "3vw",
    },
    btnContainer: {
        justifyContent: "center"
    }
});

const OffsetModal = (props) => {
    const classes = useStyles();
    const { open, handleClose, cf } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleRedirect = () => {
        window.open('https://support.nationalforests.org/give/308339/#!/donation/checkout?c_src=WEB&c_src2=TRP2012WEBOrangeSupport',"_blank");
        handleClose();
    }
    
    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            classes={{ paper: classes.paper}}>
            <DialogTitle className={classes.modalTitle} id="responsive-dialog-title">{"Neutralize your trip by donating to plant trees 🌳"}</DialogTitle>
            <DialogContent className={classes.modalContent}>
                <div className={classes.co2report}>
                    <h2>CO2 Emission</h2>
                    <h1 style={{color:"#84C58B"}}> { cf.toFixed(4) } </h1>
                    <h2>tons</h2>
                </div>
                <ArrowForwardIcon className={classes.arrowStyle}/>
                <div className={classes.offreport}>
                    <h2>Offset Donation</h2>
                    <h1 style={{color:"#84C58B"}}> { "$"+( cf*12 ).toFixed(2) } </h1>
                    <img src={NffLogo} alt="NFF Logo" className={classes.logo}/>
                </div>
            </DialogContent>
            <DialogActions className={classes.btnContainer}>
                <button className={classes.donateButton} onClick={handleRedirect}>
                    Donate
                </button>
            </DialogActions>
        </Dialog>
    )
}

export default OffsetModal;