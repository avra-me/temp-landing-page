import {Button, Grid, Icon, Theme, Tooltip, useMediaQuery,} from "@material-ui/core";
import {createStyles, withStyles, WithStyles} from '@material-ui/core/styles';
import React, {FunctionComponent} from "react";
import {IconCardSection as IconCardSectionType, InteractionItem} from "../../store/types/home";
import SectionContainer from "../common/SectionContainer";
import IconCard from "../common/IconCard";
import Link from "next/link";
import {slice} from "lodash-es";
import SectionContentMarkdown from "../common/elements/SectionContentMarkdown";

import SectionTitleMarkdown from "../common/elements/SectionTitleMarkdown";

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
const IconCardSection: FunctionComponent<IconCardSectionProps> = ({classes, items, content}) => {
  const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));


  const makeButtons = (chip: InteractionItem) => {
    const {link, title, tooltip, icon} = chip;
    let button = <Button size={"small"} variant={"outlined"}>
      {icon && <Icon color={"action"} className={classes.linkIcon}>{icon}</Icon>}{title}
    </Button>
    if (tooltip) {
      button = <Tooltip key={link} title={tooltip}>{button}</Tooltip>
    }
    return <Link href={link} passHref={true}>{button}</Link>
  };

  return <SectionContainer>
    <Grid xs={12} item>
      <SectionTitleMarkdown content={content}/>
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
        <SectionContentMarkdown content={card.content}/>
      </IconCard>;
    })}
  </SectionContainer>;
};

export default withStyles(styles)(IconCardSection)