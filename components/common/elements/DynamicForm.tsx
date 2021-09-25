import {Icon, TextField} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import React, {FC, useState} from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import {ContactFormSection, IFormField} from "../../../store/types/home";

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
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  return <FormControl fullWidth variant={"filled"} color={"secondary"}>
    <InputLabel htmlFor={id}>{title}</InputLabel>
    <InnerFormField
      id={id}
      name={name}
      onFocus={() => setShowPlaceholder(true)}
      onBlur={() => setShowPlaceholder(false)}
      placeholder={showPlaceholder ? placeholder : ""}
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

const DynamicForm: FC<Omit<ContactFormSection, 'content' | 'order' | 'type'>> = ({fields}) => {
  // hack to get around broke placeholder layout
  let submitButtonText = "Send Message"

  return <form data-netlify="true" name={"contact-form"} method="post"
               netlify-honeypot="totally-a-field" action={"/?sent_message"}>
    <TextField type="hidden" name="totally-a-field"/>
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
