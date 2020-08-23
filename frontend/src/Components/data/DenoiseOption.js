import {
	SAMPLE_TYPE,
	INPUT_FORMAT,
	TRUNC_LEN_F,
	TRUNC_LEN_R,
	TRIM_LEFT_F,
	TRIM_LEFT_R,
	MULTIPLE_RUN,
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
		keys: ["basicOptions"]
	},
	basicOptions: {
		entities: {
			basicOption1: {
				id: "basicOption1",
				label: SAMPLE_TYPE,
				type: "dropdown",
				dropdownOption: ["SampleData[PairedEndSequencesWithQuality]"],
				defaultValue: "SampleData[PairedEndSequencesWithQuality]"
			},
			basicOption2: {
				id: "basicOption2",
				label: INPUT_FORMAT,
				type: "dropdown",
				dropdownOption: ["PairedEndFastqManifestPhred33", "PairedEndFastqManifestPhred33V2",
												"PairedEndFastqManifestPhred64", "PairedEndFastqManifestPhred64V2"],
				defaultValue: "PairedEndFastqManifestPhred33"
			},
			basicOption3: {
				id: "basicOption3",
				label: MULTIPLE_RUN,
				type: "dropdown",
				dropdownOption: ["Yes", "No"],
				defaultValue: "No",
			},
			basicOption4: {
				id: "basicOption4",
				label: TRUNC_LEN_F,
				type: "number",
				defaultValue: 250,
				min: 1,
				step: 1,
			},
			basicOption5: {
				id: "basicOption5",
				label: TRUNC_LEN_R,
				type: "number",
				defaultValue: 250,
				min: 1,
				step: 1,
			},
			basicOption6: {
				id: "basicOption6",
				label: TRIM_LEFT_F,
				type: "number",
				defaultValue: 0,
				min: 1,
				step: 1,
			},
			basicOption7: {
				id: "basicOption7",
				label: TRIM_LEFT_R,
				type: "number",
				defaultValue: 0,
				min: 1,
				step: 1,
			},
			basicOption8: {
				id: "basicOption8",
				label: CORES,
				type: "number",
				defaultValue: 1,
				min: 1,
				step: 1
			},
		},
		keys: ["basicOption1", "basicOption2", "basicOption3", "basicOption4", "basicOption5", "basicOption6", "basicOption7", "basicOption8"]
	},
}

export default DenoiseOption