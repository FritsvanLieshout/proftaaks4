import React, { Component } from "react";
import RestService from "./RestService";

class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.match.params.id,
      fullname: null,
      image: null,
      selectedFiles: undefined,
      currentFile: undefined,
      files: [],
    };

    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
  }

  componentDidMount() {
    this.retrieveCurrentUser();
  }

  retrieveCurrentUser() {
    RestService.getCurrentUser(this.state.userId).then((response) => {
      this.setState({
        image: response.data.imageUrl,
        fullname: response.data.name + " " + response.data.surname,
      });
    });
  }

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
    });
  }

  upload() {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    RestService.upload(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
        console.log("Message", this.state.message);
        console.log("Response", response);
      })
      .then(() => {
        RestService.updateUserProfileImage(
          this.state.userId,
          this.state.currentFile.name
        ).then((response) => {
          if (response.status === 200) {
            window.location.reload(false);
          }
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
        });
      });

    this.setState({
      selectedFiles: undefined
    });
  }

  render() {
    let {
      selectedFiles,
      currentFile,
      fullname,
      image,
      progress,
      message
    } = this.state;

    return (
      <div>
        <div className="container-form upload">
          <h3>Upload</h3>
          <div className="form-upload">
            <div className="uploadBtn">
              <label>
                <input type="file" onChange={this.selectFile} />
              </label>

              <button
                className="btn success"
                disabled={!selectedFiles}
                onClick={this.upload}
              >
                Upload
              </button>
              {currentFile && (
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: progress + "%" }}
                  >
                    {progress}%
                  </div>
                </div>
              )}

              {message && (
                <div className="alert" role="alert">
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="container-form image">
          <h3>Personal Image</h3>
          <p>{fullname}</p>
          <img src={image} alt="profile" />
        </div>
      </div>
    );
  }
}

export default FileUpload;
