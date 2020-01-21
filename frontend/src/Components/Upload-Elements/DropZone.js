import React, { useMemo, useCallback } from 'react';
import {useDropzone} from 'react-dropzone';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectFile } from '../../redux/actions/uploadAction'

const baseStyle = {
  position: 'relative',
  height: '100%',
  width: '100%',
  borderRadius: '15px',
  borderWidth: 3,
  borderColor: '#BEBEBE',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

// Tricky to use border styles because acceptStyle/rejectStyle
// can only be used with valid MIME types (i.e. specifying extension doesn't work)
// Some formats (e.g. csv) have platform dependent MIME types (Windows and MacOS have different MIME for csv)

// Looks like react-dropzone only supports inline styling or 
// styled components as of 2019.
function DropZone(props) {
  // Props passsed from parent component (UploadElementMain.js)
  const { id, label } = props

  // Redux action
  const { selectFile } = props

  const onDrop = useCallback(acceptedFiles => {
    selectFile(id, acceptedFiles[0])
  }, [])

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: '.txt,.tsv,.csv',
    onDrop
  });

  const style = useMemo(() => ({
    ...baseStyle
  }), []);

  return (
    <div {...getRootProps({style})}>
      <div className="flex-container icon">
        <CloudUploadOutlinedIcon className="dropzone-sub-icon"/>
      </div>
      <input {...getInputProps({onChange: e => {selectFile(id, e.target.files[0])}})}/>
      <div className="flex-container label">
        <p className="dropzone-sub-label main">{label}</p>
        <p className="dropzone-sub-label misc">Drag & Drop or Click</p>
      </div>
    </div>    
  );
}

DropZone.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  selectFile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { selectFile })(DropZone)