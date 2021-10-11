import React, {FunctionComponent, useState} from "react";
import {Alert, Snackbar} from "@mui/material";
import {useRouter} from "next/router";

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

export default AlertManager;
