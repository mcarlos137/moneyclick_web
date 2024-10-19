import React, { Component } from 'react';
import {
  Label,
  Dropdown,
  Menu,
  Icon,
  Popup,
  Grid,
  Button,
  Header,
  Image,
} from 'semantic-ui-react';
import Sockette from 'sockette';
import user from '../../services/user';
import './InboxMessage.css';
import soundAlert2 from '../../audio/oh-finally.mp3';
import { isSafari } from 'react-device-detect';
import uuid from 'uuid';
import iconNotification from '../../img/icn-notificacion.png';
import translate from '../../i18n/translate';
import config from '../../services/config';
import { element } from 'prop-types';

class InboxMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      notifications: [],
      countUnread: 0,
      play: false,
      translator: props.translate,
      hasPermissionToPlaySound: !isSafari,
      openPopup: false,
    };
    this.source = soundAlert2;
    //this.source = isSafari ? soundAlertSafari : soundAlert2;
    this.audio = new Audio(this.source);
    this.togglePlay = this.togglePlay.bind(this);
    this.socketReady = this.socketReady.bind(this);
    this.handleResponseSocket = this.handleResponseSocket.bind(this);
    this.onClickMessage = this.onClickMessage.bind(this);
    this.validateAudioPlaySafari = this.validateAudioPlaySafari.bind(this);
    this.handleClickAcceptPermissionAudio =
      this.handleClickAcceptPermissionAudio.bind(this);
    this._isMounted = false;
  }
  componentWillReceiveProps(nextProps, nextContext) {
    //console.log(nextProps);
    if (nextProps.notifications) {
      if (nextProps.notifications.length > this.state.notifications.length) {
        this.prepareMessageToList(nextProps.notifications);
      }
    }
    if (this.props.language !== nextProps.language) {
      this.setState({
        translator: nextProps.translate,
      });
    }
  }

  componentDidMount() {
    this._isMounted = true;
    // this.getNotificationUser();
    window.sessionStorage.setItem('websocketKey', uuid.v4());
    this.setState({
      socket: new Sockette(config.webSocketsMC + '/user', {
        timeout: 60000,
        onopen: (e) => {
          this.socketReady();
        },
        onmessage: (e) => {
          this.getNotificationUser();
        },
        /*onreconnect: e => ////console.log('Reconnecting...'+new Date(), e),
        onclose: e => ////console.log('Closed!'+new Date(), e),
        onerror: e => ////console.log('Error:', e)*/
      }),
    });
    if (isSafari) this.validateAudioPlaySafari();
  }

  validateAudioPlaySafari() {
    let promise = this.audio.play();

    if (promise !== undefined) {
      promise
        .then((_) => {
          // Autoplay started!
          ////console.log("permission granted");
          this.audio.play();
          this.setState({ hasPermissionToPlaySound: true });
        })
        .catch((error) => {
          ////console.log(error);
          // Autoplay was prevented.
          ////console.log("There's not permission to play sounds");
          // Show a "Play" button so that user can start playback.
          this.setState({ openPopup: true });
        });
    } else {
      ////console.log("audio promise undefined");
    }
  }
  handleClickAcceptPermissionAudio() {
    //////console.log("En el click de los permisos");
    let promise = this.audio.play();
    if (promise !== undefined) {
      promise
        .then((_) => {
          // Autoplay started!
          ////console.log("permission granted");
          this.audio.play();
          this.setState({ openPopup: false, hasPermissionToPlaySound: true });
        })
        .catch((error) => {
          ////console.log(error);
          // Autoplay was prevented.
          ////console.log("There's not permission to play sounds");
          // Show a "Play" button so that user can start playback.
          this.setState({ openPopup: true });
        });
    } else {
      ////console.log("audio promise undefined");
      this.setState({ openPopup: false });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
    let auxSocket = this.state.socket;
    if (auxSocket !== undefined && auxSocket !== null) {
      if (!this.state.socket.open) this.state.socket.close();
      ////console.log("cerrando");
    }
  }
  state = {
    socket: null,
    notifications: [],
    countUnread: 0,
  };

  socketReady() {
    //////console.log("wsKey: ", window.sessionStorage.getItem("websocketKey"));
    let men = {
      method: 'getMessages',
      params: {
        userName: user.getUserName(),
        websocketKey: window.sessionStorage.getItem('websocketKey'),
      },
    };
    if (this.state.socket !== null) {
      try {
        this.state.socket.json(men);
      } catch (e) {}
    }
  }

  async getNotificationUser() {
    let list = [];
    let listNotRead = [];
    try {
      const response = await user.getNotifications();
      if (response.data !== false) {
        let dataResult = response.data;
        this.prepareMessageToList(response);
        // for (let noti of dataResult) {
        //   if (noti.readed === false) {
        //     listNotRead.push(noti.timestamp);
        //   }
        //   noti.content = noti.content.split('\\n');
        //   list.push(noti);
        // }
        // this.setState({
        //   list: list,
        //   listNotRead: listNotRead,
        //   numberBague: listNotRead.length !== 0 ? listNotRead.length : '',
        // });
      }
    } catch (error) {
      this.setState({ numberBague: '' });
    }
  }
  togglePlay() {
    if (this._isMounted) {
      this.setState({ play: !this.state.play });
      if (this.state.hasPermissionToPlaySound)
        this.state.play ? this.audio.play() : this.audio.pause();
    }
  }

  onClickMessage = (e, data) => {
    var notification = this.state.notifications.find((n) => {
      return n.id === data.value;
    });
    let all = this.state.notifications;
    let index = this.state.notifications.indexOf(notification);
    if (index !== -1) {
      //let url = notification.value;
      //console.log(url);
      let id = notification.id;
      var ctUnread = this.state.countUnread;
      if (!notification.readed) {
        user
          .makeRead(id)
          .then((resp) => {
            //console.log("entrando por el url none");
            all[index].readed = true;
            ctUnread--;
            this.setState({
              notifications: all,
              countUnread: ctUnread,
            });
          })
          .catch((error) => {
            ////console.log(error);
          });
      }
    }
  };
  prepareMessageToList = (resp) => {
    let notifications = this.state.notifications;
    let unread = this.state.countUnread;
    let msgs = [];
    if (typeof resp.data !== 'undefined' &&  resp.data !== null) {
      msgs = resp.data;
      //console.log("msgs:", msgs);
      if (msgs.length > 0) {
        if (notifications.length === 1) {
          const emptyMsg = notifications.find((n) => {
            return n.id === 'empty';
          });
          if (notifications.indexOf(emptyMsg) !== -1) {
            notifications = [];
          }
        }
        msgs = msgs.sort((a, b) => {
          return new Date(a.timestamp) - new Date(b.timestamp);
        });

        msgs.forEach((m, index) => {
          if (m.readed === false) {
            unread++;
          }
          let content = m.content.split('\\n');

          let notif = {
            text: content,
            value: m.timestamp,
            id: m.timestamp,
            readed: m.readed,
            timestamp: m.timestamp,
          };
          notifications.push(notif);
        });
        notifications = notifications.sort((a, b) => {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        let notificationsSpecial = [];
        if (window.sessionStorage.getItem('specialreferralCode') === 'true') {
          if (notifications.length > 0) {
            notificationsSpecial = notifications.filter((element) => {
              return element.value.includes('mc_buy_balance');
            });
          }
        } else {
          notificationsSpecial = notifications;
        }
        this.setState(
          {
            notifications: notificationsSpecial,
            countUnread: unread,
          },
          () => {
            if (this.state.countUnread > 0) {
              this.togglePlay();
              this.setState({
                play: false,
              });
            }
          }
        );
      } else if (notifications.length === 0) {
        /*let notif = {
          text: 'inbox.messages.noMessages',
          value: 'emptyNotifications',
          id: 'empty',
        };
        notifications.push(notif);
        this.setState({
          notifications: notifications,
        });*/
      }
    } else {
      /*let notif = {
        text: 'inbox.messages.noMessages',
        value: 'emptyNotifications',
        id: 'empty',
      };
      notifications.push(notif);
      this.setState({
        notifications: notifications,
      });*/
    }
  };
  handleResponseSocket(resp) {
    let msgs;
    if (this._isMounted) {
      let result = JSON.parse(resp);
      if (result !== undefined) {
        if (result.params !== undefined) {
          let notifications = this.state.notifications;
          let unread = this.state.countUnread;
          if (result.params.data !== undefined || result.params.data !== null) {
            msgs = result.params.data;
            //console.log("msgs:", msgs);
            if (msgs.length > 0) {
              if (result.method !== 'currentOperationMessages') {
                //////console.log("en el metodo: "+result.method);
                notifications = [];
                unread = 0;
              }
              if (notifications.length === 1) {
                const emptyMsg = notifications.find((n) => {
                  return n.id === 'empty';
                });
                if (notifications.indexOf(emptyMsg) !== -1) {
                  notifications = [];
                }
              }
              msgs = msgs.sort((a, b) => {
                return new Date(a.timestamp) - new Date(b.timestamp);
              });

              msgs.forEach((m, index) => {
                if (m !== null) {
                  if (
                    m.redirectionPath !== null &&
                    m.redirectionPath !== undefined &&
                    m.redirectionPath !== ''
                  ) {
                    if (
                      m.redirectionPath.includes('mc_') ||
                      m.redirectionPath.includes('send_to_payment')
                    ) {
                      // console.log("esta operacion es de mcweb")

                      //   msgs.splice(index, 1);
                      //   ////console.log("m eliminado:", arr)
                      //   //console.log("msgs nuevos:", msgs)
                      // } else {

                      //console.log("dentro del else")
                      let pieceMesssage = m.message.split(' ');

                      let msg = '';
                      if (
                        notifications.length > 0 &&
                        pieceMesssage[2] !== undefined
                      ) {
                        let previousNotifications = notifications.filter(
                          (pn) => {
                            return (
                              pn.text.split(' ')[2] ===
                                pieceMesssage[2].substring(
                                  pieceMesssage[2].length - 7,
                                  pieceMesssage[2].length
                                ) &&
                              !pn.readed &&
                              m.id !== pn.id
                            );
                          }
                        );
                        previousNotifications.forEach((p) => {
                          if (!m.readed && !p.readed) {
                            p.readed = true;
                            user
                              .markMessageAsRead(user.getUserName(), p.id)
                              .then((res) => {
                                unread--;
                                this.setState({
                                  countUnread: unread,
                                });
                              })
                              .catch((error) => {
                                ////console.log(error);
                              });
                          }
                        });
                      }
                      if (pieceMesssage.indexOf('FINISHED') !== -1) {
                        msg =
                          this.props.translate(
                            'inbox.messages.finished.part1'
                          ) +
                          pieceMesssage[2].substring(
                            pieceMesssage[2].length - 7,
                            pieceMesssage[2].length
                          ) +
                          this.props.translate('inbox.messages.finished.part2');
                      } else if (
                        pieceMesssage.indexOf('message') !== -1 &&
                        pieceMesssage.indexOf('has') !== -1 &&
                        pieceMesssage.indexOf('new') !== -1
                      ) {
                        msg =
                          this.props.translate(
                            'inbox.messages.newMessage.part1'
                          ) +
                          pieceMesssage[2].substring(
                            pieceMesssage[2].length - 7,
                            pieceMesssage[2].length
                          ) +
                          this.props.translate(
                            'inbox.messages.newMessage.part2'
                          );
                      } else if (pieceMesssage.indexOf('CANCELED') !== -1) {
                        msg =
                          this.props.translate(
                            'inbox.messages.canceled.part1'
                          ) +
                          pieceMesssage[2].substring(
                            pieceMesssage[2].length - 7,
                            pieceMesssage[2].length
                          ) +
                          this.props.translate('inbox.messages.canceled.part2');
                      } else if (
                        pieceMesssage.indexOf('WAITING_FOR_PAYMENT') !== -1
                      ) {
                        msg =
                          this.props.translate(
                            'inbox.messages.waitingPayment.part1'
                          ) +
                          pieceMesssage[2].substring(
                            pieceMesssage[2].length - 7,
                            pieceMesssage[2].length
                          ) +
                          this.props.translate(
                            'inbox.messages.waitingPayment.part2'
                          );
                      } else if (pieceMesssage.indexOf('FAIL') !== -1) {
                        msg =
                          this.props.translate('inbox.messages.fail.part1') +
                          pieceMesssage[2].substring(
                            pieceMesssage[2].length - 7,
                            pieceMesssage[2].length
                          ) +
                          this.props.translate('inbox.messages.fail.part2');
                      } else if (
                        pieceMesssage.indexOf('LEFT') !== -1 &&
                        pieceMesssage.indexOf('MINUTES') !== -1 &&
                        pieceMesssage.indexOf('OPERATION') !== -1
                      ) {
                        msg = this.props.translate(
                          'inbox.messages.operationTimeLeft'
                        );
                      } else if (
                        pieceMesssage.indexOf('OPERATION') !== -1 &&
                        pieceMesssage.indexOf('TIMEOUT') !== -1
                      ) {
                        msg = this.props.translate(
                          'inbox.messages.operationTimeExpired'
                        );
                      } else if (pieceMesssage.indexOf('PAID') !== -1) {
                        msg =
                          this.props.translate('inbox.messages.paid.part1') +
                          pieceMesssage[2].substring(
                            pieceMesssage[2].length - 7,
                            pieceMesssage[2].length
                          ) +
                          this.props.translate('inbox.messages.paid.part2');
                      } else if (
                        pieceMesssage.indexOf('was') !== -1 &&
                        pieceMesssage.indexOf('created') !== -1
                      ) {
                        msg =
                          this.props.translate('inbox.messages.created.part1') +
                          pieceMesssage[2].substring(
                            pieceMesssage[2].length - 7,
                            pieceMesssage[2].length
                          ) +
                          this.props.translate('inbox.messages.created.part2');
                      } else if (pieceMesssage.indexOf('SUCCESS') !== -1) {
                        msg =
                          this.props.translate('inbox.messages.success.part1') +
                          pieceMesssage[2].substring(
                            pieceMesssage[2].length - 7,
                            pieceMesssage[2].length
                          ) +
                          this.props.translate('inbox.messages.success.part2');
                      } else if (pieceMesssage.indexOf('CLAIM') !== -1) {
                        msg =
                          this.props.translate('inbox.messages.claim.part1') +
                          pieceMesssage[2].substring(
                            pieceMesssage[2].length - 7,
                            pieceMesssage[2].length
                          ) +
                          this.props.translate('inbox.messages.claim.part2');
                      } else if (
                        pieceMesssage.indexOf('PAY_VERIFICATION') !== -1
                      ) {
                        msg =
                          this.props.translate(
                            'inbox.messages.payVerification.part1'
                          ) +
                          pieceMesssage[2].substring(
                            pieceMesssage[2].length - 7,
                            pieceMesssage[2].length
                          ) +
                          this.props.translate(
                            'inbox.messages.payVerification.part2'
                          );
                      } else if (
                        pieceMesssage.indexOf(
                          'WAITING_FOR_RECEIVER_CONFIRMATION'
                        ) !== -1
                      ) {
                        msg =
                          this.props.translate(
                            'inbox.messages.receiverConfirmation.part1'
                          ) +
                          pieceMesssage[2].substring(
                            pieceMesssage[2].length - 7,
                            pieceMesssage[2].length
                          ) +
                          this.props.translate(
                            'inbox.messages.receiverConfirmation.part2'
                          );
                      } else {
                        msg = m.message;
                      }
                      let notif = {
                        text: msg,
                        value: m.redirectionPath,
                        id: m.id,
                        readed: m.readed,
                        timestamp: m.timestamp,
                      };
                      if (
                        !m.readed &&
                        (m.redirectionPath.includes('mc_') ||
                          m.redirectionPath.includes('send_to_payment')) &&
                        window.sessionStorage.getItem('specialreferralCode') !==
                          'true'
                      ) {
                        unread++;
                      } else if (
                        !m.readed &&
                        m.redirectionPath.includes('mc_buy_balance') &&
                        window.sessionStorage.getItem('specialreferralCode') ===
                          'true'
                      ) {
                        unread++;
                      }
                      notifications.push(notif);
                    }
                  }
                }
              });
              notifications = notifications.sort((a, b) => {
                return new Date(b.timestamp) - new Date(a.timestamp);
              });
              let notificationsSpecial = [];
              if (
                window.sessionStorage.getItem('specialreferralCode') === 'true'
              ) {
                if (notifications.length > 0) {
                  notificationsSpecial = notifications.filter((element) => {
                    return element.value.includes('mc_buy_balance');
                  });
                }
              } else {
                notificationsSpecial = notifications;
              }
              this.setState({
                notifications: notificationsSpecial,
                countUnread: unread,
              });
              if (this.state.countUnread > 0) {
                this.togglePlay();
                this.setState({
                  play: false,
                });
              }
            } else if (notifications.length === 0) {
              /*let notif = {
                text: 'inbox.messages.noMessages',
                value: 'emptyNotifications',
                id: 'empty',
              };
              notifications.push(notif);
              this.setState({
                notifications: notifications,
              });*/
            }
          } else {
            /*let notif = {
              text: 'inbox.messages.noMessages',
              value: 'emptyNotifications',
              id: 'empty',
            };
            notifications.push(notif);
            this.setState({
              notifications: notifications,
            });*/
          }
        }
      }
    }
  }

  isURLValid = (url) => {
    return (
      url !== 'none' &&
      url !== 'NONE' &&
      url !== 'emptyNotifications' &&
      url !== '' &&
      url !== null
    );
  };
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
    const { notifications, countUnread } = this.state;
    const notificationsRead = notifications.filter((n) => {
      return n.readed;
    });

    const notificationsUnread = notifications.filter((n) => {
      return !n.readed;
    });

    return (
      <div>
        <Menu.Item>
          <Popup
            open={this.state.openPopup}
            position='bottom center'
            size='small'
          >
            <Grid>
              <Grid.Row>
                <Grid.Column textAlign='justified'>
                  <Header textAlign='center' as='h5'>
                    {t('inbox.popupSafari.headerAuthSession')}
                  </Header>
                  <p>
                    <small>{t('inbox.popupSafari.messageAuthSession')}</small>
                  </p>
                  <Button
                    size='mini'
                    fluid
                    color='blue'
                    onClick={this.handleClickAcceptPermissionAudio}
                  >
                    {t('inbox.popupSafari.buttonAuthorize')}
                  </Button>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign='justified'>
                  <Header as='h6'>
                    {t('inbox.popupSafari.headerAuthPermanent')}
                  </Header>
                  <p>
                    <small>{t('inbox.popupSafari.messageAuthPermanent')}</small>
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Popup>
          {countUnread > 0 && (
            <Label
              id='countUnreadInbox'
              circular
              floating
              className='badgestyle'
            >
              {countUnread}
            </Label>
          )}
          <Dropdown
            style={{
              marginLeft: window.innerWidth <= 364 ? -5 : 0,
              marginRight: window.innerWidth <= 364 ? -5 : 0,
              marginTop: 20,
            }}
            scrolling
            item
            icon={
              <Popup
                content={t('nav.inbox')}
                trigger={
                  <Image
                    src={iconNotification}
                    size='mini'
                    style={{ width: 18, marginTop: 12 }}
                  />
                }
              />
            }
            name='message'
          >
            <Dropdown.Menu
              position='center'
              size='medium'
              style={{ right: '-100px', left: '-115px' }}
            >
              <Dropdown.Header content={t('inbox.unread')} />
              {notificationsUnread.length > 0 &&
                notificationsUnread.map((n) => (
                  <Dropdown.Item
                    id='itemMessageUnread'
                    key={n.id}
                    value={n.id}
                    onClick={this.onClickMessage}
                  >
                    <div className='inboxMessage unread-message'>
                      {n.text.map((text) => (
                        <p className='message-container'>
                          <strong>{text.trim()}</strong>
                        </p>
                      ))}
                      <div className='date-message-align'>
                        {this.formatDate(new Date(n.timestamp))}
                      </div>
                    </div>
                  </Dropdown.Item>
                ))}
              {notificationsUnread.length === 0 && (
                <Dropdown.Item id='itemMessage'>
                  <div className='inboxMessage'>
                    <p className='message-container'>
                      {t('inbox.notNotifications')}
                    </p>
                  </div>
                </Dropdown.Item>
              )}
              <Dropdown.Divider />
              <Dropdown.Header content={t('inbox.read')} />
              {notificationsRead.length > 0 &&
                notificationsRead.map((n) => (
                  <Dropdown.Item key={n.id} value={n.id} id='itemMessageRead'>
                    <div
                      className={'inboxMessage readed-message normal-cursor'}
                    >
                      {n.text.map((text) => (
                        <p className='message-container'>{text.trim()}</p>
                      ))}

                      <div className='date-message-align'>
                        {this.formatDate(new Date(n.timestamp))}
                      </div>
                    </div>
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </div>
    );
  }
}
export default translate(InboxMessage);
