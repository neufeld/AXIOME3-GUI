import { 
	TRUNC_LEN_F,
	TRUNC_LEN_R,
	TRIM_LEFT_F,
	TRIM_LEFT_R,
	CORES,
} from '../../misc/OptionLabelConfig';

// Since it requires LITTLE TO ZERO updates, use normalized schema
// No need to worry about having to update states
const DenoiseOption = {
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
			}
		},
		keys: ["basicOptions", "advancedOptions"]
	},
	basicOptions: {
		entities: {
			basicOption1: {
				id: "basicOption1",
				label: TRUNC_LEN_F,
				type: "number",
				defaultValue: 250
			},
			basicOption2: {
				id: "basicOption2",
				label: TRUNC_LEN_R,
				type: "number",
				defaultValue: 250
			},
			basicOption3: {
				id: "basicOption3",
				label: TRIM_LEFT_F,
				type: "number",
				defaultValue: 0
			},
			basicOption4: {
				id: "basicOption4",
				label: TRIM_LEFT_R,
				type: "number",
				defaultValue: 0
			}
		},
		keys: ["basicOption1", "basicOption2", "basicOption3", "basicOption4"]
	},
	advancedOptions: {
		entities: {
			advancedOption1: {
				id: "advancedOption1",
				label: CORES,
				type: "number",
				defaultValue: 1,
			}
		},
		keys: ["advancedOption1"]
	}
}

export default DenoiseOption