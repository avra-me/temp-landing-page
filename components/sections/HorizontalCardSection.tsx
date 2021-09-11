import {Button, ButtonGroup, Grid, Theme} from "@material-ui/core";
import {createStyles, withStyles, WithStyles} from '@material-ui/core/styles';

import React, {FunctionComponent} from "react";
import {HorizontalCardSection as IHorizontalCardSection, InteractionItem} from "../../store/types/home";
import SectionContainer from "../common/SectionContainer";
import SectionHeading from "../common/SectionHeading";
import {slice} from "lodash";
import SectionContentMarkdown from "../common/elements/SectionContentMarkdown";
import HorizontalCard from "../common/HorizontalCard";


const styles = (theme: Theme) => createStyles({
    iconRoot: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    linkIcon: {
        marginRight: theme.spacing(1)
    }
});

type HorizontalCardSectionProps = WithStyles<typeof styles> & IHorizontalCardSection
const HorizontalCardSection: FunctionComponent<HorizontalCardSectionProps> = ({classes, items, title, subTitle}) => {
    const makeButtons = (button: InteractionItem) => {
        return <Button key={button.link} href={button.link}>{button.title}</Button>
    }

    return <SectionContainer>
        <Grid xs={12} item>
            <SectionHeading title={title} subTitle={subTitle} id={title}/>
        </Grid>
        {items && items.map((card, i) => {
            return <HorizontalCard
                key={`${card.order}_${card.image}`}
                image={card.image}
                flip={i % 2 === 0}
                buttons={
                    <ButtonGroup variant="text">
                        {card?.buttons?.map && slice(card.buttons.map(makeButtons), 0, 3)}
                    </ButtonGroup>
                }
                className={classes.iconRoot}
                title={card.title}
            >
                <SectionContentMarkdown>
                    {card.content}
                </SectionContentMarkdown>

            </HorizontalCard>;
        })}
    </SectionContainer>;
};

export default withStyles(styles)(HorizontalCardSection)