import {Grid} from "@mui/material";
import React, {FunctionComponent} from "react";
import DynamicForm from "../elements/DynamicForm";
import AppearOnScroll from "../elements/AppearOnScroll";
import {DynamicForm as IContactFormSection} from "../../../store/types/home";
import SectionTitleMarkdown from "../elements/SectionTitleMarkdown";
import SectionContainer from "../SectionContainer";

const FormContainer: FunctionComponent<IContactFormSection> = (
  {
    content,
    name,
    fields,
  }) => {
  return (

    <SectionContainer>
      <Grid item xs={12}>
        <SectionTitleMarkdown className={'text-center'} content={content}/>
      </Grid>
      <Grid container item alignItems={"center"} justifyContent={"space-evenly"} xs={12} sm={6}>
        <AppearOnScroll duration={2}>
          <DynamicForm name={name} fields={fields}/>
        </AppearOnScroll>
      </Grid>
    </SectionContainer>
  );
};

export default FormContainer;
