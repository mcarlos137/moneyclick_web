import packageJson from '../../package.json';
let urlWebSocket;
urlWebSocket = packageJson.webSocketServiceURL;
export default {
  // Api Bushidoo
  apiBushidoBaseUrl:
    'https://service8080.moneyclick.com/bushido-wallet-service-1.0.3',
  //apiBushidoBaseUrl: 'http://localhost:8080/bushido-wallet-service', //Dev Env
  wsBushidoBaseUrl:
    'ws://service8080.dollarbtc.com/bushido-wallet-service-1.0.3',
  // wsBushidoBaseUrl: "ws://192.168.0.104:8080/bushido-wallet-service"
  urlBushido: {
    addUserFrequent: '/api/v2/user/addUserFrequent',
    deleteUserFrequent: '/api/v2/user/deleteUserFrequent',
    getUserByPhone: '/api/v2/user/find/userByPhone',
    checkNickname: '/api/v2/user/check/nickname/',
    registrationMoneyclick: '/api/v2/registration/user/moneyclick',
    //updatePasswordMoneyClick: '/api/v2/user/security/update/passwordMoneyClick', //Deprecated
    updatePasswordMoneyClickUpdate:
      '/api/v2/user/security/update/passwordMoneyClickUpdate',
    registration: '/api/v2/registration/user',
    registrationPin: '/api/v2/registration/pin',
    accountComplete: '/api/v2/user/account/complete',
    auth: '/api/v2/user/auth',
    preferedSecurity: '/api/v2/user/security/update/preferedSecurity', //    ---crudo pero no se usa hasta ahora 2022-01-24
    //authMoneyClick: '/api/v2/user/auth/moneyclick',
    //passwordReset: '/api/v2/user/password/reset',
    //passwordResetInit: '/api/v2/user/password/reset/init',
    passwordResetToken: '/api/v2/user/password/reset/token',
    passwordResetCode: '/api/v2/user/password/reset/code',
    //passwordResetConfirm: '/api/v2/user/password/reset/confirm',
    verifyInit: '/api/v2/user/account/verify/init',
    verifyConfirm: '/api/v2/user/account/verify',
    keyGenerate: '/api/v2/tx/keygenerate', //Genera una direccion de cartera para deposito
    updateUser: '/api/v2/update/user/', //Para actualizar datos de usuarios
    generateTokenVerify: '/api/v2/tx/tokentx', //Genera un token de verificacion de usuario
    verifyToken: '/api/v2/tx/tokentxverify', //Verifica el token generado
    tokenPhone: '/api/v2/user/phone/verify/token',
    //sendCode: '/api/v2/user/auth/code/token',
    //authCode: '/api/v2/user/auth/code',
    verifyCodePhone: '/api/v2/user/phone/verify/code',
    updateLastConexion: '/api/v2/update/user/lastConexion/',
    updateNickName: '/api/v2/user/update/nickname',
    updateWalletCreation: '/api/v2/user/update/walletCreation/',
    preferedSecurityTwoFactor:
      '/api/v2/user/security/update/preferedSecurityTwoFactor',
    preferedUserSendCodeTwoFactor:
      '/api/v2/user/find/preferedUserSendCodeTwoFactor/',
    validatePhone: '/api/v2/user/updatePhoneVerified/',
    findUserByPhone: '/api/v2/user/find/userByPhone/',
    findUserByEmail: '/api/v2/user/valid/email/',
    updateCreateQrGoogleAuth: '/api/v2/user/update/qrCreated',
    closeSession: '/api/v2/user/closeSession', //no se usa
    uptadeLastActivity: '/api/v2/user/updateLastActivity', // no se usa

    //Devices
    addDevice: '/api/v2/user/device/add',
    updateDevice: '/api/v2/user/device/update',
    deleteDevice: '/api/v2/user/update/device/delete',
  },
  // Api DollarBTC
  apiDollarBtcUrl: 'https://service8081.moneyclick.com',
  urlDollar: {
    getFinancialTypes: '/otcNew/getFinancialTypes/',
    getCryptoBuyAvailableTimestamp: '/mcUser/getCryptoBuyAvailableTimestamp/',
    getBalanceMovementsMaster: '/masterAccount/getBalanceMovements',
    getConfigMasterAccount: '/masterAccount/getConfig/',
    getOTCMasterAccountProfitsAndChargesBalance:
      '/masterAccountNew/getProfitsAndChargesBalance',
    getOTCMasterAccountBalances:
      '/masterAccountNew/getOTCMasterAccountBalances/',
    addReview: '/review/create',
    getReviews: '/review/getLasts/',
    getReviewPerOperation: '/review/get/',
    userList: '/user/list',
    //bankers
    addScrow: '/banker/addEscrow',
    removeScrow: '/banker/removeEscrow',
    getScrowBalance: '/banker/getEscrowBalance/',
    getScrowMovements: '/banker/getEscrowMovements/',
    specialOption: '/user/specialOption',
    getOperationsBankers: '/banker/getOperations',
    getCurrenciesBankers: '/banker/getCurrencies/', //se concatena el username
    removeCurrencyBankers: '/banker/removeCurrency/', // sele concatena el username y el currency
    getReferredUsers: '/banker/getReferredUsers/',
    getConfigBankers: '/banker/getConfig/', // sele concatena el username
    bankersList: '/banker/list/', //se le concatena el username
    addDollarBTCPaymentBankers: '/banker/addDollarBTCPayment', //post
    getDollarBTCPaymentBankers: '/banker/getDollarBTCPayments/',
    //	getPaymentsBankersDetail: "/banker/getDollarBTCPayments/",
    getDollarBTCPaymentsBankers: '/banker/getDollarBTCPayment/', //se concatena el username o el currency o ambos
    getDollarBTCPaymentBalanceBankers: '/banker/getDollarBTCPaymentBalance', //POST
    getDollarBTCPaymentBalancesBankers: '/banker/getDollarBTCPaymentBalances/', //se concatena el username o el currency o ambos
    getDollarBTCPaymentBalanceMovementsBankers:
      '/banker/getDollarBTCPaymentBalanceMovements', //POST
    editDollarBTCPaymentBankers: '/banker/editDollarBTCPayment', //POST
    addBalanceToDollarBTCPaymentBankers: '/banker/addBalanceToDollarBTCPayment', //POST
    substractBalanceToDollarBTCPaymentBankers:
      '/banker/substractBalanceToDollarBTCPayment', //POST
    getOperationsNewBankers: '/banker/getOperationsNew', //POST
    getOperationIndexesAndValuesBankers:
      '/banker/getOperationIndexesAndValues/', //se le debe concatenar el username
    transferBetweenDollarBTCPaymentsBankers:
      '/banker/transferBetweenDollarBTCPayments', //POST
    changeOperationStatusBanker: '/banker/changeOperationStatus',
    getOperationBankerId: '/banker/getOperation/', //se le concatena el username y el id de la operacion
    //User , // se debe concatenar el username a cada url al final
    buyBalanceGetDollarBTCPayments: '/buyBalance/getDollarBTCPayments/',
    createOperation: '/buyBalance/createOperation/',
    changeOperationStatus: '/buyBalance/changeOperationStatus',
    startVerification: '/user/startVerification',
    userBalance: '/user/getBalance/',
    getReducedOffers: '/website/getReducedOffers',
    getFullPriceInfo: '/analysis/getFullPriceInfo',
    userCreate: '/user/create',
    userActive: '/user/activate/',
    userConfig: '/user/getConfig/',
    deleteVerificationE: '/user/removeUserVerification/',
    salesBuyFromUser: '/user/getBalanceMovements',
    userMovements: '/user/getBalanceMovements', //ademas de colocar nombre de usuarios se debe concatenar periodos de fecha de inicio y fin en formato timestamp
    userBalanceOperation: '/user/balanceOperation',
    userMcBalanceOperation: '/mcUserNew/balanceOperation',
    addMarterWallaetId: '/user/addMasterWalletIds',
    getMarketPrice: '/user/getMarketPrice/', //añadir target currency y base currency
    getVerifications: '/user/getVerifications',
    cancelVerification: '/user/cancelVerification',
    changeProfile: '/user/changeProfile/', //cambiar perfil de usuario
    markMessageAsRead:
      '/user/markMessageAsReaded/' /** mark a message as read, add userName/id **/,
    userAddInfo: '/user/addInfo',
    userModifyInfo: '/user/modifyInfo',
    getConfigs: '/user/getConfigs',
    processVerification: '/user/processVerification',
    userToOperator: '/user/changeToAdmin/',
    addWallet: '/user/addWallet',
    processBalanceMovement: '/user/processBalanceMovement',
    getProcessingBalance: '/user/getProcessingBalanceMovements',
    removeVerificationUser: '/user/removeUserVerification',
    transferBTC: '/user/transferBTC',
    getUserVerificationFields: '/user/getUserVerificationFields/',
    getReceiveAuthorizacion: '/user/getReceiveAuthorizations/', // Se concatena con el username para consultar bono
    changeStatusReceiveAuthorization: '/user/changeReceiveAuthorizationStatus', //Cambiar estatus de bono
    getMessageReceive: '/user/getReceiveAuthorizationMessage/', //Obtener mensaje del bono
    getBalanceMovementsMoneyClick: '/mcUser/getBalanceMovements',
    sendMoneyClick: '/mcUser/send',
    getSendOperationType: '/user/getSendOpetarionType/',
    //-----------------------------------------------------------
    //mfa=======================================================
    createGASecretKey: '/mfa/createGASecretKey', //se concatena el correo del usuario dbtc, este crea el codigo a asociar a ese correo
    getGAQRCodeUrl: '/mfa/getGAQRCodeUrl/', // se concatena el correo del usuario dbtc para ke despues de asociar el correo este retorne el codigo deseado
    authCodeCore: '/mfa/verifyCode',
    sendAuthCodeCore: '/mfa/sendCode',
    verifyGACode: 'mfa/verifyGACode',

    //Models
    getInitialAmounts: '/model/getInitialAmounts/',
    //----------------------------------------------------------------
    //Mercado
    getOTCMasterAccountNames: '/masterAccountNew/getOTCMasterAccountNames/',
    getAutomaticChatMessages: '/otc/getAutomaticChatMessages/',
    getOperationCheckList: '/otc/getOperationCheckList/',
    getAutomaticChatMessages: '/otc/getAutomaticChatMessages/',
    getAllowedAddPayments: '/otc/getAllowedAddPayments/',
    getOffers: '/otc/getOffers',
    getPayments: '/otc/getPayments/',
    addPayment: '/otc/addPayment',
    getPaymentTypes: '/otc/getPaymentTypes/',
    getClientPaymentTypes: '/otc/getClientPaymentTypes/',
    getClientPayment: '/otc/getClientPayment/',
    getOperations: '/otc/getOperations/',
    getOperation: '/otc/getOperation/',
    getContactMessages: '/otc/getContactMessages/',
    modelOverview: '/account/overview/', //falta parametro nombre del modelo y periodo a consulta
    getCurrencies: '/otc/getCurrenciesWithCrypto',
    otcPostOperationMessage: '/otcPostOperationMessage',
    userAddAttachment: '/userAddAttachment',
    acceptOperationTermsAndConditions:
      '/otc/acceptOperationTermsAndConditions/',
    getPercentSymbol: '/website/getLocalbitcoinBuyPercent/',
    removePayment: '/otc/removePayment/',
    getCurrenciesUser: '/otcAdmin/getCurrencies/',
    sellBitcoinToOtcAccount: '/otcAdmin/sellFromDollarBTCPayment',
    buyBitcoinToOtcAccount: '/otcAdmin/buyFromDollarBTCPayment',
    editCurrenciesUser: '/otcAdmin/editCurrencies',
    getSpecialPayments: '/otcAdmin/getSpecialPayments/',
    getOperationsAdmin: '/otcAdmin/getOperations',
    getDollarBTCPayment: '/otc/getDollarBTCPayment/',
    getLimits: '/otc/getLimits',
    modifyOperationCheckList: '/otc/modifyOperationCheckList',
    getDollarBTCPaymentBalanceMovements:
      '/otc/getDollarBTCPaymentBalanceMovements',
    getDollarBTCPaymentBalance: '/otc/getDollarBTCPaymentBalance',
    getOfficessInfoByBank: '/otc/getOfficesInfo/',
    fastChangeFromBTC: '/otc/fastChangeFromBTC',
    fastChangeToBTC: '/otc/fastChangeToBTC',
    getOrdersCurrency: '/otc/getCurrenciesOrder/',
    getOperationIndexesAndValues: '/otc/getOperationIndexesAndValues',
    getOperationsFilterAdmin: '/otcAdmin/getOperationsNew',
    getPaymentsAdmin: '/otcAdmin/getDollarBTCPayments/',
    getNewCharges: '/otc/getChargesNew',
    //Modulator
    getAutomaticRules: '/marketModulator/getAutomaticRules',

    //External payments
    createExternalPayment: '/payment/create',
    getExternalPaymentMethod: '/payment/getBalance/',

    changeOperationStatusBuyBalance: '/buyBalance/changeOperationStatus',
    //service chat
    postMessage: '/chat/postMessage',
    getAllChatRooms: '/chat/list',
    markAdminMessagesAsReaded: '/chat/markAdminMessagesAsReaded/',
    //Moneyclick
    sendQR: '/mcRetail/requestId',
    getRetails: '/mcRetailNew/getRetails',
    addRetail: '/mcRetailNew/create',
    getBalanceRetail: '/mcRetailNew/getBalance/',
    getBalanceMovementsRetail: '/mcRetailNew/getBalanceMovements/',
    getInfoRetail: '/mcRetailNew/getRetail/',
    getOperationWithFilter: '/mcRetail/getOperations', // servicio nuevo de mc retail desde mc
    getBalanceMoneyclick: '/mcUser/getNewBalance/',
    addCurrencyOperationType: '/mcRetailNew/addCurrencyOperationType',
    addCurrencyBanker: '/banker/addCurrency/', //se concatena username y currency,
    removeCurrencyOperationType: '/mcRetailNew/removeCurrencyOperationType',
    changeStatusCreationRetail: '/mcRetailNew/changeCreateStatus',
    addAttachmentRetail: '/mcRetailAddAttachment',
    sendToPayment: '/mcUser/sendToPaymentNew',
    fastChange: '/mcUser/fastChange',
    getFactor: '/mcUser/getFastChangeFactor/',
    getCryptoPrice: '/mcUser/getCryptoPrice/',
    sellCrypto: '/mcUser/sellCrypto',
    buyCrypto: '/mcUser/buyCrypto',
    getAlerts: '/mcUser/getAlerts',
    getAchievements: '/website/getOverallAchievements',
    getAllNotificationByUser: '/notification/getMessages/',
    makeToReadNoti: '/notification/markMessageAsReaded/',
    //Security Questions
    getSecurityQuestionsByUser: '/user/getSegurityQuestions/', //Attach user and quantity
    validateSecurityAnswer: '/user/checkSecurityQuestions',
    getBalanceAdmin: '/admin/getBalance/',
    referralCodes: '/mcUser/getReferralCodes',
    //Atachement Services
    getAttachmentRetail: '/attachment/getRetailFile/', // se concatena id del retail mas nombre del file
    getAttachmentsUser: '/attachment/getUserFile/',
    getQrAttachmentGoogleAuth: '/attachment/getUserGAQRCode/', // se concatena el username
    getOtcOperationFile: '/attachment/getOTCOperationFile/', // se concatena  Otc Operation Id y nombre de Archivo
    //Gift Card
    applyGiftCard: '/giftCard/redeem',
    sendGiftCard: '/giftCard/send',
    activeGiftCard: '/giftCard/activate',
    listGiftCard: '/giftCard/list/',
    resendGiftCard: '/giftCard/resend',
    //Contact Us
    sendContactUs: '/mail/sendContact',
    /////////////////////
  },
  // Api BlockCypher
  apiBlockCypherUrl: 'https://api.blockcypher.com/v1',

  //API IpApi for geolocalization by IP
  apiIpApiUrl: 'https://ipapi.co/',
  webSocketsMarketOperations: 'wss://websocket.dollarbtc.com/marketOperation',
  webSocketsBalanceTheOperations: 'wss://websocket.dollarbtc.com/otcAdmin',
  webSocketsMC: urlWebSocket,
  webSocketsDBTC: urlWebSocket,
  //===
};
