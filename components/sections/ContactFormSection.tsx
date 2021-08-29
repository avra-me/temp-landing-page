import {Grid} from "@material-ui/core";
import React, {FunctionComponent} from "react";
import SectionHeading from "../common/SectionHeading";
import ContactForm from "../common/elements/ContactForm";
import Container from "@material-ui/core/Container";
import AppearOnScroll from "../common/elements/AppearOnScroll";

interface IDynamicField {
    title: string;
    placeholder?: string;
}

interface IContactFormProps {
    title: string;
    subTitle: string;
}

const ContactFormSection: FunctionComponent<IContactFormProps & Record<string, IDynamicField>> = ({
                                                                                                      title,
                                                                                                      subTitle,
                                                                                                      ...rest
                                                                                                  }) => {
    return (
        <Container>
            <Grid container alignItems={"center"} justify={"center"}>
                <Grid
                    item
                    container
                    xs={12}
                    alignItems={"center"}
                    justifyContent={"center"}
                    direction={"column"}
                >
                    <Grid item xs={12} md={6} lg={4}>
                        <SectionHeading title={title} subTitle={subTitle} align={"center"}/>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <AppearOnScroll duration={2}>
                        <ContactForm {...rest} />
                    </AppearOnScroll>
                </Grid>
            </Grid>
        </Container>
    );
};

ContactFormSection.defaultProps = {
    emailField: {
        title: "Your Email",
        placeholder: "your.email@example.com",
    },
    messageField: {
        title: "Your Message",
        placeholder: "Hi Avrami, I wanted to reach out to you because...",
    },
    submitButton: {
        title: "Send Message",
    },
};

export default ContactFormSection;
