import React, { Component } from 'react';
import {
  Grid,
  Form,
  Input,
} from 'semantic-ui-react';
import translate from '../../i18n/translate';
class DinamicForm extends Component {
  constructor(props) {
    super(props);
    const listLabel = new Map();
    listLabel.set('bank', 'dynamicForm.labels.bank');
    listLabel.set('accountNumber', 'dynamicForm.labels.accountNumber');
    listLabel.set('accountHolderName', 'dynamicForm.labels.accountHolderName');
    listLabel.set('accountHolderId', 'dynamicForm.labels.accountHolderId');
    listLabel.set('accountType', 'dynamicForm.labels.accountType');
    listLabel.set('bankLogin', 'dynamicForm.labels.bankLogin');
    listLabel.set('bankPassword', 'dynamicForm.labels.bankPassword');
    listLabel.set('options', 'dynamicForm.labels.optionsSelect');
    listLabel.set('accountWireNumber', 'dynamicForm.labels.accountWireNumber');
    listLabel.set('cardType', 'dynamicForm.labels.cardType');
    listLabel.set('cardNumber', 'dynamicForm.labels.cardNumber');
    listLabel.set('cardHolderName', 'dynamicForm.labels.cardHolderName');
    listLabel.set('expDate', 'dynamicForm.labels.expDate');
    listLabel.set('csc', 'dynamicForm.labels.csc');
    listLabel.set('zipCode', 'dynamicForm.labels.zipCode');
    listLabel.set('accountAddress', 'dynamicForm.labels.accountAddress');
    listLabel.set('accountZip', 'dynamicForm.labels.accountZip');
    listLabel.set('bankRoutingNumber', 'dynamicForm.labels.bankRoutingNumber');
    listLabel.set('bankSwiftCode', 'dynamicForm.labels.bankSwiftCode');
    listLabel.set(
      'accountWireRoutingNumber',
      'dynamicForm.labels.accountWireRoutingNumber'
    );
    this.state = {
      changue: '',
      labels: listLabel,
      emailReceiver: '',
      thirdAccount:
        this.props.thirdAccount !== undefined ? this.props.thirdAccount : false,
    };
  }
  setAccountHolderNameByDefault() {
    this.setState(
      {
        accountHolderNameByDefault:
          sessionStorage.getItem('firstName') !== 'null' &&
          sessionStorage.getItem('firstName') !== null &&
          sessionStorage.getItem('firstName') !== '' &&
          sessionStorage.getItem('firstName') !== ' '
            ? sessionStorage.getItem('firstName') +
              ' ' +
              sessionStorage.getItem('lastName')
            : '',
      },
      () => {
        for (let field of this.props.fields) {
          if (field.name !== 'accountHolderName') {
            this.setState({
              [field.name]: '',
            });
          } else {
            this.setState({
              [field.name]: !this.props.thirdAccount
                ? this.state.accountHolderNameByDefault
                : '',
            });
            this.props.setDinamicValue(
              field.name,
              this.state.accountHolderNameByDefault
            );
          }
        }
      }
    );
  }

  onChangueValue(e, data) {
    this.setState({
      [data.name]: data.value,
    });
    this.props.setDinamicValue(data.name, data.value);
  }

  onChanguePickerValue(e, value) {
    this.setState({ [value.name]: value.value });
    this.props.setDinamicValue(value.name, value.value);
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.fields !== prevProps.fields ||
      this.props.thirdAccount !== prevProps.thirdAccount
    ) {
      for (let field of this.props.fields) {
        if (field.name === 'accountHolderName') {
          //console.log('this.props.thirdAccount ', this.props.thirdAccount);
          this.setState({
            [field.name]: !this.props.thirdAccount
              ? this.state.accountHolderNameByDefault
              : '',
          });
          this.props.setDinamicValue(
            field.name,
            !this.props.thirdAccount
              ? this.state.accountHolderNameByDefault
              : ''
          );
        } else {
          this.setState({
            [field.name]: ""
          })
        }
      }
    }
  }
  componentDidMount() {
    this.setAccountHolderNameByDefault();
  }
  returnValue(value) {
    return value;
  }

  render() {
    return (
      <div>
        <Grid columns={2}>
          {this.props.fields.map((value, key) => {
            if (value.values !== undefined) {
              if (value.values.length > 1
                || typeof this.props.paymentClientSelected === 'undefined'
                || (value.values.length === 1 &&
                  value.values[0].value !== this.props.paymentClientSelected.name.toUpperCase())) {
                return (
                  <Grid.Column
                    largeScreen={8}
                    mobile={16}
                    tablet={8}
                    computer={8}
                  >
                    <Form.Field required={value.required}>
                      <label>
                        {this.props.translate(
                          'dynamicForm.labels.' + value.name
                        ) ===
                          'dynamicForm.labels.' + value.name
                          ? value.name
                          : this.props.translate(
                            'dynamicForm.labels.' + value.name
                          )}
                      </label>
                      <Form.Select
                        list='list'
                        key={Math.random()}
                        required={value.required}
                        options={value.values.map(option => { return {key: option,text: option, value: option} })}
                        name={value.name}
                        placeholder={this.props.translate(
                          'dynamicForm.placeholderOption'
                        )}
                        onChange={this.onChanguePickerValue.bind(this)}
                        value={this.state[value.name]}
                      />
                      {this.props.validate &&
                        value.required &&
                        this.state[value.name] === '' && (
                          <div style={{ paddingBottom: 10 }}>
                            <label style={{ color: 'red' }}>
                              {this.props.translate(
                                'withdraw.labels.missingField'
                              )}
                            </label>
                          </div>
                        )}
                    </Form.Field>
                  </Grid.Column>
                );
              }
            } else {
              return (
                <Grid.Column
                  largeScreen={8}
                  mobile={16}
                  tablet={8}
                  computer={8}
                >
                  <Form.Field required={value.required}>
                    <label>
                      {this.props.translate(
                        'dynamicForm.labels.' + value.name
                      ) ===
                      'dynamicForm.labels.' + value.name
                        ? value.name
                        : this.props.translate(
                            'dynamicForm.labels.' + value.name
                          )}
                    </label>
                    <Input
                      disabled={
                        value.name === 'accountHolderName' &&
                        this.state.accountHolderNameByDefault !== '' &&
                        !this.props.thirdAccount
                      }
                      name={value.name}
                      placeholder={
                        this.props.translate(
                          'dynamicForm.labels.' + value.name
                        ) ===
                        'dynamicForm.labels.' + value.name
                          ? value.name
                          : this.props.translate(
                              'dynamicForm.labels.' + value.name
                            )
                      }
                      onChange={this.onChangueValue.bind(this)}
                      value={this.state[value.name]}
                    />
                    {this.props.validate &&
                      value.required &&
                      this.state[value.name] === '' && (
                        <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                          <label style={{ color: 'red' }}>
                            {this.props.translate(
                              'withdraw.labels.missingField'
                            )}
                          </label>
                        </div>
                      )}
                  </Form.Field>
                </Grid.Column>
              );
            }
          })}
        </Grid>
      </div>
    );
  }
}

export default translate(DinamicForm);
