import React, { Component } from "react";
import { Grid, Form, Button, Message, Input, Select } from "semantic-ui-react";
import otcAPI from "../../services/otc";
import payment from "../../services/payment";
import user from "../../services/user";
import Axios from "axios";
import config from "../../services/config";
import translate from "../../i18n/translate";
import lenguage from "../../i18n/I18nProvider";
import banks from "../../common/banks";
import { isMobile } from "react-device-detect";
import NumberFormat from "react-number-format";

class FieldDinamic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      dateSelected: false,
      language: window.sessionStorage.getItem("language") !== null ? window.sessionStorage.getItem("language").toUpperCase(): sessionStorage.getItem("language") !== null ? sessionStorage.getItem("language").toUpperCase() : "EN",
      dateMax: ""
    };
  }
  componentDidMount() {
    if (this.props.fields.type === "text_input"){
      this.setState({ [this.props.fieldName]: "" });
      this.props.setData({[this.props.fieldName]: ""});
    } else if(this.props.fields.type === "datepicker"){
      const date = new Date();
      var datestring = date.getFullYear()-20+"-"+ ("0"+(date.getMonth()+1)).slice(-2)+"-"+("0" + date.getDate()).slice(-2);
      this.setState({ [this.props.fieldName]: datestring });
      this.props.setData({[this.props.fieldName]: datestring});
      this.setState({
        dateMax: date.getFullYear()-10+"-"+ ("0"+(date.getMonth()+1)).slice(-2)+"-"+("0" + date.getDate()).slice(-2)
      }) 
    }
  }

  showTimepicker() {
    this.setState({
      showPicker: true,
    });
  }

  onChangePicker(fieldName, selectedDate) {
    this.setState({
      showPicker: false,
    });
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dateDefault = new Date(year - 20, month, day);
    const currentDate = selectedDate || dateDefault;
    this.props.setData({ [fieldName]: currentDate });
    this.setState(
      {
        [fieldName]: selectedDate,
        dateSelected: true,
      },
      () => {}
    );
  }

  onValueChange(fieldName, value) {
    if (value !== undefined) {
      this.props.setData({ [fieldName]: value });
      this.setState({
        [fieldName]: value,
      });
    }
  }

  onChanguePickerValue(e, value) {
    this.setState({ [value.name]: value.value });
    this.props.setData({[value.name]: value.value});
  }

  handleInput(e, valueText){
    this.setState({
      [valueText.name]: valueText.value
    })
    this.props.setData({[valueText.name]: valueText.value});
  }
  render() {
   if (this.props.fields.type === "text_input") {
      return (
        <Grid.Column size={16}>
 <Form.Field>
 <label>{this.props.fields[this.state.language]}</label>
                  <Input
                  name={this.props.fieldName}
                  placeholder={this.props.fields[this.state.language]}
                  onChange={this.handleInput.bind(this)}
                  maxLength={50}
                  value={this.state[this.props.fieldName]}
                />
                </Form.Field>
                {this.props.showMissing && (
            <label style={{color: "red"}}>
              {this.props.translate(
                "withdraw.formVerification.missings.missingField"
              )}
            </label>
          )}
        </Grid.Column>
       
      );
    }
    if (this.props.fields.type === "picker") {
      return (
        <Grid.Column size={16}>
        <Form.Select
        list="list"
        key={Math.random()}
        options={this.props.fields.values[this.state.language].map((item, k) => {
          return { key:item, text:item, value: item };
        })}
        label={this.props.fields[this.state.language]}
        name={this.props.fieldName}
        placeholder={this.props.translate("dynamicForm.placeholderOption")}
        onChange={this.onChanguePickerValue.bind(this)}
        value={this.state[this.props.fieldName]}
      />
      {this.props.showMissing && (
        <label style={{color: "red"}}>
          {this.props.translate(
            "withdraw.formVerification.missings.missingField"
          )}
        </label>
      )}
     </Grid.Column>);
    }
    if (this.props.fields.type === "datepicker") {
      return (
        <Grid.Column size={16}>
        <Form.Input
                name={this.props.fieldName}
                label={this.props.fields[this.state.language]}
                type="date"
                value={this.state[this.props.fieldName]}
                onChange={this.handleInput.bind(this)}
                max={this.state.dateMax}
              />
              {this.props.showMissing && (
                <label style={{color: "red"}}>
                  {this.props.translate(
                    "withdraw.formVerification.missings.missingField"
                  )}
                </label>
              )}
              </Grid.Column>
      );
    }
  }
}
export default translate(FieldDinamic);
