import {Chip, Grid, Icon, Theme, Tooltip, useMediaQuery,} from "@mui/material";
import React, {FunctionComponent} from "react";
import {IconCardSection as IconCardSectionType, InteractionItem} from "../../../store/types/home";
import SectionContainer from "../SectionContainer";
import IconCard from "../IconCard";
import Link from "next/link";
import {slice} from "lodash-es";
import SectionContentMarkdown from "../elements/SectionContentMarkdown";

import SectionTitleMarkdown from "../elements/SectionTitleMarkdown";
import {styled} from "@mui/material/styles";
import {css} from "@emotion/react";

const StyledIconCard = styled(IconCard)({
  height: "100%",
  display: "flex",
  flexDirection: "column"
})

const StyledChip: typeof Chip = styled(Chip)(css`
  &:first-of-type {
    margin-left: 0;
  }

  margin: 0 2px;

  &:last-of-type {
    margin-right: 0;
  }
`) as typeof Chip;

const IconCardList: FunctionComponent<IconCardSectionType> = ({items, content}) => {
  const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));


  const makeButtons = (item: InteractionItem) => {
    const {link, title, tooltip, icon} = item;
    let chip = <StyledChip
      component={"a"}
      icon={icon && <Icon color={"action"} sx={{mr: 1}}>{icon}</Icon> || undefined}
      label={title}
      variant="outlined"
    />
    if (tooltip) {
      chip = <Tooltip key={link} title={tooltip}>{chip}</Tooltip>
    }
    return <Link key={link} href={link} passHref={true}>{chip}</Link>
  };

  return <SectionContainer>
    <Grid xs={12} item>
      <SectionTitleMarkdown content={content}/>
    </Grid>
    {items && items.map((card, i) => {
      const delay = isMdUp ? Math.min(Math.floor(i) * 100, 300) : Math.min(Math.floor(i) * 100, 600);
      return <StyledIconCard
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
      >
        <SectionContentMarkdown content={card.content}/>
      </StyledIconCard>;
    })}

  </SectionContainer>;
};

export default IconCardList