import type {FC} from "react";
import dynamic from "next/dynamic";
import {PropsFor} from "@mui/system";

const FormContainer = dynamic(() => import("../common/containers/FormContainer"))

const DynamicFormSection: FC<PropsFor<typeof FormContainer>> = (props) => {
  if (props.disabled) {
    return null;
  }

  return <FormContainer {...props}/>
}

export default DynamicFormSection;