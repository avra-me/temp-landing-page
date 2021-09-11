import Button from "@material-ui/core/Button";
import Link from "next/link";
import React, {FunctionComponent} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import clsx from "clsx";
import {Theme} from "@material-ui/core";
import {StyleRules} from "@material-ui/core/styles";
import smoothScrollTop from "../../utilities/smoothScrollTop";
import {useRouter} from "next/router";
import {MenuItem} from "../../store/types/navigation";

const styles = (theme: Theme): StyleRules => ({
    menuButtonText: {
        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.h6.fontWeight,
    },
    link: {
        "&:after": {
            content: "\"\"",
            display: "block",
            height: "2px",
            background: `linear-gradient(270deg, ${theme.palette.secondary.dark} 0, ${theme.palette.secondary.main} 86%, ${theme.palette.secondary.light} 100%)`,
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
        }
    },
    disabledLink: {
        fontWeight: "bold",
    },
    noDecoration: {
        textDecoration: "none !important",
    }
});

interface IMenuButtonProps {
    onDrawerClose: () => void,
    classes: Record<string, string>,
    element: MenuItem
}

const MenuButton: FunctionComponent<IMenuButtonProps> = ({element, classes, onDrawerClose}) => {
    const router = useRouter();
    let isCurrentLink = false;
    if ("link" in element && router.pathname === element.link) {
        isCurrentLink = true
    }

    if (React.isValidElement(element)) {
        return element;
    }

    const onClick = () => {
        if (isCurrentLink) {
            smoothScrollTop();
            onDrawerClose();
        }
    };


    const result = <Button
        key={element.title}
        color="default"
        size="large"
        classes={{
            text: classes.menuButtonText,
            root: clsx(classes.link, (isCurrentLink ? classes.disabledLink : ""))
        }}
        onClick={onClick}
        disableRipple
    >
        {element.title}
    </Button>;

    if ("link" in element) {
        return <Link
            key={element.title}
            href={element.link}
        >
            {result}
        </Link>;
    }
    return result;
};

export default withStyles(styles)(MenuButton);
