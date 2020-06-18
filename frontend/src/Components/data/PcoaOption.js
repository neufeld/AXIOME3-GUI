import { 
	PRIMARY_TARGET,
	SECONDARY_TARGET,
	COLOUR_BREWER,
	BREWER_TYPE,
	ALPHA,
	STROKE,
	POINT_SIZE,
	PC_AXIS_ONE,
	PC_AXIS_TWO,
	PLOT_WIDTH,
	PLOT_HEIGHT,
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
				defaultValue: 'Paired'
			},
			basicOption4: {
				id: "basicOption4",
				label: BREWER_TYPE,
				type: "text",
				defaultValue: 'qual',
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
			},
			advancedOption4: {
				id: "advancedOption4",
				label: PC_AXIS_ONE,
				type: "text",
				defaultValue: "PC1"
			},
			advancedOption5: {
				id: "advancedOption5",
				label: PC_AXIS_TWO,
				type: "text",
				defaultValue: "PC2"
			},
			advancedOption6: {
				id: "advancedOption5",
				label: PLOT_WIDTH,
				type: "number",
				defaultValue: 100,
			},
			advancedOption7: {
				id: "advancedOption5",
				label: PLOT_HEIGHT,
				type: "number",
				defaultValue: 90,
			},
		},
		keys: ["advancedOption1", "advancedOption2", "advancedOption3", "advancedOption4", "advancedOption5", "advancedOption6", "advancedOption7"]
	}
}

export default PcoaOption