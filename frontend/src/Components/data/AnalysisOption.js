import { 
	SAMPLING_DEPTH,
	CORES,
} from '../../misc/OptionLabelConfig';

// Since it requires LITTLE TO ZERO updates, use normalized schema
// No need to worry about having to update states
const AnalysisOption = {
	optionList: {
		entities: {
			basicOptions: {
				id: "basicOptions",
				summaryText: "Basic Options",
				defaultExpanded: true
			},
		},
		keys: ["basicOptions"]
	},
	basicOptions: {
		entities: {
			basicOption1: {
				id: "basicOption1",
				label: SAMPLING_DEPTH,
				type: "number",
				defaultValue: 0,
				min: 0,
			},
			basicOption2: {
				id: "basicOption2",
				label: CORES,
				type: "number",
				defaultValue: 1,
				min: 1,
			},
		},
		keys: ["basicOption1", "basicOption2"]
	},
}

export default AnalysisOption