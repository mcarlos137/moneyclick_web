import React, { Component } from 'react';
import translate from '../../../i18n/translate';
//import ReactTable from "react-table";
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import { Button, Modal, Message, Select } from 'semantic-ui-react';
import userService from '../../../services/user';

class Devices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDevices: [],
      translator: props.translate,
      loadingTable: true,
      showModal: false,
      loadingButtonModal: false,
      deviceToRemove: '',
      resultRemovingMessage: '',
      errorRemovingDevice: false,
      levelSelected: '',
      endRequest: false,
      showModalLevelAccess: false,
    };
    this.removePermission = this.removePermission.bind(this);
    this.loadUserDevices = this.loadUserDevices.bind(this);
    this.openModalConfirm = this.openModalConfirm.bind(this);
    this.closeModalConfirm = this.closeModalConfirm.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }
  componentDidUpdate(nextProps) {
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: this.props.translate,
      });
    }
  }
  componentDidMount() {
    this.loadUserDevices();
  }
  loadUserDevices() {
    let devices = JSON.parse(window.sessionStorage.getItem('devices'));
    let list = [];

    let date;
    console.log(devices);
    if (devices !== null && devices !== undefined) {
      if (devices.length > 0) {
        devices.map((device) => {
          //.split('__')[0]
          //console.log(device.deviceAtDate);

          if (device.source !== 'DOLLARBTC') {
            date = new Date(device.deviceAtDate).getTime();

            //date = this.formatDate(new Date(device.deviceAtDate));
            let d = {
              id: device.deviceId,
              name: device.deviceName,
              so: device.deviceSO,
              model: device.deviceModel,
              status: device.deviceStatus
                ? this.state.translator('profile.optionDevices.statusActive')
                : this.state.translator('profile.optionDevices.statusInactive'),
              source: device.source,
              date: date,
              statusBool: device.deviceStatus,
              timestamp: device.deviceAtDate,
              levelAccess: device.levelAccess,
            };
            list.push(d);
          }
        });

        this.setState({
          loadingTable: false,
          listDevices: list,
        });
      } else {
        this.setState({ loadingTable: false });
      }
    } else {
      this.setState({ loadingTable: false });
    }
  }
  deleteAdevice() {
    let value = this.state.deviceToRemove;
    let devices = JSON.parse(window.sessionStorage.getItem('devices'));
    this.setState({ loadingButtonModal: true });
    let body = {
      deviceId: value.id,
      username: sessionStorage.getItem('username'),
    };
    userService
      .deleteDeviceUser(body)
      .then(async (resp) => {
        ////console.log(resp);
        if (resp.data.errors === null) {
          let devicesUpdate = devices.filter((d) => {
            if (value.id !== d.deviceId) {
              if (d !== undefined) {
                return d;
              }
            }
          });
          await window.sessionStorage.setItem(
            'devices',
            JSON.stringify(devicesUpdate)
          );

          this.setState({
            resultRemovingMessage:
              'profile.optionDevices.modalDeleteDevice.successMessage',
          });
          setTimeout(
            () =>
              this.setState(
                {
                  resultRemovingMessage: '',
                  showModalDelete: false,
                },
                () => this.loadUserDevices()
              ),
            2000
          );
        } else {
          //Terminar aqui los mensajes de error
          if (resp.data.errors.length > 0) {
            if (resp.data.errors[0].code === 58) {
              ////console.log("USER NOT FOUND");
              this.setState({
                resultRemovingMessage:
                  'profile.optionDevices.errors.userNotFound',
                errorRemovingDevice: true,
              });
              setTimeout(
                () =>
                  this.setState({
                    resultRemovingMessage: '',
                    errorRemovingDevice: false,
                    showModalDelete: false,
                  }),
                2000
              );
            }
          } else {
            ////console.log("Ha ocurrido un error inesperado");
            this.setState({
              resultRemovingMessage:
                'profile.optionDevices.errors.unexpectedError',
              errorRemovingDevice: true,
            });
            setTimeout(
              () =>
                this.setState({
                  resultRemovingMessage: '',
                  errorRemovingDevice: false,
                  showModalDelete: false,
                }),
              2000
            );
          }
        }
      })
      .catch((error) => {
        console.log(error);
        ////console.log("Ha ocurrido un error inesperado");
        this.setState({
          resultRemovingMessage: 'profile.optionDevices.errors.unexpectedError',
          errorRemovingDevice: true,
        });
        setTimeout(
          () =>
            this.setState({
              resultRemovingMessage: '',
              errorRemovingDevice: false,
              showModalDelete: false,
            }),
          2000
        );
      });
  }

  removePermission() {
    let value = this.state.deviceToRemove;
    this.setState({ loadingButtonModal: true });
    if (value !== undefined) {
      let devices = JSON.parse(window.sessionStorage.getItem('devices'));
      let deviceToUpdate = devices.filter((d) => {
        return d.deviceId === value.id;
      })[0];
      deviceToUpdate.deviceAtDate = value.timestamp;
      deviceToUpdate.deviceStatus = !deviceToUpdate.deviceStatus;
      deviceToUpdate.userName = userService.getUserName();
      if (deviceToUpdate.deviceStatus === true) {
        deviceToUpdate.levelAccess = this.state.levelSelected;
      }

      userService
        .updateDeviceToUser(deviceToUpdate)
        .then((resp) => {
          ////console.log(resp);
          if (resp.data.payload) {
            ////console.log("Device updated successfully");
            devices.map((d) => {
              if (d.deviceId === deviceToUpdate.deviceId) {
                d.deviceStatus = deviceToUpdate.deviceStatus;
              }
            });

            window.sessionStorage.setItem('devices', JSON.stringify(devices));
            this.loadUserDevices();
            this.setState({
              resultRemovingMessage: deviceToUpdate.deviceStatus
                ? 'profile.optionDevices.successAdd'
                : 'profile.optionDevices.successRemoving',
            });
            setTimeout(
              () =>
                this.setState({ resultRemovingMessage: '', showModal: false }),
              2000
            );
          } else {
            //Terminar aqui los mensajes de error
            if (resp.data.errors.length > 0) {
              if (resp.data.errors[0].code === 32) {
                ////console.log("USER NOT FOUND");
                this.setState({
                  resultRemovingMessage:
                    'profile.optionDevices.errors.userNotFound',
                  errorRemovingDevice: true,
                });
                setTimeout(
                  () =>
                    this.setState({
                      resultRemovingMessage: '',
                      errorRemovingDevice: false,
                      showModal: false,
                    }),
                  2000
                );
              }
            } else {
              ////console.log("Ha ocurrido un error inesperado");
              this.setState({
                resultRemovingMessage:
                  'profile.optionDevices.errors.unexpectedError',
                errorRemovingDevice: true,
              });
              setTimeout(
                () =>
                  this.setState({
                    resultRemovingMessage: '',
                    errorRemovingDevice: false,
                    showModal: false,
                  }),
                2000
              );
            }
          }
        })
        .catch((error) => {
          ////console.log(error);
          ////console.log("Ha ocurrido un error inesperado");
          this.setState({
            resultRemovingMessage:
              'profile.optionDevices.errors.unexpectedError',
            errorRemovingDevice: true,
          });
          setTimeout(
            () =>
              this.setState({
                resultRemovingMessage: '',
                errorRemovingDevice: false,
                showModal: false,
              }),
            2000
          );
        });
    }
  }
  changePermission() {
    let value = this.state.deviceToRemove;
    this.setState({ loadingButtonModal: true });
    if (value !== undefined) {
      let devices = JSON.parse(window.sessionStorage.getItem('devices'));
      let deviceToUpdate = devices.filter((d) => {
        return d.deviceId === value.id;
      })[0];
      deviceToUpdate.deviceAtDate = value.timestamp;
      deviceToUpdate.deviceStatus = deviceToUpdate.deviceStatus;
      deviceToUpdate.userName = userService.getUserName();
      deviceToUpdate.levelAccess = this.state.levelSelected;
      userService
        .updateDeviceToUser(deviceToUpdate)
        .then((resp) => {
          ////console.log(resp);
          if (resp.data.payload) {
            ////console.log("Device updated successfully");
            devices.map((d) => {
              if (d.deviceId === deviceToUpdate.deviceId) {
                d.levelAccess = deviceToUpdate.levelAccess;
              }
            });

            window.sessionStorage.setItem('devices', JSON.stringify(devices));
            this.loadUserDevices();
            this.setState({
              resultRemovingMessage:
                'profile.optionDevices.modalCongifLevel.successMessage',
              endRequest: true,
            });
            setTimeout(
              () => this.setState({ resultRemovingMessage: '' }),
              5000
            );
          } else {
            //Terminar aqui los mensajes de error
            if (resp.data.errors.length > 0) {
              if (resp.data.errors[0].code === 32) {
                ////console.log("USER NOT FOUND");
                this.setState({
                  resultRemovingMessage:
                    'profile.optionDevices.errors.userNotFound',
                  errorRemovingDevice: true,
                  endRequest: true,
                });
                setTimeout(
                  () =>
                    this.setState({
                      resultRemovingMessage: '',
                      errorRemovingDevice: false,
                    }),
                  2000
                );
              }
            } else {
              ////console.log("Ha ocurrido un error inesperado");
              this.setState({
                resultRemovingMessage:
                  'profile.optionDevices.errors.unexpectedError',
                errorRemovingDevice: true,
                endRequest: true,
              });
              setTimeout(
                () =>
                  this.setState({
                    resultRemovingMessage: '',
                    errorRemovingDevice: false,
                    showModal: false,
                  }),
                2000
              );
            }
          }
        })
        .catch((error) => {
          ////console.log(error);
          ////console.log("Ha ocurrido un error inesperado");
          this.setState({
            resultRemovingMessage:
              'profile.optionDevices.errors.unexpectedError',
            errorRemovingDevice: true,
            endRequest: true,
          });
          setTimeout(
            () =>
              this.setState({
                resultRemovingMessage: '',
                errorRemovingDevice: false,
                showModal: false,
              }),
            2000
          );
        });
    }
  }
  openModalConfirm(value) {
    this.setState({
      showModal: true,
      loadingButtonModal: false,
      deviceToRemove: value,
      levelSelected: value.levelAccess === null ? '' : value.levelAccess,
    });
  }
  openModalChange(value) {
    this.setState({
      showModalLevelAccess: true,
      loadingButtonModal: false,
      deviceToRemove: value,
      levelSelected: value.levelAccess === null ? '' : value.levelAccess,
    });
  }
  openModalDelete(value) {
    this.setState({
      showModalDelete: true,
      loadingButtonModal: false,
      deviceToRemove: value,
    });
  }
  closeModalConfirm() {
    this.setState({
      showModal: false,
      loadingButtonModal: false,
      deviceToRemove: '',
    });
  }
  closeModalDelete() {
    this.setState({
      showModalDelete: false,
      loadingButtonModal: false,
      deviceToRemove: '',
    });
  }
  closeModalLevel() {
    this.setState({
      showModalLevelAccess: false,
      loadingButtonModal: false,
      deviceToRemove: '',
      endRequest: false,
    });
  }
  formatDate(date) {
    let regi = 'es-ES';
    let cad = '';
    var options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: 'true',
    };
    let data = date.toLocaleString(regi, options);
    if (regi === 'es-ES') {
      data = data.split(' ');
      let day = data[0];
      let month = data[1];
      data[0] = month;
      data[1] = day;

      for (date of data) {
        cad = cad + ' ' + date;
      }
    } else {
      cad = data;
    }
    return cad;

    // lunes, 26 de diciembre de 2050 9 a. m.
  }

  render() {
    let t = this.state.translator;
    let resultMessage;
    resultMessage = (
      <Message
        error={this.state.errorRemovingDevice}
        success={!this.state.errorRemovingDevice}
      >
        {t(this.state.resultRemovingMessage)}
      </Message>
    );
    const tableHeaders = [
      {
        Header: t('profile.optionDevices.tableHeader.id'),
        accessor: 'id',
        Cell: (row) => {
          return row.value.slice(-4);
        },
        width: 60,
      },
      {
        Header: t('profile.optionDevices.tableHeader.name'),
        accessor: 'name',
        width: 80,
      },
      {
        Header: t('profile.optionDevices.tableHeader.model'),
        accessor: 'model',
        width: 200,
      },
      {
        Header: t('profile.optionDevices.tableHeader.so'),
        accessor: 'so',
        width: 140,
      },
      {
        Header: t('profile.optionDevices.tableHeader.source'),
        accessor: 'source',
        width: 140,
      },
      {
        Header: t('profile.optionDevices.tableHeader.date'),
        accessor: 'date',
        width: 180,
        Cell: (row) => {
          return this.formatDate(new Date(row.value));
        },
      },
      {
        Header: t('profile.optionDevices.tableHeader.status'),
        accessor: 'status',
        width: 80,
      },
      {
        Header: t('profile.optionDevices.tableHeader.levelAccess'),
        accessor: 'levelAccess',
        width: 170,
        Cell: (row) => {
          if (row.original.source === 'MONEYCLICK') {
            if (row.value === null) {
              return t('profile.optionDevices.tableHeader.notAsignate');
            } else {
              if (row.value === 'FULL') {
                return t('profile.optionDevices.tableHeader.full');
              } else {
                return t('profile.optionDevices.tableHeader.partial');
              }
            }
          } else {
            return 'N/A';
          }
        },
      },
      {
        Header: t('profile.optionDevices.tableHeader.actions'),
        Cell: (row) => (
          <div>
            <Button
              icon={row.original.statusBool ? 'cancel' : 'check'}
              circular
              compact
              size='mini'
              color={row.original.statusBool ? 'red' : 'green'}
              id={row.original.id}
              name={row.value}
              title={
                row.original.statusBool
                  ? t('profile.optionDevices.buttonRemove')
                  : t('profile.optionDevices.buttonAdd')
              }
              onClick={() => this.openModalConfirm(row.original)}
            />
            {row.original.source === 'MONEYCLICK' && (
              <Button
                icon={'cog'}
                circular
                compact
                size='mini'
                id={row.original.id}
                name={row.value}
                title={t('profile.optionDevices.configure')}
                onClick={() => this.openModalChange(row.original)}
              />
            )}
            <Button
              icon={'trash'}
              circular
              compact
              size='mini'
              id={row.original.id}
              name={row.value}
              title={t('profile.optionDevices.delete')}
              onClick={() => this.openModalDelete(row.original)}
            />
          </div>
        ),
      },
    ];
    return (
      <div>
        <ReactTable
          className='transactionTable'
          data={this.state.listDevices}
          columns={tableHeaders}
          defaultPageSize={5}
          previousText={t('profile.optionDevices.table.previous')}
          nextText={t('profile.optionDevices.table.next')}
          loadingText={t('profile.optionDevices.table.loading')}
          noDataText={t('profile.optionDevices.table.noData')}
          pageText={t('profile.optionDevices.table.page')}
          ofText={t('profile.optionDevices.table.of')}
          rowsText={t('profile.optionDevices.table.rows')}
          pageJumpText={t('profile.optionDevices.table.pageJump')}
          rowsSelectorText={t('profile.optionDevices.table.rowsSelector')}
          minRow={5}
          loading={this.state.loadingTable}
          defaultSorted={[
            {
              id: 'date',
              desc: true,
            },
          ]}
        />
        <Modal open={this.state.showModal} onClose={this.closeModalConfirm}>
          <Modal.Header>
            {this.state.deviceToRemove.statusBool
              ? t('profile.optionDevices.modalRemovePermission.header')
              : t('profile.optionDevices.modalRemovePermission.headerAdd')}
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>
                {this.state.deviceToRemove.statusBool
                  ? t('profile.optionDevices.modalRemovePermission.content')
                  : t('profile.optionDevices.modalRemovePermission.contentAdd')}
              </p>
              {this.state.deviceToRemove.levelAccess === null &&
                this.state.deviceToRemove.statusBool === false && (
                  <div>
                    <p>{t('profile.optionDevices.modalCongifLevel.content')}</p>
                    <br />
                    <p>
                      {t('profile.optionDevices.modalCongifLevel.fullAccess')}
                    </p>
                    <p>
                      {t(
                        'profile.optionDevices.modalCongifLevel.partialAccess'
                      )}
                    </p>
                    <div>
                      <Select
                        value={this.state.levelSelected}
                        placeholder={t(
                          'profile.optionDevices.tableHeader.levelAccess'
                        )}
                        onChange={(e, data) =>
                          this.setState({ levelSelected: data.value })
                        }
                        options={[
                          {
                            key: 'FULL',
                            value: 'FULL',
                            text: t('profile.optionDevices.tableHeader.full'),
                          },
                          {
                            key: 'PARTIAL',
                            value: 'PARTIAL',
                            text: t(
                              'profile.optionDevices.tableHeader.partial'
                            ),
                          },
                        ]}
                      ></Select>
                    </div>
                  </div>
                )}
              {this.state.resultRemovingMessage !== '' && resultMessage}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={this.closeModalConfirm}
              secondary
              disabled={this.state.loadingButtonModal}
            >
              {t('profile.optionDevices.modalRemovePermission.buttonNo')}
            </Button>
            <Button
              disabled={
                this.state.deviceToRemove.statusBool === false &&
                this.state.levelSelected === ''
              }
              onClick={this.removePermission}
              loading={this.state.loadingButtonModal}
            >
              {t('profile.optionDevices.modalRemovePermission.buttonYes')}
            </Button>
          </Modal.Actions>
        </Modal>
        <Modal
          open={this.state.showModalLevelAccess}
          onClose={this.closeModalLevel.bind(this)}
        >
          <Modal.Header>
            {t('profile.optionDevices.modalCongifLevel.header')}
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>{t('profile.optionDevices.modalCongifLevel.content')}</p>
              <br />
              <p>{t('profile.optionDevices.modalCongifLevel.fullAccess')}</p>
              <p>{t('profile.optionDevices.modalCongifLevel.partialAccess')}</p>
              <div>
                <Select
                  value={this.state.levelSelected}
                  placeholder={t(
                    'profile.optionDevices.tableHeader.levelAccess'
                  )}
                  onChange={(e, data) =>
                    this.setState({ levelSelected: data.value })
                  }
                  options={[
                    {
                      key: 'FULL',
                      value: 'FULL',
                      text: t('profile.optionDevices.tableHeader.full'),
                    },
                    {
                      key: 'PARTIAL',
                      value: 'PARTIAL',
                      text: t('profile.optionDevices.tableHeader.partial'),
                    },
                  ]}
                ></Select>
              </div>
              {this.state.resultRemovingMessage !== '' && resultMessage}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            {this.state.endRequest === false && (
              <Button
                onClick={this.closeModalLevel.bind(this)}
                secondary
                disabled={this.state.loadingButtonModal}
              >
                {t('profile.optionDevices.modalCongifLevel.buttonClose')}
              </Button>
            )}
            {this.state.endRequest === true && (
              <Button onClick={this.closeModalLevel.bind(this)}>
                {t('profile.optionDevices.modalCongifLevel.buttonAccept')}
              </Button>
            )}
            {this.state.endRequest === false && (
              <Button
                disabled={this.state.levelSelected === ''}
                onClick={this.changePermission.bind(this)}
                loading={this.state.loadingButtonModal}
              >
                {t('profile.optionDevices.modalCongifLevel.buttonConfirm')}
              </Button>
            )}
          </Modal.Actions>
        </Modal>
        <Modal
          open={this.state.showModalDelete}
          onClose={this.closeModalDelete.bind(this)}
        >
          <Modal.Header>
            {t('profile.optionDevices.modalDeleteDevice.header')}
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>{t('profile.optionDevices.modalDeleteDevice.content')}</p>
              {this.state.resultRemovingMessage !== '' && resultMessage}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={this.closeModalDelete.bind(this)}
              secondary
              disabled={this.state.loadingButtonModal}
            >
              {t('profile.optionDevices.modalRemovePermission.buttonNo')}
            </Button>
            <Button
              onClick={this.deleteAdevice.bind(this)}
              loading={this.state.loadingButtonModal}
            >
              {t('profile.optionDevices.modalRemovePermission.buttonYes')}
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default translate(Devices);
