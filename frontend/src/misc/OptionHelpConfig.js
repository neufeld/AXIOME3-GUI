// Input upload related
export const SAMPLE_TYPE_HELP = "FASTQ file type."
export const INPUT_FORMAT_HELP = "FASTQ formats (EMP, Casava, manifest). Currently, only manifest file is supported."
// Denoise related
export const TRIM_LEFT_F_HELP = "Position at which forward sequence should be trimmed starting at the 5` end."
export const TRIM_LEFT_R_HELP = "Position at which reverse sequence should be trimmed starting at the 5` end."
export const TRUNC_LEN_F_HELP = "Position at which forward sequence should be truncated starting from the 3` end. There should still be a minimum 20 nucleotide overlap after truncation."
export const TRUNC_LEN_R_HELP = "Position at which reverse sequence should be truncated starting from the 3` end. There should still be a minimum 20 nucleotide overlap after truncation."
// Analysis related
export const SAMPLING_DEPTH_HELP = "Samples with read count lower than this value will be discarded, and samples with read count higher than this value will be subsampled to this value. 0 means 'auto'."
// PCoA related
export const PRIMARY_TARGET_HELP = "First metadata column to visualize. It will be represented as different colours."
export const SECONDARY_TARGET_HELP = "Second metadata column to visualize. It will be represented as different shapes. (Optional)"
export const COLOUR_BREWER_HELP = "Colour set to be used for the 'Primary target` visualization."
export const ALPHA_HELP = "Transparency. 0 means fully transparent, 1 means fully opaque."
export const STROKE_HELP = "Border thickness. 0 means no border."
export const POINT_SIZE_HELP = "Plot point size."
export const PLOT_WIDTH_HELP = "Plot width in millimetres (mm)."
export const PLOT_HEIGHT_HELP = "Plot height in millimetres (mm)."
export const PC_AXIS_ONE_HELP = "First PC axis to plot."
export const PC_AXIS_TWO_HELP = "Second PC axis to plot."
export const X_AXIS_LABEL_SIZE_HELP = "X axis label font size."
export const Y_AXIS_LABEL_SIZE_HELP = "Y axis label font size."
export const LEGEND_TITLE_SIZE_HELP = "Legend title size."
export const LEGEND_TEXT_SIZE_HELP = "Legend content size."
// Triplot related
export const ORDINATION_COLLAPSE_LEVEL_HELP = "Taxonomic level at which to collapse feature table when projecting onto ordination space"
export const WEIGHTED_AVERAGE_COLLAPSE_LEVEL_HELP = "Taxonomic level at which to collapse feature table when projecting as different bubbles"
export const DISSMILARITY_INDEX_HELP = "Dissimilarity index metric"
export const ABUNDANCE_THRESHOLD_HELP = "Keep samples if at least one of the ASV/taxa in the sample has % abundance greather than this value"
export const R2_THRESHOLD_HELP = "Environmental vector arrows with R2 value greater than the threshold will be displayed"
export const PVAL_THRESHOLD_HELP = "Environmental vector arrows with p-value less than the threshold will be displayed"
export const WA_THRESHOLD_HELP = "Taxa bubbles with normalized abundance greather than this value will be displayed"
export const FILL_VARIABLE_DTYPE_HELP = "Fill variable data type: categorical or numeric"
export const RAREFACTION_DEPTH_HELP = "Samples with read count lower than this value will be discarded, and samples with read count higher than this value will be subsampled to this value. 0 means no rarefaction."
export const TAXA_BUBBLE_TEXT_SIZE_HELP = "Taxa bubble label text size"
export const VECTOR_ARROW_TEXT_SIZE_HELP = "Vector arrow label text size"
// Details
export const MORE_DETAIL = "Click 'more...' for details."
// Session retrieve related
export const SESSION_RETRIEVE_HELP = "Enter session ID to load corresponding session."
// Misc.
export const CORES_HELP = "Number of cores to use to parallelize task execution. Task can be executed faster with more cores, but it may use more RAM as well."
// Email
export const EMAIL_HELP = "Enter email address to receive notification when the task is done running. (Optional)"