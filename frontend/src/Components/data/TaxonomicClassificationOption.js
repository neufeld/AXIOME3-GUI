import { 
	CORES,
} from '../../misc/OptionLabelConfig';

// Since it requires LITTLE TO ZERO updates, use normalized schema
// No need to worry about having to update states
const TaxonomicClassificationOption = {
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
				id: "basicOption2",
				label: CORES,
				type: "number",
				defaultValue: 1,
				min: 1,
			},
		},
		keys: ["basicOption1"]
	},
}

export default TaxonomicClassificationOption