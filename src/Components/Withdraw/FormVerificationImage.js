import { Component, View } from "react";
import React from "react";
import {
  Grid,
  Form,
  Button,
  Message,
  Input,
  Divider,
  Segment,
  Header,
  Icon,
} from "semantic-ui-react";
import translate from "../../i18n/translate";
import documentIdentity from "../../img/upload.png";
import selfie from "../../img/selfie.png";
import Files from "react-files";
import Resizer from "react-image-file-resizer";

class FormVerificationImage extends Component {
  constructor(props) {
    super(props);
    this.documentRef = React.createRef();
    this.selfRef = React.createRef();
    this.newresice = this.newresice.bind(this);
    this.state = {
      documentFile: {},
      documentImg: documentIdentity,
      addFileDocument: true,
      selffImg: selfie,
      selfFile: {},
      addFileSelf: true,
    };
  }
  onRemoveFile(e, data) {
    if (data.id === "file-document") {
      this.selfRef.current.removeFiles();
      this.setState({
        documentFile: {},
        documentImg: documentIdentity,
        addFileDocument: true,
      });
    }
    if (data.id === "file-self") {
      this.selfRef.current.removeFiles();
      this.setState({
        selfFile: {},
        selffImg: selfie,
        addFileSelf: true,
      });
    }
  }

  onFilesChangeSelfie(file) {
    if (file !== undefined && file.length > 0) {
      if (file[0].extension !== "pdf") {
        if (file[0].size > 5000000) {
          var object = {
            img: file[0].preview.url,
            name: file[0].name,
            type: file[0].type,
            extension: file[0].extension,
            key: "selfURL",
            file: file[0],
          };
          this.setState({
            selffImg: file[0].preview.url,
            addFileSelf: false,
          });
          let ex = String(file[0].extension);
          this.newresice(file[0], ex.toLocaleUpperCase(), "selfFile", object);
        } else {
          var object = {
            img: file[0].preview.url,
            name: file[0].name,
            type: file[0].type,
            extension: file[0].extension,
            key: "selfURL",
            file: file[0],
          };
          this.setState({
            selffImg: file[0].preview.url,
            selfFile: object,
            addFileSelf: false,
          });
          this.props.setSelfie(object);
        }
      } else {
        var object = {
          img: file[0].preview.url,
          name: file[0].name,
          type: file[0].type,
          extension: file[0].extension,
          key: "selfURL",
          file: file[0],
        };
        this.setState({
          selffImg: file[0].preview.url,
          selfFile: object,
          addFileSelf: false,
        });
        this.props.setSelfie(object);
      }
    }
  }

  onFilesChangeDocument(file) {
    if (file !== undefined && file.length > 0) {
      if (file[0].extension !== "pdf") {
        if (file[0].size > 5000000) {
          var object = {
            img: file[0].preview.url,
            name: file[0].name,
            type: file[0].type,
            extension: file[0].extension,
            key: "documentURL",
            file: file[0],
          };
          this.setState({
            documentImg: file[0].preview.url,
            addFileDocument: false,
          });
          let ex = String(file[0].extension);
          this.newresice(
            file[0],
            ex.toLocaleUpperCase(),
            "documentFile",
            object
          );
        } else {
          var object = {
            img: file[0].preview.url,
            name: file[0].name,
            type: file[0].type,
            extension: file[0].extension,
            key: "documentURL",
            file: file[0],
          };
          this.setState({
            documentImg: file[0].preview.url,
            documentFile: object,
            addFileDocument: false,
          });
          this.props.setDocument(object);
        }
      } else {
        var object = {
          img: file[0].preview.url,
          name: file[0].name,
          type: file[0].type,
          extension: file[0].extension,
          key: "documentURL",
          file: file[0],
        };
        this.setState({
          documentImg: file[0].preview.url,
          documentFile: object,
          addFileDocument: false,
        });
        this.props.setDocument(object);
      }
    }
  }

  newresice(file, type, target, ob) {
    Resizer.imageFileResizer(
      file,
      1024,
      678,
      type,
      70,
      0,
      (uri) => {
        var end = new File([uri], ob.name, {
          type: ob.type,
          lastModified: Date.now(),
        });
        ob.file = end;
        this.setState({ [target]: ob }, () => {
          if (target === "selfFile") {
            this.props.setSelfie(ob);
          } else {
            this.props.setDocument(ob);
          }

          //////console.log(this.state.idFile);
        });
        //  //////console.log(uri, ob);
      },
      "blob"
    );
  }

  onFilesErrorSelfie(error, file) {
    if (error.code === 1) {
      this.setState({
        errorFileSelf: true,
        textMessage: "buy.formVerificationIdentity.errors.fileNotSupported",
      });
      setTimeout(() => {
        this.setState({ errorFileSelf: false, textMessage: "" });
      }, 5000);
    } else {
      this.setState({
        errorFileSelf: true,
        textMessage: "buy.formVerificationIdentity.errors.fileSize",
      });
      setTimeout(() => {
        this.setState({ errorFileSelf: false, textMessage: "" });
      }, 5000);
    }
  }
  onFilesErrorDocument(error, file) {
    if (error.code === 1) {
      this.setState({
        errorFileDocument: true,
        textMessage: "buy.formVerificationIdentity.errors.fileNotSupported",
      });
      setTimeout(() => {
        this.setState({ errorFileDocument: false, textMessage: "" });
      }, 5000);
    } else {
      this.setState({
        errorFileDocument: true,
        textMessage: "buy.formVerificationIdentity.errors.fileSize",
      });
      setTimeout(() => {
        this.setState({ errorFileDocument: false, textMessage: "" });
      }, 5000);
    }
  }
  render() {
    return (
      <Grid>
        <Grid.Column largeScreen={8} mobile={8} tablet={8} computer={8}>
          <Grid>
            <Grid.Column largeScreen={5} mobile={5} tablet={5} computer={5} />
            <Grid.Column largeScreen={8} mobile={8} tablet={8} computer={8}>
              <Segment
                placeholder
                style={{
                  width: 200,
                  height: 200,
                }}
              >
                <Files
                  className="files-dropzone"
                  ref={this.selfRef}
                  onChange={this.onFilesChangeDocument.bind(this)}
                  onError={this.onFilesErrorDocument.bind(this)}
                  accepts={["image/*", ".pdf"]}
                  multiple={false}
                  maxFiles={1}
                  maxFileSize={5000000}
                  minFileSize={0}
                  clickable={this.state.addFileDocument}
                >
                  <Header textAlign="center">
                    {this.state.documentFile.extension !== "pdf" && (
                      <img
                        alt=""
                        src={this.state.documentImg}
                        style={{
                          width: 100,
                          height: 100,
                        }}
                      />
                    )}

                    {this.state.documentFile.extension === "pdf" && (
                      <div>
                        <Icon name="file pdf" size="big" color="blue" />
                      </div>
                    )}
                    {this.state.documentFile.name !== undefined && (
                      <p style={{ fontSize: "11px" }}>
                        {this.state.documentFile.name}
                      </p>
                    )}
                    {this.state.documentFile.name === undefined && (
                      <div>
                        <p style={{ paddingTop: 10, fontSize: "11px" }}>
                          {this.props.translate(
                            "withdraw.formVerification.documentIdentity"
                          )}
                        </p>
                        <p style={{ fontSize: "9px" }}>
                          {"(JPG, JPEG, GIF, PNG, PDF)"}
                        </p>
                      </div>
                    )}
                    {this.props.validate &&
                      this.state.documentFile.name === undefined && (
                        <label
                          style={{
                            paddingTop: 10,
                            fontSize: "11px",
                            color: "red",
                          }}
                        >
                          {this.props.translate(
                            "withdraw.formVerification.missings.missingField"
                          )}
                        </label>
                      )}
                  </Header>
                </Files>

                {!this.state.addFileDocument && (
                  <div style={{ paddingTop: 20 }}>
                    <Button
                      color="blue"
                      size="tiny"
                      id="file-document"
                      onClick={this.onRemoveFile.bind(this)}
                    >
                      {this.props.translate(
                        "withdraw.formVerification.buttonChange"
                      )}
                    </Button>
                  </div>
                )}
                {this.errorFileDocument && (
                  <Message
                    error
                    content={this.props.translate(
                      "withdraw.formVerification.fileNotSupported"
                    )}
                  />
                )}
              </Segment>
            </Grid.Column>
            <Grid.Column largeScreen={3} mobile={3} tablet={3} computer={3} />
          </Grid>
        </Grid.Column>
        <Grid.Column largeScreen={8} mobile={8} tablet={8} computer={8}>
          <Grid>
            <Grid.Column largeScreen={4} mobile={4} tablet={4} computer={4} />
            <Grid.Column largeScreen={8} mobile={8} tablet={8} computer={8}>
              <Segment
                placeholder
                style={{
                  width: 200,
                  height: 200,
                }}
              >
                <Files
                  className="files-dropzone"
                  ref={this.selfRef}
                  onChange={this.onFilesChangeSelfie.bind(this)}
                  onError={this.onFilesErrorSelfie.bind(this)}
                  accepts={["image/*", ".pdf"]}
                  multiple={false}
                  maxFiles={1}
                  maxFileSize={5000000}
                  minFileSize={0}
                  clickable={this.state.addFileSelf}
                >
                  <Header textAlign="center">
                    {this.state.selfFile.extension !== "pdf" && (
                      <img
                        alt=""
                        src={this.state.selffImg}
                        style={{
                          width: 100,
                          height: 100,
                        }}
                      />
                    )}

                    {this.state.selfFile.extension === "pdf" && (
                      <div>
                        <Icon name="file pdf" size="big" color="blue" />
                      </div>
                    )}
                    {this.state.selfFile.name !== undefined && (
                      <p style={{ fontSize: "11px" }}>
                        {this.state.selfFile.name}
                      </p>
                    )}
                    {this.state.selfFile.name === undefined && (
                      <div>
                        <p style={{ paddingTop: 10, fontSize: "11px" }}>
                          {this.props.translate(
                            "withdraw.formVerification.selfieIdentity"
                          )}
                        </p>
                        <p style={{ fontSize: "9px" }}>
                          {"(JPG, JPEG, GIF, PNG, PDF)"}
                        </p>
                      </div>
                    )}
                    {this.props.validate &&
                      this.state.selfFile.name === undefined && (
                        <label
                          style={{
                            paddingTop: 10,
                            fontSize: "11px",
                            color: "red",
                          }}
                        >
                          {this.props.translate(
                            "withdraw.formVerification.missings.missingField"
                          )}
                        </label>
                      )}
                  </Header>
                </Files>

                {!this.state.addFileSelf && (
                  <div style={{ paddingTop: 20 }}>
                    <Button
                      color="blue"
                      size="tiny"
                      id="file-self"
                      onClick={this.onRemoveFile.bind(this)}
                    >
                      {this.props.translate(
                        "withdraw.formVerification.buttonChange"
                      )}
                    </Button>
                  </div>
                )}
                {this.errorFileSelf && (
                  <Message
                    error
                    content={this.props.translate(
                      "withdraw.formVerification.fileNotSupported"
                    )}
                  />
                )}
              </Segment>
            </Grid.Column>
            <Grid.Column largeScreen={4} mobile={4} tablet={4} computer={4} />
          </Grid>
        </Grid.Column>
      </Grid>
    );
  }
}
export default translate(FormVerificationImage);
