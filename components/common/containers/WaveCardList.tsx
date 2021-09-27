import {Button, CardActions, CardContent, Grid, Icon, Theme, Tooltip} from "@material-ui/core";
import {createStyles, withStyles, WithStyles} from '@material-ui/core/styles';
import React, {FunctionComponent} from "react";
import {InteractionItem, WaveCardSection as WaveCardSectionType} from "../../../store/types/home";
import SectionContainer from "../SectionContainer";
import WaveCard from "../WaveCard";
import {slice} from "lodash-es";
import SectionContentMarkdown from "../elements/SectionContentMarkdown";
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

type WaveCardSectionProps = WithStyles<typeof styles> & WaveCardSectionType
const WaveCardList: FunctionComponent<WaveCardSectionProps> = ({classes, items, content}) => {
  const makeButtons = (chip: InteractionItem) => {
    const {link, title, tooltip, icon} = chip;
    const button = <Button key={link} href={link} size={"small"} variant={"outlined"}>
      {icon && <Icon color={"action"} className={classes.linkIcon}>{icon}</Icon>}{title}
    </Button>
    if (tooltip) {
      return <Tooltip key={link} title={tooltip}>{button}</Tooltip>
    }
    return button
  };

  return <SectionContainer>
    <Grid xs={12} item>
      <SectionTitleMarkdown content={content}/>
    </Grid>
    {items && items.map((card, i) => {
      return <WaveCard
        key={`${card.order}_${card.content}`}
        className={classes.iconRoot}
        inverse={i % 2 === 0}
      >
        <CardContent style={{flexGrow: 1}}>
          <SectionContentMarkdown className={"MuiTypography-colorTextPrimary"} content={card.content}/>
        </CardContent>
        <CardActions>
          {card?.buttons?.map && slice(card.buttons.map(makeButtons), 0, 3)}
        </CardActions>
      </WaveCard>;
    })}
  </SectionContainer>;
};

export default withStyles(styles)(WaveCardList)