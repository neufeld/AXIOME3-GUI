import React from 'react'
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import {
  INPUTUPLOAD_ROUTE,
  DENOISE_ROUTE,
  ANALYSIS_ROUTE,
} from '../../RouteConfig';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useTabsStyles = makeStyles(theme => ({
  root: {
    borderTop: "1px solid",
    borderLeft: "1px solid",
    borderRight: "1px solid",
    background: "rgba(225,198,153,0.3)"
  }
}));

const useTabStyles = makeStyles(theme => ({
  root: {
    textTransform: "none",
    '&:hover': {
      background: "rgba(225,198,153,0.5)"
    }
  },
  selected: {
    background: "#E1C699",
    color: "white",
    fontWeight: "bold",
    '&:hover': {
      background: "#E1C699"
    }
  },
  wrapper: {
    fontSize: "16px"
  }

}));

export function TabBarItem(props) {
	const tabsClasses = useTabsStyles();
  const tabClasses = useTabStyles();

  // Props passed from the parent
	const { navBarField } = props;

  // React Router specific props
  const { history } = props;

  // Set default value based on pathname
  // TEMPORARY SOLUTION; the whole component re-renders on route change so couldn't use state...
  let defaultCurrentTab;

  if(history.location.pathname === INPUTUPLOAD_ROUTE) {
    defaultCurrentTab = 0;
  } else if(history.location.pathname === DENOISE_ROUTE) {
    defaultCurrentTab = 1;
  } else if(history.location.pathname === ANALYSIS_ROUTE) {
    defaultCurrentTab = 2;
  } else{
    defaultCurrentTab = 3;
  }

  const tabItems = navBarField.map(navItem => {
    const path = navItem.value
  	return (
  		<Tab
        key={navItem.id}
        classes={{
          root: tabClasses.root,
          selected: tabClasses.selected,
          wrapper: tabClasses.wrapper
        }}
        label={navItem.label}
        value={navItem.id}
        component={Link}
        to={path}
        {...a11yProps(navItem.id)}
      />
  	)
  })

	return (
		<Tabs
      classes={{root: tabsClasses.root}}
      value={defaultCurrentTab}
      aria-label="simple tabs example"
    >
			{tabItems}
    </Tabs>
	)
}

TabBarItem.propTypes = {
	navBarField: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  )
}

export default withRouter(TabBarItem)