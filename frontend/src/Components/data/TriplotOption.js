import {
	ORDINATION_COLLAPSE_LEVEL,
	WEIGHTED_AVERAGE_COLLAPSE_LEVEL,
	DISSMILARITY_INDEX,
	R2_THRESHOLD,
	WA_THRESHOLD,
	RAREFACTION_DEPTH,
	FILL_VARIABLE,
	FILL_VARIABLE_DTYPE,
	COLOUR_BREWER,
	BREWER_TYPE,
	ALPHA,
	STROKE,
	POINT_SIZE,
	PC_AXIS_ONE,
	PC_AXIS_TWO,
	PLOT_WIDTH,
	PLOT_HEIGHT,
	X_AXIS_LABEL_SIZE,
	Y_AXIS_LABEL_SIZE,
	LEGEND_TITLE_SIZE,
	LEGEND_TEXT_SIZE,
	PVAL_THRESHOLD,
	TAXA_BUBBLE_TEXT_SIZE,
	VECTOR_ARROW_TEXT_SIZE,
} from '../../misc/OptionLabelConfig';

// Since it requires LITTLE TO ZERO updates, use normalized schema
// No need to worry about having to update states
const TriplotOption = {
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
				label: ORDINATION_COLLAPSE_LEVEL,
				type: "dropdown",
				dropdownOption: ["Domain", "Phylum", "Class", "Order", "Family", "Genus", "Species", "ASV"],
				defaultValue: "ASV",
			},
			basicOption2: {
				id: "basicOption2",
				label: WEIGHTED_AVERAGE_COLLAPSE_LEVEL,
				type: "dropdown",
				dropdownOption: ["Domain", "Phylum", "Class", "Order", "Family", "Genus", "Species"],
				defaultValue: "Phylum",
			},
			basicOption3: {
				id: "basicOption3",
				label: RAREFACTION_DEPTH,
				type: "number",
				defaultValue: 0,
				min: 0,
				step: 1,
			},
			basicOption4: {
				id: "basicOption4",
				label: DISSMILARITY_INDEX,
				type: "dropdown",
				dropdownOption: ["Bray-Curtis", "Jaccard", "Kulczynski", "Horn-Morisita", "Binomial", "Cao", "Chao"],
				defaultValue: "Bray-Curtis",
			},
			basicOption5: {
				id: "basicOption5",
				label: R2_THRESHOLD,
				type: "number",
				defaultValue: 0.3,
				min: 0,
				max: 1,
				step: 0.01,
			},
			basicOption6: {
				id: "basicOption6",
				label: PVAL_THRESHOLD,
				type: "number",
				defaultValue: 0.05,
				min: 0,
				max: 1,
				step: 0.01,
			},
			basicOption7: {
				id: "basicOption7",
				label: WA_THRESHOLD,
				type: "number",
				defaultValue: 0.1,
				min: 0,
				max: 1,
				step: 0.01,
			},
			basicOption8: {
				id: "basicOption8",
				label: FILL_VARIABLE,
				type: "text",
				defaultValue: ""
			},
			basicOption9: {
				id: "basicOption9",
				label: FILL_VARIABLE_DTYPE,
				type: "dropdown",
				dropdownOption: ["category", "numeric"],
				defaultValue: "category"
			},
			basicOption10: {
				id: "basicOption10",
				label: COLOUR_BREWER,
				type: "text",
				defaultValue: 'Paired'
			},
			basicOption11: {
				id: "basicOption11",
				label: BREWER_TYPE,
				type: "text",
				defaultValue: 'qual',
				hidden: true,
			},
		},
		keys: ["basicOption1", "basicOption2", "basicOption3", "basicOption4", "basicOption5", 
			"basicOption6", "basicOption7", "basicOption8", "basicOption9", "basicOption10",
			"basicOption11"]
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
			pointsConfig3: {
				id: "pointsConfig3",
				label: POINT_SIZE,
				type: "number",
				defaultValue: 6,
				min: 1,
			},
			pointsConfig4: {
				id: "pointsConfig4",
				label: TAXA_BUBBLE_TEXT_SIZE,
				type: "number",
				defaultValue: 6,
				min: 1,
			},
			pointsConfig5: {
				id: "pointsConfig5",
				label: VECTOR_ARROW_TEXT_SIZE,
				type: "number",
				defaultValue: 6,
				min: 1,
			}
		},
		keys: ["pointsConfig1", "pointsConfig2", "pointsConfig3", "pointsConfig4", "pointsConfig5"]
	},
	plotLayout: {
		entities: {
			layoutConfig1: {
				id: "layoutConfig1",
				label: PC_AXIS_ONE,
				type: "number",
				defaultValue: 1,
				min: 1,
				max: 10,
				step: 1,
			},
			layoutConfig2: {
				id: "layoutConfig2",
				label: PC_AXIS_TWO,
				type: "number",
				defaultValue: 2,
				min: 1,
				max: 10,
				step: 1,
			},
			layoutConfig3: {
				id: "layoutConfig3",
				label: PLOT_WIDTH,
				type: "number",
				defaultValue: 100,
				min: 10,
			},
			layoutConfig4: {
				id: "layoutConfig4",
				label: PLOT_HEIGHT,
				type: "number",
				defaultValue: 100,
				min: 10,
			},
			layoutConfig5: {
				id: "layoutConfig5",
				label: X_AXIS_LABEL_SIZE,
				type: "number",
				defaultValue: 10,
				min: 1,
			},
			layoutConfig6: {
				id: "layoutConfig6",
				label: Y_AXIS_LABEL_SIZE,
				type: "number",
				defaultValue: 10,
				min: 1,
			},
			layoutConfig7: {
				id: "layoutConfig7",
				label: LEGEND_TITLE_SIZE,
				type: "number",
				defaultValue: 10,
				min: 1,
			},
			layoutConfig8: {
				id: "layoutConfig8",
				label: LEGEND_TEXT_SIZE,
				type: "number",
				defaultValue: 10,
				min: 1,
			},
		},
		keys: ["layoutConfig1", "layoutConfig2", "layoutConfig3", "layoutConfig4", "layoutConfig5", "layoutConfig6", "layoutConfig7", "layoutConfig8"]
	},
}

export default TriplotOption