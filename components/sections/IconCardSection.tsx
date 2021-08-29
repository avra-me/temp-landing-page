import {
    Button,
    createStyles,
    Grid,
    Icon,
    Theme,
    Tooltip,
    useMediaQuery,
    withStyles,
    WithStyles
} from "@material-ui/core";
import React, {FunctionComponent} from "react";
import {IconCardSection as IconCardSectionType, InteractionItem} from "../../store/types/home";
import SectionContainer from "../common/SectionContainer";
import SectionHeading from "../common/SectionHeading";
import IconCard from "../common/IconCard";
import {slice} from "lodash";
import SectionContentMarkdown from "../common/elements/SectionContentMarkdown";


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

type IconCardSectionProps = WithStyles<typeof styles> & IconCardSectionType
const IconCardSection: FunctionComponent<IconCardSectionProps> = ({classes, items, title, subTitle}) => {
    const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));


    const makeButtons = (chip: InteractionItem) => {
        const {link, title, tooltip, icon} = chip;
        const button = <Button href={link} size={"small"} variant={"outlined"}>
            {icon && <Icon color={"action"} className={classes.linkIcon}>{icon}</Icon>}{title}
        </Button>
        if (tooltip) {
            return <Tooltip key={link} title={tooltip}>{button}</Tooltip>
        }
        return button
    };

    return <SectionContainer>
        <Grid xs={12} item>
            <SectionHeading title={title} subTitle={subTitle} id={title}/>
        </Grid>
        {items && items.map((card, i) => {
            const delay = isMdUp ? Math.min(Math.floor(i) * .100, .300) : Math.min(Math.floor(i) * .100, .600);
            return <IconCard
                key={`${card.order}_${card.icon}`}
                headline={card.title}
                icon={<Icon style={{fontSize: 30}}>{card.icon}</Icon>}
                color={card.color}
                animate
                animationDelay={delay}
                buttons={
                    <Grid container
                          alignItems={"flex-start"}>{card?.buttons?.map && slice(card.buttons.map(makeButtons), 0, 3)}</Grid>
                }
                className={classes.iconRoot}
            >
                <SectionContentMarkdown>
                    {card.content}
                </SectionContentMarkdown>

            </IconCard>;
        })}
    </SectionContainer>;
};

export default withStyles(styles)(IconCardSection)