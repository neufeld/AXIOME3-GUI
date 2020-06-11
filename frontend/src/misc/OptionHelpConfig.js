// Input upload related
export const SAMPLE_TYPE_HELP = "FASTQ file type."
export const INPUT_FORMAT_HELP = "FASTQ formats (EMP, Casava, manifest). Currently, only manifest file is supported."
// Denoise related
export const TRIM_LEFT_F_HELP = "Position at which forward sequence should be trimmed starting at the 5` end."
export const TRIM_LEFT_R_HELP = "Position at which reverse sequence should be trimmed starting at the 5` end."
export const TRUNC_LEN_F_HELP = "Position at which forward sequence should be truncated starting from the 3` end. There should still be minimum 20 nucleotide overlap after truncation."
export const TRUNC_LEN_R_HELP = "Position at which reverse sequence should be truncated starting from the 3` end. There should still be minimum 20 nucleotide overlap after truncation."
// Analysis related
export const SAMPLING_DEPTH_HELP = "Samples with read count lower than this value will be discarded, and samples with read count higher than this value will be subsampled to this value. 0 means 'auto'."
// PCoA related
export const PRIMARY_TARGET_HELP = "First metadata column to visualize. It will be represented as different colours."
export const SECONDARY_TARGET_HELP = "Second metadata column to visualize. It will be represented as different shapes. (optional)"
export const ALPHA_HELP = "Transparency. 0 means fully transparent, 1 means fully opaque."
export const STROKE_HELP = "Border thickness. 0 means no border."
export const POINT_SIZE_HELP = "Plot point size."
// Details
export const MORE_DETAIL = "Click 'more...' for details."