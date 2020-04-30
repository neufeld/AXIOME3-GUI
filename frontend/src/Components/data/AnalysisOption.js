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
				label: "sampling depth",
				type: "number",
				defaultValue: 0
			},
		},
		keys: ["basicOption1"]
	},
	advancedOptions: {
		entities: {
			advancedOption1: {
				id: "advancedOption1",
				label: "cores",
				type: "number",
				defaultValue: 1
			}
		},
		keys: ["advancedOption1"]
	}
}

export default AnalysisOption