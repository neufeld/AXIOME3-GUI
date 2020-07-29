import { 
	TAXA_COLLAPSE_LEVEL,
	SORT_LEVEL,
	KEYWORD_FILTER,
	FILL_VARIABLE,
	COLOUR_BREWER,
	BREWER_TYPE,
	ALPHA,
	STROKE,
	PLOT_WIDTH,
	PLOT_HEIGHT,
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
			},
			points: {
				id: "points",
				summaryText: "Points Config",
				defaultExpanded: false
			},
			plotLayout: {
				id: "plotLayout",
				summaryText: "Plot Layout Config",
				defaultExpanded: false
			},
		},
		keys: ["basicOptions", "points", "plotLayout"]
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
			basicOption4: {
				id: "basicOption4",
				label: FILL_VARIABLE,
				type: "text",
				defaultValue: ''
			},
			basicOption5: {
				id: "basicOption5",
				label: COLOUR_BREWER,
				type: "text",
				defaultValue: 'Paired'
			},
			basicOption6: {
				id: "basicOption6",
				label: BREWER_TYPE,
				type: "text",
				defaultValue: 'qual',
				hidden: true,
			},
		},
		keys: ["basicOption1", "basicOption2", "basicOption3", "basicOption4", "basicOption5", "basicOption6"]
	},
	points: {
		entities: {
			pointsConfig1: {
				id: "pointsConfig1",
				label: ALPHA,
				type: "number",
				defaultValue: 1,
				min: 0,
				max: 1,
				step: 0.1,
			},
			pointsConfig2: {
				id: "pointsConfig2",
				label: STROKE,
				type: "number",
				defaultValue: 0.6,
				min: 0,
				max: 1,
				step: 0.1,
			},
		},
		keys: ["pointsConfig1", "pointsConfig2"]
	},
	plotLayout: {
		entities: {
			layoutConfig1: {
				id: "layoutConfig1",
				label: PLOT_WIDTH,
				type: "number",
				defaultValue: 100,
				min: 10,
			},
			layoutConfig2: {
				id: "layoutConfig2",
				label: PLOT_HEIGHT,
				type: "number",
				defaultValue: 100,
				min: 10,
			},
		},
		keys: ["layoutConfig1", "layoutConfig2"]
	},
}

export default BubbleplotOption