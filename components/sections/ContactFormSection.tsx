import {Grid} from "@material-ui/core";
import React, {FunctionComponent} from "react";
import DynamicForm from "../common/elements/DynamicForm";
import AppearOnScroll from "../common/elements/AppearOnScroll";
import {ContactFormSection as IContactFormSection} from "../../store/types/home";
import SectionTitleMarkdown from "../common/elements/SectionTitleMarkdown";
import SectionContainer from "../common/SectionContainer";

const ContactFormSection: FunctionComponent<IContactFormSection> = (
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

export default ContactFormSection;
