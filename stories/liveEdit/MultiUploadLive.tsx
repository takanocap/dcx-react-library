import React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { MultiUpload } from '../../src/multiUpload/MultiUpload';
import './style.css';

const MultiUploadDemo = `
function MultiUploadDemo() {
  const onChangeHandler = (file) => {
    if (file) {
      const date = new Date(file.lastModified).toLocaleDateString("en-us");
      alert(file.name + 'was uploaded, it was last modified at' + date);
    }
  };
  return (
    <MultiUpload
      name="file-upload-hint"
      acceptedFormats=".jpg, .png"
      className=""
      error={{
        text: "",
        className: "",
        id: "",
        visuallyHiddenText: {
          text: "",
          className: "",
        }
      }}
      id="multi"
      inputProperties={{}}
      labelProperties={{}}
      label="Upload File"
      hint={{
        text: 'This can be in either JPG or PNG format',
        className: 'classes for hint',
        id: 'hint-id',
      }}
      onChange={onChangeHandler}
    />
  );
}
`.trim();

const MultiUploadLive = () => {
  const scope = { MultiUpload };
  return (
    <LiveProvider code={MultiUploadDemo} scope={scope}>
      <div className="container">
        <LiveEditor className="liveEditor" aria-label="editor" />
        <LivePreview className="livePreview" aria-label="preview" />
      </div>
      <LiveError className="liveError" aria-label="error" />
    </LiveProvider>
  );
};

export default MultiUploadLive;
