/* eslint-disable no-use-before-define */
import React, { useEffect, Fragment } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  ListSubheader,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  Settings as SettingsIcon,
  Globe as GlobeIcon,
  Home as HomeIcon,
} from 'react-feather';
import Logo from 'src/components/Logo';
import useAuth from 'src/hooks/useAuth';
import NavItem from './NavItem';

/* connectIntl */
import { connectIntl, formatMessage } from 'src/contexts/Intl';

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile, intl, language }) => {
  const classes = useStyles();
  const location = useLocation();
  const { user } = useAuth();

  const sections = [
    {
      items: [
        {
          title: "START",
          href: '/app/reports/dashboard'
        }
      ]
    },
    {
      items: [
        {
          title: "PROFILE",
          href: '/app/profile'
        }
      ]
    },
    {
      items: [
        {
          title: "PRODUCTS",
          href: '/app/product'
        }
      ]
    },
    {
      items: [
        {
          title: "MY LICENSES",
          href: '/app/license'
        }
      ]
    },
    {
      items: [
        {
          title: formatMessage(intl.balance),
          href: formatMessage(intl.urlAppbalance)
        }
      ]
    },
    {
      items: [
        {
          title: formatMessage(intl.withdrawal),
          href: formatMessage(intl.urlAppwithdrawal)
        }
      ]
    },
    {
      items: [
        {
          title: formatMessage(intl.affiliate),
          href: formatMessage(intl.urlAppaffiliate)
        }
      ]
    },
    {
      items: [
        {
          title: formatMessage(intl.marketing),
          href: formatMessage(intl.urlAppmarketing)
        }
      ]
    },
    {
      items: [
        {
          title: formatMessage(intl.operation),
          href: formatMessage(intl.urlAppoperation)
        }
      ]
    },
    {
      items: [
        {
          title: formatMessage(intl.support),
          href: formatMessage(intl.urlAppsupport)
        }
      ]
    },
    {
      items: [
        {
          title: formatMessage(intl.legal),
          href: formatMessage(intl.urlApplegal)
        }
      ]
    },
  ];

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  function renderNavItems({
    items,
    pathname,
    depth = 0
  }) {
    return (
      <List disablePadding>
        {items.reduce(
          (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
          []
        )}
      </List>
    );
  }

  function reduceChildRoutes({
    acc,
    pathname,
    item,
    depth
  }) {
    const key = item.title + depth;

    if (item.roles && !item.roles.includes(user.role)) {
      // The current user does not have the required permissions
      return acc;
    }

    if (item.items) {
      const open = matchPath(pathname, {
        path: item.href,
        exact: false
      });

      acc.push(
        <NavItem
          depth={depth}
          icon={item.icon}
          info={item.info}
          key={key}
          open={Boolean(open)}
          title={item.title}
        >
          {renderNavItems({
            depth: depth + 1,
            pathname,
            items: item.items,
          })}
        </NavItem>
      );
    } else {
      acc.push(
        <NavItem
          depth={depth}
          href={item.href}
          icon={item.icon}
          info={item.info}
          key={key}
          title={item.title}
        />
      );
    }

    return acc;
  }

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box
            p={2}
            display="flex"
            justifyContent="center"
          >
            <RouterLink to="/">
              <Logo color="true" />
            </RouterLink>
          </Box>
        </Hidden>
        <Box p={2}>
          <Box
            display="flex"
            justifyContent="center"
          >
            <RouterLink to="/app/account">
              <Avatar
                alt="User"
                className={classes.avatar}
                src={user.avatar}
              />
            </RouterLink>
          </Box>
          <Box
            mt={2}
            textAlign="center"
          >
            <Link
              component={RouterLink}
              to="/app/account"
              variant="h5"
              color="textPrimary"
              underline="none"
            >
              {user.name}
            </Link>
            <Typography
              variant="body2"
              color="textSecondary"
            >
              Your tier:
							{' '}
              <Link
                component={RouterLink}
                to="/pricing"
              >
                {user.tier || 'Normal'}
              </Link>
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box p={2}>
          {sections.map((section, index) => (
            <List
              key={index}
              subheader={(
                <ListSubheader
                  key={section.subheader}
                  disableGutters
                  disableSticky
                >
                  {section.subheader}
                </ListSubheader>
              )}
            >
              {renderNavItems({
                items: section.items,
                pathname: location.pathname,
              })}
            </List>
          ))}
        </Box>
      </PerfectScrollbar>
    </Box>
  );
  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </Fragment>
  );
};

NavBar.propTypes = {
  openMobile: PropTypes.bool,
  onMobileClose: PropTypes.func,
};

const mapStateToProps = (store) => ({
  intl: store.intl.messages,
  language: store.intl.language,
})

const mapDispatchToProps = (dispatch) => ({
  // 
})
export default connectIntl(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
// export default NavBar;
