import {Grid} from "@material-ui/core";
import React, {FunctionComponent} from "react";
import DynamicForm from "../elements/DynamicForm";
import AppearOnScroll from "../elements/AppearOnScroll";
import {DynamicForm as IContactFormSection} from "../../../store/types/home";
import SectionTitleMarkdown from "../elements/SectionTitleMarkdown";
import SectionContainer from "../SectionContainer";

const FormContainer: FunctionComponent<IContactFormSection> = (
  {
    content,
    fields
  }) => {
  return (

    <SectionContainer>
      <SectionTitleMarkdown className={'text-center'} content={content}/>
      <Grid container alignItems={"center"} justifyContent={"center"}>
        <Grid
          item
          container
          xs={12}
          alignItems={"center"}
          justifyContent={"center"}
          direction={"column"}
        >

        </Grid>
        <Grid item xs={12} sm={6}>
          <AppearOnScroll duration={2}>
            <DynamicForm fields={fields}/>
          </AppearOnScroll>
        </Grid>
      </Grid>
    </SectionContainer>
  );
};

export default FormContainer;
