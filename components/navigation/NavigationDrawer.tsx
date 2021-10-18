import React, {FunctionComponent, useEffect} from "react";
import {
  Box,
  Divider,
  Drawer,
  DrawerProps,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Icon from "@mui/material/Icon";
import Link from 'next/link'
import type {MenuItem} from "../../store/types/navigation";
import {styled, useTheme} from "@mui/system";
import RootThemeProvider from "../common/theming/RootThemeProvider";
import {css} from "@emotion/react";
import {useDispatch, useSelector} from "react-redux";
import {CHANGE_THEME_MODE} from "../../store/types/themes";
import {AppState} from "../../store";


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

const ThemedDrawer = styled(Drawer)(({theme}) => css`
  .MuiDrawer-paper {
    background-color: ${theme.palette.background.default};
    width: 300px;
  }
`)

const NavigationDrawer: FunctionComponent<INavigationDrawerProps> = (props) => {
  const {
    open,
    onClose,
    anchor,
    menuItems,
    selectedItem,
  } = props;

  const theme = useTheme();
  const dispatch = useDispatch();
  const mode = useSelector((s: AppState) => s.themes.palette?.mode);

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
    <RootThemeProvider>
      <ThemedDrawer variant="temporary" open={open} onClose={onClose} anchor={anchor}
                    transitionDuration={500}>
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: 2
        }}>
          <Typography variant={"h5"} component={"h1"}>Navigation</Typography>

          <IconButton disableRipple size={"large"} onClick={onClose} aria-label="Close Navigation">
            <CloseIcon/>
          </IconButton>
        </Box>
        <Divider/>
        <List>
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
        <Divider/>
        <Box sx={{
          width: '100%',
          padding: 2,
        }}>
          <Typography variant={"h6"} component={"h2"} gutterBottom>Settings</Typography>
          <Typography variant={"body1"} component={"h3"} gutterBottom>Mode</Typography>
          <ToggleButtonGroup
            fullWidth
            exclusive
            value={mode}
            onChange={(event, value) => dispatch({
              type: CHANGE_THEME_MODE,
              payload: value
            })}
          >
            <ToggleButton value={"light"}>Light</ToggleButton>
            <ToggleButton value={"dark"}>Dark</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </ThemedDrawer>
    </RootThemeProvider>
  );
}

export default NavigationDrawer;
