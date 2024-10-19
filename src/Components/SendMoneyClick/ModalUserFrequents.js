import React, { Component } from "react";
import {
  Container,
  Segment,
  Button,
  Modal,
  Form,
  Dimmer,
  Loader,
  Grid,
  Icon,
  Radio,
} from "semantic-ui-react";
import { isMobile } from "react-device-detect";
import translate from "../../i18n/translate";
import otcService from "../../services/otc";
import userService from "../../services/user";
import NumberFormat from "react-number-format";
import ReactTable from "react-table";
class ModalUserFrequents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      withDrawSucess: false,
      formLoad: false,
      addFrequent: true,
      userSelected: null,
      userToDelete: null,
      nroUsers: 0,
      userFromStorage: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.nroUsers !== prevState.nroUsers) {
      this.loadUser();
    }
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser() {
    let users = JSON.parse(window.sessionStorage.getItem("usersFrequents"));
    let data = [];
    if (users !== null && users !== "null") {
      users.map((userFrequent) => {
        data.push({
          username: userFrequent.username,
          name: userFrequent.nameUserFrequent,
          codCountry: userFrequent.codCountry,
          phone: userFrequent.phone,
          selected: false,
        });
      });
    }
    this.setState({
      userFromStorage: users !== null && users !== "null" ? users : [],
      data: data,
      nroUsers: data.length,
    });
  }

  async _confirmDelete(value) {
    this.setState({
      userToDelete: value,
      showConfirmDelete: true,
    });
  }
  async deleteRow() {
    this.setState({ formLoad: true });
    const phone = this.state.userToDelete.original.phone;
    let userFrequentSessionFiltered = this.state.userFromStorage.filter(
      (frequent) => {
        return frequent.phone !== phone;
      }
    );
    window.sessionStorage.setItem(
      "usersFrequents",
      JSON.stringify(userFrequentSessionFiltered)
    );
    this.props.updateUserFrequents(userFrequentSessionFiltered);
    this.setState({
      userFromStorage: userFrequentSessionFiltered,
    });
    await userService.deleteUserFrequent(this.state.userToDelete.original);
    let data = this.state.data.filter((frequent) => {
      return frequent.phone !== phone;
    });
    this.setState(
      {
        data: data,
      },
      () => {
        this.setState({ formLoad: false, showConfirmDelete: false });
      }
    );
  }
  selectRow(value) {
    this.setState({
      userSelected: value.original,
    });
    let data = this.state.data;
    data.map((user) => {
      if (user.phone === value.original.phone) {
        user.selected = true;
      } else {
        user.selected = false;
      }
      return user;
    });
    this.setState({
      data: data,
    });
  }

  selectUser() {
    if (this.state.userSelected !== null) {
      this.props.setData({
        phone: this.state.userSelected.phone,
        receiverName: this.state.userSelected.name,
        countryCode: this.state.userSelected.codCountry,
      });
      this.props.closeModal();
    }
  }

  render() {
    const transactionTableHeaders = [
      {
        id: "select",
        Header: this.props.translate("sendMoneyClick.modalFrequents.select"),
        accesor: "radio",
        width: 100,
        Cell: (value) => (
          <Radio
            checked={value.original.selected}
            onClick={() => this.selectRow(value)}
          />
        ),
      },
      {
        Header: this.props.translate("sendMoneyClick.modalFrequents.name"),
        accessor: "name",
        filterable: true,
        // filterMethod: (filter, row) => customOptionsFilterMethod2(filter, row),
      },
      {
        Header: this.props.translate(
          "sendMoneyClick.modalFrequents.codCountry"
        ),
        accessor: "codCountry",
        filterable: true,
        // filterMethod: (filter, row) => customOptionsFilterMethod2(filter, row),
      },
      {
        Header: this.props.translate("sendMoneyClick.modalFrequents.phone"),
        accessor: "phone",
        filterable: true,
        // filterMethod: (filter, row) => customOptionsFilterMethod(filter, row),
      },
      {
        id: "delete",
        accesor: "test",
        width: 70,
        Cell: (value) => (
          <Icon
            onClick={() => this._confirmDelete(value)}
            name="trash alternate"
          />
        ),
      },
    ];
    return (
      <Modal open={this.props.open}>
        <Modal.Header>
          {this.props.translate("sendMoneyClick.modalFrequents.title")}
        </Modal.Header>
        <Modal.Content>
          {this.state.formLoad && (
            <Dimmer active inverted>
              <Loader size="small" inverted />
            </Dimmer>
          )}
          <Segment basic>
            <div style={{ paddingTop: 10 }}>
              <ReactTable
                loading={this.state.load}
                className="transactionTable"
                data={this.state.data} //this.state.data
                columns={transactionTableHeaders}
                defaultPageSize={8}
                style={{ fontSize: 14 }}
                previousText={this.props.translate(
                  "homeLoggedIn.table.previous"
                )}
                nextText={this.props.translate("homeLoggedIn.table.next")} //
                loadingText={this.props.translate("homeLoggedIn.table.loading")} //
                noDataText={this.props.translate(
                  "sendMoneyClick.modalFrequents.notFrequents"
                )} //
                pageText={this.props.translate("homeLoggedIn.table.page")} //
                ofText={this.props.translate("homeLoggedIn.table.of")} //
                rowsText={this.props.translate("homeLoggedIn.table.rows")} //
                pageJumpText={this.props.translate(
                  "homeLoggedIn.table.pageJump"
                )} //
                rowsSelectorText={this.props.translate(
                  "homeLoggedIn.table.rowsSelector"
                )} //
                minRow={10}
              />
            </div>
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button secondary onClick={this.props.closeModal}>
            {this.props.translate("withdraw.modal.buttons.cancel")}
          </Button>
          <Button
            positive
            name="withdraw"
            disabled={this.state.userSelected === null}
            onClick={this.selectUser.bind(this)}
          >
            {this.props.translate("withdraw.modal.buttons.accept")}
          </Button>
        </Modal.Actions>
        <Modal
          onClose={() => this.setState({ showConfirmDelete: false })}
          centered={true}
          size={"tiny"}
          open={this.state.showConfirmDelete}
        >
          <Modal.Header>
            {this.props.translate(
              "sendMoneyClick.modalFrequents.messageConfirm"
            )}
          </Modal.Header>
          {this.state.userToDelete !== null && (
            <Modal.Content>
              {this.props.translate(
                "sendMoneyClick.modalFrequents.partialMessage"
              ) +
                " " +
                this.state.userToDelete.original.name +
                " ?"}
            </Modal.Content>
          )}
          <Modal.Actions>
            <Button
              secondary
              onClick={() => {
                this.setState({ showConfirmDelete: false });
              }}
            >
              {this.props.translate("withdraw.modal.buttons.cancel")}
            </Button>
            <Button
              positive
              name="withdraw"
              onClick={() => {
                this.deleteRow();
              }}
            >
              {this.props.translate("withdraw.modal.buttons.accept")}
            </Button>
          </Modal.Actions>
        </Modal>
      </Modal>
    );
  }
}

export default translate(ModalUserFrequents);
