import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import OptionDetails from './OptionDetails'

/**
 * Container for each type of option: basic and advanced.
 * Outermost container
 */
function OptionItems(props) {
	// Redux state storing list of options
	const { options } = props	

	let items;

	if(options.optionList) {
		items = options.optionList.keys.map(k => {
			const optionEntity = options.optionList.entities[k]
			return(
				<ExpansionPanel key={k} defaultExpanded={optionEntity.defaultExpanded}>
					<ExpansionPanelSummary
	  	      expandIcon={<ExpandMoreIcon />}
	  	      aria-controls="panel1a-content"
	  	      id="panel1a-header"
	  	     >
	  	     	<p className="summary text">{optionEntity.summaryText}</p>
	  	    </ExpansionPanelSummary>
	  	    <ExpansionPanelDetails>
	  	      <OptionDetails optionType={k}/>
	  	    </ExpansionPanelDetails>
    	  </ExpansionPanel>
			)
		})
	} else {
		items = []
	}

	return(
		<React.Fragment>
      {items}
    </React.Fragment>
	)
}

OptionItems.propTypes = {
  options: PropTypes.shape({
  	optionList: PropTypes.shape({
  		entities:PropTypes.shape({
  			basicOptions: PropTypes.shape({
  				id: PropTypes.string,
					summaryText: PropTypes.string,
					defaultExpanded: PropTypes.bool
  			}),
  			advancedOptions: PropTypes.shape({
  				id: PropTypes.string,
					summaryText: PropTypes.string,
					defaultExpanded: PropTypes.bool
  			})
  		}),
  		keys: PropTypes.array
  	}),

  	basicOptions: PropTypes.shape({
  		entities:PropTypes.shape({
  			basicOptions: PropTypes.shape({
  				id: PropTypes.string,
					label: PropTypes.string,
  			}),
  			advancedOptions: PropTypes.shape({
  				id: PropTypes.string,
					label: PropTypes.string,
  			})
  		}),
  		keys: PropTypes.array
  	}),

  	advancedOptions: PropTypes.shape({
  		entities:PropTypes.shape({
  			basicOptions: PropTypes.shape({
  				id: PropTypes.string,
					label: PropTypes.string,
  			}),
  			advancedOptions: PropTypes.shape({
  				id: PropTypes.string,
					label: PropTypes.string,
  			})
  		}),
  		keys: PropTypes.array
  	})
  })
}

const mapStateToProps = state => ({
	options: state.option.options
})

export default connect(mapStateToProps)(OptionItems)