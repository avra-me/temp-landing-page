import {Button, ButtonGroup, Grid, Theme} from "@material-ui/core";
import {createStyles, withStyles, WithStyles} from '@material-ui/core/styles';
import Link from 'next/link'
import React, {FunctionComponent} from "react";
import {HorizontalCardSection as IHorizontalCardSection, InteractionItem} from "../../../store/types/home";
import SectionContainer from "../SectionContainer";
import {slice} from "lodash-es";
import SectionContentMarkdown from "../elements/SectionContentMarkdown";
import HorizontalCard from "../HorizontalCard";
import SectionTitleMarkdown from "../elements/SectionTitleMarkdown";


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
const HorizontalCardList: FunctionComponent<HorizontalCardSectionProps> = ({classes, items, content}) => {
    const makeButtons = (button: InteractionItem) => {
        return <Link key={button.link} href={button.link} passHref={true}><Button>{button.title}</Button></Link>
    }

    return <SectionContainer>
        <Grid xs={12} item>
            <SectionTitleMarkdown content={content}/>
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
                <SectionContentMarkdown content={card.content}/>
            </HorizontalCard>;
        })}
    </SectionContainer>;
};

export default withStyles(styles)(HorizontalCardList)