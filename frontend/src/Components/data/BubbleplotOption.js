import { 
	TAXA_COLLAPSE_LEVEL,
	SORT_LEVEL,
	KEYWORD_FILTER,
} from '../../misc/OptionLabelConfig';

// Since it requires LITTLE TO ZERO updates, use normalized schema
// No need to worry about having to update states
const BubbleplotOption = {
	optionList: {
		entities: {
			basicOptions: {
				id: "basicOptions",
				summaryText: "Basic Options",
				defaultExpanded: true
			}
		},
		keys: ["basicOptions"]
	},
	basicOptions: {
		entities: {
			basicOption1: {
				id: "basicOption1",
				label: TAXA_COLLAPSE_LEVEL,
				type: "dropdown",
				dropdownOption: ["Domain", "Phylum", "Class", "Order", "Family", "Genus", "Species", "ASV"],
				defaultValue: "ASV",
			},
			basicOption2: {
				id: "basicOption2",
				label: SORT_LEVEL,
				type: "dropdown",
				dropdownOption: ["Domain", "Phylum", "Class", "Order", "Family", "Genus", "Species", "ASV"],
				defaultValue: "Phylum",
			},
			basicOption3: {
				id: "basicOption3",
				label: KEYWORD_FILTER,
				type: "text",
				defaultValue: ''
			},
		},
		keys: ["basicOption1", "basicOption2", "basicOption3"]
	},
}

export default BubbleplotOption