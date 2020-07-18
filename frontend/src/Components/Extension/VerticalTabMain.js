import React from 'react';
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import './Extension.css';

import {
	PCOA_ROUTE,
	TRIPLOT_ROUTE,
	BUBBLEPLOT_ROUTE,
} from '../../RouteConfig';

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `extension-tabpanel-${index}`,
	};
}

const useTabsStyles = makeStyles(theme => ({
	root: {
		borderTop: "1px solid",
		borderLeft: "1px solid",
		borderRight: "1px solid",
		background: "rgba(225,198,153,0.3)",
	}
}));

const useTabStyles = makeStyles(theme => ({
	root: {
		textTransform: "none",
		'&:hover': {
			background: "rgba(225,198,153,0.5)"
		},
		display: "block",
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

function VerticalTabMain(props) {
	const tabsClasses = useTabsStyles();
  const tabClasses = useTabStyles();

  // React Router specific props
  const { history } = props;

	// Currently selected tab
	const extensionBarField = [
		{id: 0, label: "PCoA Plot", value: PCOA_ROUTE},
		{id: 1, label: "Bubble Plot", value: BUBBLEPLOT_ROUTE},
		{id: 2, label: "Triplot", value: TRIPLOT_ROUTE},
	]

	const tabItems = extensionBarField.map(extenionItem => {
    const path = extenionItem.value
  	return (
  		<Tab
        key={extenionItem.id}
        classes={{
          root: tabClasses.root,
          selected: tabClasses.selected,
          wrapper: tabClasses.wrapper
        }}
        label={extenionItem.label}
        value={path}
        {...a11yProps(extenionItem.id)}
      />
  	)
  })

	const handleChange = (event, newValue) => {
    history.push(newValue)
  };
 
	return(
		<div className="vertical-tab-bar-container">
			<Tabs
				classes={{root: tabsClasses.root}}
				value={history.location.pathname}
				onChange={handleChange}
				aria-label="extension tab"
				orientation="vertical"
			>
				{tabItems}
	    </Tabs>
    </div>
	)
}

export default withRouter(VerticalTabMain)