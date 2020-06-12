import { 
	PRIMARY_TARGET,
	SECONDARY_TARGET,
	COLOUR_BREWER,
	BREWER_TYPE,
	ALPHA,
	STROKE,
	POINT_SIZE,
} from '../../misc/OptionLabelConfig';

// Since it requires LITTLE TO ZERO updates, use normalized schema
// No need to worry about having to update states
const PcoaOption = {
	optionList: {
		entities: {
			basicOptions: {
				id: "basicOptions",
				summaryText: "Basic Options",
				defaultExpanded: true
			},
			advancedOptions: {
				id: "advancedOptions",
				summaryText: "Advanced Options",
				defaultExpanded: false
			},
		},
		keys: ["basicOptions", "advancedOptions"]
	},
	basicOptions: {
		entities: {
			basicOption1: {
				id: "basicOption1",
				label: PRIMARY_TARGET,
				type: "text",
				defaultValue: ''
			},
			basicOption2: {
				id: "basicOption2",
				label: SECONDARY_TARGET,
				type: "text",
				defaultValue: ''
			},
			basicOption3: {
				id: "basicOption3",
				label: COLOUR_BREWER,
				type: "text",
				defaultValue: ''
			},
			basicOption4: {
				id: "basicOption4",
				label: BREWER_TYPE,
				type: "text",
				defaultValue: 'seq',
				hidden: true,
			},
		},
		keys: ["basicOption1", "basicOption2", "basicOption3", "basicOption4"]
	},
	advancedOptions: {
		entities: {
			advancedOption1: {
				id: "advancedOption1",
				label: ALPHA,
				type: "number",
				defaultValue: 0.8
			},
			advancedOption2: {
				id: "advancedOption2",
				label: STROKE,
				type: "number",
				defaultValue: 0.6
			},
			advancedOption3: {
				id: "advancedOption3",
				label: POINT_SIZE,
				type: "number",
				defaultValue: 6
			}
		},
		keys: ["advancedOption1", "advancedOption2", "advancedOption3"]
	}
}

export default PcoaOption