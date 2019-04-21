import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import {AUTH_TOKEN} from "../constants";

import browserHistory from '../browserHistory';
import { isLoggedIn } from "../commonFunctions";


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: true,
      anchorEl: null,
    };
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSignUp = () => {
    browserHistory.push('/signup');
  };

  handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    this.setState({ anchorEl: null })
    browserHistory.push('/');
  };

  handleLogin = () => {
    browserHistory.push('/login')
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <FormGroup>
          {/*<FormControlLabel*/}
            {/*control={*/}
              {/*<Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />*/}
            {/*}*/}
            {/*label={auth ? 'Logout' : 'Login'}*/}
          {/*/>*/}
        </FormGroup>
        <AppBar position="static">
          <Toolbar>
            {/*<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">*/}
              {/*<MenuIcon />*/}
            {/*</IconButton>*/}
            <Typography variant="h6"
                        color="inherit"
                        className={classes.grow}>
              Message App
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleSignUp}>SignUp</MenuItem>
                  {
                    isLoggedIn() ?
                      <MenuItem onClick={this.handleLogout}>Logout</MenuItem> :
                      <MenuItem onClick={this.handleLogin}>Login</MenuItem>
                  }
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);