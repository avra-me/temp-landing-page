import Button from "@mui/material/Button";
import {styled} from '@mui/material/styles';
import Link from "next/link";
import React, {FunctionComponent} from "react";
import smoothScrollTop from "../../utilities/smoothScrollTop";
import {MenuItem} from "../../store/types/navigation";

const StyledButton = styled(Button)(({theme}) => ({
  textDecoration: "none !important",
  "&:after": {
    content: "\"\"",
    display: "block",
    height: ".2em",
    background: `linear-gradient(270deg, ${theme.palette.secondary.main} 0, ${theme.palette.secondary.main} 86%, ${theme.palette.secondary.light} 100%)`,
    borderRadius: "1px",
    transition: "width .2s ease-in-out",
    left: 0,
    bottom: 0,
    width: 0,
    position: "absolute"
  },
  "&:hover": {
    backgroundColor: "transparent",
    "&::after": {
      width: "100%"
    }
  },
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.h6.fontWeight,
  color: theme.palette.text.primary,
}))

interface IMenuButtonProps {
  onDrawerClose: () => void,
  active?: boolean
  element: MenuItem
}

const MenuButton: FunctionComponent<IMenuButtonProps> = ({element, active, onDrawerClose}) => {
  let isCurrentLink = !!active;

  if (React.isValidElement(element)) {
    return element;
  }

  const onClick = () => {
    if (isCurrentLink) {
      smoothScrollTop();
      onDrawerClose();
    }
  };


  const result = <StyledButton
    key={element.title}
    sx={{
      color: isCurrentLink ? 'text.primary' : 'text.secondary'
    }}
    size="large"
    onClick={onClick}
    disableRipple>
    {element.title}
  </StyledButton>;

  if ("link" in element) {
    return (
      <Link
        key={element.title}
        href={element.link}
      >
        {result}
      </Link>
    );
  }
  return result;
};

export default (MenuButton);
