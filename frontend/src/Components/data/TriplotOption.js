import {
	TAXA_COLLAPSE_LEVEL,
	ABUNDANCE_THRESHOLD,
	R2_THRESHOLD,
	WA_THRESHOLD,
	FILL_VARIABLE,
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
				label: TAXA_COLLAPSE_LEVEL,
				type: "dropdown",
				dropdownOption: ["Domain", "Phylum", "Class", "Order", "Family", "Genus", "Species", "ASV"],
				defaultValue: "ASV",
			},
			basicOption2: {
				id: "basicOption2",
				label: ABUNDANCE_THRESHOLD,
				type: "number",
				defaultValue: 0.1,
				min: 0,
				max: 1,
				step: 0.1,
			},
			basicOption3: {
				id: "basicOption3",
				label: R2_THRESHOLD,
				type: "number",
				defaultValue: 0.3,
				min: 0,
				max: 1,
				step: 0.1,
			},
			basicOption4: {
				id: "basicOption4",
				label: WA_THRESHOLD,
				type: "number",
				defaultValue: 0.1,
				min: 0,
				max: 1,
				step: 0.1,
			},
			basicOption5: {
				id: "basicOption5",
				label: FILL_VARIABLE,
				type: "text",
				defaultValue: ""
			},
		},
		keys: ["basicOption1", "basicOption2", "basicOption3", "basicOption4", "basicOption5"]
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
			}
		},
		keys: ["pointsConfig1", "pointsConfig2", "pointsConfig3"]
	},
	plotLayout: {
		entities: {
			layoutConfig1: {
				id: "layoutConfig1",
				label: PC_AXIS_ONE,
				type: "text",
				defaultValue: "PC1"
			},
			layoutConfig2: {
				id: "layoutConfig2",
				label: PC_AXIS_TWO,
				type: "text",
				defaultValue: "PC2"
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