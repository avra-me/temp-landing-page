import {Button, ButtonGroup, Chip, Icon, Theme, Tooltip} from "@mui/material";
import { WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import React, {FunctionComponent} from "react";
import type {GenericItem, InteractionItem} from "../../store/types/home";
import SectionContainer from "../common/SectionContainer";
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

type GenericItemExperienceProps = WithStyles<typeof styles> & GenericItem
const GenericItemExperience: FunctionComponent<GenericItemExperienceProps> = ({classes, ...item}) => {
  const makeButtons = (button: InteractionItem) => {
    return <Button key={button.link} href={button.link}>{button.title}</Button>
  }
  const {startDate, endDate} = item

  return <SectionContainer>
    <HorizontalCard
      flip={false}
      image={item.image}
      buttons={
        <ButtonGroup variant="text">
          {item?.link && makeButtons({link: item.link, title: 'View Item'})}
        </ButtonGroup>
      }
      className={classes.iconRoot}
      title={item.title}
    >
      <Tooltip
        title={startDate !== endDate ? `From ${startDate} to ${endDate}`: `${startDate}`}
      >
        <Chip
          clickable
          color={"secondary"}
          icon={<Icon>calendar_today</Icon>}
          label={startDate !== endDate ? `${startDate}-${endDate}` : endDate}
        />
      </Tooltip>
      <SectionContentMarkdown content={item.content}/>
    </HorizontalCard>
  </SectionContainer>;
};

export default withStyles(styles)(GenericItemExperience)