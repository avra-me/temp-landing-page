import {Icon, TextField} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import React, {FC} from "react";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import {DynamicForm as IDynamicForm, IFormField} from "../../../store/types/home";

const TypeInnerFieldMapping: Record<IFormField["type"], FC<any>> = {
  email(props: any) {
    return <FilledInput type={'email'} {...props}/>
  },
  phone(props: any) {
    return <FilledInput type={'phone'} {...props}/>
  },
  multiline(props: any) {
    return <FilledInput multiline rows={4} {...props}/>
  },
  text(props: any) {
    return <FilledInput {...props}/>
  },

};

const DynamicFormField: FC<IFormField> = ({type, title, name, placeholder, icon}) => {
  const InnerFormField = TypeInnerFieldMapping[type]
  const id = `${name}-contact-form-field`
  return <FormControl fullWidth variant={"filled"} color={"secondary"}>
    <InputLabel htmlFor={id}>{title}</InputLabel>
    <InnerFormField
      id={id}
      name={name}
      placeholder={placeholder}
      aria-placeholder={placeholder}
      aria-label={title}
      required
      endAdornment={
        icon && <InputAdornment position="end">
            <Icon>{icon}</Icon>
        </InputAdornment>
      }
    />
  </FormControl>
}

const DynamicForm: FC<Omit<IDynamicForm, 'content' | 'order' | 'type'>> = ({fields, name}) => {
  // hack to get around broke placeholder layout
  let submitButtonText = "Send Message"

  return <form data-netlify="true" name={name} method="post"
               netlify-honeypot="totally-a-field" action={"/?alert=sent"}>
    <TextField aria-hidden={true} name="totally-a-field" sx={{
      display: "none"
    }}/>
    <input type="hidden" name="form-name" value={name} />
    {fields.map(field => {
      if (field.type === "submit") {
        submitButtonText = field.title;
        return null
      } else {
        return <DynamicFormField key={field.name} {...field}/>
      }
    })}
    <FormControl fullWidth>
      <Button
        variant="outlined"
        type="submit"
        color={"primary"}
        endIcon={<Icon>send</Icon>}
      >
        {submitButtonText}
      </Button>
    </FormControl>
  </form>;
};


export default DynamicForm;
