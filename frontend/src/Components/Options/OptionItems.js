import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,  
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import OptionDetails from './OptionDetails'

/**
 * Container for each type of option: basic and advanced.
 * Outermost container
 */
export function OptionItems(props) {
	// Redux state storing list of options
	const { options } = props	

	let items;

	if(options.optionList) {
		items = options.optionList.keys.map(k => {
			const optionEntity = options.optionList.entities[k]
			return(
				<Accordion key={k} defaultExpanded={optionEntity.defaultExpanded}>
					<AccordionSummary
	  	      expandIcon={<ExpandMoreIcon />}
	  	      aria-controls="panel1a-content"
	  	      id="panel1a-header"
	  	     >
	  	     	<p className="summary text" test-attr={k}>{optionEntity.summaryText}</p>
	  	    </AccordionSummary>
	  	    <AccordionDetails >
	  	      <OptionDetails optionType={k}/>
	  	    </AccordionDetails>
    	  </Accordion>
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
          id: PropTypes.string.isRequired,
          summaryText: PropTypes.string.isRequired,
          defaultExpanded: PropTypes.bool.isRequired
        }),
        advancedOptions: PropTypes.shape({
          id: PropTypes.string.isRequired,
          summaryText: PropTypes.string.isRequired,
          defaultExpanded: PropTypes.bool.isRequired
        })
      }),
      keys: PropTypes.array
    }),

    basicOptions: PropTypes.shape({
      entities:PropTypes.shape({
        basicOption1: PropTypes.shape({
          id: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      }),
      keys: PropTypes.array
    }),

    advancedOptions: PropTypes.shape({
      entities:PropTypes.shape({
        advancedOption1: PropTypes.shape({
          id: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
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