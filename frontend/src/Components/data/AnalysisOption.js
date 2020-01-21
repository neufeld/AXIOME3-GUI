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
				label: "trunc-len-f"
			},
			basicOption2: {
				id: "basicOption2",
				label: "trunc-len-r"
			},
			basicOption3: {
				id: "basicOption3",
				label: "trim-len-f"
			},
			basicOption4: {
				id: "basicOption4",
				label: "trim-len-r"
			}
		},
		keys: ["basicOption1", "basicOption2", "basicOption3", "basicOption4"]
	},
	advancedOptions: {
		entities: {
			advancedOption1: {
				id: "advancedOption1",
				label: "Some advanced option"
			}
		},
		keys: ["advancedOption1"]
	}
}

export default DenoiseOption