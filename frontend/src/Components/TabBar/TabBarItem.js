import React from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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

  const handleChange = (event, newValue) => {
    history.push(newValue)
  };

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
        value={path}
        {...a11yProps(navItem.id)}
      />
  	)
  })

	return (
		<Tabs classes={{root: tabsClasses.root}} value={history.location.pathname} onChange={handleChange} aria-label="simple tabs example">
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