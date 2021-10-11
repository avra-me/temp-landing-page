import {Button, ButtonGroup, Chip, Icon, Tooltip} from "@mui/material";
import React, {FunctionComponent} from "react";
import type {GenericItem, InteractionItem} from "../../store/types/home";
import SectionContainer from "../common/SectionContainer";
import SectionContentMarkdown from "../common/elements/SectionContentMarkdown";
import HorizontalCard from "../common/HorizontalCard";
import {styled} from "@mui/system";

const StyledHorizontalCard = styled(HorizontalCard)({
  height: "100%",
  display: "flex",
  flexDirection: "column"
})

const GenericItemExperience: FunctionComponent<GenericItem> = ({...item}) => {
  const makeButtons = (button: InteractionItem) => {
    return <Button key={button.link} href={button.link}>{button.title}</Button>
  }
  const {startDate, endDate} = item

  return <SectionContainer>
    <StyledHorizontalCard
      flip={false}
      image={item.image}
      buttons={
        <ButtonGroup variant="text">
          {item?.link && makeButtons({link: item.link, title: 'View Item'})}
        </ButtonGroup>
      }
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
    </StyledHorizontalCard>
  </SectionContainer>;
};

export default GenericItemExperience;