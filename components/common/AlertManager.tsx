import React, {FunctionComponent, useState} from "react";
import PropTypes from "prop-types";
import {StyleRules, Theme, withStyles} from "@material-ui/core";
import {useRouter} from "next/router";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "@material-ui/lab";

const styles = (theme: Theme): StyleRules => ({
    root: {
        height: "100%",
        zIndex: -99
    },
    dark: {
        background: theme.palette.secondary.dark
    },
    fixScrollBug: {
        position: "absolute",
        bottom: -theme.spacing(1),
        height: theme.spacing(2),
        left: 0,
        width: "100%",
        zIndex: 10
    },
    before: {
        position: "relative"
    },
    wrapBeforeContent: {
        zIndex: 20,
        position: "inherit"
    },
    waveSection: {
        background: theme.palette.background.paper,
    },
    waveSvg: {
        "& *": {
            fill: theme.palette.secondary.dark
        }
    }
});

const MESSAGE_KEY = "sent_message"

interface IAlertManager {
    underConstruction?: boolean
}

const AlertManager: FunctionComponent<IAlertManager> = ({underConstruction}) => {
    const router = useRouter();

    const [showSuccess, setShowSuccess] = useState(MESSAGE_KEY in router.query);

    const onHideSentNotification = () => {
        const query = router.query
        delete query[MESSAGE_KEY]
        router.replace({pathname: router.pathname, query})
        setShowSuccess(false);
    };

    return <>
        <Snackbar open={underConstruction} anchorOrigin={{vertical: "bottom", horizontal: "left"}}>
            <Alert severity="warning">
                The content for this page is still being built out, feel free to provide feedback using the contact
                form!
            </Alert>
        </Snackbar>
        <Snackbar open={showSuccess} onClose={onHideSentNotification} autoHideDuration={5000}
                  anchorOrigin={{vertical: "bottom", horizontal: "left"}}>
            <Alert severity="success" onClose={onHideSentNotification}>
                Your message has been sent!
            </Alert>
        </Snackbar>
    </>;
};

AlertManager.propTypes = {
    underConstruction: PropTypes.bool,
};


export default withStyles(styles)(AlertManager);
