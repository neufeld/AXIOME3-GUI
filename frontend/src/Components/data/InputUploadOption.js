import { 
	SAMPLE_TYPE,
	INPUT_FORMAT,
	MULTIPLE_RUN,
} from '../../misc/OptionLabelConfig';

// Since it requires LITTLE TO ZERO updates, use normalized schema
// No need to worry about having to update states
const InputUploadOption = {
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
		},
		keys: ["basicOption1", "basicOption2", "basicOption3"]
	},
}

export default InputUploadOption