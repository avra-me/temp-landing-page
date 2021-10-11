import React, {FunctionComponent, useEffect} from "react";
import {
  Drawer,
  DrawerProps,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Icon from "@mui/material/Icon";
import CircleMenuButton from "../common/elements/CircleMenuButton";
import Link from 'next/link'
import type {MenuItem} from "../../store/types/navigation";
import {styled, useTheme} from "@mui/system";


const NoDecorationAnchor = styled("a")({
  textDecoration: "none !important",
})

export interface INavigationDrawerProps {
  open: boolean,
  onClose: () => void,
  anchor: DrawerProps['anchor'],
  menuItems: MenuItem[],
  selectedItem: string | null,
}

const NavigationDrawer: FunctionComponent<INavigationDrawerProps> = (props) => {
  const {
    open,
    onClose,
    anchor,
    menuItems,
    selectedItem,
  } = props;

  const theme = useTheme();

  const isLargerThanSm = useMediaQuery(theme.breakpoints.up('sm'))
  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.onresize = () => {
      if (isLargerThanSm && open) {
        onClose();
      }
    };
  }, [isLargerThanSm, open, onClose]);

  return (
    <Drawer variant="temporary" open={open} onClose={onClose} anchor={anchor}
            transitionDuration={500}>
      <Toolbar sx={{
        width: "200px",
      }}>
        <ListItem
          sx={{
            paddingTop: 0,
            paddingBottom: 0,
            height: "100%",
            justifyContent: anchor === "left" ? "flex-start" : "flex-end",
          }}
          disableGutters
        >
          <ListItem
            button
            /**
             * We disable ripple as it will make a weird animation
             * with primary and secondary color
             */
            disableRipple
            disableTouchRipple
          >
            <ListItemText>Navigation</ListItemText>
          </ListItem>
          <ListItemIcon sx={{
            mr: 0.5,
          }}>
            <CircleMenuButton onClick={onClose} aria-label="Close Navigation">
              <CloseIcon color="primary"/>
            </CircleMenuButton>
          </ListItemIcon>
        </ListItem>
      </Toolbar>
      <List sx={{
        backgroundColor: "background.paper",
        height: "100%",
      }}>
        {menuItems.map((element) => {
          if ("link" in element) {
            return (
              <Link
                key={element.title}
                href={element.link}
                passHref
              >
                <NoDecorationAnchor>
                  <ListItem
                    button
                    selected={selectedItem === element.title}
                    /**
                     * We disable ripple as it will make a weird animation
                     * with primary and secondary color
                     */
                    disableRipple
                    disableTouchRipple
                  >
                    <ListItemIcon>
                      <Icon>
                        {element.icon}
                      </Icon>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" color={"textPrimary"}>
                          {element.title}
                        </Typography>
                      }
                    />
                  </ListItem>
                </NoDecorationAnchor>
              </Link>
            );
          }
          return (
            element
          );
        })}
      </List>
    </Drawer>
  );
}

export default NavigationDrawer;
