import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import React, { useState } from "react";
const timeoutLength = 400;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: "none"
    },
    paper: {
      padding: theme.spacing(1)
    }
  })
);

const SimpleMenu: React.FC = () => {
  const [anchorEl, setanchorEl] = useState<
    Element | ((element: Element) => Element)
  >(null);
  const [mouseOverButton, setmouseOverButton] = useState(false);
  const [mouseOverMenu, setmouseOverMenu] = useState(false);
  const classes = useStyles();

  // Calculate open state based on mouse location

  const open = mouseOverButton || mouseOverMenu;

  const handleClose = () => {
    setmouseOverButton(false);
    setmouseOverMenu(false);
  };

  const enterButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    setanchorEl(event.currentTarget);
    setmouseOverButton(true);
  };

  const leaveButton = () => {
    // Set a timeout so that the menu doesn't close before the user has time to
    // move their mouse over it
    setTimeout(() => {
      setmouseOverButton(false);
    }, timeoutLength);
  };

  const enterMenu = () => {
    setmouseOverMenu(true);
  };

  const leaveMenu = () => {
    setTimeout(() => {
      setmouseOverMenu(false);
    }, timeoutLength);
  };

  return (
    <div>
      <Button
        aria-owns={open ? "simple-menu" : ""}
        aria-haspopup="true"
        onMouseEnter={enterButton}
        onMouseLeave={leaveButton}
      >
        Kläder
      </Button>
      <Menu
        id="simple-menu"
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        anchorEl={anchorEl}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        MenuListProps={{
          onMouseEnter: enterMenu,
          onMouseLeave: leaveMenu
        }}
        classes={{
          paper: classes.paper
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleClose}>Alla kläder</MenuItem>
        <MenuItem onClick={handleClose}>Bestsellers</MenuItem>
        <MenuItem onClick={handleClose}>Jackor</MenuItem>
        <MenuItem onClick={handleClose}>Tröjor & koftor</MenuItem>
        <MenuItem onClick={handleClose}>Toppar & blusar</MenuItem>
      </Menu>
    </div>
  );
};

export default SimpleMenu;
