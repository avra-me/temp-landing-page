import {Button, ButtonGroup, Chip, Theme, Tooltip} from "@material-ui/core";
import {createStyles, withStyles, WithStyles} from '@material-ui/core/styles';
import {CalendarToday} from "@material-ui/icons"
import React, {FunctionComponent} from "react";
import {GenericItem, InteractionItem} from "../../store/types/home";
import SectionContainer from "../common/SectionContainer";
import SectionContentMarkdown from "../common/elements/SectionContentMarkdown";
import HorizontalCard from "../common/HorizontalCard";
import {parseISO, format} from 'date-fns'

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
  let startDate = format(parseISO(item.startDate), 'MMMM yyyy');
  let endDate;
  try {
    endDate = format(parseISO(item.endDate), 'MMMM yyyy');
  } catch (e) {
    endDate = "Current"
  }
  try {
    const startYear = format(parseISO(item.startDate), 'yyyy');
    const endYear = format(parseISO(item.endDate), 'yyyy');
    if (startYear === endYear) {
      startDate = startYear;
      endDate = endYear;
    }
  } catch {
    // Ignore
  }

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
          icon={<CalendarToday/>}
          label={startDate !== endDate ? `${startDate}-${endDate}` : endDate}
        />
      </Tooltip>
      <SectionContentMarkdown content={item.content}/>
    </HorizontalCard>
  </SectionContainer>;
};

export default withStyles(styles)(GenericItemExperience)