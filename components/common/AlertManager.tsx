import React, {FunctionComponent, useState} from "react";
import {Alert, AlertProps, Snackbar} from "@mui/material";
import {useRouter} from "next/router";


interface IAlertManager {
  underConstruction?: boolean
}

const ALERTS: Record<string, AlertProps> = {
  sent: {
    severity: "success",
    children: <>Your message has been sent!</>
  }
}

const AlertManager: FunctionComponent<IAlertManager> = ({underConstruction}) => {
  const router = useRouter();

  let [alertKey, setAlertKey] = useState(router.query["alert"]);

  const onHideSentNotification = () => {
    const query = router.query
    delete query["alert"]
    router.replace({pathname: router.pathname, query})
    setAlertKey(undefined);
  };

  if (typeof alertKey === "string") {
    alertKey = [alertKey]
  }

  const alerts = alertKey?.map(alert => {
    const alertMessage = ALERTS[alert];
    return <Snackbar key={alert} open={!!alertMessage} onClose={onHideSentNotification}
                     anchorOrigin={{vertical: "bottom", horizontal: "left"}}>
      <Alert {...alertMessage} onClose={onHideSentNotification}/>
    </Snackbar>
  })


  return <>
    <Snackbar open={underConstruction} anchorOrigin={{vertical: "bottom", horizontal: "left"}}>
      <Alert severity="warning">
        The content for this page is still being built out, feel free to provide feedback using the contact
        form!
      </Alert>
    </Snackbar>
    {alerts}
  </>;
};

export default AlertManager;
