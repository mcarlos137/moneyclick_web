import termsAndConditions from '../common/termsAndConditions';
import termsAndConditionsEng from '../common/termsAndConditionsEnglish';
import termsBuy from '../common/termsAndConditionsBuy';
import termsBuyEng from '../common/termsAndConditionsBuyEnglish';
import instructive from '../common/instructive';
import legal from '../common/legal';
import termEn from "../common/TermsAndConditionsMoneyClick";
import termEs from "../common/TermsAndConditionsMoneyClickEs";
export default {
  es: {
    app: {
      modalSession: {
        header: 'Notificación',
        content: {
          part1: 'Su sesión expira en ',
          part2: ' segundos, ¿desea continuar en el portal?',
        },
        buttonYes: 'Si',
      },
      modalSessionExpired: {
        header: 'Notificación',
        content: 'Su sesión ha expirado',
        buttonClose: 'Cerrar',
      },
    },
    commons: {
      avgSell: 'Venta promedio',
      avgBuy: 'Compra promedio',
    },
    nav: {
      add: 'Agregar',
      remove: 'Restar',
      addScrow: 'Agregar Saldo en Garantía',
      removeScrow: 'Restar Saldo en Garantía',
      createPaymentMethod: 'Crear Medio de Pago',
      scrow: 'Saldo en Garantía',
      buySellBTC: 'Compra / Venta (BTC)',
      profits: 'Ganancias',
      paymentMethod: 'Medio de Pago',
      paymentMethods: 'Medios de Pago',
      otcOperations: 'Operaciones OTC',
      otcOperationsTitle: 'Operaciones OTC',
      userData: 'Usuarios',
      consultPaymentMethod: 'Consultar Medios de Pago',
      consultBalance: 'Consultar Balance',
      login: 'INICIAR SESIÓN',
      administration: 'Banqueros',
      otcOperationsTitle: 'Operaciones OTC',
      nickname: 'Usuario',
      signup: 'REGISTRARSE',
      helpOut: 'AYUDA',
      signuphome: 'Registrarse',
      market: 'MERCADO: ',
      profile: 'Perfil',
      charges: 'Tarifas',
      transactions: 'Transacciones',
      fastChange: 'Cambio Rápido',
      sendmoneyclick: 'A Usuarios MoneyClick',
      send: 'Enviar / Transferir',
      send2: 'Enviar',
      withdraw: 'A Bancos ',
      payAtStore: 'Pagar en Comercios',
      sendCrypto: 'Enviar',
      receive: 'Recibir / Depositar',
      giftCard: 'Por Tarjetas de Recarga',
      moneyClickBanker: 'Por Banqueros MoneyClick',
      fromBanks: 'Por Bancos',
      chargeByMoneyClick: 'Cobrar por MoneyClick',
      receiveCrypto: 'Recibir',
      recharge: 'Recarga de Cupones',
      rechargeBalance: 'Depositar',
      help: 'Información',
      faqs: 'Preguntas Frecuentes',
      contactUs: 'Atención al Cliente',
      instructive: 'Instructivo de Uso',
      legal: 'Legal',
      logout: 'Cerrar Sesión',
      home: 'Inicio',
      inbox: 'Notificaciones',
      crypto: 'Crypto',
      buyBTC: 'Comprar',
      sellBTC: 'Vender',
      giftCardOption: 'Tarjeta de Recarga',
      lang: {
        es: 'Español',
        en: 'Inglés',
        resume: {
          es: 'Esp',
          en: 'Ing',
        },
      },
      support1: 'Atención Inmediata: ',
      support2:
        '¿Tienes preguntas?, podemos ayudarte. Tenemos nuevo horario de atención al cliente: ',
      support3: 'De lunes a domingo de 8am a 8pm hora New York.',
      language: 'Idioma',
    },
    home: {
      text1:
        'Un sistema de pago que permite realizar operaciones con monedas de diferentes países',
      text2: 'Deposita',
      text3: 'tu saldo MoneyClick!',
      text4:
        'Regístrate, deposita tu saldo y comienza a disfrutar del mejor sistema de pago',
      recharge: 'Depositar',
      textMessage1: 'Hola Jose, ',
      textMessage2:
        'tu depósito ha sido exitoso, para ver tu balance, dirígete a la app MoneyClick.',
      text5:
        'Es un sistema de pago que permite realizar operaciones con monedas de diferentes países.',
      //text6: "Es una app fácil de usar y podrás gestionar de manera confiable:",
      text6:
        'Podrás gestionar de manera confiable y sencilla operaciones con monedas de diferentes países:',
      item1:
        'Envío y recepción de pagos a través de códigos QR o SMS en cualquier parte del mundo.',
      item2:
        'Solicitar o requerir dinero, compartiendo tu código QR para el envío de dinero a tu cuenta en la moneda de tu preferencia.',
      item3:
        'Cambio rápido entre monedas de diferentes países, por ejemplo: VES - USD, USD - COP, entre otros.',
      buttonDownload: 'Descarga la app',
      text7:
        'Para satisfacer las necesidades de usuarios que operan con criptomonedas ofrecemos adicionalmente:',
      text8: '- Cambio rápido entre monedas país - BTC y viceversa.',
      text9:
        '- Manejo de Wallets en bitcoins para transferencias internas y externas.',
      text10:
        '- También, podrás configurar de manera automática los pagos recibidos en bitcoins en la moneda país de tu preferencia.',
      text11:
        'Además, si deseas utilizar MoneyClick como un sistema de pago adicional en tu negocio, puedes solicitar a través de la App convertir tu negocio en un Punto de Intercambio y personalizar los parámetros según tus necesidades. ',
      text12:
        'El sistema de pago permite compensar las operaciones con la plataforma dollarbtc.com y también el uso de sus servicios extendidos de inversión y pago.',
      text13: 'La app podrás descargarla completamente gratuita en:',
      text14: 'O si prefieres,',
      text16: ' regístrate ',
      text17: 'y realiza tus operaciones por la Web',
      text15: 'Descarga la App en tu versión favorita:',
      textDownload: 'Descarga MoneyClick',
      retailTitle: 'Puntos de Intercambio',
      achievement: {
        user: 'Usuarios',
        transactions: 'Operaciones',
        btc: 'Bitcoins Transados',
      },
      notificationEmailVerify: {
        content: 'ahora puede disfrutar de todos nuestros servicios',
        header: {
          line1: 'El correo',
          line2: ' ha sido verificado exitosamente,',
        },
      },
      homeReduced: {
        title: '¡Compra tus cupones MoneyClick!',
        text: 'Regístrate, compra tu cupón en la moneda país de tu preferencia y comienza a disfrutar del mejor sistema de pago.',
        available: 'Disponible en:',
        startButton: 'Comienza ahora',
      },
      fiatGaugeModal: {
        sell: 'Vender',
        buy: 'Comprar',
        table: {
          headers: {
            type: 'Tipo de operación',
            price: 'Precio',
            change6H: 'Cambio % 6H',
            change24H: 'Cambio % 24H',
          },
        },
        buttonClose: 'Cerrar',
      },
    },
    homeLoggedIn: {
      balanceGlobal: 'Balance Global Estimado',
      deferred: 'Diferido',
      balance: {
        load: 'Cargando...',
        title: 'Balance',
        text1: 'Monto Estimado en $: ',
      },
      welcome: 'Bienvenido(a) a la plataforma Web de MoneyClick ...',
      subWelcome:
        'Deposita tu saldo y comienza a disfrutar de todas nuestras opciones',
      item1:
        'Deposita saldo: completa los datos, realiza la transferencia, notifica tu pago y listo ... ¡ya tienes saldo MoneyClick!',
      item2:
        'Sin intermediarios: Cambio rápido entre monedas de diferentes países, por ejemplo: VES - USD, USD - COP, entre otros.',
      item3:
        'Afiliar cuentas bancarias propias y de terceros para realizar pagos, depósitos o transferencias en la moneda de tu preferencia.',
      text2: '¡Deposita ya!',
      text3: 'tu saldo MoneyClick',
      text4:
        'Regístrate, deposita tu saldo y comienza a disfrutar del mejor sistema de pago',
      recharge: 'Recarga de Cupones',
      rechargeBalance: 'Depositar',
      fastChange: 'Cambio Rápido',
      transactions: 'Transacciones',
      toPaymentMethods: 'Envíos a Medios de Pagos',
      textMessage1: 'Hola Jose, ',
      textMessage2:
        'tu depósito ha sido exitoso, para ver tu balance, dirígete a la app MoneyClick.',

      tableHeaders: {
        historical: 'Histórico',
        process: 'Punto de Intercambio',
        date: 'Fecha',
        operation: 'Tipo de Operación',
        amount: 'Monto',
        currency: 'Moneda',
        status: 'Estado',
        transactions: 'Transacciones',
        statusValues: {
          started: 'Iniciado',
          success: 'Exitosa',
          waitingPayment: 'Esperando por pago',
          canceled: 'Cancelada',
          paid: 'Pagado',
          claim: 'Reclamo',
          payVerification: 'Verificando pago',
          waitingPayVerification: 'Esperando Verificacion de pago',
          waitingToStart: 'Esperando para Iniciar',
          processing: 'En proceso',
        },
      },
      table: {
        previous: 'Anterior',
        next: 'Siguiente',
        loading: 'Cargando...',
        noData: 'No hay operaciones',
        page: 'Página',
        of: 'de',
        rows: 'filas',
        pageJump: 'ir a la página',
        rowsSelector: 'filas por página',
      },
      transactions: {
        detail: {
          statusOperation: {
            success: 'Finalizada',
            prosessing: 'En proceso',
            fail: 'Fallida',
          },
          labels: {
            gift_card_redeem_br: 'Aplicación de Gift Card bitcoinrecharge',
            gift_card_redeem: 'Aplicación de Gift Card',
            gift_card_id: 'Gift Card Id',
            edit: 'Editar',
            mc_buy_bitcoins: 'Compra de Bitcoins',
            mc_sell_bitcoins: 'Venta de Bitcoins',
            banker_remove_balance: 'Resta de Escrow',
            banker_add_balance: 'Recarga de Escrow',
            MCRechargeMessages: '	Mensajes en Recarga de Saldo MoneyClick',
            printing: 'Imprimir Comprobante',
            documentRegister: 'Registro de Documentos',
            validationRequirements: 'Validación de requerimientos',
            addDocument: 'Agregar Documento',
            editData: 'Editar Datos',
            addData: 'Agregar Datos',
            addNewData:
              '¿Desea agregar un nuevo dato o modificar alguno existente del usuario',
            editUser: 'Editar Usuario',
            deleteData: 'Eliminar Datos',
            mcIdentitySelfie: 'Selfie de identidad de verificación MoneyClick',
            mcIdentityImg: 'Imagen de identidad de verificación MoneyClick',
            insetTheDeleteDataUser:
              '	Indique los datos a eliminar de la verificación del usuario',
            deleteVerification: 'Eliminar verificación de Usuario',
            cancelConfirm:
              '¿Está seguro que la operación debe ser cancelada?, recuerde que no hay como deshacer esta acción.',
            whoseDataIs: 'cuyos datos son',
            acreditAccountType:
              'El pago será acreditado al medio de pago del tipo',
            clientAccount: 'Cuenta del cliente:',
            noInfoAccount: 'No hay información de la cuenta',
            areYouSure:
              '¿Estás seguro que deseas cambiar el estatus de la operación',
            oftheUser: 'perteneciente al usuario',
            whoseOperation: 'cuyo tipo de operación es',
            andCurrencyIs: 'y la moneda es',
            changestatus: 'Cambiar estatus de la operación',
            changeStatusButton: 'Cambiar Estatus',
            warningImportant: 'Aviso importante',
            status2: 'Estatus',
            create: 'Crear',
            buyMessages: 'Mensajes en Compras',
            useDefaultMessage: 'Usar mensaje por defecto',
            greenAlert: 'Alerta Verde',
            message: 'Mensaje',
            redAlert: 'Alerta Roja',
            blueAlert: 'Alerta azul',
            insertMessage: 'Ingrese el Mensaje',
            noDefaultMessages: 'No hay Mensajes por Defecto',
            defaultMessages: 'Mensajes por Defecto',
            typePaymentMethod: ' Tipo de Medio de Pago',
            fullScreen: 'Ver en Pantalla Completa',
            operationAccount: 'Cuenta de operación',
            addreses: 'Addresses anteriores',
            enviromentUser: 'Ambiente del Usuario',
            userData: 'Datos del Usuario',
            personalData: 'Datos Personales',
            newMessage: 'Nuevo Mensaje',
            includeMessage: 'Incluir Mensaje',
            language: 'Idioma',
            typeMessages: 'Tipos de Mensajes',
            instructionMessages: '	Mensajes de instrucción',
            salesMessages: 'Mensajes en venta',
            alertMessages: 'Mensajes de alerta',
            alertMessageRecharge: 'Mensajes de alerta de Recarga de saldo',
            requiredJoinField:
              'Permite solo el mismo valor del campo agrupador (Compra)',
            requiredPaymentMethod: 'Requiere medio de pago de cliente (Compra)',
            addtypepayment: 'Agregar Tipo de Pago',
            windowPayment: 'Ventana de Pago',
            typepayment: 'Tipo de Pago',
            edittypepayment: 'Editar Tipo de Pago',
            accountToTransfer: 'Cuenta a Transferir',
            addSubs: 'Adicionar/Restar',
            addSubsBalance: 'Adicionar/Restar saldo',
            cancel: 'Cancelar',
            search: 'Buscar',
            reset: 'Reiniciar',
            currency: 'Moneda:',
            currency2: 'Moneda',
            select: 'Seleccione',
            otcAccount: 'Cuenta OTC',
            paymentMethodtoConsult: 'Medio de Pago a Consultar',
            operationToConsult: 'Operación a Consultar',
            statusToConsult: 'Estatus a Consultar',
            initAmount: 'Monto inicial:',
            endAmount: 'Monto final:',
            initDate: 'Fecha inicial:',
            endDate: 'Fecha final:',
            filteredOptions: 'Filtrar por:',
            status: 'Esta operación se encuentra',
            date: 'Fecha:',
            initial_movement: ' Depósito inicial',
            initial_deposit: 'Depósito inicial',
            currencytoConsult: 'Moneda a Consultar',
            notStatus: 'Operación',
            amount: 'Monto:',
            amount2: 'Monto',
            emit: 'Emisor:',
            sendTo: 'Enviado a:',
            to: 'Para',
            description: 'Descripción',
            otcOperacion: 'Id de Operación:',
            sendToPayment: 'Medio de pago:',
            rollback: 'Reintegro',
            walletTarget: 'Cartera destino:',
            retailId: 'Retail',
            addAmount: 'Pago recibido',
            price: 'Precio',
            securityCode: 'PIN de Seguridad:',
            securityImage: 'Imagen de Seguridad',
            search: 'Buscar',
            type: 'Tipo de operación:',
            type2: 'Tipo',
            send_sms: 'Envío a MoneyClick',
            send_to_payment: 'Transferencia a banco',
            debit: 'Débito',
            credit: 'Abono',
            send: 'Envío a tercero',
            receive: 'Recibir MoneyClick',
            mc_fast_change: 'Cambio rápido',
            change_from: 'Cambio de ',
            send_national_sms: 'Envío Nacional MoneyClick',
            mc_send_sms_national: 'Envío Nacional MoneyClick',
            send_international_sms: 'Envío Internacional MoneyClick',
            transfer_mc_dbtc: 'Transferencia de saldo MoneyClick a dollarBTC',
            transfer_from_mcbalance_to_balance:
              'Transferencia de saldo MoneyClick a dollarBTC',
            transfer_from_balance_to_mcbalance:
              'Transferencia de saldo dollarBTC a MoneyClick',
            currency_change: 'Cambio de moneda',
            transfer_dbtc_mc: 'Transferencia de saldo dollarBTC a MoneyClick',
            send_out: 'Envío a wallet externa',
            mc_retail_buy: 'Compra de saldo en Punto de Intercambio',
            mc_retail_sell: 'Venta de saldo en Punto de Intercambio',
            mc_retail_buy_balance: 'Compra de saldo en Punto de Intercambio',
            mc_retail_sell_balance: 'Venta de saldo en Punto de Intercambio',
            BUY_BALANCE: 'Compra de saldo en Punto de Intercambio',
            buy_balance: 'Compra de saldo en Punto de Intercambio',
            mc_buy_balance: 'Depósito', //en Punto de Intercambio
            mc_sell_balance: 'Venta de saldo en Punto de Intercambio',
            SELL_BALANCE: 'Venta de saldo en Punto de Intercambio',
            SELL: 'VENTA',
            BUY: 'COMPRA',
            MC_BUY_BALANCE: 'DEPÓSITO',
            SEND_TO_PAYMENT: 'TRANSFERENCIA A BANCO',
            WAITING_FOR_PAYMENT: 'ESPERANDO POR PAGO',
            CANCELED: 'CANCELADA',
            SUCCESS: 'EXITOSA',
            CLAIM: 'RECLAMO',
            PAY_VERIFICATION: 'VERIFICANDO PAGO',
            WAITING_TO_START_OPERATION: 'ESPERANDO PARA INICIAR OPERACIÓN',
            TARGET_ADDRESS: 'Dirección destino:',
            RECEIVED_FROM_OUTSIDE_WALLET: 'Recibido desde wallet externa',
            canceledReason: 'Motivo',
            receive_in: 'Recibir',
            receive_out: 'Recibido desde wallet externa',
            mc_send_sms_international: 'Envío Internacional MoneyClick',
            send_in: 'Envío a wallet',
            mc_add_escrow: 'Depósito de Garantía',
            added_to_retail_escrow:
              'Agregado al depósito de garantía en el Punto de Intercambio: ',
            gift_card: 'Tarjeta de Recarga',
            gift_card_redeem: 'Tarjeta de Recarga aplicada',
            money_order: 'Orden de Dinero por Correo',
            sell_gift_card_commission:
              'Comisión por Venta de Tarjeta de Recarga',
            money_order_send: 'Envío de Orden de Dinero',
            gift_card_activation: 'Activación de Tarjeta de Recarga',
            userToConsult: 'Usuario a consultar',
            errorInactivateUser:
              'No se pudo inactivar el usuario en este momento',
            successInactivateUser: 'El usuario ha sido inactivado exitosamente',
            errorActivateUser: 'No se pudo activar el usuario en este momento',
            successActivateUser: 'El usuario ha sido activado exitosamente',
            errordeleteUser: 'No se pudo eliminar el usuario en este momento',
            successdeleteUser: 'Usuario ha sido eliminado exitosamente ',
            userEliminated: 'Usuario Eliminado',
            userInactivated: 'Usuario Inactivado',
            userActivated: 'Usuario Activado',
            profileToConsult: 'Perfil a consultar',
            availableAmounts: 'Montos Disponibles',
            profileValuesEmpty: 'Este perfil no posee valores disponibles',
            usersBelongs: 'Usuarios pertenecientes a este perfil',
            profileEmpty: 'Este perfil no posee usuarios',
            mc_message_offer_change: 'Mensaje de Cambio de Oferta',
            REFUND_OF_UNTRADED_AMOUNT_CHAT_P2P_OFFER:
              'Reembolso de cantidad no comercializada oferta de Money Market',
            AMOUNT_BLOCKED_BY_CHAT_P2P_OFFER:
              'Monto Bloqueado por la Oferta de Money Market',
            mc_buy_crypto: 'Comprar Crypto',
            mc_sell_crypto: 'Vender Crypto',
          },
          sendToPayment: {
            currency: 'Moneda:',
            user: 'Usuario:',
            userName: 'Usuario:',
            bank: 'Banco:',
            accountNumber: 'Nº de cuenta:',
            userHolderName: 'Nombre del Titular:',
            accountHolderName: 'Nombre del Titular:',
            accountHolderEmail: 'Email del Titular',
            accountInterbankCode: 'Código interbancario',
            accountHolderNumber: 'Nro. de cuenta del titular: ',
            accountHolderPhone: 'Teléfono del titular:',
            accountAddress: 'Dirección de la cuenta:',
            accountZip: 'Código postal:',
            bankRoutingNumber: 'N° routing bancario:',
            bankSwiftCode: 'Código de swift bancario:',
            zelle: 'Zelle:',
            typePayment: 'Tipo de Pago:',
            amount: 'Monto:',
            comission: 'Comisión:',
            description: 'Descripción:',
            canceledReason: 'Motivo:',
          },

          retail: {
            title: 'Opciones de QR',
            howAction: '¿Que deseas hacer?',
            actionEfective: 'Avance de efectivo',
            actionRetail: 'Comprar Bitcoins',
            buyOrSellBalanceRetails: {
              operations: {
                buy_balance: 'Comprar Saldo',
                sell_balance: 'Vender Saldo',
              },
              navTitle: 'Comprar Bitcoins',
              title: 'Comprar Bitcoins',
              message: 'Ubicación actual',
              buy_balance: 'Comprar Saldo',
              sell_balance: 'Vender Saldo',
              dialog: {
                edit: 'Editar',
                Delete: 'Eliminar',
                add: 'Agregar',
                cancel: 'Cancelar',
                desire: '¿Desea',
                optionForFunction: 'esta opcion para la funcion',
                minimum: 'Mínimo por operación',
                maximum: 'Máximo por operación',
                remember:
                  'Recuerde, está apunto de editar, el medio de pago cuyo id es',
                rememberaddsubs:
                  'Recuerde, está apunto de adicionar/restar saldo, al medio de pago cuyo id es',
                ofTheCurrency: 'de la moneda',
                ofThePayment: 'y del medio',
                andTheData: 'y con los siguientes datos',
                editPaymentMethod: 'Editar Medio de Pago',
                debit: 'Debitar',
                acredit: 'acreditar',
                addTypePayments: 'Agregar tipo de pago',
                typePaymentMethod: 'Tipos de Medios de Pago',
                sendMoneyParams: 'Parámetros para ENVÍOS DE DINERO',
                placeHolderDescription: 'Descripción',
                errorRetailValid: 'Punto de Intercambio Invalido',
                errorAmountEmpty: 'El monto es requerido',
                errorAmountLimit:
                  'El monto debe estar entre los límites establecidos',
                actionCashAdvance: 'Solicitar avance',
                succesSellBalanceRetail:
                  'Su solicitud ha sido enviada exitosamente. Tiene 60 minutos para retirar el efectivo en el comercio seleccionado o su operación será cancelada automáticamente.',
                errorResponseLimitBalance:
                  'La operación sobrepasa el límite máximo permitido del fondo de garantía',
                errorResponseCurrencyNotAllowed: 'Moneda no permitida',
                errorUserDailyLimit:
                  'Límite máximo alzado. Si deseas realizar la operación por un límite mayor, comunícate a nuestro centro de soporte al cliente.',
                errorResponseBalance: 'Saldo insuficiente',
                errorAvailableAmount: 'El monto excede al disponible',
                errorFailTransaction:
                  'No se pudo completar la operación. Intente más tarde',
                minAmount: 'Monto mínimo de operación: ',
                maxAmount: 'Monto máximo de operación: ',
                errorMessageAmount: 'Monto no disponible',
                paramsRecharge: ' Parámetros para RECARGA DE SALDO',
                errorMessageMaxAmount:
                  'El monto debe ser menor al máximo por operación',
                errorNotofer:
                  'Disculpe actualmente el Punto de Intercambio no posee ofertas',
                errorMessageMinAmount:
                  'El monto debe ser mayor al mínimo por operación',
                succesBuyBalanceRetail:
                  'Su solicitud ha sido enviada exitosamente. Tiene 60 minutos para completar su pago en el comercio seleccionado o su operación será cancelada automáticamente.',
                errorRequest: 'Ocurrio un error intente más tarde',
                confirmSend: 'Comprar bitcoins',
                closeDialog: 'Cerrar',
                amountChange: 'Monto en ',
                placeHolderAmount: 'Monto a solicitar',
                errorNotBalanceRetail:
                  'En este momento el Punto de Intercambio no puede procesar su solicitud. Intente con otro Punto de Intercambio cercano a su ubicación',
                changePrice: 'El precio de compra ha cambiado,',
                changePrice2: '¿desea continuar?',
                operation: 'Operación',
                openNoRetails:
                  'Disculpe, no hay Puntos MoneyClick disponibles en este momento...',
                retailWithoutBalance:
                  'Disculpe, actualmente el Punto de Intercambio no puede procesar la operación',
              },
            },
          },
        },
        messageDate: 'La fecha inicial debe ser menor a la fecha final',
        messageDateempty: 'falta un elemento de fecha para la consulta',
        balancepaymentMethod: 'Balance en los Medios de Pago',
        totalConsultBalance: 'Total de las Cuentas Consultadas',
      },
    },
    homeNew: {
      title: '¡MoneyClick, Dinero en segundos!',
      text1:
        'Digitaliza tu dinero, paga, cambia, envía y recibe instantáneamente en cualquier lugar del mundo con la seguridad de que tus pagos están garantizados tanto en dólares como en BTC, a través de la cuenta multi-divisa más versátil del mercado',
      text2: 'Deposita saldo MoneyClick desde:',
      text3:
        'Puedes descargar MoneyClick completamente gratis en Google Play o App Store o si prefieres, regístrate y realiza tus operaciones por la Web',
      text4: 'La cuenta multi-divisas más versátil en el mercado',
      fastChange: {
        currency: 'MONEDA',
        buy: 'COMPRA',
        sell: 'VENTA',
        variation: 'VARIACIÓN 24h',
      },
      chatP2P: 'Versión beta',
      app: 'P2P MoneyClick',
    },
    login: {
      header: 'Iniciar sesión',
      country: 'Código país',
      phone: 'Teléfono móvil',
      email: 'Correo',
      password: 'Contraseña',
      forgotPassword: '¿Se te olvidó tu contraseña?',
      registration: 'Regístrate ahora',
      passwordrepeat: 'Repetir Contraseña',
      loading: 'Cargando...',
      captcha: 'Por favor, demuestre que usted es humano',
      errors: {
        credentials: {
          header: 'Error en las credenciales',
          content: 'Su usuario no ha podido ser autenticado.',
        },
        errorCaptcha:
          'Ha ocurrido un error inesperado. Por favor, intente más tarde.',
        errorProTrader: 'Su usuario es PRO_TRADER debe ingresar en:',
        errorUserNoRegister: 'Usuario no registrado',
        errorCaptcha2: 'No verifico si es humano',
        errorRequired: 'Este campo es requerido',
        errorCaptcha3: ' El usuario no está registrado o no está activo',
        deviceInUser: 'Este dispositivo ya está agregado',
        userNotFound: 'No se encuentra el usuario asociado a este dispositivo',
        unexpectedError: 'Ha ocurrido error inesperado. Intente más tarde',
        notContent: '',
        deviceNotAllowedByUser:
          'No se ha autorizado este navegador. No puede iniciar sesión',
      },
      modalUpdateDevice: {
        header: 'Control de dispositivos',
        contentUpdate:
          'El navegador desde el cual intenta acceder se encuentra inactivo. ¿Desea activarlo ahora? ',
        contentAdd:
          'Está intentando acceder desde un dispositivo que no usa frecuentemente. Recomendamos, sólo utilizar dispositivos confiables y de uso personal. ¿Desea acceder de todos modos?',
        buttonYes: 'Si',
        buttonNo: 'No',
        loading: 'Cargando...',
      },
      successUpdating: {
        updateDevice: 'Este navegador ha sido reactivado exitosamente',
        addDevice: 'Este navegador ha sido agregado exitosamente',
      },
    },
    profile: {
      newValue: 'Nuevo Valor',
      value: 'Valor',
      firstPet: 'Primera Mascota',
      emptyMessage: '',
      menu: {
        myInfo: 'Tus Datos',
        paymentMethods: 'Bancos',
        accountSecurity: 'Cuenta',
        logout: 'Cerrar sesión',
      },
      optionDetail: {
        sexList: {
          male: 'Masculino',
          female: 'Femenino',
        },
        documentType: {
          identificationCard: 'Cédula',
          passport: 'Pasaporte',
          other: 'Otro',
        },
        docsImages: {
          identity: 'Cédula de identidad',
          bank: 'Documento de cuenta bancario',
          location: 'Documento de dirección',
          selfie: 'Selfie con documento de identidad',
          selfieOfVerification: 'Selfie de Verificación',
          verificationMC: 'Documento de Verificación',
          profileImage: 'Imagen de Perfil',
        },
        messages: {
          modalMessage:
            'Hemos enviado un código de verificación a tu teléfono móvil registrado. Ingresa el código para completar la verificación.',
          phoneVerified: 'Su teléfono ha sido verificado satisfactoriamente',
          phoneVerificationFail:
            'Su teléfono no ha podido ser verificado. Intente de nuevo o chequee su número de telefóno móvil.',
          emptyField: 'Disculpe debe ingresar un dato en el campo',
          nicknameCreated:
            'Tu nombre de usuario ha sido creado satisfactoriamente',
          duplicatedNickname: 'Este nombre de usuario ya existe',
          errorServer: 'Error en el servidor',
          requiredField: 'El campo es requerido',
          emailVerification:
            'Hemos enviado un email a tu dirección de correo electrónico para verificar tu correo',
          close: 'Cerrar',
          errorInRed: 'Verifique su conexión a internet e intente de nuevo',
          successElimination: 'Eliminacion exitosa',
          userDetail: 'Detalle de Usuario',
          companyData: 'Datos de la Empresa',
          companyName: 'Nombre de la Empresa',
          yourData: 'Tus Datos',
          emptyMessage: 'No hay un mensaje para mostrar',
        },
        nickname: {
          value: 'Nombre de usuario',
          create: 'Crear',
          popup: 'Crear nombre de usuario',
        },
        stepUser: {
          aditionalData: 'Datos Adicionales',
          user: 'Usuario',
          from: 'De',
          popup:
            'Por verificar. Inicie el proceso a través de la opción Actualizar datos',
          notInit: 'Sin iniciar',
          contactUs: 'Contáctenos',
          fail: 'Fallido, Contáctenos',
        },
        stepPhone: {
          verified: 'Verificado',
          phone: 'Teléfono',
          popup: 'Por verificar. Agregue su teléfono móvil',
          buttonVerify: 'Verificar Teléfono',
          notVerify: 'Sin verificar',
          byVerify: 'Por verificar',
          verify: 'Verificar',
          buttonCancel: 'Cancelar',
          buttonClose: 'Cerrar',
        },
        stepEmail: {
          email: 'Correo',
          verified: 'Verificado',
          buttonVerify: 'Verificar',
          notVerify: 'Sin verificar',
          popup: 'Por verificar. Revise su correo',
        },
        stage: {
          verified: 'Verificado',
          processing: 'En proceso',
          fail: 'Fallida',
        },
        loading: 'Cargando...',
        fields: {
          name: 'Nombre',
          lastName: 'Apellido',
          email: 'Correo',
          phone: 'Teléfono móvil',
          id: 'Documento de identidad',
          number: 'N° de documento',
          sex: 'Sexo',
          birthday: 'Fecha de nacimiento',
          cityOfBirth: 'Ciudad de nacimiento',
          countryOfBirth: 'País de nacimiento',
          birthplace: 'Ciudad de nacimiento',
          familyContact: 'Familiar de contacto',
          emailContact: 'Email de familiar contacto',
          securityQuestion: 'Pregunta de seguridad',
          securityAnswer: 'Respuesta de seguridad',
          localbitcoinUser: 'Usuario de Localbitcoin',
          userFacebook: 'Usuario de Facebook',
          companyName: 'Nombre de la empresa',
          documentTypeFiscalRecord: 'Documento de registro fiscal',
          numberFiscalRecord: 'N° de registro',
          registrationYear: 'Año de registro',
          companyAddress: 'Dirección de la empresa',
          address: 'Dirección',
          documents: 'Documentos',
          userType: 'Tipo de Usuario',
          statusUser: 'Estatus del usuario',
          professionalProfile: 'Descripción de su perfil profesional',
          webPage: 'Página Web',
          instagram: 'Instagram',
          profilePicture: 'Foto de perfil',
        },
        buttonUpdate: 'Actualizar datos',
        modalVerification: {
          header: 'Verificación',
          labelCode: 'Código',
        },
        modalNickname: {
          header: 'Nombre de usuario',
          subHeader: 'Crea tu nombre de usuario',
          labelNickname: 'Nombre de usuario',
          buttonCancel: 'Cancelar',
          buttonSave: 'Guardar',
          buttonClose: 'Cerrar',
        },
      },
      addAccount: {
        specificBank: 'Desde el Mismo Banco',
        MOBILE_PAYMENT: 'Pago Móvil',
        thirdBank: 'Desde otro Banco',
        wire: 'Wire (Transferencia Bancaria)',
        international: 'Banco Internacional (Swift o Aba)',
        cryptoWallet: 'Transferencia a Crypto Wallet',
        checkDeposit: 'Depósito en Cheque',
        ach: '3 días hábiles',
        ach_express: 'Mismo día (+35$)',
        ACH_THIRD_ACCOUNT: '3 días hábiles',
        ACH_THIRD_ACCOUNT_EXPRESS: 'Mismo día (+35$)',
        cashDeposit: 'Depósito en Efectivo',
        transfer: 'Transferencia Bancaria',
        electronicTrans: 'Transferencia Electrónica',
        creditCard: 'Tarjeta de crédito',
        personalCheckDeposit: 'Cheque Personal',
        cashierCheckDeposit: 'Cheque de Gerencia',
        moneyOrder: 'Orden de Dinero',

        messages: {
          addAccountSuccess: 'Su Banco ha sido agregado satisfactoriamente',
          addAccountSuccess2: 'Su Banco ha sido creado satisfactoriamente',
          errorServer:
            'Disculpe ha ocurrido un error en el servidor intente mas tarde',
          errorEmailReceiverEmpty: 'El email no puede estar vacío',
          errorEmailReceiverWrong: 'Debe ser un email válido',
          errorExternalPaymentCreate:
            'No se pudo crear el Banco por error del sistema',
          errorExistExternalPayment:
            'No se pudo crear el Banco porque ya existe',
          recomended: ' ** Bancos recomendados para transacciones inmediatas',
        },
        addPaymentMethod: 'Agregar Banco',
        placeholderCoin: 'Seleccione una moneda',
        placeholderMethodPayment: 'Seleccione un Banco',
        buttonAdd: 'Agregar',
        buttonBack: 'Regresar',
        emailReceiver: 'Email del destinatario',
        placeholderEmailReceiver: 'ejemplo@mail.com',
      },
      addOwnAccount: {
        messages: {
          addPaymentMethod:
            ' Atención: Los bancos propios deben ser verificados. Por favor, manténgase en línea y siga las instrucciones de uno de nuestros moderadores.',
          statusAFail: {
            part1:
              'Para agregar bancos propios es necesario que verifique su correo electrónico. Hemos enviado un email a',
            part2:
              ', por favor revisa tu correo electrónico y sigue las instrucciones.',
          },
          statusBFail:
            'Para agregar bancos propios es necesario que verifique su número de teléfono móvil, puedes hacerlo a través de la opción tus datos.',
          statusCUninitiated:
            'Para agregar bancos propios es necesario que verifique su usuario, puedes iniciar este proceso a través de la opcion actualizar datos en la opción tus datos.',
          statusCProcessing:
            'Para agregar bancos propios es necesario que verifique su usuario, este proceso ya ha sido iniciado.',
          statusCFail: {
            part1:
              'Para agregar bancos propios es necesario que verifique su usuario, su usuario no ha podido ser verificado.',
            contactUs: 'Contáctenos',
          },
          recomended: ' ** Bancos recomendados para transacciones inmediatas',
        },
      },
      listAccountOther: {
        currentTableHeaders: {
          coin: 'Moneda',
          type: 'Tipo',
          data: 'Datos',
          action: 'Acción',
        },
        buttonDelete: 'Eliminar',
        errorInRed: 'Verifique su conexión a internet a intente de nuevo',
        currentTable: {
          previous: 'Anterior',
          next: 'Siguiente',
          loading: 'Cargando...',
          noData: 'No hay bancos registrados',
          page: 'Página',
          of: 'de',
          rows: 'filas',
          pageJump: 'ir a la página',
          rowsSelector: 'filas por página',
        },
        buttonAdd: 'Agregar',
        modalVerification: {
          header: 'Verificación',
          question: '¿Seguro que desea eliminar los datos de la cuenta?',
          buttonDelete: 'Eliminar',
          buttonCancel: 'Cancelar',
          buttonClose: 'Cerrar',
        },
        modalResponse: {
          successMessage: 'Su solicitud se ha procesado con éxito',
          failMessage: 'Su solicitud no se ha podido procesar en este momento',
          buttonClose: 'Cerrar',
        },
      },
      optionCurrent: {
        paymentMethods: 'Bancos',
        menu: {
          wallet: 'Wallet',
          holder: 'Propios',
          other: 'Terceros',
        },
        menuMobile: {
          wallet: 'Wallet',
          holder: 'Propios',
          other: 'Terceros',
        },
      },
      optionSecurity: {
        activeTwoFactor1:
          'Seleccione una opción para proceder con su activación,recuerde que para iniciar\n' +
          ' sesión luego de habilitar esta opción no será requerido durante un período menor a una hora desde su\n' +
          ' última conexión, en caso contrario se le solicitará un nuevo código para ingresar ¿Estás seguro que deseas activar la autenticación de dos pasos? ',
        activeTwoFactorGA:
          'El código proporcionado por la app de Google Autenticator sera utilizado \n' +
          ' para iniciar sesión luego de habilitar esta opción, tenga en cuenta el \n' +
          'vencimiento de cada código , este tiene un lapso de validez de un minuto, \n' +
          'luego de eso se le solicitará un nuevo código para ingresar ¿Estás seguro \n' +
          'que deseas activar la autenticación de dos pasos?',
        activeTwoFactor:
          'El código enviado a su teléfono utilizado para iniciar sesión luego de habilitar esta opción no será requerido durante un período menor a una hora desde su última conexión, en caso contrario se le solicitará un nuevo código para ingresar ¿Estás seguro que deseas activar la autenticación de dos pasos?',
        inactivateTwoFactor:
          '¿Estas seguro que deseas inhabilitar la autenticación de dos pasos?',
        errors: {
          failUpdate:
            'Disculpe no hemos podido realizar su solicitud intente mas tarde',
        },
        successUpdate: 'Tus datos han sido actualizados satisfactoriamente',
        buttonYes: 'Si',
        buttonNo: 'No',
        buttonAccept: 'Aceptar',
        buttonResent: 'Reenviar',
        buttonClose: 'Cerrar',
        buttonDisabled2FA: 'Inhabilitar dos pasos',
        popUpActivated: 'Activada',
        buttonCreate: 'Crear',
        buttonVerify: 'Verificar',
        popUpInactivated:
          'No está activada, para activar esta opción su número de teléfono debe estar verificado, debe configurar su correo electrónico y verificarlo, además debe configurar una pregunta y respuesta de seguridad, si ya lo hizo puede activarla',
        buttonEnabled2FA: 'Activar dos pasos',
        percents: {
          low: 'Bajo',
          middle: 'Medio',
          high: 'Alto',
        },
        header: 'Seguridad de tu cuenta',
        progress: 'El nivel de seguridad de tu cuenta es:',
        verify: 'Verificación',
        list: {
          header: 'Configure las distintas opciones que posee:',
          options: {
            changePassword: 'Cambio de contraseña',
            recommendation:
              'Es recomendable cambiar tu contraseña con regularidad para mantener tu cuenta más segura',
            twoFA: 'Autenticación de dos pasos',
            labelSmsorEmail: 'Envío de Código',
            SendSmsorEmail: 'Envío de código para operaciones',
            prefered2F: 'autenticacion de 2 pasos via',
          },
        },
        buttonChangePassword: 'Cambiar contraseña',
        twoFactorOptions: {
          preferedTwoFactorRequest: {
            sms: 'SMS',
            google: 'Google Authenticator',
          },
        },
        secureCodeProcessRequest: {
          prefered: {
            email: 'Correo electrónico',
            sms: 'SMS',
          },
        },
        unaddedPhone:
          'Disculpe, debe poseer un número de teléfono verificado para seleccionar esta opción',
        unaddedEmail:
          'Disculpe, debe poseer un correo electrónico verificado para seleccionar esta opción',
      },
      updatePasswordUser: {
        errors: {
          wrongData: 'Debe ingresar los datos correctamente',
          server:
            'Disculpe ha ocurrido un error en el servidor, intente más tarde',
          genericError: 'Ha ocurrido un error, intente más tarde',
          wrongToken:
            'El código que ha ingresado es incorrecto intente de nuevo',
          wrongPassword: 'La contraseña es incorrecta',
          minimalChar: 'La contraseña debe tener un mínimo de 4 caracteres',
          notMatch: 'Las contraseñas no coinciden',
          emptyToken: 'Debe ingresar el token para confirmar',
        },
        modalMessage:
          'Hemos enviado un código de verificación a tu teléfono móvil registrado. Ingresa el código para completar la verificación. ',
        successPasswordUpdate: 'Tu contraseña ha sido cambiada exitosamente',
        changePassword: 'Cambio de contraseña',
        currentPassword: 'Contraseña actual',
        newPassword: 'Nueva Contraseña',
        code: 'Código',
        placeholderNewPassword: 'Debe poseer mínimo 4 caracteres',
        repeatPassword: 'Repetir Contraseña',
        buttonSend: 'Enviar',
        buttonCancel: 'Cancelar',
        buttonClose: 'Cerrar',
        buttonVerify: 'Verificar',
        buttonResend: 'Reenviar',
        verify: 'Verificación',
      },
      updateProfile: {
        sexList: {
          male: 'Masculino',
          female: 'Femenino',
        },
        documentType: {
          id: 'ID',
          dni: 'DNI',
          identificationCard: 'Cedula',
          passport: 'Pasaporte',
          other: 'Otro',
        },
        errors: {
          errorFileProfile:
            'Disculpe la imagen no ha sido actualizada correctamente',
          repeatedPhone: 'Disculpe el número telefónico ya esta en uso',
          repeatedEmail: 'Disculpe el correo eléctronico ya está en uso',
          errorServer: 'Disculpe ha ocurrido un error en el servicio',
          emptyPhone:
            'Disculpe debe ingresar el número teléfonico si ha selecionado un código de area',
          longPhone:
            'Disculpe el numero telefónico debe incluir 7 digitos o mas ',
          emptyFields:
            'Disculpe debe por lo menos incluir su número telefónico para actualizar sus datos ',
          emptyFiscalRecord:
            'Disculpe debe incluir el número de registro fiscal del país donde se encuentra la empresa',
          emptyFiscalRecordType:
            'Disculpe debe incluir el tipo de registro fiscal del país donde se encuentra la empresa',
          emptyFiscalRecordYear: 'Disculpe debe incluir el año de registro',
          emptyFiscalRecordName:
            'Disculpe debe incluir el nombre de la empresa',
          emptySecurityAnswer:
            'Disculpe debe incluir la respuesta de seguridad',
          emptySecurityDirection: 'Disculpe debe incluir una dirección',
          emptySecurityQuestion:
            'Disculpe debe incluir la pregunta de seguridad',
          emptyBirthplace: 'Disculpe debe incluir la ciudad de nacimiento',
          emptyBirthday: 'Disculpe debe incluir su fecha de nacimiento',
          emptyIDNumber:
            'Disculpe debe incluir el numero de documento de identidad',
          emptyIDNumberType:
            'Disculpe debe incluir el tipo de documento de identidad',
          emptyLastName: 'Disculpe debe incluir su apellido',
          emptyName: 'Disculpe debe incluir su nombre',
          emptySelfie: 'Disculpe debe incluir la selfie',
          emptyAddress: 'Disculpe debe incluir el comprobante de dirección',
          emptyBank: 'Disculpe debe incluir el comprobante de cuenta bancaria',
          emptyID: 'Disculpe debe incluir el archivo de identificación',
          fileNotSupported: 'Tipo de archivo no soportado',
          fileSize: 'Tamaño de archivo excede el permitido',
          fieldEmpty:
            'Disculpe, los campos necesarios no están completos para la verificación',
        },
        successUpdate: 'Sus datos han sido actualizados satisfactoriamente',
        successSentData: 'Sus datos han sido enviados satisfactoriamente.',
        header: 'Actualizar Datos',
        form: {
          name: 'Nombres',
          placeholderName: 'Ingrese nombres',
          lastName: 'Apellidos',
          placeholderLastName: 'Ingrese apellidos',
          sex: 'Sexo',
          placeholderSex: 'Seleccione...',
          documentType: 'Tipo de documento',
          placeholderDocumentType: 'Seleccione...',
          other: 'Especifique',
          numberId: 'N° de documento',
          birthday: 'Fecha de nacimiento',
          countryOfBirth: 'País de nacimiento',
          cityOfBirth: 'Ciudad de nacimiento',
          birthplace: 'Ciudad de nacimiento',
          country: 'Código de país',
          placeholderCountry: 'Seleccione un país...',
          phone: 'Teléfono móvil',
          placeholderPhone: 'Ejemplo 1234567',
          securityQuestion: 'Pregunta de seguridad',
          securityAnswer: 'Respuesta de seguridad',
          contactFamily: 'Familiar de contacto',
          contactCompany: 'Persona de contacto',
          placeholderContact: 'Nombre del familiar',
          contactEmailFamily: 'Email de familiar contacto',
          contactEmailCompany: 'Correo electrónico de contacto ',
          localbitcoinUser: 'Usuario de Localbitcoin',
          facebookUser: 'Usuario Facebook',
          addressPersonal: 'Dirección',
          addressCompany: 'Dirección de la empresa',
          professionalProfile: 'Descripción de su perfil profesional',
          webPage: 'Página Web',
          instagram: 'Instagram',
          profilePicture: 'Foto de perfil',
          attachPhoto: 'Adjuntar foto',
          verifyCUninitiatedPersonal: {
            warning: '¡Atención!',
            messageWarning:
              'Si desea iniciar el proceso de verificación incluya los documentos que se indican a continuación .',
            messageFile:
              'Haga click sobre el icono o arrastre para cargar el archivo correspondiente.',
            supportedTypeFiles:
              'Tipos de archivos permitidos: jpg, jpeg, png, gif, pdf. Tamaño máximo de los archivos 5Mb',
            documentID:
              'Documento de identificación (DNI, Pasaporte, ID, Cédula de identidad)',
            bankAccountSupport:
              'Comprobante de una de sus cuentas bancarias (Mostrar claramente nombre del titular y los últimos 4 dígitos de la cuenta)',
            addressSupport: 'Selfie con documento de identificación',
            selfieSupport: 'Selfie con documento de identificación',
            buttonChange: 'Cambiar',
            fileNotSupported: 'Archivo no soportado',
            message:
              'Para iniciar el proceso de verificación de sus datos debe llenar los campos marcados como obligatorio (*)',
          },
          verifyCUninitiatedCompany: {
            warning: '¡Atención!',
            messageWarning:
              'Si desea iniciar el proceso de verificación de su empresa incluya los documentos que se indican a continuación .',
            name: 'Nombre de la empresa',
            registerYear: 'Año de registro',
            registerFiscalType: 'Tipo de registro fiscal',
            registerFiscalNumber: 'N° de registro fiscal',
            messageFile:
              'Haga click sobre el icono o arrastre para cargar el archivo correspondiente.',
            supportedTypeFiles:
              'Tipos de archivos permitidos: jpg, jpeg, png, gif, pdf. Tamaño máximo de los archivos 5Mb',
            documentID:
              'Documento de identidad de la persona que se está verificando y debe coincidir con una de las personas firmantes en el registro mercantil.',
            bankAccountSupport:
              'Comprobante de cuenta bancaria jurídica asociada',
            registerFiscal:
              'Registro mercantil (especificamente la hoja donde aparezcan los socios con sello húmedo)',
            selfieSupport: 'Selfie con documento de identidad de la empresa',
            buttonChange: 'Cambiar',
            fileNotSupported: 'Archivo no soportado',
          },

          buttonSave: 'Guardar',
          buttonVerify: 'Verificar',
          buttonBack: 'Regresar',
          email: 'Correo electrónico',
        },
        modalInitVerification: {
          header: 'Iniciar Verificación',
          warning: '¿Desea iniciar la verificación de su usuario? ',
          buttonYes: 'Si',
          buttonNo: 'No',
          buttonClose: 'Cerrar',
        },
      },
      waitingVerification: {
        listLabelDataToVerify: {
          bank: 'Banco',
          accountNumber: 'N° de cuenta',
          accountHolderName: 'Nombre del Titular',
          accountHolderEmail: 'Email del Titular',
          userName: 'Usuario',
          accountHolderNumber: 'Nro. de cuenta del titular',
          accountHolderId: 'ID',
          accountHolderPhone: 'Teléfono del titular',
          type: 'Tipo de pago',
          currency: 'Moneda',
          accountType: 'Tipo de cuenta',
          cardType: 'Tipo de tarjeta',
          cardNumber: 'N° de tarjeta de credito',
          cardHolderName: 'Titular de la tarjeta',
          accountInterbankCode: 'Código interbancario',
          expDate: 'Fecha de expiración',
          csc: 'Código de Seguridad',
          zipCode: 'Código postal',
        },
        messages: {
          processing: {
            header: 'Verificación de medio de pago en PROCESO',
            content:
              'Se enviará un microdepósito a tu cuenta para verificar que efectivamente existe y eres el dueño de la misma. Adjunte la captura de pantalla del microdepósito en el chat para que el moderador pueda terminar el proceso. Al concluir el proceso se le notificará para que pueda continuar con su DEPOSITO. Verifique nuevamente los datos de su cuenta y de presentar algún error, cancele la verificación. No dude en comunicarse con nuestro staff de moderadores para cualquier duda relacionada al proceso.',
            creditCardContent:
              'Se debe adjuntar foto del lado frontal de la tarjeta de crédito. Solo las tarjetas de crédito que permiten cargos internacionales son aceptadas, consulte con su operador bancario para mas información.',
          },
          fail: {
            header: 'Verificación de medio de pago FALLIDA',
            content:
              'Normalmente el fallo de este proceso se debe a error en los datos proporcionados. Comuníquese por nuestro chat con nuestros moderadores para conocer más detalles del proceso o cancele la verificación e intente el nuevamente.',
          },
          success: {
            header: 'Verificación de medio de pago EXITOSA',
            content:
              'Ahora puede realizar operaciones con su medio de pago, gracias por preferirnos.',
          },
          canceled: {
            header: 'Verificación de medio de pago CANCELADA',
            content:
              'Usted ha cancelado la verificación de su medio de pago, tenga en cuenta que dicho medio de pago no podra ser utilizado para realizar operaciones en el portal, puede eliminarlo e intentar de nuevo el proceso de verificación, Gracias.',
          },
          data: {
            header: 'Datos de cuenta',
          },
        },
        buttonBack: 'Regresar',
        chatWaiting: {
          errors: {
            requiredField: 'Este campo es requerido',
            fileNotSupported: 'Tipo de archivo no soportado',
            exceededSize: 'El tamaño del archivo excede el permitido',
          },
          placeholderMessage: 'Escribe tu mensaje aquí',
          buttonAttachment: 'Adjuntar documento',
          buttonCancelVerification: 'Cancelar verificación',
          buttonCloseVerification: 'Cerrar verificación',
          buttonSend: 'Enviar',
          labelMe: 'Yo',
          labelModerator: 'Moderador',
          operationTimeLeft: 'Quedan 10 minutos para cerrar la operación',
          operationTimeExpired: 'El tiempo de operación ha expirado',
          buttonSeeAttachment: 'Ver archivo adjunto',
        },
      },
      walletAccount: {
        cryptoToReceive: 'Crypto a Recibir',
        cryptoToSend: 'Crypto a Enviar',
        BITCOIN: 'Bitcoins',
        Ethereum: 'Ethereum',
        USDT: 'USDT',
        messages: {
          copiedAddress: 'Tu dirección ha sido copiada al portapapeles',
          verifyEmailLink: {
            part1:
              'Para utilizar la Wallet es necesario que verifique su número teléfonico.',
            part2:
              ', por favor revisa tu correo electrónico y sigue las instrucciones.',
          },
          errorInRed: 'Verifique su conexion a internet e intente nuevamente',
        },
        qrCode: 'Código QR',
        loading: 'Cargando...',
        header: 'Utiliza esta dirección para recibir ',
        buttonCopy: 'Copiar address',
      },
      optionAccount: {
        header: 'Cuenta',
        menu: {
          security: 'Seguridad',
          devices: 'Dispositivos',
        },
      },
      optionDevices: {
        errors: {
          userNotFound: 'El usuario no fue encontrado',
          unexpectedError: 'Ha ocurrido un error inesperado. Intente más tarde',
        },
        tableHeader: {
          id: 'ID',
          name: 'Nombre',
          model: 'Módelo',
          so: 'Sistema operativo',
          source: 'Fuente',
          date: 'Fecha',
          status: 'Estatus',
          type: 'Tipo de Pago',
          actions: 'Acciones',
          windowpayment: 'Ventana de Pago',
          paymentMethodRequired: 'Medio de pago Requerido',
          currency: 'Moneda',
          information: 'Información',
          debit: 'Debitar',
          accredit: 'Acreditar',
          joinFields: 'Campo Agrupador',
          messages: 'Mensajes',
          operation: 'Tipo de Operacion',
          levelAccess: 'Nivel de Acceso',
          notAsignate: 'Sin Asignar',
          full: 'Completo',
          partial: 'Solo Entrada',
        },
        table: {
          previous: 'Anterior',
          next: 'Siguiente',
          loading: 'Cargando...',
          noData: 'No hay dispositivos registrados',
          page: 'Página',
          of: 'de',
          rows: 'filas',
          pageJump: 'ir a la página',
          rowsSelector: 'filas por página',
        },
        buttonRemove: 'Inactivar dispositivo',
        buttonAdd: 'Activar dispositivo',
        configure: 'Configurar nivel de acceso',
        delete: 'Borrar Dispositivo',
        statusActive: 'Activo',
        statusInactive: 'Inactivo',
        modalRemovePermission: {
          header: 'Inactivar dispositivo',
          content:
            '¿Está seguro que desea Inactivar el acceso a este dispositivo?',
          buttonYes: 'Si',
          buttonNo: 'No',
          headerAdd: 'Activar dispositivo',
          contentAdd:
            '¿Está seguro que desea Activar el acceso a este dispositivo?',
        },
        successRemoving: 'Su dispositivo se ha inactivado exitosamente',
        successAdd: 'Su dispositivo ha sido activado',
        modalCongifLevel: {
          header: 'Configurar Permisos',
          content: 'Seleccione un nivel de acceso para su Dispositivo',
          fullAccess:
            '1. Completo: Acceso completo a todas las funcionalidades de la aplicación',
          partialAccess:
            '2. Solo Entrada: Acceso solo a las funciones de Recibir o Depositar dentro de la aplicación',
          buttonConfirm: 'Confirmar',
          buttonAccept: 'Aceptar',
          buttonClose: 'Cerrar',
          successMessage: 'Sus cambios has sido guardados exitosamente',
        },
        modalDeleteDevice: {
          header: 'Borrar Dispositivo',
          content: '¿Está seguro que desea borrar este dispositivo?',
          successMessage: 'Sus cambios has sido guardados exitosamente',
        },
      },
      optionMovements: {
        movementspaymentMethod: 'Movimientos de los medios de pago consultados',
        tableHeader: {
          id: 'ID',
          amount: 'Monto',
          date: 'Fecha',
        },
        table: {
          previous: 'Anterior',
          next: 'Siguiente',
          loading: 'Cargando...',
          noData: 'No hay datos',
          page: 'Página',
          of: 'de',
          rows: 'filas',
          pageJump: 'ir a la página',
          rowsSelector: 'filas por página',
        },
      },
    },
    registration: {
      message:
        'Para continuar es necesario que complete la siguiente información',
      continue: 'Continuar',
      completeAccount: 'Completar Información',
      registerUser: 'Registro de Usuario',
      signup: 'Registrar',

      form: {
        name: 'Nombre',
        username: 'Nombre de usuario',
        referralCode: 'Código de Referido',
        referralCodeOptional: 'Código de Referido (Opcional)',
        email: 'Email',
        password: {
          label: 'Contraseña',
          placeholder: 'Ingrese un mínimo de cuatro caracteres',
        },
        confirmPassword: 'Confirmar contraseña',
        captcha: 'Por favor, demuestre que usted es un humano',
        companyText: '¿Desea registrarse como empresa?',
        terms: {
          first: 'Aceptar ',
          second: 'Términos y Condiciones',
        },
      },
      modalTerms: {
        header: 'Términos y Condiciones',
        content: termsAndConditions,
        agreeButton: 'De acuerdo',
        closeButton: 'Cerrar',
      },
      errors: {
        form: {
          username: 'Nombre de usuario ya existe',
          notexist: 'Este usuario no existe',
          phone: 'Telefono del usuario ya existe',
          email: 'Dirección de correo inválida',
          alreadyEmail: 'Email ya está en uso',
          password: 'Este campo debe contener más de 4 caracteres',
          confirmPassword: 'Este campo no coincide con la contraseña',
          captcha: 'No ha verificado que es un humano',
          terms:
            'Es necesario que acepte los términos y condiciones de nuestra plataforma ',
        },
        resultPost:
          'Disculpe no hemos podido registrar su cuenta disculpe las molestias intente mas tarde',
        errorRequiredField: 'Este campo es requerido',
        unexpectedError:
          'Disculpe ha ocurrido un error inesperado intente mas tarde.',
        errorNetwork: 'Error de red',
        errorSign: 'Este usuario ya se encuentra registrado',
        errorReferralCode: 'Código de referido inválido',
      },
      modalResult: {
        headerSuccess: 'Bienvenido',
        headerError: 'Notificacion',
        closeButton: 'Cerrar',
        resultPost: {
          headerComplete:
            'Enhorabuena acabas de completar tu registro en www.moneyclick.com, a partir de ahora podrás depositar tu saldo en cualquier moneda.',
          warningMessage:
            'Para operar en nuestro portal es necesario verificar tu usuario. Puedes iniciar este proceso desde tu perfil en la opción Actualizar datos',
          infoMessage:
            'Te enviamos un correo, por favor revisa y sigue las instrucciones.',
        },
      },
    },
    fastChange: {
      print: 'Imprimir',
      idOperation: 'Id de la Operación',
      modifybalance:
        'El balance del medio de pago ha sido modificado exitosamente',
      header: 'Cambio Rápido',
      priceChange:
        'El precio ha cambiado, por favor intente de nuevo su solicitud',
      dataOperation: 'Datos de la Operación',
      dataOperationBuy: 'Datos de la Operación de Compra',
      dataOperationSell: 'Datos de la Operación de Venta',
      selectOperation: 'Seleccione su Operación',
      optionBuy: 'Compra',
      optionSell: 'Venta',
      buttonBuy: 'Comprar Bitcoin',
      buttonSell: 'Vender Bitcoin',
      dateOperation: 'Fecha de la Operación',
      dateAvailable: 'Fecha Disponible',
      currencySend: 'Moneda a enviar',
      currencyReceive: 'Moneda a Recibir',
      amountSend: 'Monto a Enviar',
      amountReceive: 'Monto a Recibir',
      avalilableToChange: 'Monto máximo de operación', //"Puede Cambiar hasta:",
      avalilableToChangeEq: 'Monto Equivalente',
      headerLimits: 'Límites de operaciones',
      dailyLimits: 'Límite diario',
      monthlyLimits: 'Límite mensual',
      amount: 'Monto en ',
      errorGetFactor: 'Su solicitud no puede ser procesada en estos momentos',
      errorPymentMethod:
        'En estos momentos no hay medios de pago de para realizar operaciones de esta moneda',
      errorGetBalance: 'El monto excede el disponible. Puede cambiar hasta:',
      errorGetBalanceCurrency:
        'Actualmente no posee saldo para realizar operaciones en esta moneda:',
      errorGetDayly:
        'Límite máximo alzado. Si deseas realizar la operación por un límite mayor, comunícate a nuestro centro de soporte al cliente.',
      errorGetMonthly:
        'Límite máximo alzado. Si deseas realizar la operación por un límite mayor, comunícate a nuestro centro de soporte al cliente.',
      balanceCurrency: 'Saldo Disponible ',
      amountMaxLimitAvalible: 'La cantidad indicada supera al saldo disponible',
      sendAmount: 'Debes indicar el monto a enviar ',
      sendAmountLimit: 'El monto a indicado supera al límite diario ',
      errorConditions: 'Por favor, aceptar los términos  y condiciones',
      modal: {
        accept: 'Aceptar',
        totalToReceive: 'Total a Recibir',
        totalToSend: 'Total a Cancelar',
        confirm: 'Salir',
        cancel: 'Cancelar',
        amountSend: 'Monto a Enviar',
        buyReceipt: 'Ticket de Compra',
        sellReceipt: 'Ticket de Venta',
        changeFactor: 'Precio de Cambio', //"Factor de Cambio",
        changeFactorInverse: 'Precio de Cambio Inverso',
        amountReceive: 'Monto a recibir',
        tax: 'TAX',
        Commission: 'Comisión',
        rejectBuy: 'Rechazar Compra',
        acceptBuy: 'Aprobar Compra',
        rejectSell: 'Rechazar Venta',
        acceptSell: 'Aprobar Venta',
        timetoproceed:
          'Su compra estara disponible para intercambios en 3 días hábiles',
        close: 'Cerrar',
      },
      send: {
        confirmTx: 'Confirmar transacción',
        confirMessage: '¿Está seguro que desea continuar con la operación?',
        buttonClose: 'Cerrar',
        buttonAccept: 'Aceptar',
        success: 'Transacción exitosa',
        successmessage: 'Su operación fue realizada con éxito',
        fail: 'Transacción Fallida',
        failBalanceAmount: 'No posee saldo en',
        failmessage: 'El monto indicado es superior a su balance',
        failmessage2: 'El monto debe ser distinto de 0',
      },
    },
    forgotPassword: {
      header: 'Recuperar contraseña',
      header2: 'Contraseña Nueva',
    },
    sendTokenResetPassword: {
      form: {
        title: 'Ingrese su número telefónico para iniciar el proceso',
        captchaLabel: 'Por favor, demuestre que usted es un humano',
        buttonConfirm: 'Confirmar',
        buttonCancel: 'Cancelar',
        buttonClose: 'Cerrar',
      },
      errors: {
        incompleteData: 'Datos incompletos.',
      },
    },
    tokenResetPassword: {
      errors: {
        failToken: 'Disculpe, su token no ha podido ser confirmado',
        serverError: 'Ha ocurrido un error el servidor, intente más tarde',
        emptyToken: 'Debe ingresar un token para confirmar',
      },
      message:
        'Hemos enviado un token de verificación a tu correo electrónico. Copia y pega ese valor para continuar el proceso.',
      buttonContinue: 'Continuar',
      buttonCancel: 'Cancelar',
      buttonClose: 'Cerrar',
    },
    codeResetPassword: {
      message:
        'Hemos enviado un código a tu número telefónico, por favor ingresa el código para continuar con el proceso',
      errors: {
        failToken: 'Disculpe, su token no ha podido ser confirmado',
        serverError: 'Ha ocurrido un error el servidor, intente más tarde',
        serverError2:
          'Ha ocurrido un error el servidor, reenvíe el código o intente más tarde',
      },
      responseAccept: 'Su solicitud ha sido procesada, espere por favor',
      labelCode: 'Código',
      buttonContinue: 'Continuar',
      buttonCancel: 'Cancelar',
      buttonClose: 'Cerrar',
    },
    resetFormPassword: {
      errors: {
        wrongData: 'Debe ingresar los datos correctamente',
        minimalLength: 'La contraseña debe tener mínimo cuatro caracteres',
        notMatch: 'Las contraseñas no coinciden',
        failChange: 'No hemos podido cambiar su contraseña, intente mas tarde',
      },
      successChange: 'Tu contraseña ha sido cambiada exitosamente',
      form: {
        labelNew: 'Nueva Contraseña',
        labelRepeat: 'Repetir Contraseña',
        buttonSend: 'Enviar',
      },
    },

    login2FA: {
      errors: {
        failAuth:
          'Código no ha podido ser autenticado. Ingrese nuevamente el código.',
        serverError: 'Disculpe ha ocurrido un error en el servidor',
        serverError2:
          'Disculpe ha ocurrido un error en el servidor, intente más tarde',
        requiredField: 'Este campo no puede estar en blanco',
        failVerifyToken: 'Disculpe no hemos podido verificar su token',
        failVerifyAnswer: 'Su respuesta de seguridad es incorrecta',
      },
      helpMessage:
        'Para casos de robo, pérdida o cualquier situación extraordinaria puede inhabilitar la autenticación de dos pasos enviando un token a su correo electrónico y seguir los pasos que se mencionan',
      endHelpMessage:
        'El factor de autenticación de dos pasos ha sido desactivado , por favor ve a inicio de sesión para ingresar.',
      successSendToken:
        'Por favor revise su correo electronico e ingrese el token que le hemos enviado para verificar su identidad y culminar con el proceso gracias',
      modalSendToken: {
        header: 'Necesitas ayuda',
        send: {
          labelToken: 'Token de verificación',
          labelSecurityQuestion: 'Pregunta de Seguridad: ',
          buttonCancel: 'Cancelar',
          buttonClose: 'Cerrar',
          buttonConfirm: 'Confirmar',
        },
        notSend: {
          labelQuestion: '¿Desea que enviemos un token de seguridad?',
          buttonYes: 'Si',
          buttonNo: 'No',
        },
      },
      header: 'Autenticación de dos pasos',
      body2:
        'Por favor ingrese su código de seguridad proporcionado por Google Autenticator\n' +
        '                     para proceder con tu inicio de sesión.',
      body:
        'Hemos enviado un código de seguridad a tu número de teléfono\n' +
        '                    móvil. Ingresa el código para autenticar tu inicio de\n' +
        '                    sesión.',
      body3:
        'Hemos enviado un código de seguridad a tu número de teléfono. Ingresa el código para autenticar tu registro.',
      form: {
        label: 'Código de verificación',
        buttonConfirm: 'Confirmar',
        buttonResend: 'Solicitar SMS',
        iNeedHelp: 'Necesito ayuda',
      },
    },

    withdraw: {
      header: 'A Bancos',
      modal: {
        addFrequent: 'Agregar medios de pago a frecuentes',
        OWN: 'Propio',
        THIRDS: 'Tercero',
        TRANSFER_WITH_SPECIFIC_BANK: 'Desde mismo banco',
        TRANSFER_NATIONAL_BANK: 'Desde otro banco',
        TRANSFER_TO_CRYPTO_WALLET: 'Transferencia a Crypto Wallet',
        ACH: '3 días hábiles',
        ACH_EXPRESS: 'Mismo día (+35$)',
        ACH_THIRD_ACCOUNT: '3 días hábiles',
        ACH_THIRD_ACCOUNT_EXPRESS: 'Mismo día (+35$)',
        title: 'Datos de la operación',
        uploadDescription:
          'Ingrese los datos a continuación para comprobar su identidad. Los datos deben corresponder al beneficiario y los documentos adjuntados deberán mostrar claramente los datos básicos sino la operación será cancelada. Para solventar cualquier duda o inquietud, comuníquese con nosotros por la sección de Atención al Cliente.',
        subtitle: 'Ingrese los datos requeridos  para verificar su cuenta:',
        amount: 'Monto',
        description: 'Descripción',
        messageOperationSuccess: ' Operación realizada exitosamente.',
        operationFail: 'Error al completar la operación intente nuevamente',
        buttons: {
          sendVerification: 'Enviar',
          edit: 'Editar',
          send: 'Enviar',
          cancel: 'Cancelar',
          accept: 'Aceptar',
          add: 'Agregar',
          close: 'Cerrar',
          camSelect: 'Tomar Foto',
          librarySelect: 'Buscar en galeria',
        },
      },
      errorsServices: {
        errorLoadClientPayments: 'Error cargando los medios de pago',
        errorLoadIdentityMc: 'Error cargando datos',
        errorLoadCurrencies: 'Error cargando las monedas',
        errorLoadWithdrawInProcess: 'Servicio no disponible temporalmente',
        errorLoadPreWithdrawInProcess: 'Servicio no disponible temporalmente',
        errorSendIndentityVerication:
          'Error enviando el documento de identidad',
        errorLoadGetCommision: 'Error calculando monto de comisión',
        errorLoadClientPaymentTypes: 'Error cargando los tipos de pagos',
      },
      labels: {
        minAndMax:
          'El valor debe estar entre el monto mínimo y el monto máximo',
        maxSend: 'Puede enviar hasta: ',
        commision: 'Comisión',
        userDaylyLimitReached: 'Ha excedido el límite diario',
        userMoytlyLimitReached: 'Ha excedido el límite mensual',
        errorNotSupportOperation:
          'Consulte atención al cliente vía WS en horario hábil para habilitar esta opción.',
        failAmount1: 'El monto indicado es superior a su balance',
        failAmount2: 'El monto debe ser distinto de 0',
        failAmount3: 'El monto es insuficiente para culminar la operación',
        failAmountCommision: 'Puede enviar hasta:',
        availableBalance: ' / Saldo disponible ',
        addPayment: 'Agregar medio de pago',
        headerLimits: 'Límites de operaciones',
        receiver: 'Enviar a: ',
        emailReceiver: 'Correo',
        amount: 'Monto en ',
        description: 'Descripción',
        button: 'Enviar',
        missingField: 'Este campo es requerido',
        accountWireNumber: 'Cuenta wire',
        validationAmount: 'El monto debe estar entre ',
        notBalance: 'Saldo no disponible en la moneda seleccionada.',
        accountAddress: 'Dirección de cuenta',
        accountZip: 'Zip',
        bankRoutingNumber: 'Número de ruta bancaria',
        bankSwiftCode: 'Código swift bancario',
        accountWireRoutingNumber: 'Número de ruta bancaria de la cuenta',
        and: ' y ',
        notCreateAccount:
          'Actualmente no puedes crear medios de pago para la moneda seleccionada',
      },
      picker: {
        title: 'Monedas',
        titleTransactionType: 'Titular',
        PaymentWithin: 'Pago en',
        titlePaymentClient: 'Tipo',
        own: 'Propio',
        thirds: 'Tercero',
        placeholder: 'Seleccione una moneda',
        titlePayments: 'Medio de pago',
        placeholderPayments: 'Medios de pago',
      },
      formVerification: {
        title: 'Datos de verificación',
        firstName: 'Nombres',
        lastName: 'Apellido',
        answerSecurity: 'Respuesta de seguridad',
        questionSecurity: 'Pregunta de seguridad',
        typeDocumentIdentity: 'Tipo de documento de identidad',
        numberDocumentIdentity: 'Numero de documento de identidad',
        gender: 'Sexo',
        genderPlaceholder: 'Sexo',
        birthdate: 'Fecha de nacimiento',
        familyName: 'Contacto',
        familyEmail: 'Email de familiar contacto',
        userDirection: 'Dirección',
        countryOfBirth: 'Country Of Birth',
        cityOfBirth: 'City Of Birth',
        birthplace: 'Birthplace',
        userLocalBitcoin: 'Usuario Localbitcoin',
        userFacebook: 'Usuario facebook',
        documentIdentity: 'Subir documento de Identidad',
        selfieIdentity: 'Subir fotografía',
        selfieSupport: 'Selfie',
        buttonChange: 'Cambiar',
        fileNotSupported: 'Archivo no soportado',
        messageOperationSuccess: 'Tus datos se han enviado exitosamente',
        missings: {
          missingField: 'Este campo es requerido',
          missingFirstName: 'Este campo es requerido',
          missingLastName: 'Este campo es requerido',
          missingGender: 'Este campo es requerido',
          missingTypeDocumentIdentity: 'Este campo es requerido',
          missingNumberDocumentIdentity: 'Este campo es requerido',
          missingDocumentTypeOther: 'Este campo es requerido',
          missingBirthdate: 'Este campo es requerido',
          missingPhoto: 'Obligatorio',
          missingSelfie: 'Obligatorio',
        },
      },
      typesPayment: {
        BANK_ACCOUNT: 'Banco',
        BANK: 'Banco',
        OFFICE: "Oficina",
        PAYPAL: 'Paypal',
        ZELLE: 'Zelle',
        NEQUI: 'Nequi',
        YAPE: 'Yape',
        MONEYBEAN: 'MoneyBeam',
        EFECTY: 'Efecty',
        SUPERGIROS: "Supergiros",
        MOBILE_PAYMENT: ' Pago móvil',
        MONEYBEAM: 'Moneybeam',
        POP_MONEY: 'Pop Money',
        PEOPLE_PAY: 'People Pay',
        RESERVE: 'Reserve',
        BOOZ: 'Booz',
        WISE: 'Wise',
        VENMO: 'Venmo',
        CASHAPP: 'Cashapp',
      },
    },
    dynamicForm: {
      labels: {
        user: 'Usuario',
        link: 'Link',
        accountBank: 'Banco de la cuenta',
        RFC: 'RFC',
        CLABE: 'CLABE',
        IBAN: 'IBAN',
        BIC: 'BIC',
        ACH: '3 días hábiles',
        GENERIC_THIRD_ACCOUNT: 'Cuenta de tercero',
        ACH_THIRD_ACCOUNT: '3 días hábiles',
        ACH_EXPRESS: 'Mismo día (+35$)',
        ACH_THIRD_ACCOUNT_EXPRESS: 'Mismo día (+35$)',
        CUITCUIL: 'CUIT/CUIL',
        CBU: 'CBU',
        bank: 'Banco',
        accountNumber: 'N° de cuenta',
        userHolderName: 'Nombre del Titular',
        accountHolderName: 'Nombre del Titular',
        accountHolderEmail: 'Email del Titular',
        userName: 'Usuario',
        accountInterbankCode: 'Código interbancario',
        accountHolderNumber: 'Nro. de cuenta del titular',
        accountHolderId: 'N° de documento ',
        accountHolderPhone: 'Teléfono del titular',
        accountType: 'Tipo de cuenta',
        text: 'Tipo de pago',
        description: 'Descripción',
        descriptionContent: 'No posee',
        bankLogin: 'Usuario del banco',
        bankPassword: 'Contraseña del banco',
        optionsTextOne: 'Sin credenciales',
        optionsTextTwo: 'Con credenciales',
        optionsSelect: 'Opciones',
        emailReceiver: 'Email del Receptor',
        accountWireNumber: 'N° de cuenta wire',
        amount: 'Monto',
        commission: 'Comisión',
        vat: 'VAT',
        cardType: 'Tipo de Tarjeta de Crédito',
        cardNumber: 'N° de Tarjeta de Crédito',
        cardHolderName: 'Nombre del titular de la tarjeta',
        expDate: 'Fecha de expiración',
        csc: 'Código de Seguridad (CSC)',
        zipCode: 'Código Postal',
        placeholderTypePayment: 'Tipo de Medio',
        creditCard: 'Tarjeta de Crédito',
        type: 'Tipo de pago',
        CREDIT_CARD: 'Tarjeta de Crédito',
        bankAccount: 'Cuenta bancaria',
        accountAddress: 'Dirección de la cuenta',
        accountZip: 'Código postal',
        bankRoutingNumber: 'N° routing bancario',
        bankSwiftCode: 'Código de swift bancario',
        accountWireRoutingNumber: 'N° routing bancario wire',
        bankAndOffice: 'Banco/Oficina',
        officesInfoId: 'Oficina',
        options: 'Opciones',
        address: 'Address',
        TRANSFER_WITH_SPECIFIC_BANK: 'Desde mismo banco',
        TRANSFER_NATIONAL_BANK: 'Desde otro banco',
        TRANSFER_TO_CRYPTO_WALLET: 'Transferencia a Crypto Wallet',
        create: 'Agregar medio de pago',
        account: 'Cuenta',
        zelle: 'Zelle',
        BANK: 'Banco',
        PAYPAL: 'Paypal',
        ZELLE: 'Zelle',
        NEQUI: 'Nequi',
        YAPE: 'Yape',
        MONEYBEAN: 'MoneyBeam',
        EFECTY: 'Efecty',
        SUPERGIROS: "Supergiros",
        MOBILE_PAYMENT: ' Pago móvil',
        MONEYBEAM: 'Moneybeam',
        POP_MONEY: 'Pop Money',
        PEOPLE_PAY: 'People Pay',
        RESERVE: 'Reserve',
        BOOZ: 'Booz',
        WISE: 'Wise',
        VENMO: 'Venmo',
        CASHAPP: 'Cashapp',
        account_NumberMask: 'Terminal de número de cuenta',
      },
      placeholderOption: 'Seleccione una opción...',
      buttonAdd: 'Crear Medio de pago',
      buttonVerify: 'Verificar Medio de pago',
      emptyFields:
        'Actualmente no puedes crear medios de pago en la moneda seleccionada.',
    },
    benefits: {
      yes: 'Si',
      no: 'No',
      operationFail: 'Error al completar la operación intente nuevamente',
      messageOperationSuccess: ' Operación realizada exitosamente.',
      buttonAccept: 'Aceptar',
    },
    common: {
      charges: {
        title: 'Tarifas en Operaciones por Monedas',
        MC_BUY_BALANCE__WISE__COMMISSION: 'Deposito por WISE',
        MC_BUY_BALANCE__ZELLE__COMMISSION: 'Deposito por ZELLE',
        MC_BUY_BALANCE__VENMO__COMMISSION: 'Deposito por VENMO',
        MC_BUY_BALANCE__CASHAPP__COMMISSION: 'Deposito por CASHAPP',
        MC_BUY_BALANCE__NEQUI__COMMISSION: ' Deposito por NEQUI',
        MC_BUY_BALANCE__SUPERGIROS__COMMISSION: ' Deposito por SUPERGIROS',
        MC_BUY_BALANCE__EFECTY__COMMISSION: ' Deposito por EFECTY',
        MC_BUY_BALANCE__YAPE__COMMISSION: ' Deposito por YAPE',
        MC_BUY_BALANCE__MONEYBEAN__COMMISSION: 'Deposito por MONEYBEAN',
        MC_SEND_TO_PAYMENT__WISE__COMMISSION: 'Envíos por WISE',
        MC_SEND_TO_PAYMENT__ZELLE__COMMISSION: 'Envíos por ZELLE',
        MC_SEND_TO_PAYMENT__VENMO__COMMISSION: 'Envíos por VENMO',
        MC_SEND_TO_PAYMENT__CASHAPP__COMMISSION: 'Envíos por CASHAPP',
        MC_SEND_TO_PAYMENT__NEQUI__COMMISSION: 'Envíos por NEQUI',
        MC_SEND_TO_PAYMENT__SUPERGIROS__COMMISSION: 'Envíos por SUPERGIROS',
        MC_SEND_TO_PAYMENT__EFECTY__COMMISSION: 'Envíos en efectivo',
        MC_SEND_TO_PAYMENT__YAPE__COMMISSION: 'Envíos por YAPE',
        MC_SEND_TO_PAYMENT__MONEYBEAN__COMMISSION: 'Envíos por MONEYBEAM',
        SEND_TO_PAYMENT__GENERIC_THIRD_ACCOUNT__COMMISSION: 'Envíos a cuentas Bancarias - Cuenta de tercero',
        MC_SEND_SMS_NATIONAL__COMMISSION: 'Envíos Nacionales MoneyClick SMS',
        MC_SEND_SMS_INTERNATIONAL__COMMISSION:
          'Envíos Internacionales MoneyClick SMS',
        MC_SEND_TO_PAYMENT__COMMISSION:
          'Envíos a cuentas bancarias desde MoneyClick',
        SEND_TO_PAYMENT__ACH__COMMISSION:
          'Envíos a Cuentas Bancarias - 3 Días Hábiles',
        SEND_TO_PAYMENT__ACH_EXPRESS__COMMISSION:
          'Envíos a Cuentas Bancarias - Mismo día',
        MC_FAST_CHANGE__COMMISSION: 'Cambio Rápido de MoneyClick',
        MC_RETAIL_BUY_BALANCE__COMMISSION:
          'Comprar saldo en Punto de Intercambio',
        MC_RETAIL_SELL_BALANCE__COMMISSION:
          'Vender saldo en Punto de Intercambio',
        MC_AUTOMATIC_CHANGE__COMMISSION: 'Cambio Automático de MoneyClick',
        MC_BUY_BALANCE__COMMISSION: 'Deposito por Bancos',
        MC_BUY_BALANCE__PAYPAL__COMMISSION: 'Deposito por PayPal',
        MC_SELL_BALANCE__COMMISSION: 'Venta de Saldo MoneyClick',
        SEND_TO_PAYMENT__COMMISSION: 'Envíos a Cuentas Bancarias',
        SEND_TO_PAYMENT__PAYPAL__COMMISSION: 'Envíos a Cuentas PayPal',
        SEND_IN__COMMISSION: 'Envíos a wallets MoneyClick',
        SEND_OUT__COMMISSION: 'Envíos a wallets Externas',
        SEND_TO_PAYMENT__ACH_THIRD_ACCOUNT__COMMISSION:
          'Envíos a cuentas Bancarias - Cuenta de tercero',
        SEND_TO_PAYMENT__ACH_THIRD_ACCOUNT_EXPRESS__COMMISSION:
          'Envíos a cuentas Bancarias - Cuenta de tercero mismo día',
        message: 'Entre',
        change: 'a',
        FAST_CHANGE__COMMISSION: 'Cambio Rápido',
        MC_BUY_BITCOINS__COMMISSION: 'Compra de BTC',
        MC_BUY_BITCOINS__VAT: 'IVA-Compra de BTC',
        MC_SELL_BITCOINS__COMMISSION: 'Venta de BTC',
        MC_SELL_BITCOINS__VAT: 'IVA-Venta de BTC',
        MC_POST_MESSAGE_OFFER__COMMISSION: 'Crear oferta Money Market',
        MC_TAKE_MESSAGE_OFFER__COMMISSION: 'Tomar oferta Money Market',
        MC_BUY_CRYPTO__COMMISSION: 'Compra de Crypto',
        MC_SELL_CRYPTO__COMMISSION: 'Venta de Crypto',
        GIFT_CARD_REDEEM__COMMISSION: 'Aplicación de Tarjeta de Recarga',
        GIFT_CARD_REDEEM_BR__COMMISSION:
          'Aplicación de Tarjeta de Recarga Bitcoinrecharge',
        MONEY_ORDER_SEND__COMMISSION: 'Ordenes de Dinero por Correo',
        SEND_OUT__ETHEREUM__COMMISSION: 'Envíos a wallets Externas ERC-20',
        SEND_OUT__TRON__COMMISSION: 'Envíos a wallets Externas TRC-20',
      },
    },
    contact: {
      header: 'Atención al Cliente',
      name: 'Nombre Completo',
      email: 'Email',
      phone: 'Teléfono',
      subject: 'Asunto',
      technicalIssues: 'Asuntos Técnicos',
      mainOffice: 'Oficina Principal',
      english: 'Inglés',
      spanish: 'Español',
      aleman: 'Alemán',
      buttonSend: 'Enviar',
      placeholder: {
        name: 'Nombre y Apellido',
        email: 'Email',
        subject: 'Asunto',
        message: 'Mensaje',
      },
      post: {
        error: {
          header: 'Error',
          message: 'Ha ocurrido un error. Intente de nuevo por favor',
          type: {
            name: 'El campo Nombre Completo es requerido',
            email: 'El campo Email es requerido',
            emailInvalid: 'Por favor, ingrese un correo electrónico válido',
            phone: 'El campo Teléfono es requerido',
            subject: 'El campo Asunto es requerido',
            message: 'El campo Mensaje es requerido',
          },
        },
        success: {
          header: 'Genial',
          message:
            'Gracias por contactarnos. Te responderemos a la brevedad posible',
        },
      },
    },
    recharge: {
      notAuth: {
        part1: 'Por favor, ',
        part2: 'inicie sesión',
        part3: ' o ',
        part4: 'regístrese',
        part5: ' para depositar',
      },
      options: {
        moneyclick: 'MoneyClick',
      },
      loading: 'Cargando...',
      menu: {
        title1: 'Depositar',
        title2: 'Histórico de Depósitos',
      },
      modalTerms: {
        header: 'Términos y Condiciones',
        terms: termsBuy,
        buttonClose: 'Cerrar',
        buttonAcceptTerms: 'Aceptar Términos y Condiciones',
      },
      modalConfirm: {
        header: 'Enviar solicitud de depósito',
        request: {
          part1: 'Solicitud de depósito de ',
        },
        payWindow: {
          part1: 'Una vez enviada su solicitud de depósito, dispone de ',
          part2:
            ' minutos para finalizar la operación, en caso contrario será cancelada automáticamente.',
        },
        charges: {
          header: 'Cargos por operación',
          VAT: 'Impuesto: ',
          COMMISSION: 'Comisión: ',
        },
        buttonCancel: 'Cancelar',
        buttonClose: 'Aceptar',
        buttonAccept: 'Continuar',
      },
      modalNotVerify: {
        notVerifiedA:
          'Si deseas realizar depósitos dentro de la plataforma usando medios bancarios, debes completar y verificar tus datos. Una vez aprobada la verificación, el sistema te permitirá continuar las depósitos de manera regular. Recuerda que debes ser el titular de las cuentas a utilizar.',
        header: 'Atención',
        buttonClose: 'Cerrar',
      },
      formVerificationEmail: {
        msg1: 'Hemos enviado un email a ',
        msg2: ', por favor revisa tu correo electrónico para continuar con la operación.',
      },
      formVerificationPhone: {
        messages: {
          sentToken: {
            part1:
              'Hemos enviado un código de verificación a tu teléfono móvil ',
            part2: '******',
            part3:
              '. Ingresa el código para completar la verificación. Podrás reenviar nuevamente el código despues de transcurridos 60 segundos',
          },
          verifiedPhone: {
            part1: 'El teléfono móvil ',
            part2: '******',
            part3: ' ha sido verificado exitosamente.',
          },
          failVerification:
            'Su teléfono no ha podido ser verificado. Intente de nuevo o chequee su número de teléfon móvil.',
          notVerifyB:
            'Para realizar operaciones de depósito es necesario que verifique su teléfono móvil, por favor presiona Enviar código para iniciar la verificación.',
        },
        errors: {
          tokenNotSent:
            'Ha ocurrido un problema al enviar el código, por favor intente nuevamente.',
          phoneUsed: 'El número de teléfono ya se encuentra en uso.',
        },
        formRequestCode: {
          countryCode: 'Código del país',
          placeholderCountryCode: 'Seleccione un país...',
          phone: 'Teléfono Móvil',
          buttonSend: 'Enviar código',
        },
        formCodeSent: {
          code: 'Código',
          buttonVerify: 'Verificar',
          buttonResend: 'Reenviar código',
          buttonBack: 'Regresar',
        },
      },
      formVerificationIdentity: {
        sexList: {
          male: 'Masculino',
          female: 'Femenino',
        },
        documentType: {
          id: 'ID',
          dni: 'DNI',
          identificationCard: 'Cedula',
          passport: 'Pasaporte',
          other: 'Otro',
        },
        errors: {
          missingFields:
            'Para iniciar el proceso de verificación de sus datos debe llenar los campos marcados como obligatorio (*)',
          requiredField: 'Este campo es requerido',
          firstName: 'Nombre es requerido',
          lastName: 'Apellido es requerido',
          sex: 'Sexo es requerido',
          typeDocument: 'Tipo de documento es requerido',
          numberDocument: 'Numero de documento es requerido',
          birthdate: 'Fecha de nacimiento es requerido',
          countryOfBirth: 'País de nacimiento es requerido',
          birthplace: 'Ciudad de nacimiento es requerido',
          direction: 'Dirección es requerida',
          fileNotSupported: 'Tipo de archivo no soportado',
          fileSize: 'Tamaño de archivo excede el permitido',
          missingFiles: 'Disculpe debe incluir todos los archivos',
          errorNetwork: 'Error de Red',
          emptyIDNumber: 'Disculpe debe incluir el numero de identificación',
          emptyIDNumberType:
            'Disculpe debe incluir el tipo de documento de identidad',
          emptySecurityAnswer:
            'Disculpe debe incluir la respuesta de seguridad',
          emptySecurityQuestion:
            'Disculpe debe incluir la pregunta de seguridad',
          selectTypeDocument:
            'Disculpe debe seleccionar un tipo de documento de identificación',
        },
        successFilesFiles:
          'Sus archivos han sido enviados satisfactoriamente. Este proceso de verificación puede tardar hasta 72 horas.',
        form: {
          name: 'Nombres',
          placeholderName: 'Ingrese nombres',
          lastName: 'Apellidos',
          placeholderLastName: 'Ingrese apellidos',
          sex: 'Sexo',
          placeholderSex: 'Seleccione...',
          documentType: 'Tipo de documento',
          placeholderDocumentType: 'Seleccione...',
          other: 'Especifique',
          numberId: 'N° de documento',
          birthday: 'Fecha de nacimiento',
          birthplace: 'Ciudad de nacimiento',
          country: 'Código de país',
          placeholderCountry: 'Seleccione un país...',
          phone: 'Teléfono móvil',
          placeholderPhone: 'Ejemplo 1234567',
          securityQuestion: 'Pregunta de seguridad',
          securityAnswer: 'Respuesta de seguridad',
          contactFamily: 'Familiar de contacto',
          contactCompany: 'Persona de contacto de la empresa',
          placeholderContact: 'Nombre del familiar',
          contactEmailFamily: 'Email de familiar contacto',
          contactEmailCompany: 'Correo electrónico de contacto de la empresa',
          localbitcoinUser: 'Usuario de Localbitcoin',
          facebookUser: 'Usuario Facebook',
          addressPersonal: 'Dirección',
          addressCompany: 'Dirección de la empresa',
          verifyCUninitiatedPersonal: {
            warning: '¡Atención!',
            messageWarning:
              'Si desea iniciar el proceso de verificación incluya los documentos que se indican a continuación .',
            messageFile:
              'Haga click sobre el icono o arrastre para cargar el archivo correspondiente.',
            supportedTypeFiles:
              'Tipos de archivos permitidos: jpg, jpeg, png, gif, pdf. Tamaño máximo de los archivos 5Mb',
            documentID:
              'Documento de identificación (DNI, Pasaporte, ID, Cédula de identidad)',
            bankAccountSupport:
              'Comprobante de una de sus cuentas bancarias (Mostrar claramente nombre del titular y los últimos 4 dígitos de la cuenta)',
            addressSupport: 'Selfie con documento de identificación',
            selfieSupport: 'Selfie con documento de identificación',
            buttonChange: 'Cambiar',
            fileNotSupported: 'Archivo no soportado',
          },
          verifyCUninitiatedCompany: {
            warning: '¡Atención!',
            messageWarning:
              'Si desea iniciar el proceso de verificación de su empresa incluya los documentos que se indican a continuación .',
            name: 'Nombre de la empresa',
            registerYear: 'Año de registro',
            registerFiscalType: 'Tipo de registro fiscal',
            registerFiscalNumber: 'N° de registro fiscal',
            messageFile:
              'Haga click sobre el icono o arrastre para cargar el archivo correspondiente.',
            supportedTypeFiles:
              'Tipos de archivos permitidos: jpg, jpeg, png, gif, pdf. Tamaño máximo de los archivos 5Mb',
            documentID:
              'Documento de identidad de la persona que se está verificando y debe coincidir con una de las personas firmantes en el registro mercantil.',
            bankAccountSupport: 'Comprobante de cuenta jurídica asociada',
            registerFiscal: 'Registro mercantil (con sello humedo)',
            selfieSupport: 'Selfie con documento de registro fiscal',
            buttonChange: 'Cambiar',
            fileNotSupported: 'Archivo no soportado',
          },
          buttonSave: 'Guardar',
          buttonVerify: 'Verificar',
          buttonBack: 'Regresar',
        },
      },
      formChatVerification: {
        dataToVerify: {
          email: 'Email',
          phone: 'Teléfono',
          firstName: 'Nombre',
          lastName: 'Apellido',
          answerSecurity: 'Respuesta de seguridad',
          questionSecurity: 'Pregunta de seguridad',
          typeDocumentIdentity: 'Tipo de documento',
          otherDocument: 'Otro documento',
          numberDocumentIdentity: 'N° de documento',
          gender: 'Sexo',
          female: 'Femenino',
          male: 'Masculino',
          birthdate: 'Fecha de nacimiento',
          countryOfBirth: 'País de nacimiento',
          cityOfBirth: 'Ciudad de nacimiento',
          birthplace: 'Ciudad de nacimiento',
          userLocalBitcoin: 'Usuario de LocalBitcoins',
          userFacebook: 'Usuario de Facebook',
          nickname: 'Nombre de Usuario',
          familyName: 'Contacto',
          familyEmail: 'Email de familiar contacto',
          userDirection: 'Dirección',
          bank: 'Banco',
          accountNumber: 'N° de cuenta',
          userHolderName: 'Nombre del Titular',
          accountHolderName: 'Nombre del Titular',
          accountHolderEmail: 'Email del Titular',
          userName: 'Usuario',
          accountHolderNumber: 'Nro. de cuenta del titular',
          accountHolderId: 'N° de documento',
          accountHolderPhone: 'Teléfono del titular',
          accountInterbankCode: 'Código interbancario',
          type: 'Medio de Pago',
          currency: 'Moneda',
          accountType: 'Tipo de cuenta',
          companyName: 'Nombre de la empresa',
          documentTypeFiscalRecord: 'Documento de registro fiscal',
          numberFiscalRecord: 'N° de registro',
          registrationYear: 'Año de registro',
          cardType: 'Tipo de Tarjeta de Crédito',
          cardNumber: 'N° de Tarjeta',
          cardHolderName: 'Nombre del Titular',
          accountInterbankCode: 'Código interbancario',
          expDate: 'Fecha de expiración',
          csc: 'Código de Seguridad (CSC)',
          zipCode: 'Código Postal',
          accountAddress: 'Dirección de la cuenta',
          accountZip: 'Código Postal',
          bankRoutingNumber: 'N° routing bancario',
          bankSwiftCode: 'Código de swift bancario',
          accountWireRoutingNumber: 'N° routing bancario wire',
        },
        errors: {
          fileNotSupported: 'Tipo de archivo no soportado',
          fileSize: 'Tamaño de archivo excede el permitido',
          requiredField: 'Este campo es requerido',
        },
        verifyC: {
          processing: {
            header: 'Verificación de usuario en PROCESO',
            content:
              'Al concluir el proceso se le notificará para que pueda continuar con su DEPÓSITO. No dude en comunicarse con nuestro staff de moderadores para cualquier duda relacionada al proceso.',
          },
          fail: {
            header: 'Verificación de usuario FALLIDA',
            content1: 'Comuníquese a través de nuestro WhatsApp',
            content2:
              'para conocer más detalles del proceso o solicitar nuevamente su verificación de usuario.',
            phone: '+1 (518) 913-2770',
          },
          success: {
            content: 'Usuario verificado exitosamente',
            buttonContinue: 'Continuar mi depósito',
          },
        },
        verifyD: {
          processing: {
            header: 'Verificación de medio de pago en PROCESO',
            content:
              'Se enviará un microdepósito a tu cuenta para verificar que efectivamente existe y eres el dueño de la misma. Adjunte la captura de pantalla del microdepósito en el chat para que el moderador pueda terminar el proceso. Al concluir el proceso se le notificará para que pueda continuar con su DEPÓSITO. Verifique nuevamente los datos de su cuenta y de presentar algún error, cancele la verificación. No dude en comunicarse con nuestro staff de moderadores para cualquier duda relacionada al proceso.',
            creditCardContent:
              'Se debe adjuntar foto del lado frontal de la tarjeta de crédito. Solo las tarjetas de crédito que permiten cargos internacionales son aceptadas, consulte con su operador bancario para mas información',
          },
          fail: {
            header: 'Verificación de medio de pago FALLIDA',
            content:
              'Normalmente el fallo de este proceso se debe a error en los datos proporcionados. Comuníquese por nuestro chat con nuestros moderadores para conocer más detalles del proceso o cancele la verificación e intente el nuevamente.',
          },
          success: {
            content: 'Medio de pago verificado exitosamente.',
            buttonContinue: 'Continuar mi depósito',
          },
          cancel: {
            content: 'La verificación del medio de pago fue cancelada.',
            buttonContinue: 'Continuar mi depósito',
          },
        },
        placeholderChat: 'Escribe tu mensaje aquí',
        buttonCancel: 'Cancelar verificación',
        buttonClose: 'Cerrar verificación',
        buttonAttachment: 'Adjuntar documento',
        buttonSend: 'Enviar',
        labelMe: 'Yo',
        labelModerator: 'Moderador',
        operationTimeLeft: 'Quedan 10 minutos para cerrar la operación',
        operationTimeExpired: 'El tiempo de operación ha expirado',
        buttonSeeAttachment: 'Ver archivo adjunto',
      },
      form: {
        errors: {
          requiredField: 'Este campo es requerido',
          minAndMax:
            'El valor debe estar entre el monto mínimo y el monto máximo',
          acceptTerms: 'Debe aceptar los términos y condiciones',
          notAmount: 'Ya no hay montos para operar con esta oferta',
          notOffersForCurrencyAndBank:
            'Consulte atención al cliente vía WS en horario hábil para habilitar esta opción.',
          notOffersForCurrency:
            'Consulte atención al cliente vía WS en horario hábil para habilitar esta opción.',
          notProcessed:
            'Actualmente no podemos procesar su oferta, intente más tarde.',
          amountBetween: 'El monto seleccionado debe estar entre ',
          comercialLimit: 'Un monto máximo de $ 2,000 es permitido ',
          firstBuy:
            'Tenga en cuenta que para su primera operación con nosotros, le solicitamos que inicie la transferencia en persona en su banco.',
          notBalance: 'Usted no tiene balance suficiente.',
          changePrice: 'Cambio el precio de la oferta',
          amountMaxLimit: 'El monto actual ha alcanzado el límite comercial',
          notOffers:
            'Actualmente no existen ofertas, por favor intente con otras opciones.',
          notBalanceExternal: 'Su saldo no es suficiente',
          server:
            'Disculpe ha ocurrido un error en el servidor, intente más tarde',
          userDaylyLimitReached: 'Ha excedido el límite diario',
          userMoytlyLimitReached: 'Ha excedido el límite mensual',
        },
        messages: {
          successRequest:
            'Su solicitud ha sido enviada, por favor diríjase al Histórico de Depósitos para finalizar la operación.',
          blueAlert:
            'Nota: Sus bitcoins estarán diferidos hasta que su depósito esté acreditado y sea verificado por\n' +
            'nuestro Operador. El sistema no admite reintegros ni cancelaciones. En algunos casos los\n' +
            'bancos pueden demorar en liberar los pagos, ésto depende del banco, la cuenta, el monto o si\n' +
            'se requieren validaciones adicionales.',
          redAlert:
            'Atención: La transferencia sólo podrá realizarla desde su cuenta bancaria verificada y\n' +
            'asociada a esta operación. En caso de hacerla desde otra cuenta su operación será anulada y\n' +
            'el pago reversado. Debe realizar el pago dentro del lapso establecido, marcar como Pago\n' +
            'Realizado y enviar un capture nítido al Operador. Coloque en Concepto de Pago: Compra de\n' +
            'Bitcoin con el código ID de la operación.',
          ethAlert:
            'Advertencia: Verifique que su código wallet contenga los datos correctos y correspondan a\n' +
            'esta criptomoneda. En caso de poner código erróneo puede perder el monto de su\n' +
            'transacción. El sistema no admite reintegros ni cancelaciones.',
        },
        fields: {
          fieldss: 'Campos',
          banks: 'Bancos/Oficinas',
          currency: 'Moneda',
          typeCheck: 'Tipo de cheque',
          placeholderCurrency: 'Seleccionar',
          paymentMethods: 'Medio de Pago',
          paymentsType: 'Tipo de Pago',
          messageToTheModerator: 'Mensaje para el Moderador',
          placeholderPaymentMethods: 'Seleccionar',
          placeholderSelect: 'Seleccionar',
          ownPaymentMethods: 'Medios de Pago Propios',
          typeElectro: 'Tipo de Transferencia Electrónica',
          placeholderOwnPaymentMethods: 'Seleccionar',
          commercialLimits: 'Límites comerciales',
          amount: 'Monto',
          amountFiat: 'Monto Fiat',
          amountBTC: 'Monto en BTC',
          forexRate: 'Tasa Forex',
          averagePriceReference: 'Precio referencial promedio',
          placeholderType: 'Seleccionar',
          placeholderComments:
            'Escriba su comentario para nuestros moderadores.',
          identifyBuy: 'Descripción de la operación (opcional)',
          accept: 'Aceptar',
          terms: 'Términos y Condiciones',
          buttonBuy: 'Depositar',
          reject: 'Abandonar oferta',
          createPaymentMethod: 'Crear',
          bankAccountBalance: 'Saldo bancario',
        },
      },
      modalCreatePayment: {
        header: 'Atención!',
        body: {
          h3: 'Before selecting your payment method, carefully read the following instructions.',
          p1: 'The rules for banking transactions change from country to country and even between banks. This can affect your operations.',
          p2: 'Keep in mind the following indications before making your Payment: ',
          list: {
            item1: {
              recommended: 'Recommended',
              header: ' Transfers from a Specific Bank',
              body: {
                p1: 'If you have a bank account within one of the banks that we specify in our list of accounts enabled to receive your payment, you can make your Electronic Transfer and your payment will be received and verified immediately. Therefore this means of payment guarantees speed in your transaction and except in very few countries generates bank fees.',
                p2: 'Note that in some cases this process may take several hours, which may delay the release of your Bitcoin..',
                p3: 'Important Note: Only use this option if you are the owner of the account from which you made the payment, and if it is within one of the specified banks. If you make the payment from a different bank your transaction will have a possible adjustment of the purchase rate and may generate additional charges.',
              },
            },
            item2: {
              header: 'Transfer from a Third Bank',
              body: {
                p1: 'Depending on the country and the bank, this payment is usually reflected in a period of 6, 24 or 48 working hours. If the payment falls on the same business day, the Purchase Price of your BTC will remain the same, but if the payment enters from the next day or following sub days, an adjustment can be made in your BTC Purchase Price rate..',
                p2: 'Our commercial policy stipulates to benefit our Users and to the commerce, but due to the strong variations of prices your purchase will be translated to the current price for the moment in which your money is available in our account.',
                p3: 'Also keep in mind that this type of Payment Method can generate additional bank charges.',
                p4: 'The extra charges charged by the bank and the variation of the BTC Purchase Price will determine the amount that will be credited to your wallet once the Purchase is completed.. ',
                p5: 'Important Note: Do not forget that we only accept payments made from an account in your name and that once the Transaction is made it will not be reversible under any circumstances. ',
              },
            },
            item3: {
              header: 'Cash deposit',
              body: {
                p1: 'Depending on the Country and the Banking Institution, cash deposits can be received (Cash). In most cases they must be limited amounts and you should check with each bank whether or not you receive cash deposits.',
                p2: 'The bank may ask you to justify the funds.',
                p3: 'You must always place on the Banking Receipt the Receipt or Transaction number issued by our platform, and write by hand and in legible handwriting "PURCHASE OF BITCOIN NON REFUNDABLE", once this is done take a photo and send the capture before you press the button of Payment Made.',
                p4: 'Payment will be credited immediately if you comply with all the instructions.',
                p5: 'For Cash Deposits of more than one thousand dollars or its equivalent in any currency, you must consult the moderator. ',
                p6: 'Important Note: If you choose the Cash Deposit option and make any other payment method such as Check or Bank Draft for example, your transaction will be deferred and may be reversed by the DollarBTC Operator, in addition to generating a penalty and a Red Flag to Your User Account For cash payments you must comply with these requirements and any other that the DLBTC Operator requests or that is required by the Laws for Prevention of Money Laundering or Prevention of Terrorist Activities in force.. ',
              },
            },
            item4: {
              header: 'Wire ',
              body: {
                p1: ' This means of payment is only available in some countries, the payment will be credited in the following 24 or 48 business hours.',
                p2: 'You must send fully readable operation support.',
                p3: 'The payer must check that he owns the account where the funds come from.',
                p4: 'This means of payment is available for operations of five thousand dollars and more. ',
              },
            },
            item5: {
              header: 'International transfer (Swift o Aba)',
              body: 'For this type of payment you should consult the Moderator. ',
            },
            item6: {
              header: 'Deposit in Check',
              body: 'For this type of payment you should consult the Moderator. ',
            },
          },
        },
        buttonAccept: 'Aceptar',
      },
      history: {
        terms: termsBuy,
        errors: {
          requiredField: 'Este campo es requerido',
          fileNotSupported: 'Tipo de archivo no soportado',
          exceededSize: 'Tamaño de archivo excede el permitido',
        },
        bill: {
          pdfHeader: 'Factura',
          header: 'Factura Digital',
          ticket: 'Ticket',
          time: 'Hora',
          date: 'Fecha',
          amountIn: 'Cantidad en ',
          amountBTC: 'Cantidad en BTC',
          amountFiat: 'Monto Fiat',
          currencyFiat: 'Moneda Fiat',
          appliedRate: 'Tasa aplicada',
          tax: 'Impuesto',
          bankRate: 'Tasa bancaria',
          issuingBank: 'Banco Emisor del Pago',
          namePayer: 'Nombre del Pagador',
          receivingBank: 'Banco de Recepción',
        },
        messages: {
          waitingPaymentExpired: 'Expiró el tiempo de su pago.',
          payVerificationSent: 'Notificación de pago enviada con éxito.',
          sentProofValidPayment:
            'Para concluir su depósito exitosamente debe adjuntar un comprobante de pago válido, claramente visible y con el número de transacción en el concepto de pago. Si no adjunta un comprobante de pago con estas características su operación no podrá ser verificada por el árbitro. Recuerde que debe concluir su pago antes del lapso establecido. Una vez adjunte el comprobante, presione el botón Marcar pago.',
          sentProof2:
            'Para concluir su depósito exitosamente debe adjuntar un\n' +
            '                      recibo válido, visible y claro, con el número de\n' +
            '                      transacción en el concepto de pago si no adjunta un\n' +
            '                      comprobante de pago claro y visible su operación no podra\n' +
            '                      ser verificada por el árbitro. Debe concluir su pago antes\n' +
            '                      del lapso establecido. Una vez que alla adjuntado el\n' +
            '                      recibo presione el boton ',
        },
        tableHeaders: {
          date: 'Fecha',
          amount: 'Monto',
          currency: 'Moneda',
          status: 'Estado',
          transactions: 'Transacciones',
          statusValues: {
            started: 'Iniciado',
            success: 'Exitosa',
            waitingPayment: 'Esperando por pago',
            canceled: 'Cancelada',
            paid: 'Pagado',
            claim: 'Reclamo',
            payVerification: 'Verificando pago',
            processing: 'En proceso',
          },
        },
        table: {
          previous: 'Anterior',
          next: 'Siguiente',
          loading: 'Cargando...',
          noData: 'No hay operaciones',
          page: 'Página',
          of: 'de',
          rows: 'filas',
          pageJump: 'ir a la página',
          rowsSelector: 'filas por página',
        },
        accordion: {
          details: 'Detalles de la operación',
          operation: 'Operación #:',
          terms: 'Términos y Condiciones',
          seeMore: '...Ver más',
          digitalBill: 'Factura digital',
          buttonDownload: 'Descargar',
          qualify: 'Calificar',
        },
        payWindow: 'Ventana de pago:',
        minutes: 'Min.',
        buttonMarkPayment: 'Marcar Pago',
        warningClaim: 'La operación está en un proceso de reclamo',
        placeholderMessage: 'Escribe tu mensaje aquí',
        claimNotificationSent: 'Notificación de reclamo enviada',
        buttonClaim: 'Realizar Reclamo',
        buttonSend: 'Enviar',
        buttonAttachment: 'Adjuntar documento',
        buttonCancel: 'Cancelar Depósito',
        buttonClose: 'Cancelar Depósito',
        labelMe: 'Yo',
        labelModerator: 'Moderador',
        operationTimeLeft: 'Quedan 10 minutes para cerrar la operación',
        operationTimeout: 'El tiempo de operación ha expirado',
        buttonSeeAttachment: 'Ver archivo adjunto',
        theOperation: 'La operación',
        wasCreated: ' fue creada exitosamente.',
        wasClaimed: ' ha entrado a un proceso de reclamo.',
        modalCancel: {
          header: 'Cancelar depósito',
          content:
            '¿Está seguro que desea cancelar esta operación de depósito?',
          buttonCancel: 'Cancelar',
          buttonClose: 'Cerrar',
          buttonAccept: 'Aceptar',
        },
        modalQualify: {
          header: 'Calificar operación',
          comment: 'Comentario',
          qualify: 'Calificar',
          send: 'Enviar',
          messageSuccess: 'Calificación realizada con éxito',
          messageError: 'Ha ocurrido un error, por favor intente más tarde',
        },
      },
      escrow: {
        wish: 'Desea',
        getMovementsScrow: 'Movimientos de Saldo en garantía',
        escrowAvaliable: 'Saldo Disponible',
        currency: 'Moneda',
        areyouSure: 'Esta seguro de continuar con esta operación?',
      },
    },
    homeMobile: {
      header: 'Descarga MoneyClick',
      text: 'en tu teléfono o tablet, regístrate y comienza a disfrutar del mejor sistema de compra en línea',
    },
    officeInfo: {
      name: 'Oficina',
      website: 'Sitio Web',
      workTime: 'Horario de trabajo',
      address: 'Dirección',
      phone: 'Teléfono',
    },
    chat: {
      headerTitle: '¡Hola!',
      subtitle: '¿Tienes alguna duda? Estamos listos para ayudar',
      placeholderSender: 'Escriba su pregunta... ',
      welcome: 'Bienvenido ',
      messageWelcomeRegister: '¿Cómo te podemos ayudar hoy?',
      messageWelcomeUnregister:
        'Por favor, indique su email para comenzar o continuar una conversacion reciente en este navegador',
      todayLabel: 'HOY',
      letsContinue: 'Continuemos...',
      userTaken:
        'Usted ya tiene una sesión iniciada en otro navegador o ventana',
      form: {
        name: 'Nombre',
        email: 'Email',
        buttonSend: 'Enviar',
        error: {
          emailWrong: 'Formato incorrecto',
          name: 'Campo requerido',
          email: 'Campo requerido',
        },
      },
    },
    navPublic: {
      lang: {
        es: 'Español',
        en: 'Inglés',
        resume: {
          es: 'Esp',
          en: 'Ing',
        },
      },
      account: {
        header: 'Cuenta',
        options: {
          login: 'Iniciar Sesión',
          signup: 'Registrarse',
          hft: 'Planes HFT',
          wallet: 'Wallet',
          sell: 'Vender Bitcoins',
          buy: 'Comprar Bitcoins',
          forum: 'Foro',
          fixedTermAccounts: 'Cuentas A Plazo Fijo',
        },
      },
    },
    instructive: instructive.es,
    legal: legal.es,
    sendMoneyClick: {
      header: 'A Usuarios MoneyClick',
      availableBalanceSend: 'Puede enviar hasta: ',
      availableBalance: 'Saldo disponible: ',
      placeholderRecipientPhone: 'Teléfono Destinatario',
      placeholderRecipientName: 'Nombre del Destinatario',
      amountInvalid: 'El monto excede el disponible',
      placeholderAmountFiat: 'Monto',
      equivalentUSD: 'Equivalente en USD: ',
      placeholderDescription: 'Descripción',
      toConstacts: 'Seleccionar de Contactos',
      toFrequents: 'Seleccionar de Frecuentes',
      send: 'Enviar',
      currency: 'Moneda',
      placeholderSelectedCurrency: 'Seleccione una moneda',
      errorPhone: 'Por favor, introduce un teléfono',
      errorReceiverName: 'Por favor, introduce un nombre',
      errorAmount: 'Por favor, introduce un monto superior',
      errorDescription: 'Por favor, introduce una descripción',
      errorValidCurrency: 'Usted no posee balance en la moneda requerida',
      errorValidCode: 'El código Qr no es un código válido',
      messageSuccessSend1: 'Hola',
      messageSuccessSend2: ' te ha enviado ',
      messageSuccessSend3:
        ' Para ver su saldo, vaya a la aplicación MoneyClick',
      messageSuccessSend4:
        ' te ha enviado dinero. Descargue la aplicación MoneyClick para recibirla. ',
      messageNotRegisterUser:
        ' debe registrarse para aceptar el pago MoneyClick, en caso contrario el dinero será reembolsado a su cuenta dentro de 6 horas aprox.',
      messageRegisterUser: 'El dinero será enviado a',
      errorReceiverPhoneMask:
        'El número del operador no puede comenzar con cero',
      errorCountry: 'Pulse en + para seleccionar un Codigo de País',
      contacts: 'Contactos',
      permisions: {
        title: 'SMS Permisos!',
        message: 'MoneyClick solicita permisos para enviar mensajes.',
        buttonPositive: 'Permitir',
        buttonNegative: 'Denegar',
      },
      modalFrequents: {
        title: 'Usuarios Frequentes',
        name: 'Nombre',
        codCountry: 'Código de país',
        phone: 'Teléfono',
        select: 'Seleccione:',
        messageConfirm: 'Eliminar usuario frecuente',
        partialMessage: '¿Desea eliminar a',
        succesDelete: 'ha sido eliminado exitosamente',
        yes: 'Si',
        not: 'No',
        notFrequents: 'No hay usuarios frequentes',
      },
      modal: {
        withoutBalance: 'Actualmente no dispones de saldo suficiente.',
        verifyData: 'Verificación de datos',
        dataOperation: 'Datos de la operación',
        amount: 'Monto a enviar: ',
        receiver: 'Enviar a: ',
        phone: 'Teléfono: ',
        description: 'Descripción: ',
        operationSuccess: 'Operación realizada exitosamente.',
        send: 'Enviar',
        addUserFrequent: 'Agregar como usuario frecuente',
        userDaylyLimitReached: 'Ha excedido el límite diario',
        userMoytlyLimitReached: 'Ha excedido el límite mensual',
        selectPhoneThisContacts:
          'Seleccione el número telefónico que desea utilizar',
        accept: 'Aceptar',
        password: 'Ingrese su contraseña para confirmar la operación',
        commission: 'Comisión: ',
        cancel: 'Cancelar',
        errorMachPassword: 'Error al validar contraseña',
        errorNotAuthUser: 'El Destinatario ha rechazado la transacción',
        errorAmountCommision:
          'El monto a enviar más la comisión excede el disponible',
        errorIsRequired: 'Campo requerido',
        errorInService: 'Ha ocurrido un error intente mas tarde',
      },
    },
    takePhoto: {
      header: 'Tomar una fotografía',
      buttonSave: 'Guardar',
      buttonCancel: 'Cancelar',
      buttonTake: 'Tomar',
      buttonRetake: 'Repetir',
      errorSaving: 'Ha ocurrido un error guardando la foto. Intente de nuevo',
    },
    inbox: {
      messages: {
        finished: {
          part1: 'La operación ',
          part2: ' ha cambiado su estado a: FINALIZADA',
        },
        newMessage: {
          part1: 'La operación ',
          part2: ' ha recibido un nuevo mensaje',
        },
        canceled: {
          part1: 'La operación ',
          part2: ' ha cambiado su estado a: CANCELADA',
        },
        waitingPayment: {
          part1: 'La operación ',
          part2: ' ha cambiado su estado a: ESPERANDO POR PAGO',
        },
        fail: {
          part1: 'La operación ',
          part2: ' ha cambiado su estado a: FALLIDA',
        },
        operationTimeLeft: 'Quedan 10 minutos para cerrar la operación',
        operationTimeExpired: 'El tiempo de operación ha expirado',
        paid: {
          part1: 'La operación ',
          part2: ' ha cambiado su estado a: PAGADA',
        },
        created: {
          part1: 'La operación ',
          part2: ' ha sido CREADA',
        },
        success: {
          part1: 'La operación ',
          part2: ' ha cambiado su estado a: EXITOSA',
        },
        claim: {
          part1: 'La operación ',
          part2: ' ha cambiado su estado a: RECLAMO',
        },
        payVerification: {
          part1: 'La operación ',
          part2: ' ha cambiado su estado a: VERIFICACIÓN DE PAGO',
        },
        receiverConfirmation: {
          part1: 'La operación ',
          part2:
            ' ha cambiado su estado a: ESPERANDO POR CONFIRMACIÓN DEL RECEPTOR',
        },
        noMessages: 'No tiene mensajes para mostrar',
      },
      read: 'Leídas',
      unread: 'No Leídas',
      notNotifications: 'No tiene notificaciones pendientes',
      popupSafari: {
        headerAuthSession: 'Autorizar audio',
        messageAuthSession:
          'Haga click en el botón para autorizar la reproducción de audio en esta sesión',
        buttonAuthorize: 'Autorizar',
        headerAuthPermanent: 'Autorización permanente',
        messageAuthPermanent:
          'Diríjase a configuraciones del navegador para autorizar a dollarBTC.com la reproducción automática de audio (solo para propósitos informativos sin publicidad de terceros)',
      },
    },
    sendBitcoins: {
      header: 'Enviar Crypto',
      address: 'Dirección del receptor',
      amount: 'Monto',
      red: 'Red',
      redLabel: 'Red a enviar',
      description: 'Descripción',
      headerLimits: 'Límites de operaciones',
      dailyLimits: 'Límite diario',
      monthlyLimits: 'Límite mensual',
      commission: 'Comisiones:',
      commissionExternal: 'Envíos a wallets externas',
      commissionInternal: 'Envíos a wallets internas',
      balanceAvailable: 'Saldo disponible',
      maxSend: 'Puede enviar hasta: ',
      modal: {
        header: 'Datos de la operación',
        accept: 'Aceptar',
        cancel: 'Cancelar',
        amountSend: 'Monto a Enviar',
        commission: 'Comisión',
        addressReceiver: 'Dirección del destinatario',
        description: 'Descripción',
        close: 'Cerrar',
        password: 'Ingrese su contraseña para confirmar la operación',
        operationSuccess: 'Operación realizada exitosamente.',
      },
      error: {
        invalidAmount: 'Por favor ingrese un monto válido',
        amountMin: 'Por favor ingrese un monto mayor a 0.001',
        setAddress: 'Por favor ingrese la dirección del destinatario',
        errorTypeAddress: 'Por favor ingrese una dirección válida',
        errorAmountCommision:
          'El monto a enviar más la comisión excede el disponible',
        errorAmountNotCommision: 'El monto a enviar excede el disponible',
        errorMachPassword: 'Error al validar contraseña',
        errorIsRequired: 'Campo requerido',
        errorOperation: 'Por favor intente más tarde',
        errorMissingRed: 'Por favor seleccione una Red',
      },
    },
    receiveBitcoins: {
      header: 'Recibir Crypto',
      addressCopied: 'Tu address ha sido copiada al portapapeles',
      loading: 'Cargando...',
      infoMessage: {
        p1: 'Para utilizar la Wallet es necesario que verifique su correo electrónico. Hemos enviado un email a',
        p2: 'por favor revisa tu correo electrónico y sigue las instrucciones.',
      },
      qrCode: 'Código QR',
      myAddress: 'Utiliza esta dirección para recibir ',
      buttonCopy: 'Copiar address',
      accordion: {
        txTitle: 'Transacciones entrantes',
        txBodyBTC:
          'Recibir Bitcoins suele llevar 40 a 60 minutos de acuerdo al monto. La transacción \n' +
          'entrante debe recibir 4 confirmaciones en la red Bitcoin para que aparezca en su Wallet.',
        txBodyETH:
          'Recibir Ethereum suele llevar 5 a 10 minutos de acuerdo al monto. La transacción \n' +
          'entrante debe recibir 20 confirmaciones en la red para que aparezca en su Wallet.',
        txBodyUSDT:
          'Recibir USDT suele llevar 5 a 10 minutos de acuerdo al monto. La transacción \n' +
          'entrante debe recibir 20 confirmaciones en la red para que aparezca en su Wallet.',
        commissionsHeaderBTC: 'Comisiones por Bitcoins entrantes',
        commissionsHeaderETH: 'Comisiones por Ethereum entrantes',
        commissionsHeaderUSDT: 'Comisiones por USDT entrantes',
        commissionsBody1: 'Entre wallets internas NO se aplica comisión.',
        commissionsBody2:
          'Para recibir de wallets fuera de MoneyClick NO se aplica comisión.',
        oldAddresses: 'Direcciones antiguas',
      },
      newAddressMessage:
        'Si deseas generar una nueva address para realizar\n' +
        '                    tus transacciones puedes presionar el botón "Generar address".\n' +
        '                    Recuerda que cada address tiene una duración de un mes, pero aún estará habilitada para realizar transacciones',
      buttonNewAddress: 'Generar address',
      tableOldAddresses: {
        headers: {
          created: 'Creada',
          address: 'Dirección',
        },
      },
      modalNewAddress: {
        header: 'Generar nueva address',
        body:
          '¿Desea generar una nueva address? Recuerde que esta nueva address tendrá una\n' +
          '                duración de un mes, pero aún estará habilitada para realizar transacciones al igual\n' +
          '                que todas la address previas.',
        buttonCancel: 'Cancelar',
        buttonGenerate: 'Generar',
        buttonClose: 'Cerrar',
        messageResult: {
          success: 'Nueva address generada exitosamente',
          error:
            'Ha ocurrido un error generando su nueva address. Intente más tarde',
        },
      },
      table: {
        headers: {
          type: 'Tipo',
          date: 'Fecha',
          amountBTC: 'Monto BTC',
          description: 'Descripción',
          status: 'Estado',
          amount: 'Monto',
        },
        cells: {
          coin: '\nMoneda: ',
          price: '\nPrecio: ',
          amount: '\nMonto: ',
          processing: 'PROCESANDO',
          failure: 'FALLIDA',
        },
        params: {
          previousText: 'Anterior',
          nextText: 'Siguiente',
          loadingText: 'Cargando...',
          noDataText: 'No hay transacciones',
          pageText: 'Página',
          ofText: 'de',
          rowsText: 'filas',
          pageJumpText: 'ir a la página',
          rowsSelectorText: 'filas por página',
        },
      },
    },
    buttonEuro: {
      header: 'Depósitos en Euros €',
      button: 'Click aquí',
    },
    receiveCard: {
      header: 'Tarjetas de recarga',
      titleTabEmit: 'Emitir',
      titleTaList: 'Mis tarjetas',
      codeQr: 'Código QR',
      idCard: 'Id card',
      create: 'Confirmar',
      cancel: 'Cancelar',
      accept: 'Aceptar',
      currency: 'Moneda',
      amount: 'Monto',
      type: 'Tipo',
      email: 'Email del destinatario',
      emailRequired: 'Requerido para enviar por correo',
      buttonSend: 'Enviar',
      buttonPrint: 'Imprimir',
      buttonReSend: 'Reenviar',
      errorRequest:
        'Su operacion no pudo ser procesada en este momento, intente más tarde',
      errorInData:
        'Faltan uno o mas campos requeridos para continuar, o alguno de ellos no posee el formato esperado',
      enoutBalance: 'Balance insuficiente en la moneda seleccionada',
      buttonApply: 'Aplicar/Canjear',
      messageModalResend: '¿Desea reenviar la tarjeta de recarga con el ID:',
      emailDestinatary: 'al correo del destinatario',
      notDataTable: 'No hay tarjetas registradas',
      notYetSend: 'La tarjeta de recarga no se ha enviado todavía',
      modal: {
        header: 'Solicitar/Canjear tarjeta de recarga',
        content: '¿Desea solicitar/canjear esta tarjeta de recarga?',
        amount: 'Monto:',
        code: 'Código:',
        yes: 'Si',
        no: 'No',
        close: 'Cerrar',
        errorGiftCardNotExist:
          'Esta tarjeta de recarga no es válida o no existe',
        alreadyUseGiftCard: 'La tarjeta de recarga ya ha sido canjeada',
        confirCreate: '¿Desea imprimir la tarjeta de recarga ID: ',
      },
    },
    faqs: {
      header: 'Preguntas Frecuentes (FAQ)',
      questions: {
        q1: {
          title: 'Acerca de Moneyclick',
          item1: {
            subtitle1: '¿Qué es MoneyClick?',
            content1:
              'MC es una red de negocios basada en una plataforma integral de comunicaciones y transacciones financieras.',
          },
          item2: {
            subtitle2: '¿Cómo funciona MoneyClick?',
            content2:
              'MC permite la interconexión de transacciones entre monedas locales soberanas y monedas virtuales como el bitcoin a través de los miembros de la red.',
            content3:
              'Por medio de protocolos informáticos los miembros están organizados en diferentes roles y funciones para permitir y garantizar que las operaciones fluyan dentro del sistema, intercambiando información y valores virtuales o físicos dentro de un ecosistema protegido y un entorno amigable y seguro.',
          },
          item3: {
            subtitle3: '¿Quién puede formar parte de la red?',
            content3:
              'Cualquier persona natural, empresa, organización o asociación legal puede formar parte de MC.',
          },
          item4: {
            subtitle4: '¿Cuáles son los roles dentro de la Red?',
            content1: 'Usuario',
            content2: 'Banquero',
            content3: 'Punto de Intercambio',
            content4: 'Socio Operador',
            content5: 'Socio Administrador',
            content6: 'Administrador Maestro',
          },
          item5: {
            subtitle5: '¿Cuál es la función de cada rol en el sistema?',
            content1: 'Usuario: ',
            content2:
              'El Usuario es cualquier miembro que se registra y opera en la red.',
            content3: 'Banquero: ',
            content4:
              'Un Usuario que certifica cuentas bancarias y aparta un fondo como garantía para respaldar transacciones puede convertirse en Banquero. Cuanto mayor sea su fondo de garantía más volumen podrá validar en los libros de órdenes de intercambio del sistema.',
            content5: 'Punto de Intercambio MC: ',
            content6:
              'Son locales comerciales afiliados para canjear saldo por efectivo u otro tipo de pagos',
            content7: 'Socio Operador: ',
            content8:
              'El Socio Operador es un Usuario MC que ha invertido en un fondo de garantía común que permite compensar transacciones externas con otros Socios Operadores de la red.',
            content9: 'Socio Administrador: ',
            content10:
              'Socio que administra su propia red de usuarios y desea integrar a la red MC, puede ser un país, gremio, asociación o grupo organizado.',
            content11: 'Master Admin: ',
            content12:
              'Es el sistema central de administración que regula, controla y gestiona la red global MC.',
          },
          item6: {
            subtitle6: '¿Cómo se toman las decisiones?',
            content1:
              'Por votación entre los miembros asociados, en la medida que se sumen nuevos socios y se amplíe la red se abrirán oportunidades de expansión y participación.',
          },
          item7: {
            subtitle7: '¿Cómo se fijan las tasas, tarifas y comisiones de MC?',
            content1:
              'Nuestro sistema de cálculo de tasas de intercambio de monedas permite obtener tasas a precios competitivos de mercado ajustados en tiempo real para realizar tus cambios dentro del sistema.',
            content2:
              'El esquema de comisiones busca el beneficio de toda la comunidad, para que los intercambios generen beneficios pero se mantengan siempre por debajo de las tasas y costos del sistema financiero tradicional.',
          },
          item8: {
            subtitle8: '¿Puedo comprar o pagar en bitcoin a través de MC?',
            content1:
              'Si puedes pagar o cobrar directamente en bitcoin. El traspaso es instantáneo y gratis si ambas partes están dentro de MC.',
            content2:
              'MC no está diseñada para transacciones de bitcoin a plataformas externas por medidas de seguridad a los usuarios y al ecosistema en sí.',
            content3:
              'Adicionalmente puedes transar en tu moneda local o cualquier otra moneda de tu preferencia dentro del sistema.',
            content4:
              'De esta manera no tendrás que trasladar el precio de tus productos a bitcoin o viceversa, ni preocuparte por las fluctuaciones del cambio al realizar una transacción. El sistema hará el cálculo implícito de cambio por ti a la tasa de mercado.',
            content5:
              'En cualquier momento que lo consideres oportuno podrás cambiar tus saldos de moneda local a bitcoin o viceversa sin riesgos ni complicaciones y con tasas y comisiones siempre actualizadas y competitivas.',
          },
          item9: {
            subtitle9:
              '¿Si tengo un establecimiento comercial puedo vender mis productos y cobrar con MC?',
            content1:
              'Por medio de MC cualquier comercio puede aceptar pagos en bitcoin traducidos al valor nominal de la moneda en curso por código qr y a una tasa de mercado competitiva ajustada en tiempo real. Puedes recibir en cualquier moneda y cambiar a otra (incluyendo bitcoin) cuando lo consideres oportuno.',
          },
          item10: {
            subtitle10:
              '¿Si tengo un establecimiento comercial puedo convertirme en Centro de Intercambio MC?',
            content1:
              'Si, puedes hacer la solicitud formal y aparecer en el GPS de puntos activos, además percibir comisiones por los avances o recepción de efectivo que realices.',
          },
          item11: {
            subtitle11: '¿Existe algún token nativo de MC?',
            content1:
              'Un porcentaje de las ganancias operativas y cambiarias de la red MC será destinado a un fondo para el lanzamiento del token nativo con el que la plataforma bonificará a sus miembros más activos.',
          },
          item12: {
            subtitle12: '¿Cuando nace MC?',
            content1:
              'En el año 2017 se conforma el proyecto inicial y en febrero del 2020 se lanza la primera versión Beta. En septiembre 2020 se lanza la app al público iniciando operaciones en Estados Unidos, Europa y Latinoamérica.  Hasta febrero del 2021 lleva más de 200 mil descargas y un millón de operaciones exitosas con usuarios registrados en 172 países.',
          },
          item13: {
            subtitle13: '¿Cuál es el objetivo principal de MC?',
            content1:
              'Ser la red integral de negocios más grande y segura del mundo.',
          },
          item14: {
            subtitle14: '¿Quienes pueden Usar MoneyClick?',
            content1:
              'Cualquier persona con un dispositivo móvil inteligente y un correo electrónico válido.',
          },
          item15: {
            subtitle15: '¿Quién representa a MoneyClick a nivel legal?',
            content1:
              'Los socios desarrolladores de moneyclick delegamos la representación legal de la plataforma en la empresa Mountain View Pay llc, con sede en el Estado de Georgia de los Estados Unidos de América.',
          },
        },
        q2: {
          title: 'Sobre la Aplicación Móvil',
          item1: {
            subtitle1: '¿Cómo verifico mi número celular?',
            content1:
              'Mediante el código de verificación SMS. Este se utiliza para verificar tu número de teléfono cuando te registras por primera vez. Si no puedes recibir este mensaje en su teléfono, debes verificar que:',
            subContent11: 'Tu número celular está correcto.',
            subContent12:
              'Tienes descargada la versión más reciente de la aplicación MC',
            subContent13:
              'Tienes descargada la versión más reciente del sistema operativo de tu teléfono',
            content2:
              'Si aún no puede recibir el código de verificación por SMS, prueba las siguientes soluciones:',
            subContent21: 'Asegúrese de tener activa la señal de teléfono.',
            subContent22: 'Apaga tu conexión wi-fi para usar sus datos móviles',
            subContent23: 'Habilita los permisos de SMS en tu dispositivo',
            subContent24:
              'Cierra todas las demás aplicaciones y procesos abiertos que puedan estar ejecutándose en segundo plano.',
            subContent25:
              'Autoriza en las aplicaciones de firewall el permiso para activar MC.',
            content3:
              'Si ha probado todos los consejos anteriores y aun así no puede activar el servicio, comuníquese con nuestro Servicio de Soporte Tecnico disponible en inglés y español.',
          },
          item2: {
            subtitle1: '¿Puedo cambiar de línea telefónica asociada?',
            content1:
              'Si ha cambiado recientemente su número de teléfono y necesita actualizarlo para iniciar sesión en su cuenta MC, necesitaremos verificar su identidad para garantizar la protección y seguridad de su cuenta.',
            content2:
              'Este proceso incluye enviar una fotografía suya con su identificación y un código de 4 dígitos, que le enviaremos por correo electrónico. Todo el proceso tardará unas 48 horas en completarse.',
          },
          item3: {
            subtitle1:
              '¿Por qué MC pide permiso para acceder a mis Contactos, a mi Cámara de Fotos y a mi GPS?',
            content1:
              'Puedes enviar mensajes, información o pagos a cualquier contacto sin necesidad de volver a escribirlo al seleccionarlo de tu Agenda de Contactos, así evitas posibles errores al ingresar el número celular. Si es un número nuevo puedes agregarlo y quedará registrado en tus contactos para próximos envíos.',
            content2:
              'La cámara te permite escanear el código QR para retiros o recargas en centros de intercambio o para realizar pagos o cobros sin necesidad de intercambiar tu número de teléfono.',
            content3:
              'El acceso a tu GPS te permite ubicar comercios afiliados a la red cerca de ti.',
          },
          item4: {
            subtitle1: '¿Qué pasa si hago un envío MC a un número equivocado?',
            content1:
              'Cuando ingreses el número de un nuevo destinatario la aplicación te informa si ese número está inscrito en el sistema. Si está inscrito verás el nombre o seudónimo de registro tal como aparece en el sistema. Si ese nombre no coincide con los datos de tu contacto puedes cancelar la operación antes de la confirmación requerida para concluir el envío.',
            content2:
              'Debes asegurarte que el número que estás agregando es correcto antes de colocar la clave de confirmación.',
            content3:
              'Para transacciones de montos altos en bitcoin o cualquier moneda soberana con personas o comercios que no sean de confianza te recomendamos usar el lector de código QR para mayor seguridad.',
            content4:
              'MC no se hace responsable de envíos a números equivocados por error del Usuario, una vez confirmado no podrás cancelar la operación.',
          },
          item5: {
            subtitle1:
              '¿Puedo enviar saldo a un contacto que no tenga descargada MC?',
            content1:
              'Si puedes hacer el envío y el beneficiario recibirá un SMS notificando que ha recibido un envío de tu parte con un enlace de invitación para descargar la aplicación.',
            content2:
              'El beneficiario tendrá seis horas para descargar y validar su celular en la aplicación. Si no lo hace dentro de las seis horas siguientes el envío se cancela y el saldo se devolverá a tu cuenta MC.',
          },
          item6: {
            subtitle1: '¿Necesito Validar mi Identidad para usar MC?',
            content1:
              'Si vas a operar con cuentas de bancos debes validar tu identidad por el proceso de KYC.',
          },
          item7: {
            subtitle1: '¿Necesito una cuenta bancaria para usar la APP?',
            content1: 'No necesitas una cuenta bancaria para usar MoneyClick.',
          },
          item8: {
            subtitle1: '¿Puedo tener MoneyClick siendo menor de edad?',
            content1:
              'Debes estar habilitado legalmente por las autoridades de tu país o requerir la representación de un adulto para habilitar ciertas funciones.',
          },
          item9: {
            subtitle1:
              '¿Puedo incrementar mis límites de transacciones diarios o mensuales?',
            content1:
              'Si puedes pero debes estar verificado (KYC) y tener saldo o movimientos que justifiquen el aumento de límites. Para transacciones bancarias especiales puedes contactar al Centro de Servicio al Cliente y este canaliza tu petición con el Socio Operador correspondiente.',
          },
          item10: {
            subtitle1:
              '¿Puedo obtener una referencia comercial o de saldo de MoneyClick?',
            content1:
              'Si puedes, escribe a nuestro Centro de Atención o solicítala por email, debes tener verificados tus datos personales y mantener un saldo en tu cuenta superior a cien dólares americanos o su equivalente.',
          },
          item11: {
            subtitle1: '¿Puedo tramitar fideicomisos con MoneyClick?',
            content1:
              'En algunos países podemos tramitar cartas de crédito, fianzas y cualquier tipo de fideicomiso de fondos. Para transacciones inmobiliarias el costo es de 0,5% del monto en garantía incluyendo la certificación de pago, fianza o depósito en custodia con servicio de notaría virtual. Si la garantía contractual se establece en bitcoin este servicio puede ser utilizado en cualquier parte del mundo.',
            content2: 'Contactanos para mayor información.',
          },
          item12: {
            subtitle1: '¿Como puedo cargar saldo en mi cuenta MC?',
            content1:
              'Compra saldo a otro usuario o en un Centro de Intercambio MC.',
            content2: 'Ingresa Bitcoins.',
            content3: 'Depósitos bancarios (disponible en algunos países).',
            content4: 'En locales afiliados.',
            content5: 'Por Tarjetas Gift Card.',
          },
          item13: {
            subtitle1: '¿Quién tiene acceso a mis datos de registro?',
            content1:
              'La información es confidencial y está protegida por leyes internacionales BSA a las cuales nos adherimos en nuestro Manual de Cumplimiento, lo que nos prohíbe compartirla con terceros. Al verificar tu cuenta en nuestro sistema se te presenta un Contrato de Aceptacion de Seguridad de Datos donde se especifica que tu información no será compartida y solo nuestro Oficial de Cumplimiento encargado tiene acceso a los archivos de registro, en caso de pagos bancarios la información puede ser solicitada por el Socio Operador en dicho país para validar o emitir un  pago, salvo ese caso tus datos no serán compartidos a menos que sean solicitados por una instancia legal en base a un requerimiento firme emanado de un organismo policial o tribunal con la debida competencia y acreditación. Para las personas que realicen operaciones bancarias con base en los Estados Unidos de América, sus datos personales y operacionales serán reportados al FINCEN y la OFAC por razones de ley cuando superen el límite de tres mil dólares americanos durante un lapso de 30 días continuos. En algunos países ciertas instituciones de control financiero pueden solicitar información sobre datos privados los cuales por ley deben ser compartidos con los fines pertinentes.',
          },
          item14: {
            subtitle1: '¿Cual es el beneficio de usar MoneyClick?',
            content1:
              'Ser parte de una red autónoma e integral de negocios a nivel global basada en nuevas tecnologías financieras y de comunicación.',
          },
        },
        q3: {
          title: 'Sobre el Bitcoin',
          item1: {
            subtitle1: '¿Qué es un Bitcoin?',
            content1:
              'El Bitcoin es una unidad de valor transmisible a través de una red pública cifrada de datos denominada blockchain, donde se asientan todas las transacciones realizadas dentro de la red de bitcoin.',
          },
          item2: {
            subtitle1: '¿Qué respaldo tiene el Bitcoin?',
            content1:
              'Actualmente el Bitcoin es usado como instrumento de canje confiable o como reserva de valor por más de cien millones de personas y empresas en el mundo.',
          },
          item3: {
            subtitle1:
              '¿Cuál es la ventaja de usar MC para mis transacciones de bitcoin?',
            content1:
              'La principal ventaja es seguridad. Cada operación está vinculada a un número de teléfono por lo que pueden ser rastreada y localizada. Además de protegerte de transacciones riesgosas te permite intercambiar tus bitcoin con tu monedas nacionales soberanas sin salir de tus btc.',
            content2:
              'Esta seguridad adicional te protege de riesgos asociados a operaciones realizadas con operadores criminales encubiertos en el anonimato.',
          },
          item4: {
            subtitle1:
              '¿Puedo recibir o enviar Bitcoins desde mi cartera MoneyClick?',
            content1:
              'Puedes recibir y enviar Bitcoins sin costo y sin límites desde tu cartera MoneyClick de Bitcoins. Si recibes o envías dentro de MC es gratis, pero si envías a una plataforma externa tendrás un cargo por envío que puede variar según las comisiones de blockchain.',
          },
          item5: {
            subtitle1:
              '¿Cuales son los límites para el envío o recepción de bitcoin en MoneyClick?',
            content1:
              'Para ingresos no hay límites, para traspasos a plataformas externas el límite mínimo de retiro es de 100 dólares o su equivalente. Dentro de MC puedes hacer traspasos sin limites ni costo. Las transacciones por montos altos pueden estar sujetas a revisiones especiales.',
          },
          item6: {
            subtitle1: '¿Puedo comprar o vender Bitcoins dentro de MoneyClick?',
            content1:
              'Si, para comprar o vender bitcoin solo vas a la cartera de Bitcoins y marcas el botón Comprar/Vender.',
            content2: 'Vender',
            subContent21:
              'Si tienes Bitcoins y deseas convertirlos en una moneda fiat (nacional) el sistema te muestra la tasa de intercambio en tiempo real más comisiones.',
            content3: 'Comprar',
            subContent31:
              'Si tienes un saldo en moneda fiat (nacional) y deseas comprar, se te mostrará el detalle previo de la operación con tasa de intercambio y comisiones.',
            content4:
              'Después de aprobar, el sistema emite un recibo digital y realiza el cargo automático a las carteras correspondientes.',
          },
          item7: {
            subtitle1: 'Tiempo de Retención',
            subtitle2: '¿Por qué mis Bitcoins no se liberan inmediatamente?',
            content1:
              'Intercambiar bitcoin entre diferentes plataformas involucra un alto nivel de riesgos y responsabilidades. Tener un tiempo de protección es vital para evitar fraudes y proteger a nuestros Usuarios.',
            content2:
              'MoneyClick te proporciona un ambiente seguro y confiable para tus transacciones.',
            content3:
              'Nuestra solución está diseñada para que cualquier persona sea experta o no pueda operar de una manera fácil y segura.',
            content4:
              'Las carteras de bitcoin conectadas en caliente a la red sin ningún tipo de administrador o control pueden ser peligrosas incluso para los más expertos. Perder la clave o ser robados por piratas digitales son riesgos reales de los que te expones.',
            content5:
              'Para contener riesgos MC no permite salidas instantáneas de bitcoin sin la debida diligencia y comprobación de seguridad.',
            content6:
              'Cualquier transacción externa será analizada y aprobada en lotes de salidas y las que se consideren de alto riesgo o sospechosas serán apartadas para procesos adicionales de verificación.',
            content7:
              'Queremos forjar una fuerte relación de seguridad e integridad dentro de nuestra comunidad de usuarios.',
            content8:
              'Recuerda que al aprobar una transacción de salida de bitcoin ya no hay vuelta atrás.',
            content9:
              'Para realizar intercambios instantáneos te ofrecemos usar el envío entre Usuarios MoneyClick, (incluso en BTC) el cual es privado, seguro, instantáneo y sin costo.',
            content10:
              'Está siempre atento a las notificaciones de MC en caso de recibir alguna que desconozcas comunicate con nosotros de inmediato. Cualquier salida externa podrás anularla durante las primeras 12 horas.',
          },
          item8: {
            subtitle1: '¿Dónde se depositan mis Bitcoins?',
            content1:
              'Tus Bitcoins están protegidos en una bóveda fría (aislada) y se dejan en la red solo un 30% para compensar operaciones de ventana. De esta manera protegemos los fondos de piratas informáticos o accesos no autorizados.',
            content2:
              'Recuerda que si recibes alguna notificación de retiro de Bitcoins en tu celular que no ha sido realizada por ti, dispones de varias horas para comunicarte con nosotros y bloquear la operación.',
          },
          item9: {
            subtitle1:
              '¿Mi cartera de Bitcoins cambia después de cada operación?',
            content1:
              'No de manera automática, aunque puedes solicitar una nueva address por nuestra web ',
            content2: 'http://moneyclick.com ',
            content3:
              'en la sección Recibir Bitcoins. Todas las operaciones entrantes a la nueva address solicitada o a las anteriores, se procesarán de manera automática, sin necesidad de acción especial del usuario.',
            content4:
              'Si manejas grandes montos o deseas una cartera estática caliente con llaves privadas puedes solicitar un servicio de custodia especial con bóveda de seguridad programable, este servicio es opcional y está disponible para clientes comerciales con cargos adicionales.',
          },
        },
        q4: {
          title: 'Sobre los Pagos Bancarios',
          item1: {
            subtitle1:
              '¿Puede MC realizar depósitos y transferencias a bancos?',
            content1:
              'MC realiza operaciones de intermediación bancaria de forma doméstica en distintos países a través de Socios Operadores de nuestra red, evitando así los altos costos de las transferencias internacionales para nuestros Usuarios.',
            content2:
              'Sin embargo MC no es un banco, y su papel como intermediario bancario está limitado a las restricciones legales y bancarias de cada entidad y país.',
            content3:
              'Por esa razón las operaciones pueden presentar diferentes límites, condiciones, tiempos de respuesta o costos.',
          },
          item2: {
            subtitle1: '¿Puedo retirar saldo a mi cuenta bancaria desde MC?',
            content1:
              'MC ofrece varias opciones para retirar dinero a bancos, dependiendo del país donde se efectúe el retiro.',
            content2:
              'Cada método de retiro tiene diferentes límites de transacción, tarifas y tiempos de procesamiento.',
          },
          item3: {
            subtitle1:
              '¿En qué países MC puede realizar intermediación bancaria?',
            content1:
              'Países o regiones donde actualmente podemos procesar retiros o depósitos a bancos:',
            content2: 'Argentina',
            content3: 'Canadá',
            content4: 'Colombia',
            content5: 'Chile',
            content6: 'México',
            content7: 'Panamá',
            content8: 'Venezuela',
            content9: 'Usa',
            content10: 'Zona Sepa',
            content11: 'Suiza',
            content12: 'UK',
            content13:
              'Dependiendo del país y la liquidez de nuestros socios operadores las operaciones pueden tener diferentes requerimientos especiales.',
            content14:
              'En determinados casos ciertas restricciones se pueden aplicar.',
          },
          item4: {
            subtitle1:
              '¿Se pueden hacer envíos bancarios a terceros usando MC?',
            content1:
              'Las transferencias bancarias a terceros están sujetas a restricciones especiales que incluyen una comunicación previa con el beneficiario que debe confirmar por escrito la aceptación del dinero antes de ser transferido. Esto puede retrasar los envíos a terceros y generar costos adicionales.',
            content2: 'En determinados casos ciertas restricciones aplican.',
          },
          item5: {
            subtitle1: '¿Se pueden hacer transferencias Swift?',
            content1:
              'Para los clientes especiales o comerciales que manejan montos superiores a los límites de retiros y depósitos establecidos en la plataforma ponemos a disposición nuestro servicio de pagos internacionales certificados, para este servicio contacte con nuestro Centro de Atención al Cliente. ',
          },
          item6: {
            subtitle1: '¿Puedo depositar saldo de mi cuenta bancaria a MC?',
            content1:
              'Si estás en un país donde la red MC cuente con Socios Operadores puedes realizar depósitos de saldo en MoneyClick desde tu cuenta bancaria.',
            content2:
              'Para habilitar esta opción debes cumplir los 4 niveles de registro:',
            subcontent21:
              '1. Validar número Celular válido. (Línea real no virtual)',
            subcontent22: '2. Validar Correo Electrónico válido.',
            subcontent23:
              '3. Completar Planilla de Registro y subir los siguientes recaudos:',
            subcontent23a: 'a. ID',
            subcontent23b: 'b. Selfie',
            subcontent23c: 'c. Comprobante de domicilio',
            subcontent23d: 'd. Comprobante de Cuenta Bancaria',
            subcontent24:
              '4. Certifica la Cuenta Bancaria a tu nombre desde la cual puedes hacer el depósito a MC.',
            content3:
              'Si no has cumplido los 4 niveles de seguridad o tus datos presentan inconsistencias es posible que tu depósito se mantenga retenido hasta que tu información pueda ser confirmada.',
          },
          item7: {
            subtitle1:
              '¿Cuales son los documentos para validar identidad aceptados por MC?',
            content1: '1. Tipo de identificación personal Válidos Aceptados',
            subcontent11: 'a. Pasaporte',
            subcontent12: 'b. Licencia de conducir',
            subcontent13: 'c. Tarjeta de identificación nacional',
            subcontent13i: 'i. Requisitos de los documentos de identificación',
            subcontent13i1: '1. Copia en color',
            subcontent13i2: '2. Mostrar la fecha de nacimiento completa',
            subcontent13i3: '3. Completamente claro, legible y nítido',
            subcontent13i4: '4. Nombre y apellido completos',
            subcontent13i5: '5. Fecha de caducidad válida',
            content2: '2. Selfie con ID',
            subcontent21: 'a. Completamente nítida',
            subcontent22: 'b. Sin anteojos ni gorras',
            subcontent23: 'c. Sin ningún tipo de edición o alteración',
            content3:
              '3. Comprobantes de dirección y Cuenta Bancaria Aceptados',
            subcontent31: 'a. Utility bill',
            subcontent32: 'b. Credit card bill',
            subcontent33: 'c. Monthly bank statement',
            subcontent33i: 'i. Requirementos',
            subcontent33i1: '1. Issue date less than 3 months old',
            subcontent33i2: '2. Logo of company / bank',
            subcontent33i3: '3. Full name matches user',
            subcontent33i4: '4. Display the full address',
            subcontent33i5: '5. Written with Latin characters',
          },
          item8: {
            subtitle1:
              '¿Quién hace o recibe los pagos bancarios en nombre de MoneyClick?',
            content1:
              'MoneyClick tiene una red de agentes comerciales asociados denominados Operadores para representarnos en distintos países o regiones.',
          },
          item9: {
            subtitle1:
              '¿Cuál es el beneficio de ser socio Operador de MoneyClick?',
            content1:
              'Los socios Operadores obtienen comisiones por su gestión como intermediarios bancarios.',
          },
          item10: {
            subtitle1: '¿Qué es un Punto de Intercambio MoneyClick?',
            content1:
              'Cualquier establecimiento comercial afiliado a la red que gestione pagos, avances o recepción de efectivo o venta de saldo de MC.',
          },
        },
        q5: {
          title: 'Sobre los Dispositivos de Acceso',
          item1: {
            subtitle1: '¿Desde qué dispositivos puedo acceder a MC?',
            content1:
              'Cualquier teléfono Android o IOS con línea celular y con internet. También puedes acceder desde un ordenador, tablet o laptop por nuestra página web.',
          },
          item2: {
            subtitle1: '¿Por qué me dice: Falla de conexión intente más tarde?',
            content1:
              'Si tu conexión a internet es débil o inestable el sistema bloquea la transmisión de datos. Los tiempos de respuesta con el servidor están limitados para que no queden abiertos y puedan ser interceptados o expuestos.',
            content2:
              'En la mayoría de los casos este problema se resuelve cerrando la app, reiniciando el dispositivo y buscando una mejor señal de internet.',
            content3:
              'Si el problema persiste contacta nuestro Centro de Soporte Técnico para asistencia.',
          },
          item3: {
            subtitle1:
              '¿Por qué no puedo abrir la aplicación en mi dispositivo?',
            content1:
              'En algunos casos la falta de memoria o fallas en el sistema operativo de tu dispositivo impiden que la plataforma se abra correctamente.',
            content2: 'En estos casos te recomendamos:',
            subContent1: 'Aumentar o liberar espacio de tu memoria.',
            subContent2: 'Eliminar y reinstalar la app en tu celular.',
            subContent3: 'Reiniciar el celular.',
            content3:
              'Si el problema persiste contacta nuestro Centro de Soporte Técnico para asistencia',
          },
          item4: {
            subtitle1:
              '¿Por qué me dice dispositivo no autorizado cuando trato de abrir la APP desde mi celular?',
            content1:
              'En algunos casos las actualizaciones de software renuevan los códigos de seguridad y tu dispositivo puede perder el vínculo con el sistema.',
            content2: 'Para resolver sigue las instrucciones para ',
            content3: 'Activar/Desactivar Dispositivos del Menu Profile ',
            content4: 'accediendo por nuestra web ',
            content5: 'http://moneyclick.com',
          },
          item5: {
            subtitle1:
              '¿Qué pasa si extravío o cambio mi celular por uno nuevo?',
            content1:
              'Si pierdes o cambias tu celular vinculado sigue las instrucciones para activar o desactivar dispositivos autorizados a tu cuenta.',
          },
          item6: {
            subtitle1:
              '¿Como puedo Activar o Desactivar los dispositivos de acceso?',
            content1:
              'Instrucciones para Activar/Desactivar Dispositivos Asociados:',
            content2: 'Entra a ',
            content3: 'http://moneyclick.com',
            content4: 'Accede a tu cuenta con tu número de celular y clave.',
            content5: 'Ve a: Perfil>Cuenta>Seguridad>Dispositivos>Acciones',
            content6:
              'Allí revisa la lista de dispositivos celulares u ordenadores desde los que has ingresado al sistema, selecciona el nombre del dispositivo extraviado y en la columna derecha superior: ',
            content7: '“Acciones” ',
            content8:
              ', oprime la Opción  / Desactivar o Eliminar. Puedes bloquear provisional o permanentemente el acceso a cualquier equipo asociado a tu cuenta.',
            content9:
              'En caso de recuperar tu dispositivo o comprar uno nuevo, realiza la misma operación en “Acciones” marcando “Activar” para permitir de nuevo el vínculo.',
            content10:
              'Si un dispositivo es desactivado ya no podrá ingresar aunque introduzcas la clave.',
            content11: 'Importante:',
            content12:
              ' Recuerda si es un celular nuevo debes descargar previamente la App y cargar tus datos de acceso para que el sistema lo reconozca y puedas Activarlo.',
          },
          item7: {
            subtitle1: '¿MC dispone de doble factor de seguridad?',
            content1: 'Si, para activar esta función entra a ',
            content2: 'MoneyClick Web',
            content3: ' y confirma la activación en: ',
            content4: 'Activar 2FA en Menu Profile.',
            content5:
              ' Esto genera un doble factor de seguridad a tu cuenta por la web y podrás seleccionar opcionalmente SMS o utilizar la herramienta de Google Authenticator (recomendada) para recibir el código dinámico de acceso.',
          },
        },
      },
    },
    buyBTC: {
      header: 'Comprar Crypto',
      modal: {
        accept: 'Aceptar',
        totalToReceive: 'Total a Recibir',
        totalToSend: 'Total a Enviar',
        confirm: 'Salir',
        cancel: 'Cancelar',
        amountSend: 'Monto a Enviar',
        buyReceipt: 'Recibo de Compra',
        sellReceipt: 'Recibo de Venta',
        changeFactor: 'Precio de Cambio', //"Factor de Cambio",
        changeFactorInverse: 'Precio de Cambio',
        amountReceive: 'Monto a Recibir',
        tax: 'Tax',
        Commission: 'Comisión',
        rejectBuy: 'Rechazar Compra',
        acceptBuy: 'Aprobar Compra',
        rejectSell: 'Rechazar Venta',
        acceptSell: 'Aprobar Venta',
        timetoproceed:
          'Sus bitcoins serán acreditados en las próximas 72 horas hábiles',
        close: 'Cerrar',
      },
      pdf: {
        buy: 'Comprar',
        sell: 'Vender',
        invoice: 'Recibo',
      },
    },
    sellBTC: {
      header: 'Vender Crypto',
      modal: {
        accept: 'Aceptar',
        totalToReceive: 'Total a Recibir',
        totalToSend: 'Total a vender',
        confirm: 'Salir',
        cancel: 'Cancelar',
        amountSend: 'Monto a Vender',
        buyReceipt: 'Recibo de Compra',
        sellReceipt: 'Recibo de Venta',
        changeFactor: 'Precio de Cambio', //"Factor de Cambio",
        changeFactorInverse: 'Precio de Cambio',
        amountReceive: 'Monto a Recibir',
        tax: 'Tax',
        Commission: 'Comisión',
        rejectBuy: 'Rechazar Compra',
        acceptBuy: 'Aprobar Compra',
        rejectSell: 'Rechazar Venta',
        acceptSell: 'Aprobar Venta',
        timetoproceed:
          'Sus bitcoins serán acreditados en las próximas 72 horas hábiles',
        close: 'Cerrar',
      },
      pdf: {
        buy: 'Comprar',
        sell: 'Vender',
        invoice: 'Recibo',
      },
    },
    fiatCarouselStatistics: {
      buy: 'Compra:',
      sell: 'Venta:',
      usdChange: 'Cambio USD',
      forexPrice: 'Precio Forex',
      statistics: 'Estadísticas',
      footerLabel:
        'Precios Referenciales del Bitcoin a Nivel Local en todo el Mundo',
    },
    newHome: {
      title: '¡El Banco Local del Mundo!',
      contact: 'Contáctanos',
      subTitle: 'Deposita o retira tu saldo en:',
      nationalBanks: 'Bancos Nacionales',
      cryptoCurrency: 'Criptomonedas',
      creditCard: 'Credit card',
      buyAuthorized: 'Compra nuestras Gift Cards en comercios autorizados',
      questionUse: '¿Cómo funciona MoneyClick?',
      visitYoutube: 'visita nuestro canal de Youtube',
      haveQuestion: '¿Tienes preguntas? podemos ayudarte',
      contactMessage:
        'Contáctanos vía Whatsapp a través de nuestros números de atención inmediata en horarios de lunes a domingo de 8am a 8pm Hora de New York.',
      customerService: 'Atención al Cliente',
      mexService: 'Centro de Atención México',
      comercialAtention: 'Atención Comercial',
      techSupport: 'Soporte Técnico',
      inmediatPaymentTitle: 'Pagos Intrared inmediatos sin costos',
      inmediatPaymentMessage:
        'Tus transacciones dentro de la red son gratis, instantáneas e irreversibles en cualquier moneda y desde cualquier país.',
      antiFraudTitle: 'Protección antifraude y de datos personales',
      antiFraudMessage:
        'Paga o cobra sin exponer tus datos personales, solo con tu celular o QR y evita el fraude por cancelación, reverso o pago diferido.',
      freeConvertTitle: 'Libre convertibilidad Monetaria',
      freeConvertMessage:
        'El cambio rápido te permite pagar o enviar en cualquier moneda sin ninguna complicación, a la mejor tasa del mercado y tener tu saldo en tu moneda preferida.',
      secureTitle: 'Conexión segura a Blockchain',
      secureMessage:
        'Tus operaciones están encriptadas y protegidas por la red global más segura, ya no necesitas intermediarios para realizar tus envíos locales o internacionales.',
      verifySampleLineOne: 'Verificación',
      verifySampleLineTwo: 'Simple',
      verifyCompleLineOne: 'Verificación',
      verifyCompleLineTwo: 'Completa',
      howSignupLineOne: '¿Cómo',
      howSignupLineTwo: 'Registrarse?',
      instructiveMessage: 'Instructivos de uso',
      textLogCurrency: 'Bancos',
      textLogCurrencyTwo: 'Nacionales*',
      textCryptoCurrency: 'Cryptomonedas',
      textGiftCardOne: 'Gift Card o',
      textGiftCardTwo: 'saldo en efectivo**',
      titleMethods: 'Como ingresar o retirar saldo de tu cuenta MoneyClick',
      bannerMoney: 'Money Exchange solo disponible en la versión móvil',
      messageMethods:
        '*Debes consultar en cada país, los bancos disponibles, límites por transacción y las restricciones o procesos locales, para cualquier transacción bancaria debes tener aprobada una validación tipo C.',
      messageMethodsTwo:
        'Ciertas restricciones pueden aplicar en nuestra red de aliados comerciales.',
      messageMethodsTree:
        '**Disponibles en nuestra red de aliados comerciales.',
      titleTableExchange: 'Tasas de Cambio Activas',
      titleHomeLog: 'Panel de Control MoneyClick',
      titleBalance: 'Posición Global Estimada',
    },
    paymentGateway: {
      title: 'Pasarela de Pago',
      send: "Enviar : ",
      to: "A :",
      buttonYes: "Si",
      buttonNo: "No",
      buttonAccept: "Aceptar",
      buttonSend: "Enviar",
      buttonCancel: "Cancelar",
      paymentTo: "Pago a "
    },
     termAnsConditionsMC: termEs 
  },
  en: {
    app: {
      modalSession: {
        header: 'Notification',
        content: {
          part1: 'Your session expires in ',
          part2: ' seconds, do you want to continue in the portal?',
        },
        buttonYes: 'Yes',
      },
      modalSessionExpired: {
        header: 'Notification',
        content: 'Your session has expired',
        buttonClose: 'Close',
      },
    },
    commons: {
      avgSell: 'Average sale',
      avgBuy: 'Average buy',
    },
    nav: {
      add: 'Add',
      remove: 'Remove',
      addScrow: 'Add Escrow',
      removeScrow: 'Remove Escrow',
      createPaymentMethod: 'Create Payment Methods',
      scrow: 'Escrow',
      buySellBTC: 'Buy / Sell (BTC)',
      profits: 'Profits',
      administration: 'Bankers',
      paymentMethod: 'Payment Method',
      paymentMethods: 'Payment Methods',
      otcOperations: 'OTC Operations',
      otcOperationsTitle: 'OTC Operations',
      userData: 'Users',
      consultPaymentMethod: 'Consult Payment Methods',
      consultBalance: 'Balance Consult',
      login: 'LOGIN',
      nickname: 'User',
      signup: 'SIGN UP',
      helpOut: 'HELP',
      signuphome: 'Sign up',
      market: 'MARKET: ',
      profile: 'Profile',
      charges: 'Charges',
      transactions: 'Transactions',
      fastChange: 'Fast Change',
      send: 'Send / Transfer',
      sendmoneyclick: 'To MoneyClick Users',
      withdraw: 'To Banks',
      payAtStore: 'Pay at Store',
      sendCrypto: 'Send',
      sendCryptoHeader: 'Send Crypto',
      receive: 'Receive / Deposit',
      giftCard: 'Gift Card',
      moneyClickBanker: 'MoneyClick Banker',
      fromBanks: 'From Banks',
      chargeByMoneyClick: ' Charge By MoneyClick',
      receiveCrypto: 'Receive',
      recharge: 'Recharge Coupons',
      rechargeBalance: 'Recharge',
      help: 'Information',
      faqs: 'FAQs',
      contactUs: 'Customer Support',
      instructive: 'Instructions',
      legal: 'Legal',
      logout: 'Logout',
      home: 'Home',
      inbox: 'Notifications',
      crypto: 'Crypto',
      buyBTC: 'Buy',
      sellBTC: 'Sell',
      giftCardOption: 'Gift Card',
      lang: {
        es: 'Spanish',
        en: 'English',
        resume: {
          es: 'Spa',
          en: 'Eng',
        },
      },
      support1: 'Immediate Attention: ',
      support2:
        'Do you have questions? We can help you. We have new customer service hours: ',
      support3: 'Monday to Sunday from 8am to 8pm New York time.',
      language: 'Language',
    },
    home: {
      text1:
        'A payment system that allows operations with currencies from different countries',
      text2: 'Deposit',
      text3: 'your MoneyClick balance!',
      text4:
        'Register, Make a deposit and start enjoying the best payment system',
      recharge: 'Deposit',
      textMessage1: 'Hello Jose, ',
      textMessage2:
        'your reload has been successful, to see your balance, go to the MoneyClick app.',
      text5:
        'It is a payment system that allows operations with currencies from different countries.',
      //text6: "It is an app easy to use and you can manage it reliably:",
      text6:
        'You will be able to reliably and easily manage operations with currencies from different countries:',
      item1:
        'Sending and receiving payments through QR codes or SMS anywhere in the world.',
      item2:
        'Request or require money, sharing your QR code to send money to your account in the currency of your choice.',
      item3:
        'Quick exchange between currencies of different countries, for example: VES - USD, USD - COP, among others.',
      item4: '',
      buttonDownload: 'Download the app',
      text7:
        'To satisfy the needs of users who operate with cryptocurrencies, we additionally offer:',
      text8: '- Quick change between country currencies - BTC and vice versa.',
      text9:
        '- Handling of Wallets in bitcoins for internal and external transfers.',
      text10:
        '- Also, you can automatically configure the payments received in bitcoins in the country currency of your choice.',
      text11:
        'Also, if you want to use MoneyClick as an additional payment system in your business, you can request through the App to convert your business into a Exchange Places and customize the parameters according to your needs.',
      text12:
        'The payment system allows you to offset operations with the dollarbtc.com platform and also the use of its extended investment and payment services.',
      text13: 'You can download the app completely free at:',
      text14: 'Or if you prefer,',
      text16: ' register ',
      text17: 'and carry out your operations on the Web',
      text15: 'Download the App in your favorite version:',
      textDownload: 'Download MoneyClick',
      retailTitle: 'Exchange Places',
      achievement: {
        user: 'Users',
        transactions: 'Operations',
        btc: 'Bitcoins Traded',
      },
      notificationEmailVerify: {
        content: 'now you can enjoy of all our benefits',
        header: {
          line1: 'The email',
          line2: ' had been verified successfully,',
        },
      },
      homeReduced: {
        title: 'Buy your MoneyClick coupons!',
        text: 'Register, buy your coupon in the currency of your choice and start enjoying the best payment system.',
        available: 'Available in:',
        startButton: 'Get Started',
      },
      fiatGaugeModal: {
        sell: 'Sell',
        buy: 'Buy',
        table: {
          headers: {
            type: 'Operation type',
            price: 'Price',
            change6H: 'Change % 6H',
            change24H: 'Change % 24H',
          },
        },
        buttonClose: 'Close',
      },
    },
    homeLoggedIn: {
      balanceGlobal: 'Estimated Global Balance',
      deferred: 'Deferred',
      balance: {
        load: 'Loading...',
        title: 'Balance',
        text1: 'Estimated Amount in $: ',
      },
      welcome: 'Welcome to the MoneyClick web platform ...',
      subWelcome: 'Deposit your balance and start enjoying all our options',
      item1:
        "Deposit balance: complete the data, make the transfer, notify your payment and that's it ... you already have MoneyClick balance!",
      item2:
        'Without intermediaries: Quick exchange between currencies of different countries, for example: VES - USD, USD - COP, among others.',
      item3:
        'Affiliate own and third-party bank accounts to make payments, deposits or transfers in the currency of your choice.',
      text2: 'Deposit',
      text3: 'your MoneyClick balance!',
      text4:
        'Register, deposit your balance and start enjoying the best payment system',
      recharge: 'Deposit balance',
      rechargeBalance: 'Deposit',
      fastChange: 'Fast Change',
      transactions: 'Transactions',
      toPaymentMethods: 'Send to Payment Methods',
      textMessage1: 'Hello Jose, ',
      textMessage2:
        'your reload has been successful, to see your balance, go to the MoneyClick app.',

      tableHeaders: {
        historical: 'Historic',
        process: 'Exchange Places',
        date: 'Date',
        operation: 'Type Operation',
        amount: 'Amount',
        currency: 'Currency',
        status: 'Status',
        transactions: 'Transactions',
        statusValues: {
          started: 'Initiated',
          success: 'Success',
          waitingPayment: 'Waiting for payment',
          canceled: 'Canceled',
          paid: 'Paid',
          claim: 'Claim',
          payVerification: 'Pay Verification',
          waitingPayVerification: 'Waiting Pay Verification',
          waitingToStart: 'Waiting to Start',
          processing: 'Processing',
        },
      },

      table: {
        previous: 'Previous',
        next: 'Next',
        loading: 'Loading...',
        noData: 'There are not operations',
        page: 'Page',
        of: 'of',
        rows: 'rows',
        pageJump: 'go to the page',
        rowsSelector: 'rows by page',
      },

      transactions: {
        detail: {
          statusOperation: {
            success: 'Success',
            prosessing: 'Processing',
            fail: 'Fail',
          },
          retail: {
            maxAmount: 'Max Amount per Operation',
            title: 'Opciones de QR',
            howAction: 'What do you want to do?',
            actionEfective: 'Cash advance',
            actionRetail: 'Bitcoin cashier',
            buyOrSellBalanceRetails: {
              operations: {
                buy_balance: 'Buy Balance',
                sell_balance: 'Sell Balance',
              },
              navTitle: 'Bitcoin cashier',
              title: 'Bitcoin cashier',
              message: 'Current location',
              buy_balance: 'Buy Balance',
              sell_balance: 'Sell Balance',
              dialog: {
                typesPaymentMethod: 'Types Payment Method',
                accredit: 'accredit',
                edit: 'Edit',
                Delete: 'Delete',
                add: 'Add',
                cancel: 'Cancel',
                desire: '¿You want',
                optionForFunction: 'this option for the function',
                minimum: 'Minimum by operation',
                maximum: 'Maximum by operation',
                remember:
                  'Remember, you are about to edit the payment method whose id is',
                rememberaddsubs:
                  'Remember, you are about to add/Substract balance to the payment method whose id is',
                ofTheCurrency: 'of the currency',
                ofThePayment: 'and the Payment',
                andTheData: 'and the following data',
                editPaymentMethod: 'Edit Payment Method',
                debit: 'Debit',
                acredit: 'accredit',
                addTypePayments: 'Add Type Payments',
                typePaymentMethod: 'Type Payments Methods',
                sendMoneyParams: 'Send Money Params',
                placeHolderDescription: 'Description',
                errorRetailValid: 'Invalid Retail',
                errorAmountEmpty: 'The amount is required',
                errorAmountLimit:
                  'The amount must be within the established limits',
                actionCashAdvance: 'Request Cash Back',
                succesSellBalanceRetail:
                  'Your request has been sent successfully. You have 60 minutes to withdraw the cash in the selected merchant or your transaction will be automatically canceled.',
                errorResponseLimitBalance: 'Does not in limit balance',
                errorResponseCurrencyNotAllowed: 'Currency not allowed',
                errorUserDailyLimit:
                  'Maximum limit raised. If you want to carry out the operation for a higher limit, contact our customer support center.',
                errorResponseBalance: 'Does not have enough balance',
                errorAvailableAmount: 'The amount exceeds the available',
                errorFailTransaction:
                  'An error occurred while processing your operation. Try later',
                minAmount: 'Minimum amount of operation: ',
                maxAmount: 'Maximum amount of operation: ',
                errorMessageAmount: 'Amount not available',
                paramsRecharge: ' Balance Recharge Params ',
                errorMessageMaxAmount:
                  'The amount must be less than the maximum per operation',
                errorMessageMinAmount:
                  'The amount must be greater than the minimum per operation',
                errorNotofer: 'Sorry the Retail currently has no offers',
                succesBuyBalanceRetail:
                  'Your request has been sent successfully. You have 60 minutes to complete your payment at the selected retail or your transaction will be automatically canceled.',
                errorRequest: 'An error occurred try again later',
                confirmSend: 'Buy bitcoins',
                closeDialog: 'Close',
                amountChange: 'Amount in ',
                placeHolderAmount: 'Amount to request',
                errorNotBalanceRetail:
                  'At this time the retail cannot process your request. Try another retail near your location',
                changePrice: 'The sale price has changed,',
                changePrice2: 'do you want to continue?',
                operation: 'Operation',
                openNoRetails:
                  'Excuse me, there are no retails available at this time ...',
                retailWithoutBalance:
                  'Sorry, the point of sale cannot process the transaction',
              },
            },
          },
          labels: {
            gift_card_redeem_br:
              'Operation Type es Redeem Gift Card bitcoinrecharge',
            gift_card_redeem: 'Redeem Gift Card',
            gift_card_id: 'Gift Card Id',
            banker_remove_balance: 'Remove Balance',
            banker_add_balance: 'add Balance',
            mc_buy_bitcoins: 'Buy Bitcoins',
            mc_sell_bitcoins: 'Sell Bitcoins',
            edit: 'Edit',
            documentRegister: 'Document Register',
            printing: 'Print Proof',
            validationRequirements: 'Requirements Validation',
            addDocument: 'Add Document',
            editData: 'Edit Data',
            addData: 'Add Data',
            addNewData:
              'Do you want to add  a new data  or modify any existing user data ',
            editUser: 'Edit User',
            deleteData: 'Delete Data',
            mcIdentitySelfie: 'Identity Selfie of the MoneyClick Verification',
            mcIdentityImg: 'Identity Image of the MoneyClick Verification',
            insetTheDeleteDataUser:
              'Insert the data of the verification delete',
            deleteVerification: 'Delete Verification User',
            cancelConfirm:
              'Are you sure to cancel the operation, remember that there is no reason to revert this action ',
            whoseDataIs: 'whose data are',
            acreditAccountType:
              'the payment will be acredited to the payment Method of the type',
            clientAccount: 'Client Account:',
            noInfoAccount: 'there is no info account',
            areYouSure: 'Are you sure to change the status of the operation',
            oftheUser: 'of the User',
            whoseOperation: 'whose type of operation is',
            andCurrencyIs: 'and the currency is',
            changestatus: 'Change Operation Status',
            changeStatusButton: 'Change Status',
            warningImportant: 'Important Announcement',
            status2: 'Status',
            create: 'Create',
            buyMessages: 'Buy Messages',
            useDefaultMessage: 'Use Default Message',
            greenAlert: 'Green Alert',
            blueAlert: 'Blue Alert',
            redAlert: 'Red Alert',
            message: 'Message',
            insertMessage: 'Insert the message',
            noDefaultMessages: 'There is no default messages',
            defaultMessages: 'Default messages',
            typePaymentMethod: ' Type Payment Method',
            fullScreen: 'Full Screen',
            operationAccount: 'Operation account',
            enviromentUser: 'User Enviroment',
            addreses: 'Previous Addresses',
            userData: 'User Data',
            personalData: 'Personal Data',
            newMessage: 'New Message',
            includeMessage: 'Include Message',
            language: 'Language',
            typeMessages: 'Type Messages',
            instructionMessages: 'instruction Messages',
            salesMessages: 'Sales Messages',
            alertMessages: 'Alert Messages ',
            alertMessageRecharge: 'Recharge Balance Alert Messages',
            requiredJoinField:
              'allows only the same value of the join field (Buy)',
            requiredPaymentMethod: 'Client payment Method Required (Buy)',
            addtypepayment: 'Add Payment Type',
            edittypepayment: 'Edit Payment Type',
            windowPayment: 'Window Payment',
            typepayment: 'Payment Type',
            accountToTransfer: 'Account to Transfer',
            addSubs: 'Add/Substract',
            addSubsBalance: 'Add/Substract balance ',
            cancel: 'Cancel',
            search: 'Search',
            reset: 'Reset',
            currency2: 'Currency',
            currencytoConsult: 'Currency to Consult:',
            select: 'Select',
            otcAccount: 'OTC Account',
            paymentMethodtoConsult: 'Payment Method to Consult',
            operationToConsult: 'Operation to Consult',
            statusToConsult: 'Status to Consult',
            initAmount: 'Initial amount:',
            endAmount: 'Final amount:',
            initDate: 'Initial date:',
            endDate: 'Final date:',
            filteredOptions: 'Filter by:',
            status: 'This operation is found',
            initial_movements: 'initial movement',
            date: 'Date:',
            currency: 'Currency:',
            currency2: 'Currency',
            notStatus: 'Operation',
            amount: 'Amount:',
            amount2: 'Amount',
            emit: 'Transmitter:',
            sendTo: 'Send to:',
            to: 'To',
            description: 'Description',
            otcOperacion: 'Operation Id:',
            sendToPayment: 'Payment Method',
            rollback: 'Refund',
            walletTarget: 'Destination address:',
            retailId: 'Retail',
            addAmount: 'Payment received',
            price: 'Price',
            securityCode: 'PIN Security: ',
            securityImage: 'Security Image',
            search: 'Search',
            type: 'Operation type:',
            type2: 'Type',
            send_sms: 'Send MoneyClick',
            send_to_payment: 'Bank Transfer',
            debit: 'Debit',
            credit: 'Credit',
            send: 'Send to third parties',
            receive: 'Receive MoneyClick',
            fast_change: 'Fast change',
            mc_fast_change: 'Fast change',
            change_from: 'Change from ',
            send_national_sms: 'MoneyClick national send',
            mc_send_sms_national: 'MoneyClick national send',
            send_international_sms: 'MoneyClick international send',
            transfer_mc_dbtc: 'MoneyClick balance transfer to dollarBTC',
            transfer_from_mcbalance_to_balance:
              'MoneyClick balance transfer to dollarBTC',
            transfer_from_balance_to_mcbalance:
              'DollarBTC balance transfer to MoneyClick',
            currency_change: 'Currency Change',
            transfer_dbtc_mc: 'DollarBTC balance transfer to MoneyClick',
            send_out: 'Send to external wallet',
            mc_retail_buy: 'Exchange Places Buy balance',
            mc_retail_buy_balance: 'Exchange Places Buy balance',
            mc_retail_sell: 'Exchange Places Sell balance',
            mc_retail_sell_balance: 'Exchange Places Sell balance',
            BUY_BALANCE: 'Exchange Places Buy balance',
            buy_balance: 'Exchange Places Buy balance',
            SELL_BALANCE: 'Exchange Places Sell balance',
            RECEIVED_FROM_OUTSIDE_WALLET: 'Received from outside wallet',
            canceledReason: 'Canceled reason',
            receive_in: 'Receive',
            SELL: 'SELL',
            BUY: 'BUY',
            MC_BUY_BALANCE: 'DEPOSIT',
            WAITING_FOR_PAYMENT: 'WAITING FOR PAYMENT',
            CANCELED: 'CANCELED',
            SUCCESS: 'SUCCESS',
            CLAIM: 'CLAIM',
            PAY_VERIFICATION: 'PAY VERIFICATION',
            WAITING_TO_START_OPERATION: 'WAITING TO START OPERATION',
            SEND_TO_PAYMENT: 'TRANSFER TO BANK',
            mc_buy_balance: 'Deposit', //Exchange Places Buy
            receive_out: 'Receive from outside wallet',
            mc_send_sms_international: 'MoneyClick international send',
            send_in: 'Send to wallet',
            mc_add_escrow: 'Escrow Deposit',
            added_to_retail_escrow:
              'Added to retail escrow in the Exchange Places: ',
            initial_deposit: 'Inicial deposit',
            gift_card: 'Gift card',
            gift_card_redeem: 'Gift Card applied',
            money_order: 'Money Order',
            sell_gift_card_commission: 'Commission for Sale of Gift Card',
            money_order_send: 'Sending Money Order',
            gift_card_activation: 'Gift Card activation',
            userToConsult: 'User to Consult',
            errorInactivateUser:
              'the user could not be inactivated at this time',
            successInactivateUser: 'The user has been inactivated correctly',
            errorActivateUser: 'the user could not be activated at this time',
            successActivateUser: 'The user has been activated correctly',
            errordeleteUser: 'the user could not be eliminated at this time',
            successdeleteUser: 'The user has been eliminated correctly ',
            userEliminated: 'User Eliminated',
            userInactivated: 'User Inactivated',
            userActivated: 'User Activated',
            profileToConsult: 'Profile to Consult',
            availableAmounts: 'Available Amounts',
            profileValuesEmpty: 'This profile has no available values',
            usersBelongs: 'Users belonging to this profile',
            profileEmpty: 'This profile has no users',
            mc_message_offer_change: 'message offer change',
            REFUND_OF_UNTRADED_AMOUNT_CHAT_P2P_OFFER:
              'Refund of untraded amount Money Market offer',
            AMOUNT_BLOCKED_BY_CHAT_P2P_OFFER:
              'amount blocked by Money Market offer',
            mc_buy_crypto: 'Buy Crypto',
            mc_sell_crypto: 'Sell Crypto',
          },
          sendToPayment: {
            currency: 'Currency',
            user: 'User',
            bank: 'Bank:',
            accountNumber: 'Account Number:',
            userHolderName: 'User Holder Name',
            accountHolderName: 'Account Holder Name:',
            accountHolderEmail: 'Account Holder Email:',
            userName: 'Username:',
            accountHolderNumber: 'Account Holder Name: ',
            accountHolderPhone: 'Account Holder Phone',
            accountInterbankCode: 'Account Interbank Code',
            accountAddress: 'Account Address:',
            accountZip: 'Account Zip:',
            bankRoutingNumber: 'Bank Routing Number:',
            bankSwiftCode: 'Bank Swift Code:',
            zelle: 'Zelle:',
            typePayment: 'Type payment:',
            amount: 'Amount:',
            comission: 'Comission:',
            description: 'Description:',
            canceledReason: 'Canceled reason:',
          },
        },
        messageDate: 'The start date must be less than the end date',
        messageDateempty: 'a date element is missing for the query',
        balancepaymentMethod: 'Payment Method Balance',
        totalConsultBalance: 'Account Consult Balance',
      },
    },
    homeNew: {
      title: 'MoneyClick, Money in seconds!',
      text1:
        'Digitize your money, pay, change, send and receive instantly anywhere in the world with the assurance that your payments are guaranteed in both dollars and BTC, through the most versatile multi-currency account on the market',
      text2: 'Deposit MoneyClick balance from:',
      text3:
        'You can download MoneyClick completely free on Google Play or App Store or if you prefer, register and carry out your operations on the Web',
      text4: 'The most versatile multi-currency account on the market',
      fastChange: {
        currency: 'CURRENCY',
        buy: 'BUY',
        sell: 'SELL',
        variation: 'VARIATION 24h',
      },
      chatP2P: 'Version beta',
      app: 'P2P MoneyClick',
    },
    login: {
      header: 'Login',
      country: 'Country code',
      phone: 'Mobile phone',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot my password',
      registration: 'Register now',
      passwordrepeat: 'Password Repeat',
      loading: 'Loading...',
      captcha: 'Please prove that you are human',
      errors: {
        credentials: {
          header: 'Wrong Credentials',
          content: 'Your user could not be authenticated.',
        },
        errorCaptcha: 'An unexpected error has occurred. Please, try later.',
        errorProTrader: 'Your user is PRO TRADER must enter in: ',
        errorUserNoRegister: 'User not registered',
        errorCaptcha2: 'You did not verify if you are human',
        errorRequired: 'This field is required',
        errorCaptcha3: ' Unregistered user or Inactive user',
        deviceInUser: 'This device is already added',
        userNotFound: 'The user associated with this device is not found',
        unexpectedError: 'Unexpected error has occurred. Try again later',
        notContent: '',
        deviceNotAllowedByUser:
          'This browser has not been authorized. You can not log in',
      },
      modalUpdateDevice: {
        header: 'Device management',
        contentUpdate:
          'The browser from which you are trying to access is inactive. Do you want activate it now? ',
        contentAdd:
          'You are trying to access from a device that you do not use frequently. We recommend, only use reliable devices for personal use. Do you want to access anyway?',
        buttonYes: 'Yes',
        buttonNo: 'No',
        loading: 'Loading...',
      },
      successUpdating: {
        updateDevice: 'This browser has been reactivated successfully',
        addDevice: 'This browser has been successfully added',
      },
    },
    forgotPassword: {
      header: 'Recover password',
      header2: 'New password',
    },
    sendTokenResetPassword: {
      form: {
        title: 'Enter the phone number to start the process',
        captchaLabel: 'Please, prove that you are human',
        buttonConfirm: 'Confirm',
        buttonCancel: 'Cancel',
        buttonClose: 'Close',
      },
      errors: {
        incompleteData: 'Incomplete data.',
      },
    },
    tokenResetPassword: {
      errors: {
        failToken: 'Sorry, your token have not been confirmed',
        serverError: 'An internal error has occurred on the server, try later',
        emptyToken: 'You must enter a token to continue',
      },
      message:
        'We have sent a verification token to your email. Copy and paste that value to continue',
      buttonContinue: 'Continue',
      buttonCancel: 'Cancel',
      buttonClose: 'Close',
    },
    codeResetPassword: {
      message:
        'We have sent a code to your phone number, please enter the code to continue with the process',
      errors: {
        failToken: 'Sorry, your token have not been confirmed',
        serverError: 'An internal error has occurred on the server, try later',
        serverError2:
          'An internal error has occurred on the server, resend the code or try later',
      },
      responseAccept: 'Your request have been processed, please wait a moment',
      labelCode: 'Code',
      buttonContinue: 'Continue',
      buttonCancel: 'Cancel',
      buttonClose: 'Close',
    },
    resetFormPassword: {
      errors: {
        wrongData: 'Enter the date correctly',
        minimalLength: 'The password must have at least four digits',
        notMatch: 'The passwords does not match',
        failChange: 'We can not change the password now, please try later',
      },
      successChange: 'Your password have been update successfully',
      form: {
        labelNew: 'New Password',
        labelRepeat: 'Repeat Password',
        buttonSend: 'Send',
      },
    },
    login2FA: {
      errors: {
        failAuth: 'Your code can not be authenticated. Enter the code again.',
        serverError: 'Sorry, an internal error has occurred on the server',
        serverError2:
          'Sorry, an internal error has occurred on the server, try later',
        requiredField: 'This field can not be empty',
        failVerifyToken: 'Sorry, your can not be processed',
        failVerifyAnswer: "Sorry, your answer isn't correct",
      },
      helpMessage:
        'For cases of theft, loss or any extraordinary situation you can disable 2 factor authentication by sending a token to your email and follow the steps mentioned.',
      endHelpMessage:
        'The 2 factor authentication have been disabled , please go to login section.',
      successSendToken:
        'Please check your email and enter the token that we have been sent to you to verify your identity and finish the process',
      modalSendToken: {
        header: 'Do you need help?',
        send: {
          labelToken: 'Verification Token',
          labelSecurityQuestion: 'Security Question: ',
          buttonCancel: 'Cancel',
          buttonConfirm: 'Confirm',
          buttonClose: 'Close',
        },
        notSend: {
          labelQuestion: 'Do you want that we send a token?',
          buttonYes: 'Yes',
          buttonNo: 'No',
        },
      },
      header: 'Two factor authentication',
      body2:
        'Please enter your security code provided by Google Autenticator, to proceed with your login',

      body: 'We have send a security code to your phone number. Enter the code to authenticate your login.',
      body3:
        'We have send a security code to your phone number. Enter the code to authenticate your register.',
      form: {
        label: 'Verification code',
        buttonConfirm: 'Confirm',
        buttonResend: 'Request SMS',
        iNeedHelp: 'I Need Help',
      },
    },
    profile: {
      newValue: 'New Value',
      value: 'Value',
      firstPet: 'First Pet',
      emptyMessage: '',
      menu: {
        myInfo: 'Your Info',
        paymentMethods: 'Banks',
        accountSecurity: 'Account Security',
        logout: 'Log out',
      },
      optionDetail: {
        sexList: {
          male: 'Male',
          female: 'Female',
        },
        documentType: {
          identificationCard: 'Identification card',
          passport: 'Passport',
          other: 'Other',
        },
        docsImages: {
          identity: 'Identification Card',
          bank: 'Bank account document',
          location: 'Address document',
          selfie: 'Selfie with identity document',
          selfieOfVerification: 'Selfie of Verification',
          verificationMC: 'Documento de Verificación',
          profileImage: 'Profile Image',
        },
        messages: {
          modalMessage:
            'We have sent a verification code to your registered mobile phone. Enter the code to complete the verification.',
          phoneVerified: 'Your phone has been satisfactorily verified',
          phoneVerificationFail:
            'Your phone could not be verified. Try again or check your mobile phone number.',
          emptyField: 'Excuse me, you must enter a data in the field',
          nicknameCreated: 'Your nickname has been created successfully',
          duplicatedNickname: 'This nickname already exists',
          errorServer: 'Error on the server',
          requiredField: 'The field is required',
          emailVerification:
            'We have sent an email to your email address to verify your email',
          close: 'Close',
          errorInRed: 'Check your internet connection and try again',
          yourData: 'Your Info',
          emptyMessage: 'Not message to show',
        },
        nickname: {
          value: 'Nickname',
          create: 'Create',
          popup: 'Create username',
        },
        stepUser: {
          aditionalData: 'Aditional Data',
          user: 'User',
          from: 'From',
          popup:
            'To be checked. Start the process through the Update data option',
          notInit: 'Without starting',
          contactUs: 'Contact Us',
          fail: 'Failed, Contact Us',
        },
        stepPhone: {
          verified: 'Verified',
          phone: 'Phone',
          popup: 'To be verified. Add your mobile phone',
          buttonVerify: 'Verify Phone',
          notVerify: 'Not verified',
          byVerify: 'To be verified',
          verify: 'Verify',
          buttonCancel: 'Cancel',
          buttonClose: 'Close',
        },
        stepEmail: {
          email: 'Email',
          verified: 'Verified',
          buttonVerify: 'Verify',
          notVerify: 'Not verified',
          popup: 'To be verified. Check your email',
        },
        stage: {
          verified: 'Verified',
          processing: 'In process',
          fail: 'Failed',
        },
        loading: 'Loading...',
        fields: {
          name: 'Name',
          lastName: 'Last name',
          email: 'Email',
          phone: 'Phone',
          id: 'Identification card',
          number: 'ID number',
          sex: 'Sex',
          birthday: 'Birthdate',
          cityOfBirth: 'City Of Birth',
          countryOfBirth: 'Country Of Birth',
          birthplace: 'City of birth',
          familyContact: 'Contact family',
          emailContact: 'Contact email',
          securityQuestion: 'Security Question',
          securityAnswer: 'Security Response',
          localbitcoinUser: "Localbitcoin's user",
          userFacebook: "Facebook's user",
          companyName: 'Company name',
          documentTypeFiscalRecord: 'Tax registration document',
          numberFiscalRecord: 'Registry number',
          registrationYear: 'Year of registration',
          companyAddress: 'Company address',
          address: 'Address',
          documents: 'Documents',
          userType: 'User Type',
          statusUser: 'User Status',
          professionalProfile: 'Description of your professional profile',
          webPage: 'Web Page',
          instagram: 'Instagram',
          profilePicture: 'Profile Picture',
        },
        buttonUpdate: 'Update data',
        modalVerification: {
          header: 'Verfication',
          labelCode: 'Code',
        },
        modalNickname: {
          header: 'Nickname',
          subHeader: 'Create your nickname',
          labelNickname: 'Nickname',
          buttonCancel: 'Cancel',
          buttonSave: 'Save',
          buttonClose: 'Close',
        },
      },
      addAccount: {
        specificBank: 'From the same bank',
        MOBILE_PAYMENT: 'Mobile Payment',
        thirdBank: 'From another bank',
        wire: 'Wire',
        international: 'International bank (Swift or Aba)',
        electronicTrans: 'Electronic transfer',
        cryptoWallet: 'Transfer to Crypto Wallet',
        checkDeposit: 'Deposit in Check',
        ach: '3 business days',
        ach_express: 'Same day (+35$)',
        ACH_THIRD_ACCOUNT: '3 business days',
        ACH_THIRD_ACCOUNT_EXPRESS: 'Same day (+35$)',
        cashDeposit: 'Cash deposit',
        transfer: 'Wire transfer',
        creditCard: 'Credit Card',
        personalCheckDeposit: 'Personal Check',
        cashierCheckDeposit: 'Cashier Check',
        moneyOrder: 'Money Order',
        messages: {
          addAccountSuccess: 'Your bank has been successfully added',
          addAccountSuccess2: 'Your bank has been successfully created',
          errorServer: 'Sorry, an error has occurred on the server, try later',
          errorEmailReceiverEmpty: 'The email can not be empty',
          errorEmailReceiverWrong: 'It must be a valid email',
          errorExternalPaymentCreate:
            'The bank could not be created because it already exists or due to system error',
          errorExistExternalPayment:
            'The bank could not be created because it already exists',
          recomended: ' ** Recommended banks for immediate transactions',
        },
        addPaymentMethod: 'Add bank',
        placeholderCoin: 'Select a currency',
        placeholderMethodPayment: 'Select a bank',
        buttonAdd: 'Add',
        buttonBack: 'Back',
        emailReceiver: 'Recipient email',
        placeholderEmailReceiver: 'example@mail.com',
      },
      addOwnAccount: {
        messages: {
          addPaymentMethod:
            ' Attention: Own means of payment must be verified. Please stay online and follow the instructions of one of our moderators.',
          statusAFail: {
            part1:
              'To add your own means of payment you need to verify your email. We have sent an email to ',
            part2: ', please check your email and follow the instructions.',
          },
          statusBFail:
            'To add your own means of payment you need to verify your mobile phone number, you can do so through the option your data.',
          statusCUninitiated:
            'To add your own means of payment it is necessary to verify your user, you can start this process through the option to update data in the option Your Info.',
          statusCProcessing:
            'To add your own means of payment it is necessary to verify your user, this process has already been initiated.',
          statusCFail: {
            part1:
              'To add your own means of payment you need to verify your user, your user has not been verified',
            contactUs: 'Contact us',
          },
          recomended: ' ** Recommended banks for immediate transactions',
        },
      },
      listAccountOther: {
        currentTableHeaders: {
          coin: 'Currency',
          type: 'Type',
          data: 'Data',
          action: 'Action',
        },
        buttonDelete: 'Delete',
        errorInRed: 'Check your internet connection to try again',
        currentTable: {
          previous: 'Previous',
          next: 'Next',
          loading: 'Loading...',
          noData: 'There are no registered means of payment',
          page: 'Page',
          of: 'of',
          rows: 'rows',
          pageJump: 'go to the page',
          rowsSelector: 'rows per page',
        },
        buttonAdd: 'Add',
        modalVerification: {
          header: 'Verification',
          question: 'Are you sure you want to delete the account data?',
          buttonDelete: 'Delete',
          buttonCancel: 'Cancel',
          buttonClose: 'Close',
        },
        modalResponse: {
          successMessage: 'Your request has been processed successfully',
          failMessage: 'Your request could not be processed',
          buttonClose: 'Close',
        },
      },
      optionCurrent: {
        paymentMethods: 'Banks',
        menu: {
          wallet: 'Wallet',
          holder: 'Own',
          other: 'Third parties',
        },
      },
      optionSecurity: {
        activeTwoFactor1:
          'Select an option to proceed with its activation, remember that to login after enabling this option it will not be required for a period less than one hour since your last connection, otherwise you will be asked for a new code to enter Are you sure you want to activate two-step authentication?',
        activeTwoFactorGA:
          'The code provided by the Google Authenticator app will be used to log in after  \n' +
          'enabling this option, consider the expiration of each code, this has a validity period\n' +
          'of one minute, after that you will be asked for a new code to enter,  Are you sure \n' +
          'you want to activate two factor authentication?',
        activeTwoFactor:
          'The code sent to your phone used to log in after enabling this option will not be required for a period less than one hour from your last connection, otherwise you will be asked for a new code to log in. Are you sure you want to activate two factor authentication?',
        inactivateTwoFactor:
          'Are you sure you want to disable two factor authentication?',
        errors: {
          failUpdate: 'Sorry we could not make your request try later',
        },
        successUpdate: 'Your data has been updated successfully',
        buttonYes: 'Yes',
        buttonNo: 'No',
        buttonAccept: 'Accept', 
        buttonResent: 'Resent',
        buttonClose: 'Close',
        buttonDisabled2FA: 'Disable 2 factor auth',
        popUpActivated: 'Activated',
        buttonCreate: 'Create',
        buttonVerify: 'Verify',
        popUpInactivated:
          'It is not activated, to activate this option your phone number must be verified, you must configure your email and verify it, you must also configure a security question and answer, if you have already done so you can activate it',
        buttonEnabled2FA: 'Activate 2 factor',
        percents: {
          low: 'Low',
          middle: 'Middle',
          high: 'High',
        },
        header: 'Account security',
        progress: 'The security level of your account is:',
        verify: 'Verification',
        list: {
          header: 'Configure the different options that you have:',
          options: {
            changePassword: 'Change of password',
            recommendation:
              'It is advisable to change your password regularly to keep your account more secure',
            twoFA: 'Two factor authentication',
            labelSmsorEmail: 'Select',
            SendSmsorEmail: 'Sending code for operations',
            prefered2F: 'two-step authentication by',
          },
        },
        buttonChangePassword: 'Change Password',
        twoFactorOptions: {
          preferedTwoFactorRequest: {
            sms: 'SMS',
            google: 'Google Authenticator',
          },
        },
        secureCodeProcessRequest: {
          prefered: {
            email: 'Email',
            sms: 'SMS',
          },
        },
        unaddedPhone:
          'Sorry, you must have a verified phone number to select this option',
        unaddedEmail:
          'Sorry, you must have a verified email to select this option',
      },
      updatePasswordUser: {
        errors: {
          wrongData: 'You must enter the data correctly',
          server: 'Sorry an error has occurred on the server, try later',
          genericError: 'An error has occurred, try later',
          wrongToken: 'The token you entered is incorrect, try again',
          wrongPassword: 'Password is incorrect',
          minimalChar: 'The password must have a minimum of 4 characters',
          notMatch: 'Passwords do not match',
          emptyToken: 'You must enter the token to confirm',
        },
        modalMessage:
          'We have sent a verification code to your registered mobile phone. Enter that value to complete the password change.',
        successPasswordUpdate: 'Your password has been successfully changed',
        changePassword: 'Change of password',
        currentPassword: 'Current password',
        newPassword: 'New password',
        code: 'Code',
        placeholderNewPassword: 'Must have at least 4 characters',
        repeatPassword: 'Repeat password',
        buttonSend: 'Send',
        buttonCancel: 'Cancel',
        buttonClose: 'Close',
        buttonVerify: 'Verify',
        buttonResend: 'Resend',
        verify: 'Verification',
      },
      updateProfile: {
        sexList: {
          male: 'Male',
          female: 'Female',
        },
        documentType: {
          id: 'ID',
          dni: 'DNI',
          identificationCard: 'Identification Card',
          passport: 'Passport',
          other: 'Other',
        },
        errors: {
          errorFileProfile: 'Sorry the image has not been updated correctly',
          repeatedPhone: 'Sorry the phone number is already in use',
          repeatedEmail: 'Sorry the email is already in use',
          errorServer: 'Sorry, there has been an error in the service',
          emptyPhone:
            'Sorry, you must enter the phone number if you have selected an area code',
          longPhone: 'Sorry, the phone number must include 7 digits or more',
          emptyFields:
            'Sorry, you must at least include your phone number to update your data',
          emptyFiscalRecord:
            'Sorry, you must include the tax registration number of the country where the company is located',
          emptyFiscalRecordType:
            'Sorry, you must include the type of fiscal record of the country where the company is located',
          emptyFiscalRecordYear:
            'Sorry, should include the year of registration',
          emptyFiscalRecordName:
            'Sorry, should include the name of the company',
          emptySecurityAnswer: 'Sorry, should include the security answer',
          emptySecurityDirection: 'Sorry, should include the direction',
          emptySecurityQuestion:
            'Sorry, you must include the security question',
          emptyBirthplace: 'Sorry, should include the place of birth',
          emptyBirthday: 'Sorry, must include your date of birth',
          emptyIDNumber: 'Sorry, must include the identity document number',
          emptyIDNumberType:
            'Sorry, must include the type of identity document',
          emptyLastName: 'Sorry, must include his last name',
          emptyName: 'Sorry, you must include your name',
          emptySelfie: 'Sorry, must include the selfie',
          emptyAddress: 'Sorry, must include the address voucher',
          emptyBank: 'Sorry, must include the bank account voucher',
          emptyID: 'Sorry, must include the identification file',
          fileNotSupported: 'Type of file not supported',
          fileSize: 'File size exceeds the allowed',
          fieldEmpty:
            'Excuse me, the required fields are not complete for verification',
        },
        successUpdate: 'Your data has been updated successfully',
        successSentData: 'Your data has been sent successfully.',
        header: 'Update data',
        form: {
          name: 'Name',
          placeholderName: 'Enter your name',
          lastName: 'Last name',
          placeholderLastName: 'Enter your last name',
          sex: 'Sex',
          placeholderSex: 'Select...',
          documentType: 'Document type',
          placeholderDocumentType: 'Select...',
          other: 'Specify',
          numberId: 'ID Number',
          birthday: 'Birthdate',
          countryOfBirth: 'Country Of Birth',
          cityOfBirth: 'City Of Birth',
          birthplace: 'Birthplace',
          country: 'Country code',
          placeholderCountry: 'Select a country...',
          phone: 'Mobile phone',
          placeholderPhone: 'Example 1234567',
          securityQuestion: 'Security question',
          securityAnswer: 'Security Answer',
          contactFamily: 'Contact family',
          contactCompany: 'Company contact person',
          placeholderContact: 'Family name',
          contactEmailFamily: 'Contact email',
          contactEmailCompany: 'Company contact email',
          localbitcoinUser: "Localbitcoin's user",
          facebookUser: "Facebook's user",
          addressPersonal: 'Address',
          addressCompany: 'Company address',
          professionalProfile: 'Description of your professional profile',
          webPage: 'Web Page',
          instagram: 'Instagram',
          profilePicture: 'Profile Picture',
          attachPhoto: 'Attach photo',
          verifyCUninitiatedPersonal: {
            warning: 'Attention!',
            messageWarning:
              'If you want to start the verification process, include the documents indicated below.',
            messageFile:
              'Click on the icon or drag to load the corresponding file.',
            supportedTypeFiles:
              'Allowed file types: jpg, jpeg, png, gif, pdf. Maximum file size 5Mb',
            documentID: 'Identification document (DNI, Passport, ID)',
            bankAccountSupport: 'Proof of one of your bank accounts',
            addressSupport: 'Selfie with ID',
            selfieSupport: 'Selfie with ID',
            buttonChange: 'Change',
            fileNotSupported: 'File not supported',
            message:
              'To start the process of verifying your data you must fill in the fields marked as mandatory (*)',
          },
          verifyCUninitiatedCompany: {
            warning: 'Attention!',
            messageWarning:
              'If you want to start the verification process of your company, include the documents indicated below.',
            name: 'Company name',
            registerYear: 'Year of registration',
            registerFiscalType: 'Type of fiscal record',
            registerFiscalNumber: 'Commercial registration number',
            messageFile:
              'Click on the icon or drag to load the corresponding file.',
            supportedTypeFiles:
              'Allowed file types: jpg, jpeg, png, gif, pdf. Maximum file size 5Mb',
            documentID:
              'Identity document of the person who verifies (must coincide with the signatory in the commercial register).',
            bankAccountSupport: 'Proof of associated legal account',
            registerFiscal: 'Commercial register (with wet seal)',
            selfieSupport: 'Selfie with commercial registration document',
            buttonChange: 'Change',
            fileNotSupported: 'File not supported',
          },
          buttonSave: 'Save',
          buttonVerify: 'Verify',
          buttonBack: 'Back',
          email: 'Email',
        },
        modalInitVerification: {
          header: 'Start Verification',
          warning: 'Do you want to start the verification of your user?',
          buttonYes: 'Yes',
          buttonNo: 'No',
          buttonClose: 'Close',
        },
      },
      waitingVerification: {
        listLabelDataToVerify: {
          bank: 'Bank',
          accountNumber: 'Account number',
          userHolderName: 'Name',
          accountHolderName: 'Account Holder Name',
          accountHolderEmail: 'Account Holder Email',
          userName: 'Username',
          accountHolderNumber: 'Account Holder Number',
          accountHolderId: 'ID',
          accountHolderPhone: 'Account Holder Phone',
          accountInterbankCode: 'Account Interbank Code',
          type: 'Payment type',
          currency: 'Currency',
          accountType: 'Account type',
          cardType: 'Credit card type',
          cardNumber: 'Credit card number',
          cardHolderName: 'Card holder name',
          expDate: 'Expiration date',
          csc: 'Security code',
          zipCode: 'Zip Code',
        },
        messages: {
          processing: {
            header: 'Verification of payment method in PROCESS',
            content:
              'A micro deposit will be sent to your account to verify that it actually exists and you are the owner of it. Attach the screenshot of the microdeposit in the chat so that the moderator can finish the process. At the conclusion of the process you will be notified so you can continue with your DEPOSIT. Verify your account information again and if there is an error, cancel the verification. Do not hesitate to contact our moderator staff for any questions related to the process.',
            creditCardContent:
              'Photo of the front side of the credit card must be attached. Only credit cards that allow international charges are accepted, check with your bank operator for more information',
          },
          fail: {
            header: 'Verification of means of payment FAILED',
            content:
              'Normally the failure of this process is due to error in the data provided. Communicate by our chat with our moderators to know more details of the process or cancel the verification and try again.',
          },
          success: {
            header: 'Verification of payment method SUCCESSFUL',
            content:
              'Now you can perform transactions with your means of payment, thanks for choosing us.',
          },
          canceled: {
            header: 'Verification of payment method CANCELED',
            content:
              'You have canceled the verification of your means of payment, please note that this means of payment can not be used to perform operations on the portal, you can delete it and try again the verification process, Thanks.',
          },
          data: {
            header: 'Account data',
          },
        },
        buttonBack: 'Back',
        chatWaiting: {
          errors: {
            requiredField: 'This field is required',
            fileNotSupported: 'Type of file not supported',
            exceededSize: 'The file size exceeds the allowed',
          },
          placeholderMessage: 'Write your message here',
          buttonAttachment: 'Attach document',
          buttonCancelVerification: 'Cancel verification',
          buttonCloseVerification: 'Close verification',
          buttonSend: 'Send',
          labelMe: 'Me',
          labelModerator: 'Moderator',
          operationTimeLeft: '10 minutes left to close the operation',
          operationTimeExpired: 'The operating time has expired',
          buttonSeeAttachment: 'See attached file',
        },
      },
      walletAccount: {
        BITCOIN: 'Bitcoins',
        Ethereum: 'Ethereum',
        USDT: 'USDT',
        cryptoToReceive: 'Crypto to Receive',
        cryptoToSend: 'Crypto to Send',
        messages: {
          copiedAddress: 'Your address has been copied to the clipboard',
          verifyEmailLink: {
            part1: 'To use the Wallet you need to verify your phone number.',
            part2: ', please check your email and follow the instructions.',
          },
          errorInRed: 'Check your internet connection and try again',
        },
        qrCode: 'QR code',
        loading: 'Loading...',
        header: 'Use this address to receive bitcoins',
        buttonCopy: 'Copy address',
      },
      optionAccount: {
        header: 'Account',
        menu: {
          security: 'Security',
          devices: 'Devices',
        },
      },
      optionDevices: {
        errors: {
          userNotFound: 'User not found',
          unexpectedError: 'An expected error has ocurred',
        },
        tableHeader: {
          id: 'ID',
          name: 'Name',
          model: 'Model',
          so: 'Operative system',
          source: 'Source',
          date: 'Date',
          status: 'Status',
          actions: 'Actions',
          type: 'Payment Type ',
          windowpayment: 'Payment Window',
          paymentMethodRequired: 'Required Payment Method',
          currency: 'Currency',
          information: 'Information',
          debit: 'Debit',
          accredit: 'Accredit',
          joinFields: 'joinFields',
          messages: 'Messages',
          operation: 'Type Operation',
          levelAccess: 'Access Level',
          notAsignate: 'Not Assigned',
          full: 'Full',
          partial: 'Entrance only',
        },
        table: {
          previous: 'Previous',
          next: 'Next',
          loading: 'Loading...',
          noData: 'There are no registered devices',
          page: 'Page',
          of: 'of',
          rows: 'rows',
          pageJump: 'go to the page',
          rowsSelector: 'rows per page',
        },
        buttonRemove: 'Inactivate device',
        buttonAdd: 'Activate device',
        configure: 'Set access level',
        delete: 'Delete device',
        statusActive: 'Active',
        statusInactive: 'Inactive',
        modalRemovePermission: {
          header: 'Inactivate device',
          content: 'Are you sure you want to disable access to this device?',
          buttonYes: 'Yes',
          buttonNo: 'No',
          headerAdd: 'Activate device',
          contentAdd:
            'Are you sure you want to activate access to this device?',
        },
        successRemoving: 'Your device have been removed successfully',
        successAdd: 'Your device have been authorized successfully',
        modalCongifLevel: {
          header: 'Configure Permissions',
          content: 'Select an access level for your Device',
          fullAccess:
            '1. Full: Complete access to all the functionalities of the application',
          partialAccess:
            '2. Entrance only: Access only to the Receive or Deposit functions within the application',
          buttonConfirm: 'Confirm',
          buttonAccept: 'Accept',
          buttonClose: 'Close',
          successMessage: 'Your changes have been saved successfully',
        },
        modalDeleteDevice: {
          header: 'Delete device',
          content: 'Are you sure you want to delete this device?',
          successMessage: 'Your changes have been saved successfully',
        },
      },
      optionMovements: {
        movementspaymentMethod: 'Movements of the means of payment consulted',
        tableHeader: {
          id: 'ID',
          amount: 'Amount',
          date: 'Date',
        },
        table: {
          previous: 'Previous',
          next: 'Next',
          loading: 'Loading...',
          noData: 'There is no data',
          page: 'Page',
          of: 'of',
          rows: 'rows',
          pageJump: 'go to the page',
          rowsSelector: 'rows per page',
        },
      },
    },
    registration: {
      message: 'To continue you need to complete the following information',
      continue: 'Continue',
      completeAccount: 'Complete Information',
      registerUser: 'User Register',
      signup: 'Register',

      form: {
        name: 'Name',
        username: 'Username',
        referralCode: 'Referral Code',
        referralCodeOptional: 'Referral Code (Optional)',
        email: 'Email',
        password: {
          label: 'Password',
          placeholder: 'Enter a minimum of four characters',
        },
        confirmPassword: 'Confirm password',
        captcha: 'Please prove that you are a human',
        companyText: 'Do you want to register as a company?',
        terms: {
          first: 'Accept the ',
          second: 'Terms and Conditions',
        },
      },
      modalTerms: {
        header: 'Terms and Conditions',
        content: termsAndConditionsEng,
        agreeButton: 'I Agree',
        closeButton: 'Close',
      },
      errors: {
        form: {
          username: 'Username already exists',
          notexist: 'This User not exist',
          phone: 'User phone already exists',
          email: 'Invalid email address',
          alreadyEmail: 'Email is already in use',
          password: 'This field must contain more than 4 characters',
          confirmPassword: 'This field does not match the password',
          captcha: 'You have not verified that you are a human',
          terms: 'You need to accept the terms and conditions of our platform',
        },
        resultPost:
          'Sorry, we could not register your account, sorry for the inconvenience, please try later',
        errorRequiredField: 'This field is required',
        unexpectedError: 'Sorry an unexpected error occurred try again later.',
        errorNetwork: 'Error network',
        errorSign: 'This user already exists',
        errorReferralCode: 'Invalid referral code',
      },
      modalResult: {
        headerSuccess: 'Welcome',
        headerError: 'Notification',
        closeButton: 'Close',
        resultPost: {
          headerComplete:
            'Congratulations, you have just completed your registration at www.moneyclick.com, from now on you can top up your balance in any currency.',
          warningMessage:
            'To operate on our portal, it is necessary to verify your user. You can start this process from your profile in the Update data option',
          infoMessage:
            'We send you an email, please check and follow the instructions.',
        },
      },
    },

    fastChange: {
      print: 'Print',
      idOperation: 'Operation Id',
      modifybalance: 'The payment Method Balance does modified successfully ',
      header: 'Fast Change',
      dataOperation: 'Operation Data',
      priceChange: 'The bitcoin price has change, please retry your request ',
      dataOperationBuy: 'Buy Operation Data',
      dataOperationSell: 'Sell Operation Data',
      selectOperation: 'Select your Operation',
      buttonBuy: 'Buy Bitcoin',
      buttonSell: 'Sell Bitcoin',
      optionBuy: 'Buy',
      optionSell: 'Sell',
      dateOperation: 'Operation Date',
      dateAvailable: 'Available Date',
      change: 'Change',
      typeChange: 'Exchange Rate',
      availableBalance: 'Avalible Balance',
      amount: 'Amount in ',
      header: 'Fast Change',
      currencySend: 'Currency to Send',
      currencyReceive: 'Currency to Receive',
      amountSend: 'Amount To Send',
      amountReceive: 'Amount To Receive',
      avalilableToChange: 'Max Operation Amount', //"You can change up to:",
      avalilableToChangeEq: 'Equivalent amount',
      headerLimits: 'Limits of operations',
      dailyLimits: 'Daily Limits',
      monthlyLimits: 'Monthly Limits',
      amount: 'Amount in ',
      errorPymentMethod:
        'At the moment there are no means of payment to carry out operations with this currency',
      errorGetFactor: 'Your request cannot be processed at this time',
      errorGetBalance:
        'The amount exceeds what is available. You can change up to:',
      errorGetBalanceCurrency: 'You has no balance at this currency :',
      errorGetDayly:
        'Maximum limit raised. If you want to carry out the operation for a higher limit, contact our customer support center.',
      errorGetMonthly:
        'Maximum limit raised. If you want to carry out the operation for a higher limit, contact our customer support center.',
      balanceCurrency: 'Balance Available ',
      amountMaxLimitAvalible:
        'The indicated amount exceeds the available balance',
      sendAmount: 'You must indicate the amount to send',
      sendAmountLimit: 'The indicated amount exceeds the daily limit',
      errorConditions: 'Please accept the terms and conditions',
      modal: {
        accept: 'Accept',
        totalToReceive: 'Total To Receive',
        totalToSend: 'Total To Send',
        confirm: 'Confirm',
        cancel: 'Cancel',
        amountSend: 'Amount To Send',
        buyReceipt: 'Buy Receipt',
        sellReceipt: 'Sell Receipt',
        changeFactor: 'Exchange Rate', //"Change Factor",
        changeFactorInverse: 'Inverse Price To Change ', //"Change Factor Inverse",
        tax: 'Tax',
        amountReceive: 'Amount To Receive',
        Commission: 'Commission',
        rejectBuy: 'Reject Buy',
        acceptBuy: 'Accept Buy',
        rejectSell: 'Reject Sell',
        acceptSell: 'Accept Sell',
        timetoproceed:
          'Your purchase will be available for exchanges in 3 business days',
        close: 'Close',
      },
      send: {
        confirmTx: 'Confirm transaction',
        confirMessage: 'Are you sure to continue with the operation?',
        buttonClose: 'Close',
        buttonAccept: 'Accept',
        success: 'Successful transaction',
        successmessage: 'His operation was carried out successfully',
        fail: 'fail transaction',
        failBalanceAmount: 'Has no balance in',
        failmessage: 'The indicated amount is higher than your balance',
        failmessage2: 'The amount must be different from 0',
      },
    },
    withdraw: {
      header: 'To Banks',
      modal: {
        addFrequent: 'Add payment methods to frequent',
        TRANSFER_WITH_SPECIFIC_BANK: 'From same bank',
        TRANSFER_NATIONAL_BANK: 'From another bank',
        TRANSFER_TO_CRYPTO_WALLET: 'Transfer to Crypto Wallet',
        ACH: '3 business days',
        ACH_EXPRESS: 'Same day (+35$)',
        ACH_THIRD_ACCOUNT: '3 business days',
        ACH_THIRD_ACCOUNT_EXPRESS: 'Same day (+35$)',
        OWN: 'Own',
        THIRDS: 'Third',
        title: 'Operation Data',
        uploadDescription:
          'Enter the information below to verify your identity. The data must correspond to the beneficiary and the attached documents must clearly show the basic data, otherwise the operation will be canceled. To solve any doubt or concern, contact us through the Customer Service section.',
        subtitle: 'Enter the required data to verify your account:',
        amount: 'Amount',
        description: 'Description',
        messageOperationSuccess: 'Operation performed successfully.',
        operationFail: 'Error completing the operation try again',
        buttons: {
          sendVerification: 'Send',
          send: 'Send',
          cancel: 'Cancel',
          add: 'Add',
          edit: 'Edit',
          accept: 'Accept',
          close: 'Close',
          camSelect: 'Take Photo',
          librarySelect: 'Choose from Library',
        },
      },
      errorsServices: {
        errorLoadClientPayments: 'Error loading payments',
        errorLoadIdentityMc: 'Error loading data',
        errorLoadCurrencies: 'Error loading currencies',
        errorLoadWithdrawInProcess: 'Service unavailable ',
        errorLoadPreWithdrawInProcess: 'Service unavailable',
        errorSendIndentityVerication: 'Error send document identity',
        errorLoadGetCommision: 'Error calculating commission amount',
        errorLoadClientPaymentTypes: 'Error loading payment types',
      },
      labels: {
        minAndMax:
          'The value must be between the minimum amount and the maximum amount',
        maxSend: 'You can send up to:',
        commision: 'Commision',
        userDaylyLimitReached: 'You have exceeded the daily limit',
        userMoytlyLimitReached: 'You have exceeded the monthly limit',
        errorNotSupportOperation:
          'Ask customer service by WS in business hours to enable this option.',
        failAmount1: 'The indicated amount is higher than your balance',
        failAmount2: 'The amount must be different from 0',
        failAmount3: 'The amount is insufficient to complete the operation',
        failAmountCommision: 'You can send up to:',
        availableBalance: ' / Available balance ',
        headerLimits: 'Limits of operations',
        addPayment: 'Add',
        receiver: 'Send to: ',
        emailReceiver: 'Email',
        amount: 'I ride in ',
        description: 'Description',
        button: 'Send',
        accountWireNumber: 'Wire account wire',
        validationAmount: 'Amount must be between ',
        and: ' and ',
        notBalance: 'Balance not available in the selected currency.',
        accountAddress: 'Account address',
        accountZip: 'Zip',
        bankRoutingNumber: 'Bank routing number',
        bankSwiftCode: 'Bank swift code',
        accountWireRoutingNumber: 'Account wire routing number',
        notCreateAccount:
          'You are currently unable to create payment methods for the selected currency',
        missingField: 'This field is required',
      },
      picker: {
        title: 'Currencies',
        titleTransactionType: 'Account holder',
        PaymentWithin: 'Payment within',
        titlePaymentClient: 'Type',
        own: 'Own',
        thirds: 'Thirds',
        placeholder: 'Select a currency',
        titlePayments: 'Payment method',
        placeholderPayments: 'Payment methods',
      },
      formVerification: {
        title: 'User verification',
        firstName: 'First name',
        lastName: 'Last name',
        answerSecurity: 'Answer security',
        questionSecurity: 'Question security',
        typeDocumentIdentity: 'Type document',
        numberDocumentIdentity: 'Number document',
        gender: 'Gender',
        genderPlaceholder: 'Select gender',
        birthdate: 'Birthdate',
        familyName: 'Contact',
        familyEmail: 'Contact email',
        userDirection: 'Direction',
        birthplace: 'Birthplace',
        userLocalBitcoin: 'LocalBitcoins user',
        userFacebook: 'Facebook user',
        documentIdentity: 'Upload Identity Document ',
        selfieIdentity: 'Take selfie',
        selfieSupport: 'Selfie',
        buttonChange: 'Change',
        fileNotSupported: 'File not supported',
        messageOperationSuccess: 'Your data has been successfully sent',
        gender: {
          male: 'Male',
          female: 'Female',
        },
        documentType: {
          id: 'ID',
          dni: 'DNI',
          identificationCard: 'Identification card',
          passport: 'Passport',
          other: 'Other',
          placeholderOther: 'Specify document',
        },
        missings: {
          missingField: 'This field is required',
          missingFirstName: 'This field is required',
          missingLastName: 'This field is required',
          missingGender: 'This field is required',
          missingTypeDocumentIdentity: 'This field is required',
          missingNumberDocumentIdentity: 'This field is required',
          missingDocumentTypeOther: 'This field is required',
          missingBirthdate: 'This field is required',
          missingPhoto: 'Mandatory',
          missingSelfie: 'Mandatory',
        },
      },
      typesPayment: {
        BANK_ACCOUNT: 'Bank',
        BANK: 'Bank',
        OFFICE: "Office",
        PAYPAL: 'Paypal',
        ZELLE: 'Zelle',
        NEQUI: 'Nequi',
        YAPE: 'Yape',
        MONEYBEAN: 'MoneyBeam',
        EFECTY: 'Efecty',
        SUPERGIROS: "Supergiros",
        MOBILE_PAYMENT: 'Mobile Payment',
        MONEYBEAM: 'Moneybeam',
        POP_MONEY: 'Pop Money',
        PEOPLE_PAY: 'People Pay',
        RESERVE: 'Reserve',
        BOOZ: 'Booz',
        WISE: 'Wise',
        VENMO: 'Venmo',
        CASHAPP: 'Cashapp',
      },
    },
    dynamicForm: {
      labels: {
        user: 'User',
        link: 'Link',
        accountBank: 'Account bank',
        RFC: 'RFC',
        CLABE: 'CLABE',
        IBAN: 'IBAN',
        BIC: 'BIC',
        GENERIC_THIRD_ACCOUNT: 'Third account',
        ACH_THIRD_ACCOUNT: '3 business days',
        CUITCUIL: 'CUIT/CUIL',
        CBU: 'CBU',
        ACH: '3 business days',
        bank: 'Bank',
        ACH_EXPRESS: 'Same day (+35$)',
        ACH_THIRD_ACCOUNT_EXPRESS: 'Same day (+35$)',
        accountNumber: 'Account number',
        userHolderName: 'User Holder Name',
        accountHolderName: 'Account Holder Name',
        accountHolderEmail: 'Account Holder Email',
        userName: 'Username',
        accountHolderNumber: 'Account Holder Number',
        accountHolderId: 'Account Holder Id',
        accountHolderPhone: 'Account Holder Phone',
        accountInterbankCode: 'Account Interbank Code',
        accountType: 'Account Type',
        text: 'Payment type',
        description: 'Description',
        descriptionContent: 'Does not have',
        bankLogin: 'User bank',
        bankPassword: 'Password bank',
        optionsTextOne: 'Without credentials',
        optionsTextTwo: 'With credentials',
        optionsSelect: 'Options',
        emailReceiver: 'Email Receiver',
        accountWireNumber: 'Account number wire',
        commission: 'Commission',
        amount: 'Amount',
        vat: 'VAT',
        cardType: 'Card Type',
        cardNumber: 'Card Number',
        cardHolderName: 'Card Holder Name',
        accountInterbankCode: 'Interbank code',
        expDate: 'Expiration Date',
        csc: 'CSC',
        zipCode: 'Zip Code',
        placeholderTypePayment: 'Payment Type',
        creditCard: 'Credit Card',
        type: 'Payment Type',
        CREDIT_CARD: 'Credit Card',
        bankAccount: 'Bank Account',
        accountAddress: 'Account Address',
        accountZip: 'Account Zip',
        bankRoutingNumber: 'Bank Routing Number',
        bankSwiftCode: 'Bank Swift Code',
        accountWireRoutingNumber: 'Account wire routing number',
        bankAndOffice: 'Bank/Office',
        officesInfoId: 'Office',
        options: 'Options',
        address: 'Address',
        TRANSFER_WITH_SPECIFIC_BANK: 'From same bank',
        TRANSFER_NATIONAL_BANK: 'From another bank',
        TRANSFER_TO_CRYPTO_WALLET: 'Transfer to Crypto Wallet',
        create: 'Add payment method',
        account: 'Account',
        zelle: 'Zelle',
        BANK: 'Bank',
        PAYPAL: 'Paypal',
        ZELLE: 'Zelle',
        NEQUI: 'Nequi',
        YAPE: 'Yape',
        MONEYBEAN: 'MoneyBeam',
        EFECTY: 'Efecty',
        SUPERGIROS: "Supergiros",
        MOBILE_PAYMENT: 'Mobile Payment',
        MONEYBEAM: 'Moneybeam',
        POP_MONEY: 'Pop Money',
        PEOPLE_PAY: 'People Pay',
        RESERVE: 'Reserve',
        BOOZ: 'Booz',
        WISE: 'Wise',
        VENMO: 'Venmo',
        CASHAPP: 'Cashapp',
        account_NumberMask: 'Account number terminal',
      },
      placeholderOption: 'Select an option...',
      buttonAdd: 'Create payment method',
      buttonVerify: 'Verify payment method',
      emptyFields:
        'Currently you cannot create payment methods in the selected currency.',
    },
    benefits: {
      yes: 'Yes',
      no: 'No',
      operationFail: 'Error completing the operation try again',
      messageOperationSuccess: 'Operation performed successfully.',
      buttonAccept: 'Accept',
    },

    contact: {
      header: 'Customer Support',
      name: 'Full name',
      email: 'Email',
      phone: 'Phone',
      technicalIssues: 'Technical Issues',
      mainOffice: 'Main Office',
      english: 'English',
      spanish: 'Spanish',
      aleman: 'German',
      subject: 'Subject',
      buttonSend: 'Send',
      placeholder: {
        name: 'First name and last name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
      },
      post: {
        error: {
          header: 'Error',
          message: 'An error has occurred. Try again please',
          type: {
            name: 'The Full Name field is required',
            email: 'The Email field is required',
            emailInvalid: 'Please enter a valid email',
            phone: 'The Telephone field is required',
            subject: 'The Subject field is required',
            message: 'The Message field is required',
          },
        },
        success: {
          header: 'Great!',
          message:
            'Thank you for contacting us. We will respond as soon as possible',
        },
      },
    },
    common: {
      charges: {
        title: 'Rates in operations by Currencies',
        MC_BUY_BALANCE__WISE__COMMISSION: 'Deposit from WISE',
        MC_BUY_BALANCE__ZELLE__COMMISSION: 'Deposit from ZELLE',
        MC_BUY_BALANCE__VENMO__COMMISSION: 'Deposit from VENMO',
        MC_BUY_BALANCE__CASHAPP__COMMISSION: 'Deposit from CASHAPP',
        MC_BUY_BALANCE__NEQUI__COMMISSION: 'Deposit from NEQUI',
        MC_BUY_BALANCE__SUPERGIROS__COMMISSION: 'Deposit from SUPERGIROS',
        MC_BUY_BALANCE__EFECTY__COMMISSION: 'Deposit from EFECTY',
        MC_BUY_BALANCE__YAPE__COMMISSION: 'Deposit from YAPE',
        MC_BUY_BALANCE__MONEYBEAN__COMMISSION: 'Deposit from MONEYBEAM',
        MC_SEND_TO_PAYMENT__WISE__COMMISSION: 'Transfer from WISE',
        MC_SEND_TO_PAYMENT__ZELLE__COMMISSION: 'Transfer from ZELLE',
        MC_SEND_TO_PAYMENT__VENMO__COMMISSION: 'Transfer from VENMO',
        MC_SEND_TO_PAYMENT__CASHAPP__COMMISSION: 'Transfer from CASHAPP',
        MC_SEND_TO_PAYMENT__NEQUI__COMMISSION: 'Transfer from NEQUI',
        MC_SEND_TO_PAYMENT__SUPERGIROS__COMMISSION: 'Transfer from SUPERGIROS',
        MC_SEND_TO_PAYMENT__EFECTY__COMMISSION: 'Transfer from EFECTY',
        MC_SEND_TO_PAYMENT__YAPE__COMMISSION: 'Transfer from YAPE',
        MC_SEND_TO_PAYMENT__MONEYBEAN__COMMISSION: 'Transfer from MONEYBEAM',
        SEND_TO_PAYMENT__GENERIC_THIRD_ACCOUNT__COMMISSION: 'Transfer to Bank - Third account',
        MC_SEND_SMS_NATIONAL__COMMISSION: 'National MoneyClick Send',
        MC_SEND_SMS_INTERNATIONAL__COMMISSION:
          'International MoneyClick Send',
        MC_SEND_TO_PAYMENT__COMMISSION:
          'Transfer to BANK from MoneyClick',
        MC_FAST_CHANGE__COMMISSION: 'MoneyClick Fast Change',
        MC_RETAIL_BUY_BALANCE__COMMISSION: 'Buy balance at Exchange Places',
        MC_RETAIL_SELL_BALANCE__COMMISSION: 'Sell balance at Exchange Places',
        MC_AUTOMATIC_CHANGE__COMMISSION: 'MoneyClick Automatic change',
        MC_BUY_BALANCE__COMMISSION: 'Bank Deposit',
        MC_BUY_BALANCE__PAYPAL__COMMISSION: 'PayPal deposit',
        MC_SELL_BALANCE__COMMISSION: 'Sell balance MoneyClick',
        SEND_TO_PAYMENT__COMMISSION: 'Transfer to BANK',
        SEND_TO_PAYMENT__PAYPAL__COMMISSION: 'Transfer to PayPal',
        SEND_TO_PAYMENT__ACH__COMMISSION: 'Transfer to ACH',
        SEND_TO_PAYMENT__ACH_EXPRESS__COMMISSION: 'Transfer to Bank - Same day',
        SEND_IN__COMMISSION: 'Sending to MoneyClick wallets',
        SEND_OUT__COMMISSION: 'Sending to external wallets',
        SEND_TO_PAYMENT__ACH_THIRD_ACCOUNT__COMMISSION:
          'Transfer to BANK - third account',
        SEND_TO_PAYMENT__ACH_THIRD_ACCOUNT_EXPRESS__COMMISSION:
          'Transfer to BANK - Third account express',

        message: 'Between',
        change: 'to',
        FAST_CHANGE__COMMISSION: 'Fast Change',
        MC_BUY_BITCOINS__COMMISSION: 'Buy BTC',
        MC_BUY_BITCOINS__VAT: 'VAT-Buy BTC',
        MC_SELL_BITCOINS__COMMISSION: 'Sell BTC',
        MC_SELL_BITCOINS__VAT: 'VAT-Sell BTC',
        MC_POST_MESSAGE_OFFER__COMMISSION: 'Post MoneyMarket offer',
        MC_TAKE_MESSAGE_OFFER__COMMISSION: 'Take MoneyMarket offer',
        MC_BUY_CRYPTO__COMMISSION: 'Buy Crypto',
        MC_SELL_CRYPTO__COMMISSION: 'Sell Crypto',
        GIFT_CARD_REDEEM__COMMISSION: 'Gift Card Redeem',
        GIFT_CARD_REDEEM_BR__COMMISSION: 'Gift Card BitcoinRecharge Redeem',
        MONEY_ORDER_SEND__COMMISSION: 'Mail Money Orders',
        SEND_OUT__ETHEREUM__COMMISSION: 'Sending to external wallets ERC-20',
        SEND_OUT__TRON__COMMISSION: 'Sending to external wallets TRC-20',
      },
    },

    recharge: {
      escrow: {
        wish: 'you want to',
        getMovementsScrow: 'Escrow Movements',
        escrowAvaliable: 'Escrow Avaliable',
        currency: 'Currency',
        areyouSure: 'Are you sure to continue?',
      },
      notAuth: {
        part1: 'Please, ',
        part2: 'log in',
        part3: ' or ',
        part4: 'sign up',
        part5: ' to deposit',
      },
      options: {
        moneyclick: 'MoneyClick',
      },
      loading: 'Loading...',
      menu: {
        title1: 'Deposit',
        title2: 'Deposit History',
      },
      modalTerms: {
        header: 'Terms and Conditions',
        content: termsAndConditionsEng,
        buttonClose: 'Accept',
        buttonAcceptTerms: 'I Agree',
      },
      modalConfirm: {
        header: 'Send deposit request',
        request: {
          part1: 'Deposit request of ',
        },
        payWindow: {
          part1: 'Once the deposit request is sent, you have ',
          part2:
            ' minutes to finish the operation, otherwise it will be canceled automatically.',
        },
        charges: {
          header: 'Operating charges',
          VAT: 'VAT: ',
          COMMISSION: 'Commission: ',
        },
        buttonCancel: 'Cancel',
        buttonAccept: 'Continue',
        buttonClose: 'Accept',
      },
      modalNotVerify: {
        notVerifiedA:
          'If you want to deposit within the platform using banking means, you must complete and verify your data. Once verification is approved, the system will allow you to continue recharging on a regular basis. Remember that you must be the owner of the accounts to use.',
        header: 'Attention',
        buttonClose: 'Close',
      },
      formVerificationPhone: {
        messages: {
          sentToken: {
            part1: 'We have sent a verification code to your mobile phone ',
            part2: '******',
            part3:
              '. Enter the code to complete the verification. You can send the code again after 60 seconds',
          },
          verifiedPhone: {
            part1: 'The phone  ',
            part2: '******',
            part3: ' has been successfully verified.',
          },
          failVerification:
            'Your phone could not be verified. Try again or check your mobile phone number.',
          notVerifyB:
            'To make deposit you need to verify your mobile phone, please press Send code to start verification.',
        },
        errors: {
          tokenNotSent:
            'There was a problem sending the code, please try again.',
          phoneUsed: 'The phone number is already in use.',
        },
        formRequestCode: {
          countryCode: 'Country code',
          placeholderCountryCode: 'Select a country...',
          phone: 'Mobile phone',
          buttonSend: 'Send code',
        },
        formCodeSent: {
          code: 'Code',
          buttonVerify: 'Verify',
          buttonResend: 'Resend code',
          buttonBack: 'Back',
        },
      },
      formVerificationIdentity: {
        sexList: {
          male: 'Male',
          female: 'Female',
        },
        documentType: {
          id: 'ID',
          dni: 'DNI',
          identificationCard: 'Identification card',
          passport: 'Passport',
          other: 'Other',
        },
        errors: {
          missingFields:
            'To start the process of verifying your data you must fill in the fields marked as mandatory (*)',
          requiredField: 'This field is required',
          firstName: 'FirstName is required',
          lastName: 'LastName is required',
          sex: 'Sex is required',
          typeDocument: 'TypeDocument is required',
          numberDocument: 'NumberDocument is required',
          birthdate: 'Birthdate is required',
          countryOfBirth: 'Country Of Birth is required',
          cityOfBirth: 'Birthplace is required',
          direction: 'Direction es required',
          fileNotSupported: 'File not supported',
          fileSize: 'File size exceeds the allowed',
          missingFiles: 'Excuse me, you must include all the files',
          errorNetwork: 'Network Error',
          emptyIDNumber: 'Excuse me, must include the identification number',
          emptyIDNumberType:
            'Excuse me, should include the type of identity document',
          emptySecurityAnswer: 'Excuse me, should include the security answer',
          emptySecurityQuestion:
            'Excuse me, you must include the security question',
          selectTypeDocument:
            'Excuse me, you must select a type of identification document',
        },
        successFilesFiles:
          'Your files have been sent successfully. This verification process can take up to 72 hours.',
        form: {
          name: 'Name',
          placeholderName: 'Enter your name',
          lastName: 'Last name',
          placeholderLastName: 'Enter your last name',
          sex: 'Sex',
          placeholderSex: 'Select...',
          documentType: 'Document type',
          placeholderDocumentType: 'Select...',
          other: 'Specify',
          numberId: 'ID Number',
          birthday: 'Birthdate',
          birthplace: 'Birthplace',
          country: 'Country code',
          placeholderCountry: 'Select a country...',
          phone: 'Mobile phone',
          placeholderPhone: 'Example 1234567',
          securityQuestion: 'Security question',
          securityAnswer: 'Security Answer',
          contactFamily: 'Contact family',
          contactCompany: 'Company contact person',
          placeholderContact: 'Family name',
          contactEmailFamily: 'Contact email',
          contactEmailCompany: 'Company contact email',
          localbitcoinUser: "Localbitcoin's user",
          facebookUser: "Facebook's user",
          addressPersonal: 'Address',
          addressCompany: 'Company address',
          verifyCUninitiatedPersonal: {
            warning: 'Attention!',
            messageWarning:
              'If you want to start the verification process, include the documents indicated below.',
            messageFile:
              'Click on the icon or drag to load the corresponding file.',
            supportedTypeFiles:
              'Allowed file types: jpg, jpeg, png, gif, pdf. Maximum file size 5Mb',
            documentID: 'Identification document (DNI, Passport, ID)',
            bankAccountSupport: 'Proof of one of your bank accounts',
            addressSupport: 'selfie with ID',
            selfieSupport: 'selfie with ID',
            buttonChange: 'Change',
            fileNotSupported: 'File not supported',
          },
          verifyCUninitiatedCompany: {
            warning: 'Attention!',
            messageWarning:
              'If you want to start the verification process of your company, include the documents indicated below.',
            name: 'Company name',
            registerYear: 'Year of registration',
            registerFiscalType: 'Type of fiscal record',
            registerFiscalNumber: 'Commercial registration number',
            messageFile:
              'Click on the icon or drag to load the corresponding file.',
            supportedTypeFiles:
              'Allowed file types: jpg, jpeg, png, gif, pdf. Maximum file size 5Mb',
            documentID:
              'Identity document of the person who verifies (must coincide with the signatory in the commercial register).',
            bankAccountSupport: 'Proof of associated legal account',
            registerFiscal: 'Commercial register (with wet seal)',
            selfieSupport: 'Selfie with commercial registration document',
            buttonChange: 'Change',
            fileNotSupported: 'File not supported',
          },
          buttonSave: 'Save',
          buttonVerify: 'Verify',
          buttonBack: 'Back',
        },
      },
      formChatVerification: {
        dataToVerify: {
          email: 'Email',
          phone: 'Phone',
          firstName: 'Name',
          lastName: 'Last name',
          answerSecurity: 'Security Response',
          questionSecurity: 'Security Question',
          typeDocumentIdentity: 'Document type',
          otherDocument: 'Other document',
          numberDocumentIdentity: 'Document number',
          gender: 'Gender',
          female: 'Female',
          male: 'Male',
          birthdate: 'Birthdate',
          countryOfBirth: 'Country Of Birth',
          cityOfBirth: 'City Of Birth',
          birthplace: 'Birthplace',
          userLocalBitcoin: 'LocalBitcoins user',
          userFacebook: 'Facebook user',
          nickname: 'Nickname',
          familyName: 'Contact',
          familyEmail: 'Contact email',
          userDirection: 'Address',
          bank: 'Bank',
          accountNumber: 'Account number',
          userHolderName: 'Name',
          accountHolderName: 'Account Holder Name',
          accountHolderEmail: 'Account Holder Email',
          userName: 'Username',
          accountHolderNumber: 'Account Holder Number',
          accountHolderId: 'Document number',
          accountHolderPhone: 'Account Holder Phone',
          accountInterbankCode: 'Account Interbank Code',
          type: 'Payment Method',
          currency: 'Currency',
          accountType: 'Account type',
          companyName: 'Company name',
          documentTypeFiscalRecord: 'Tax registration document',
          numberFiscalRecord: 'Registry number',
          registrationYear: 'Year of registration',
          cardType: 'Credit card type',
          cardNumber: 'Credit card number',
          cardHolderName: 'Card holder name',
          accountInterbankCode: 'Interbank code',
          expDate: 'Expiration date',
          csc: 'Security code',
          zipCode: 'Zip Code',
          accountAddress: 'Account Address',
          accountZip: 'Account zip code',
          bankRoutingNumber: 'Bank Routing number',
          bankSwiftCode: 'Bank swift code',
          accountWireRoutingNumber: 'Account Wire Routing Number',
        },
        errors: {
          fileNotSupported: 'File not supported',
          fileSize: 'File size exceeds the allowed',
          requiredField: 'This field is required',
        },
        verifyC: {
          processing: {
            header: 'Verification of user in PROCESS',
            content:
              'At the conclusion of the process you will be notified so you can continue with your PURCHASE. Do not hesitate to contact our moderator staff for any questions related to the process.',
          },
          fail: {
            header: 'User verification FAILED',
            content1: 'Contact us through our WhatsApp',
            content2:
              'to learn more details of the process or request your user verification again.',
            phone: '+1 (518) 913-2770',
          },
          success: {
            content: 'Successfully verified user',
            buttonContinue: 'Continue my deposit',
          },
        },
        verifyD: {
          processing: {
            header: 'Verification of payment method in PROCESS',
            content:
              'A micro deposit will be sent to your account to verify that it actually exists and you are the owner of it. Attach the screenshot of the microdeposit in the chat so that the moderator can finish the process. At the conclusion of the process you will be notified so you can continue with your DEPOSIT.',
            creditCardContent:
              'Photo of the front side of the credit card must be attached. Only credit cards that allow international charges are accepted, check with your bank operator for more information',
          },
          fail: {
            header: 'Verification of means of payment FAILED',
            content:
              'Normally the failure of this process is due to error in the data provided. Communicate by our chat with our moderators to know more details of the process or cancel the verification and try again.',
          },
          success: {
            content: 'Means of payment successfully verified.',
            buttonContinue: 'Continue my deposit',
          },
          cancel: {
            content: 'Verification of the means of payment was canceled.',
            buttonContinue: 'Continue my deposit',
          },
        },
        placeholderChat: 'Write your message here',
        buttonCancel: 'Cancel verification',
        buttonClose: 'Close verification',
        buttonAttachment: 'Attach document',
        buttonSend: 'Send',
        labelMe: 'Me',
        labelModerator: 'Moderator',
        operationTimeLeft: '10 minutes left to close the operation',
        operationTimeExpired: 'The operating time has expired',
        buttonSeeAttachment: 'See attached file',
      },
      form: {
        errors: {
          requiredField: 'This field is required',
          minAndMax:
            'The value must be between the minimum amount and the maximum amount',
          acceptTerms: 'You must accept the terms and conditions',
          notAmount: 'There are no longer amounts to operate with this offer',
          notOffersForCurrencyAndBank:
            'Ask customer service by WS in business hours to enable this option.',
          notOffersForCurrency:
            'Ask customer service by WS in business hours to enable this option.',
          notProcessed: 'Currently we can not process your offer, try later.',
          amountBetween: 'The amount selected must be between ',
          comercialLimit: 'Up to a maximum of $ 2,000 is allowed ',
          firstBuy:
            ' Please note that for your first trade with us, we require that you initiate the wire in person at your bank',
          notBalance: 'You do not have enough balance.',
          changePrice: 'Change the price, the current price is ',
          amountMaxLimit: 'The current amount has reached the commercial limit',
          notOffers: 'Currently there are no offers, please try other options.',
          notBalanceExternal: 'Your balance is not enough',
          server: 'Sorry an error has occurred on the server, try later',
          userDaylyLimitReached: 'You have exceeded the daily limit',
          userMoytlyLimitReached: 'You have exceeded the monthly limit',
        },
        messages: {
          successRequest:
            'Your request has been sent, please go to Deposit History to finish the operation',
          blueAlert:
            'Note: Your bitcoins will be deferred until your deposit is accredited and verified by our Operator.\n' +
            ' The system does not accept refunds or cancellations. In some cases banks may delay releasing\n' +
            'payments, this depends on the bank, the account, the amount or if additional validations are\n' +
            'required.',
          redAlert:
            'Attention: The transfer can only be made from your verified bank account and associated with this\n' +
            'operation.  In case of doing it from another account your operation will be canceled and the\n' +
            'payment reversed. You must make the payment within the established time frame, mark as\n' +
            'Realized Payment and send a clear capture to the Operator.  Place in Payment Concept: Buy\n' +
            'Bitcoin with the ID code of the transaction.',
          ethAlert:
            'Warning: Verify that your wallet code contains the correct data and corresponds to this\n' +
            'cryptocurrency.  In case of error in your code you may lose the amount of your transaction. The\n' +
            'system does not accept refunds or cancellations.',

          //greenAlert:"Up to a maximum of $ 2,000 is allowed "
        },
        fields: {
          fieldss: 'Fields',
          banks: 'Banks/Offices',
          currency: 'Currency',
          typeCheck: 'Check type',
          placeholderCurrency: 'Select',
          paymentMethods: 'Payment method',
          paymentsType: 'Payment type',
          messageToTheModerator: 'Message to the moderator',
          placeholderPaymentMethods: 'Select',
          placeholderSelect: 'Select',
          ownPaymentMethods: 'Own Payment Methods',
          placeholderOwnPaymentMethods: 'Select',
          commercialLimits: 'Commercial limits',
          placeholderType: 'Select',
          amount: 'Amount',
          amountFiat: 'Fiat Amount',
          amountBTC: 'Amount in BTC',
          forexRate: 'Forex rate',
          averagePriceReference: 'Average referential price',
          placeholderComments: 'Write your comment for our moderators.',
          identifyBuy: 'Operation description (optional)',
          accept: 'Accept',
          terms: 'Terms and Conditions',
          buttonBuy: 'Deposit',
          reject: 'Dissmiss',
          createPaymentMethod: 'Create',
          typeElectro: 'Type of Electronic Transfer',
          bankAccountBalance: 'Bank balance account',
        },
      },
      modalCreatePayment: {
        header: 'Attention!',
        body: {
          h3: 'Before selecting your payment method, carefully read the following instructions.',
          p1: 'The rules for banking transactions change from country to country and even between banks. This can affect your operations.',
          p2: 'Keep in mind the following indications before making your Payment: ',
          list: {
            item1: {
              recommended: 'Recommended',
              header: ' Transfers from a Specific Bank',
              body: {
                p1: 'If you have a bank account within one of the banks that we specify in our list of accounts enabled to receive your payment, you can make your Electronic Transfer and your payment will be received and verified immediately. Therefore this means of payment guarantees speed in your transaction and except in very few countries generates bank fees.',
                p2: 'Note that in some cases this process may take several hours, which may delay the release of your Bitcoin..',
                p3: 'Important Note: Only use this option if you are the owner of the account from which you made the payment, and if it is within one of the specified banks. If you make the payment from a different bank your transaction will have a possible adjustment of the purchase rate and may generate additional charges.',
              },
            },
            item2: {
              header: 'Transfer from a Third Bank',
              body: {
                p1: 'Depending on the country and the bank, this payment is usually reflected in a period of 6, 24 or 48 working hours. If the payment falls on the same business day, the Purchase Price of your BTC will remain the same, but if the payment enters from the next day or following sub days, an adjustment can be made in your BTC Purchase Price rate..',
                p2: 'Our commercial policy stipulates to benefit our Users and to the commerce, but due to the strong variations of prices your purchase will be translated to the current price for the moment in which your money is available in our account.',
                p3: 'Also keep in mind that this type of Payment Method can generate additional bank charges.',
                p4: 'The extra charges charged by the bank and the variation of the BTC Purchase Price will determine the amount that will be credited to your wallet once the Purchase is completed.. ',
                p5: 'Important Note: Do not forget that we only accept payments made from an account in your name and that once the Transaction is made it will not be reversible under any circumstances. ',
              },
            },
            item3: {
              header: 'Cash deposit',
              body: {
                p1: 'Depending on the Country and the Banking Institution, cash deposits can be received (Cash). In most cases they must be limited amounts and you should check with each bank whether or not you receive cash deposits.',
                p2: 'The bank may ask you to justify the funds.',
                p3: 'You must always place on the Banking Receipt the Receipt or Transaction number issued by our platform, and write by hand and in legible handwriting "PURCHASE OF BITCOIN NON REFUNDABLE", once this is done take a photo and send the capture before you press the button of Payment Made.',
                p4: 'Payment will be credited immediately if you comply with all the instructions.',
                p5: 'For Cash Deposits of more than one thousand dollars or its equivalent in any currency, you must consult the moderator. ',
                p6: 'Important Note: If you choose the Cash Deposit option and make any other payment method such as Check or Bank Draft for example, your transaction will be deferred and may be reversed by the DollarBTC Operator, in addition to generating a penalty and a Red Flag to Your User Account For cash payments you must comply with these requirements and any other that the DLBTC Operator requests or that is required by the Laws for Prevention of Money Laundering or Prevention of Terrorist Activities in force.. ',
              },
            },
            item4: {
              header: 'Wire ',
              body: {
                p1: ' This means of payment is only available in some countries, the payment will be credited in the following 24 or 48 business hours.',
                p2: 'You must send fully readable operation support.',
                p3: 'The payer must check that he owns the account where the funds come from.',
                p4: 'This means of payment is available for operations of five thousand dollars and more. ',
              },
            },
            item5: {
              header: 'International transfer (Swift o Aba)',
              body: 'For this type of payment you should consult the Moderator. ',
            },
            item6: {
              header: 'Deposit in Check',
              body: 'For this type of payment you should consult the Moderator. ',
            },
          },
        },
        buttonAccept: 'Accept',
      },
      history: {
        terms: termsBuyEng,
        errors: {
          requiredField: 'This field is required',
          fileNotSupported: 'Type of file not supported',
          exceededSize: 'File size exceeds the allowed',
        },
        bill: {
          pdfHeader: 'Invoice',
          header: 'Digital invoice',
          ticket: 'Ticket',
          time: 'Time',
          date: 'Date',
          amountIn: 'Amount in ',
          amountBTC: 'Amount in BTC',
          amountFiat: 'Amount Fiat',
          currencyFiat: 'Currency Fiat',
          appliedRate: 'Applied rate',
          tax: 'Tax',
          bankRate: 'Bank rate',
          issuingBank: 'Payment Issuing Bank',
          namePayer: 'Payer Name',
          receivingBank: 'Reception bank',
        },
        messages: {
          waitingPaymentExpired: 'Expired the time of your payment.',
          payVerificationSent: 'Payment notification sent successfully.',
          sentProofValidPayment:
            'To conclude your purchase you must successfully attach a valid payment voucher, clearly visible and with the transaction number in the payment concept. If you do not attach a proof of payment with these characteristics, your operation can not be verified by the Operator. Remember that you must complete your payment before the set time. Once you attach the voucher, press the button Check payment.',
          sentProof2:
            'To conclude your purchase successfully you must attach a valid receipt, visible and clear, with the transaction number in the payment concept if you do not attach a clear and visible payment voucher your operation can not be verified by the Operator. You must conclude your payment before the established period. Once attached the receipt press the button',
        },
        tableHeaders: {
          date: 'Date',
          amount: 'Amount',
          currency: 'Currency',
          status: 'Status',
          transactions: 'Transactions',
          statusValues: {
            started: 'Initiated',
            success: 'Success',
            waitingPayment: 'Waiting for payment',
            canceled: 'Canceled',
            paid: 'Paid',
            claim: 'Claim',
            payVerification: 'Pay Verification',
            processing: 'Processing',
          },
        },
        table: {
          previous: 'Previous',
          next: 'Next',
          loading: 'Loading...',
          noData: 'There are not operations',
          page: 'Page',
          of: 'of',
          rows: 'rows',
          pageJump: 'go to the page',
          rowsSelector: 'rows by page',
        },
        accordion: {
          details: 'Operation details',
          operation: 'Operation #:',
          terms: 'Terms y Conditions',
          seeMore: '...See more',
          digitalBill: 'Digital invoice',
          buttonDownload: 'Download',
          qualify: 'Qualify',
        },
        payWindow: 'Payment window:',
        minutes: 'Min.',
        buttonMarkPayment: 'Mark Payment',
        warningClaim: 'The operation is in a claim process',
        placeholderMessage: 'Write your message here',
        claimNotificationSent: 'Claim notification sent',
        buttonClaim: 'Make a Claim',
        buttonSend: 'Send',
        buttonAttachment: 'Attach document',
        buttonCancel: 'Cancel deposit',
        buttonClose: 'Cancel deposit',
        labelMe: 'Me',
        labelModerator: 'Moderator',
        operationTimeLeft: '10 minutes left to close the operation',
        operationTimeout: 'The operating time has expired',
        buttonSeeAttachment: 'Ver archivo adjunto',
        theOperation: 'The operation',
        wasCreated: ' it was created successfully.',
        wasClaimed: ' has entered a claim process.',
        modalCancel: {
          header: 'Cancel deposit',
          content: 'Are you sure you want to cancel this purchase transaction?',
          buttonCancel: 'Cancel',
          buttonClose: 'Close',
          buttonAccept: 'Accept',
        },
        modalQualify: {
          header: 'Qualify operation',
          comment: 'Comment',
          qualify: 'Qualify',
          send: 'Send',
          messageSuccess: 'Qualification done successfully',
          messageError: 'An error has occurred, please try again later',
        },
      },
    },
    homeMobile: {
      header: 'Download MoneyClick',
      text: 'on your phone or tablet, register and start enjoying the best online shopping system',
    },
    officeInfo: {
      name: 'Office',
      website: 'Website',
      workTime: 'Work Time',
      address: 'Address',
      phone: 'Phone',
    },
    chat: {
      headerTitle: 'Hello!',
      subtitle: 'Do you have any doubt? We are ready to help',
      placeholderSender: 'Write your question ...',
      welcome: 'Welcome ',
      messageWelcomeRegister: 'How can we help you today?',
      messageWelcomeUnregister:
        'Please enter your name and email to start or continue a recent conversation in this browser',
      todayLabel: 'TODAY',
      letsContinue: "Let's continue...",
      userTaken:
        'You already have a session started in another browser or window',
      form: {
        name: 'Name',
        email: 'Email',
        buttonSend: 'Send',
        error: {
          emailWrong: 'Wrong email',
          name: 'Required field',
          email: 'Required field',
        },
      },
    },
    navPublic: {
      lang: {
        es: 'Spanish',
        en: 'English',
        resume: {
          es: 'Spa',
          en: 'Eng',
        },
      },
      account: {
        header: 'Account',
        options: {
          login: 'Login',
          signup: 'Sign Up',
          hft: 'HFT Plans',
          wallet: 'Wallet',
          sell: 'Sell Bitcoins',
          buy: 'Buy Bitcoins',
          forum: 'Forum',
          fixedTermAccounts: 'Fixed Term Accounts',
        },
      },
    },
    instructive: instructive.en,
    legal: legal.en,
    sendMoneyClick: {
      header: 'To MoneyClick Users',
      availableBalanceSend: 'You can send up to: ',
      availableBalance: 'Available Balance: ',
      placeholderRecipientPhone: "Recipient's Phone",
      placeholderRecipientName: "Recipient's Name",
      amountInvalid: 'The amount exceeds the available',
      placeholderAmountFiat: 'Amount',
      equivalentUSD: 'Equivalent in USD: ',
      placeholderDescription: 'Description',
      toConstacts: 'Select from Contacts',
      toFrequents: 'Select from Frequent',
      send: 'Send',
      currency: 'Currency',
      placeholderSelectedCurrency: 'Select a currency',
      errorPhone: 'Please enter a phone',
      errorReceiverName: 'Please enter a name',
      errorAmount: 'Please enter a higher amount',
      errorDescription: 'Please enter a description',
      errorValidCurrency: 'You do not have a balance in the required currency',
      errorValidCode: 'Qr code is not a valid code',
      messageSuccessSend1: 'Hello',
      messageSuccessSend2: ' has sent you ',
      messageSuccessSend3: ' To see your balance, please go to MoneyClick app',
      messageSuccessSend4: 'MoneyclickCredit Hello ',
      messageSuccessSend5:
        ' by MoneyClick. Download the app at https://play.google.com/store/apps?hl=es ,username: ',
      messageNotRegisterUser:
        ' You must register to accept the moneyClick payment, otherwise the money will be refunded to your account within 6 hours aprox.',
      messageRegisterUser: 'The money will be sent to',
      errorReceiverPhoneMask: 'The operator number cannot start with zero',
      errorCountry: 'Press + to select a Country Code',
      contacts: 'Contacts',
      permisions: {
        title: 'SMS Permissions!',
        message: 'MoneyClick requests permissions to send messages.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      },
      modalFrequents: {
        title: 'Users Frequents',
        name: 'Name',
        codCountry: 'Country code',
        phone: 'Phone',
        select: 'Please select:',
        messageConfirm: 'Delete frequent user',
        partialMessage: 'You want to remove',
        succesDelete: 'has been successfully removed',
        yes: 'Yes',
        not: 'No',
        notFrequents: 'No frequent users',
      },
      modal: {
        withoutBalance: 'You currently do not have enough balance.',
        verifyData: 'Data verification',
        dataOperation: 'Operation Data',
        amount: 'Amount to send: ',
        receiver: 'Send to: ',
        phone: 'Phone: ',
        description: 'Description: ',
        operationSuccess: 'Operation performed successfully.',
        send: 'Send',
        addUserFrequent: 'Add as frequent user',
        userDaylyLimitReached: 'You have exceeded the daily limit',
        userMoytlyLimitReached: 'You have exceeded the monthly limit',
        selectPhoneThisContacts: 'Select the phone number you want to use',
        accept: 'Accept',
        password: 'Enter your password to confirm the operation',
        commission: 'Commision: ',
        cancel: 'Cancel',
        errorMachPassword: 'Error validating password',
        errorNotAuthUser: 'The Recipient has rejected the transaction',
        errorAmountCommision:
          'The amount to send plus the commission exceeds the available',
        errorIsRequired: 'Required field',
        errorInService: 'An error occurred try again later',
      },
    },
    takePhoto: {
      header: 'Take a picture',
      buttonSave: 'Save',
      buttonCancel: 'Cancel',
      buttonTake: 'Take Photo',
      buttonRetake: 'Retake',
      errorSaving: 'An error occurred trying to save the image, try again',
    },
    inbox: {
      messages: {
        finished: {
          part1: 'The operation ',
          part2: ' has changed its status: FINISHED',
        },
        newMessage: {
          part1: 'The operation ',
          part2: ' has received a new message',
        },
        canceled: {
          part1: 'The operation ',
          part2: ' has changed its status: CANCELED',
        },
        waitingPayment: {
          part1: 'The operation ',
          part2: ' has changed its status: WAITING FOR PAYMENT',
        },
        fail: {
          part1: 'The operation ',
          part2: ' has changed its status: FAIL',
        },
        operationTimeLeft: '10 minutes left to close the operation',
        operationTimeExpired: 'The operating time has expired',
        paid: {
          part1: 'The operation ',
          part2: ' has changed its status: PAID',
        },
        created: {
          part1: 'The operation ',
          part2: ' has been CREATED',
        },
        success: {
          part1: 'The operation ',
          part2: ' has changed its status: SUCCESSFUL',
        },
        claim: {
          part1: 'The operation ',
          part2: ' has changed its status: CLAIM',
        },
        payVerification: {
          part1: 'The operation ',
          part2: ' has changed its status: PAY VERIFICATION',
        },
        receiverConfirmation: {
          part1: 'The operation ',
          part2: ' has changed its status: WAITING FOR RECEIVER CONFIRMATION',
        },
        noMessages: "You don't have new messages to show",
      },
      read: 'Read',
      unread: 'Unread',
      notNotifications: "You don't have pending notifications",
      popupSafari: {
        headerAuthSession: 'Authorize audio',
        messageAuthSession:
          'Click on the button to authorize audio playback in this session',
        buttonAuthorize: 'Authorize',
        headerAuthPermanent: 'Permanent authorization',
        messageAuthPermanent:
          'Navigate to browser settings to authorize dollarBTC.com for automatic audio playback (for informational purposes only without third-party advertising)',
      },
    },
    sendBitcoins: {
      header: 'Send Crypto',
      address: 'Receiver address',
      amount: 'Amount',
      red: 'Network',
      redLabel: 'Network to send',
      description: 'Description',
      headerLimits: 'Limits of operations',
      dailyLimits: 'Daily Limits',
      monthlyLimits: 'Monthly Limits',
      commission: 'Commissions:',
      commissionExternal: 'Send to external Wallets',
      commissionInternal: 'Send to internal Wallets',
      balanceAvailable: 'Available balance',
      maxSend: 'You can send up to:',
      modal: {
        header: 'Operation data',
        accept: 'Accept',
        cancel: 'Cancel',
        amountSend: 'Amount to Send',
        commission: 'Commission',
        addressReceiver: 'Recipient address',
        description: 'Description',
        close: 'Close',
        password: 'Enter your password to confirm the operation',
        operationSuccess: 'Operation performed successfully.',
      },
      error: {
        invalidAmount: 'Please enter a valid amount',
        amountMin: 'Please enter an amount greater than 0.001',
        setAddress: "Please enter the recipient's address",
        errorTypeAddress: 'Please enter a valid address',
        errorAmountCommision:
          'The amount to send plus the commission exceeds the available one',
        errorAmountNotCommision: 'The amount to send exceeds the available one',
        errorMachPassword: 'Error validating password',
        errorIsRequired: 'Required field',
        errorOperation: 'Please try again later',
        errorMissingRed: 'Please select a Network',
      },
    },
    receiveBitcoins: {
      header: 'Receive Crypto',
      addressCopied: 'Your address has been copied to the clipboard',
      loading: 'Loading...',
      infoMessage: {
        p1: 'To use the wallet you need to verify your email. We have sent an email to ',
        p2: 'Please check your email and follow the instructions.',
      },
      qrCode: 'QR Code',
      myAddress: 'Use this address to receive ',
      buttonCopy: 'Copy address',
      accordion: {
        txTitle: 'Incoming transactions',
        txBodyBTC:
          'Receiving bitcoins usually takes 40 to 60 minutes depending on the amount. ' +
          'Incoming transactions must receive 4 confirmations in the Bitcoin network to appear in your Wallet.',
        txBodyETH:
          'Receiving ethere usually takes 5 to 20 minutes depending on the amount. ' +
          'Incoming transactions must receive 20 confirmations in the network to appear in your Wallet.',
        txBodyUSDT:
          'Receiving USDT usually takes 5 to 20 minutes depending on the amount. ' +
          'Incoming transactions must receive 20 confirmations in the network to appear in your Wallet.',
        commissionsHeaderBTC: 'Commissions for incoming bitcoins',
        commissionsHeaderETH: 'Commissions for incoming Ethereum',
        commissionsHeaderUSDT: 'Commissions for incoming USDT',
        commissionsBody1: 'Between internal wallets NO commission is applied.',
        commissionsBody2:
          'To receive from wallets outside of MoneyClick NO commission is applied.',
        oldAddresses: 'Old addresses',
      },
      newAddressMessage:
        'If you want to generate a new address to perform your transactions you can press the "Generate address" button. Remember that each address has a duration of one month, but will still be able to perform transactions',
      buttonNewAddress: 'Generate address',
      tableOldAddresses: {
        headers: {
          created: 'Created',
          address: 'Address',
        },
      },
      modalNewAddress: {
        header: 'Generate new address',
        body: 'Do you want to generate a new address? Remember that this new address will have a duration of one month, but it will still be able to perform transactions like all previous addresses.',
        buttonCancel: 'Cancel',
        buttonClose: 'Close',
        buttonGenerate: 'Generate',
        messageResult: {
          success: 'New address generated successfully',
          error:
            'An error has occurred generating your new address. Try again later',
        },
      },
      table: {
        headers: {
          type: 'Type',
          date: 'Date',
          amountBTC: 'BTC Amount',
          description: 'Description',
          status: 'Status',
          amount: 'Amount',
        },
        cells: {
          coin: '\nCurrency: ',
          price: '\nPrice: ',
          amount: '\nAmount: ',
          processing: 'PROCESSING',
          failure: 'FAIL',
        },
        params: {
          previousText: 'Previous',
          nextText: 'Next',
          loadingText: 'Loading...',
          noDataText: 'There is not transactions',
          pageText: 'Page',
          ofText: 'of',
          rowsText: 'rows',
          pageJumpText: 'go to page',
          rowsSelectorText: 'rows by page',
        },
      },
    },
    buttonEuro: {
      header: 'Deposits in EUROS €',
      button: 'Click here',
    },
    receiveCard: {
      header: 'Gift Card',
      titleTabEmit: 'Emit',
      titleTaList: 'My Gift Cards',
      codeQr: 'QR code',
      idCard: 'Id card',
      create: 'Confirm',
      cancel: 'Cancel',
      accept: 'Accept',
      currency: 'Currency',
      amount: 'Amount',
      type: 'Type',
      email: 'Email receiver',
      errorRequest: 'Error in request, try again later',
      errorInData:
        'Some fields required to continue are missing, or some of them do not have the expected format',
      enoutBalance: 'Insuficient balance in currency',
      emailRequired: 'Required to send by email',
      buttonSend: 'Send',
      buttonPrint: 'Print',
      buttonReSend: 'Resend',
      buttonApply: 'Apply/Redeem',
      notDataTable: 'No registered cards',
      messageModalResend: 'You want to resend the Gift card with the ID:',
      emailDestinatary: 'to the recipients email',
      notYetSend: 'Gift card was not submitted yet',
      modal: {
        header: 'Apply/Redeem Gift Card',
        content: 'Do you want to Apply/Redeem this Gift Card?',
        amount: 'Amount:',
        code: 'Code:',
        yes: 'Yes',
        no: 'No',
        close: 'Close',
        errorGiftCardNotExist: 'This Gift Card is invalid or does not exist',
        alreadyUseGiftCard: 'The Gift Card has already been redeemed',
        confirCreate: 'Do you want to print the ID refill card: ',
      },
    },
    faqs: {
      header: 'Frequently Asked Questions (FAQ)',
      questions: {
        q1: {
          title: 'About MoneyClick',
          item1: {
            subtitle1: 'What is MoneyClick?',
            content1:
              'MC is a business network based on a comprehensive platform for communications and financial transactions.',
          },
          item2: {
            subtitle2: 'How does MoneyClick work?',
            content2:
              'MC allows the interconnection of transactions between sovereign local currencies and virtual currencies such as bitcoin through the members of the network.',
            content3:
              'By means of computer protocols, members are organized into different roles and functions to allow and guarantee that operations flow within the system, exchanging information and virtual or physical values ​​within a protected ecosystem and a friendly and safe environment.',
          },
          item3: {
            subtitle3: 'Who can join the network?',
            content3:
              'Any natural person, company, organization or legal association can be part of MC.',
          },
          item4: {
            subtitle4: 'What are the roles within the Network?',
            content1: 'User',
            content2: 'Banker',
            content3: 'Exchange Point',
            content4: 'Partner Operator',
            content5: 'Partner Administrator',
            content6: 'Administrator Master',
          },
          item5: {
            subtitle5: 'What is the function of each role in the system?',
            content1: 'User: ',
            content2:
              'The User is any member that registers and operates on the network.',
            content3: 'Banker: ',
            content4:
              "A User who certifies bank accounts and sets aside a fund as collateral to back transactions can become a Banker. The higher your guarantee fund, the more volume you can validate in the system's exchange order books.",
            content5: 'MC Exchange Point: ',
            content6:
              'They are affiliated business premises to exchange balance for cash or other types of payments.',
            content7: 'Operating Partner: ',
            content8:
              'The Operating Partner is an MC User who has invested in a common guarantee fund that allows to offset external transactions with other Operating Partners of the network.',
            content9: 'Managing Partner: ',
            content10:
              'A Partner who manages his own network of users and wishes to join the MC network, it can be a country, union, association or organized group.',
            content11: 'Master Admin: ',
            content12:
              'It is the central administration system that regulates, controls and manages the global MC network.',
          },
          item6: {
            subtitle6: 'How are decisions made?',
            content1:
              'By voting among associate members, as new partners are added and the network expands, opportunities for expansion and participation will open up.',
          },
          item7: {
            subtitle7: 'How are MC rates, fees and commissions set?',
            content1:
              'Our currency exchange rate calculation system allows you to obtain rates at competitive market prices adjusted in real time to make your changes within the system.',
            content2:
              'The commission scheme seeks the benefit of the entire community, so that the exchanges generate benefits but always remain below the rates and costs of the traditional financial system.',
          },
          item8: {
            subtitle8: 'Can I buy or pay in bitcoin through MC?',
            content1:
              'If you can pay or collect directly in bitcoin. The transfer is instant and free if both parties are within MC.',
            content2:
              'MC is not designed for bitcoin transactions to external platforms due to security measures for users and the ecosystem itself.',
            content3:
              'Additionally you can trade in your local currency or any other currency of your preference within the system.',
            content4:
              'In this way you will not have to transfer the price of your products to bitcoin or vice versa, or worry about exchange fluctuations when making a transaction. The system will do the implicit exchange calculation for you at the market rate.',
            content5:
              'At any time you consider it appropriate, you can change your balances from local currency to bitcoin or vice versa without risks or complications and with always updated and competitive rates and commissions.',
          },
          item9: {
            subtitle9:
              'If I have a commercial establishment, can I sell my products and get paid with MC?',
            content1:
              'Through MC, any merchant can accept payments in bitcoin translated to the face value of the current currency by QR code and at a competitive market rate adjusted in real time. You can receive in any currency and change to another (including bitcoin) when you see fit.',
          },
          item10: {
            subtitle10:
              'If I have a commercial establishment, can I become an MC Exchange Center?',
            content1:
              'Yes, you can make the formal request and appear in the GPS of active points, in addition to receiving commissions for the advances or receipt of cash that you make.',
          },
          item11: {
            subtitle11: 'Is there a native MC token?',
            content1:
              'A percentage of the operating and exchange earnings of the MC network will be allocated to a fund for the launch of the native token with which the platform will reward its most active members.',
          },
          item12: {
            subtitle12: 'When was MC born?',
            content1:
              'In 2017 the initial project was formed and in February 2020 the first Beta version was launched. In September 2020, the app was launched to the public, starting operations in the United States, Europe and Latin America. Until February 2021, it had more than 200 thousand downloads and one million successful operations with registered users in 172 countries.',
          },
          item13: {
            subtitle13: 'What is the main objective of MC?',
            content1:
              'To be a comprehensive network for the largest and most secure business in the world.',
          },
          item14: {
            subtitle14: 'Who can use MoneyClick?',
            content1: 'Anyone with a smart mobile device and valid email.',
          },
          item15: {
            subtitle15: 'Who represents MoneyClick legally?',
            content1:
              'The MoneyClick developer partners delegate the legal representation of the platform to the company Mountain View Pay LLC, based in the State of Georgia in the United States of America.',
          },
        },
        q2: {
          title: 'About the Mobile Application',
          item1: {
            subtitle1: 'How do I verify my cell phone number?',
            content1:
              'Using the SMS verification code. This is used to verify your phone number when you first register. If you cannot receive this message on your phone, you must verify that:',
            subContent11: 'Your cell phone number is correct.',
            subContent12:
              'You have downloaded the most recent version of the MC application',
            subContent13:
              "You have the most recent version of your phone's operating system downloaded.",
            content2:
              'If you still cannot receive the verification code by SMS, try the following solutions:',
            subContent21: 'Make sure you have the phone signal active.',
            subContent22:
              'Turn off your Wi-Fi connection to use your mobile data.',
            subContent23: 'Enable SMS permissions on your device.',
            subContent24:
              'Close all other open applications and processes that may be running in the background.',
            subContent25:
              'Authorize the permission to activate MC in the firewall applications.',
            content3:
              'If you have tried all the above tips and still cannot activate the service, please contact our Technical Support Service available in English and Spanish.',
          },
          item2: {
            subtitle1: 'Can I change the associated phone line?',
            content1:
              'If you have recently changed your phone number and need to update it to log into your MC account, we will need to verify your identity to ensure the protection and security of your account.',
            content2:
              'This process includes submitting a photo of yourself with your photo ID and a 4-digit code, which we will email to you. The whole process will take about 48 hours to complete.',
          },
          item3: {
            subtitle1:
              'Why does MC ask for permission to access my Contacts, my Camera and my GPS?',
            content1:
              'You can send messages, information or payments to any contact without the need to retype it by selecting it from your Contacts Directory, thus avoiding possible errors when entering the cell phone number. If it is a new number you can add it and it will be registered in your contacts for future shipments.',
            content2:
              'The camera allows you to scan the QR code for withdrawals or recharges at exchange centers or to make payments or collections without the need to exchange your phone number.',
            content3:
              'Access to your GPS allows you to locate network affiliated businesses near you.',
          },
          item4: {
            subtitle1:
              'What happens if I do an MC shipment to the wrong number?',
            content1:
              'When you enter the number of a new recipient, the application informs you if that number is registered in the system. If it is registered, you will see the registration name or pseudonym as it appears in the system. If that name does not match your contact details, you can cancel the operation before the confirmation required to complete the shipment.',
            content2:
              'You must make sure that the number you are adding is correct before placing the confirmation key.',
            content3:
              'For transactions of high amounts in bitcoin or any sovereign currency with people or businesses that are not trusted, we recommend using the QR code reader for greater security.',
            content4:
              'MC is not responsible for shipments to wrong numbers due to User error, once confirmed you will not be able to cancel the operation.',
          },
          item5: {
            subtitle1:
              'Can I send a balance to a contact who does not have MC downloaded?',
            content1:
              'If you can make the shipment and the beneficiary can receive an SMS notifying that they have received a shipment from you with an invitation link to download the application.',
            content2:
              'The beneficiary will have six hours to download and validate their cell phone in the application. If you do not do so within six hours, the shipment is canceled and the balance will be returned to your MC account.',
          },
          item6: {
            subtitle1: 'Do I need to validate my Identity to use MC?',
            content1:
              'If you are going to operate with bank accounts, you must validate your identity through the KYC process.',
          },
          item7: {
            subtitle1: 'Do I need a bank account to use the APP?',
            content1: "You don't need a bank account to use MoneyClick.",
          },
          item8: {
            subtitle1: 'Can I have MoneyClick as a minor?',
            content1:
              'You must be legally authorized by the authorities of your country or require the representation of an adult to enable certain functions.',
          },
          item9: {
            subtitle1: 'Can I increase my daily or monthly transaction limits?',
            content1:
              'Yes you can but you must be verified (KYC) and have a balance or movements that justify the increase in limits. For special banking transactions you can contact the Customer Service Center and it channels your request with the corresponding Operating Partner.',
          },
          item10: {
            subtitle1: 'Can I get a MoneyClick trade or balance reference?',
            content1:
              'Yes you can, just write to our Attention Center or request it by email, you must have your personal data verified and maintain a balance in your account greater than one hundred US dollars or its equivalent.',
          },
          item11: {
            subtitle1: 'Can I process trusts with MoneyClick?',
            content1:
              'In some countries we can process letters of credit, bonds and any type of trust of funds. For real estate transactions, the cost is 0.5% of the amount in guarantee including the certification of payment, surety or deposit in custody with virtual notary service. If the contractual guarantee is established in bitcoin, this service can be used anywhere in the world.',
            content2: 'Contact us for more information.',
          },
          item12: {
            subtitle1: 'How can I add a balance to my MC account?',
            content1:
              'Buy credit from another user or at an MC Exchange Center.',
            content2: 'Bitcoins',
            content3: 'Bank deposits (available in some countries)',
            content4: 'At affiliated locations',
            content5: 'Through Gift Cards.',
          },
          item13: {
            subtitle1: 'Who has access to my registration data?',
            content1:
              'The information is confidential and is protected by international BSA laws to which we adhere in our Compliance Manual, which prohibits us from sharing it with third parties. When verifying your account in our system, you are presented with a Data Security Acceptance Agreement which specifies that your information will not be shared and only our Compliance Officer in charge has access to the log files, in case of bank payments the information can be requested by the Operating Partner in that country to validate or issue a payment, except in that case your data will not be shared unless requested by a legal instance based on a firm requirement emanating from a police body or court with due competence and accreditation. For people who carry out banking operations based in the United States of America, their personal and operational data will be reported to FINCEN and OFAC for legal reasons when they exceed the limit of three thousand US dollars during a period of 30 continuous days. In some countries, certain financial control institutions may request information on private data, which by law must be shared for the pertinent purposes.',
          },
          item14: {
            subtitle1: 'What is the benefit of using MoneyClick?',
            content1:
              'Being part of an autonomous and comprehensive global business network based on new financial and communication technologies is the best guarantee for your professional development and success.',
          },
        },
        q3: {
          title: 'About Bitcoin',
          item1: {
            subtitle1: 'What is a Bitcoin?',
            content1:
              'Bitcoin is a unit of value transferable through an encrypted public data network called the blockchain, where all the transactions carried out within the bitcoin network are based.',
          },
          item2: {
            subtitle1: 'What support does Bitcoin have?',
            content1:
              'Currently, Bitcoin is used as a reliable exchange instrument or as a store of value by more than one hundred million people and companies in the world.',
          },
          item3: {
            subtitle1:
              'What is the advantage of using MC for my bitcoin transactions?',
            content1:
              'The main advantage is security. Each operation is linked to a phone number so it can be tracked and located. In addition to protecting you from risky transactions, it allows you to exchange your bitcoin with your sovereign national currencies without leaving your btc.',
            content2:
              'This additional security protects you from risks associated with operations carried out with anonymous undercover criminal operators.',
          },
          item4: {
            subtitle1:
              'Can I receive or send Bitcoins from my MoneyClick wallet?',
            content1:
              'You can receive and send Bitcoins free of charge and without limits from your Bitcoins MoneyClick wallet. If you receive or send within MC it is free, but if you send to an external platform you will have a shipping charge that can vary depending on the blockchain commissions.',
          },
          item5: {
            subtitle1:
              'What are the limits for sending or receiving bitcoin on MoneyClick?',
            content1:
              'For income there are no limits, for transfers to external platforms the minimum withdrawal limit is $100 or its equivalent. Within MC you can make transfers without limits or cost. Transactions for large amounts may be subject to special reviews.',
          },
          item6: {
            subtitle1: 'Can I buy or sell Bitcoins within MoneyClick?',
            content1:
              'Yes, to buy or sell bitcoin you just go to the Bitcoins wallet and click the Buy / Sell button.',
            content2: 'Sell',
            subContent21:
              'If you have Bitcoins and want to convert them into a fiat (national) currency, the system shows you the exchange rate in real time plus commissions.',
            content3: 'Buy',
            subContent31:
              'If you have a balance in fiat currency (national) and you want to buy, you will be shown the previous detail of the operation with the exchange rate and commissions.',
            content4:
              'After approving, the system issues a digital receipt and automatically charges the corresponding wallets.',
          },
          item7: {
            subtitle1: 'Hold Time',
            subtitle2: "Why aren't my Bitcoins released immediately?",
            content1:
              'Trading bitcoin between different platforms involves a high level of risks and responsibilities. Having a protection time is vital to avoid fraud and protect our Users',
            content2:
              'MoneyClick provides you with a safe and reliable environment for your transactions.',
            content3:
              'Our system is designed so that everyone is expert and can operate in an easy and safe way.',
            content4:
              'Hot-plugged bitcoin wallets without any manager or control can be dangerous for even the savviest. Losing the key or being stolen by digital hackers are real risks that you expose yourself to.',
            content5:
              'To contain risks MC does not allow instant bitcoin exits without due diligence and security checking.',
            content6:
              'Any external transaction will be analyzed and approved in batch of outputs and those that are considered high risk or suspicious will be set aside for additional verification processes.',
            content7:
              'We want to forge a strong relationship of security and integrity within our user community.',
            content8:
              'Remember that when you approve a bitcoin exit transaction there is no going back',
            content9:
              'To make instant exchanges we offer you to make transactions between MoneyClick Users, (even in BTC) which is private, secure, and instant as well as free of charge.',
            content10:
              'Always be attentive to MC notifications in case you receive any that you do not know, contact us immediately. Any external output can be canceled during the first 12 hours.',
          },
          item8: {
            subtitle1: 'Where are my Bitcoins deposited?',
            content1:
              'Your Bitcoins are protected in a cold vault (isolated) and only 30% are left on the network to offset window trades. In this way we protect funds from hackers or unauthorized access.',
            content2:
              'Remember that if you receive any notification of Bitcoins withdrawal on your cell phone that has not been made by you, you have several hours to contact us and block the operation.',
          },
          item9: {
            subtitle1:
              'Does my Bitcoins portfolio change after each operation?',
            content1:
              'Not automatically, although you can request a new address through our website ',
            content2: 'http://moneyclick.com ',
            content3:
              'in the Receive Bitcoins section. All incoming operations to the newly requested address or to the previous ones will be processed automatically, without the need for special user action.',
            content4:
              'If you handle large amounts or want a hot static wallet with private keys, you can request a special custody service with a programmable security vault, this service is optional and available to commercial clients with additional charges.',
          },
        },
        q4: {
          title: 'About Bank Payments',
          item1: {
            subtitle1: 'Can MC make deposits and transfers to banks?',
            content1:
              'MC carries out banking intermediation operations domestically in different countries through Operating Partners of our network, thus avoiding the high costs of international transfers for our Users.',
            content2:
              'However, MC is not a bank, and its role as a bank intermediary is limited to the legal and banking restrictions of each entity and country.',
            content3:
              'For this reason, operations may have different limits, conditions, response times or costs.',
          },
          item2: {
            subtitle1: 'Can I withdraw a balance to my bank account from MC?',
            content1:
              'MC offers several options to withdraw money to banks, depending on the country where the withdrawal is made.',
            content2:
              'Each withdrawal method has different transaction limits, fees, and processing times.',
          },
          item3: {
            subtitle1:
              'In which MC countries can you carry out bank intermediation?',
            content1:
              'Countries or regions where we can currently process withdrawals or deposits to banks:',
            content2: 'Argentina',
            content3: 'Canada',
            content4: 'Colombia',
            content5: 'Chile',
            content6: 'Mexico',
            content7: 'Panama',
            content8: 'Venezuela',
            content9: 'United States',
            content10: 'SEPA Zone in Europe',
            content11: 'Switzerland',
            content12: 'UK',
            content13:
              'Depending on the country and the liquidity of our operating partners, operations may have different special requirements.',
            content14: 'In certain cases certain restrictions may apply.',
          },
          item4: {
            subtitle1: 'Can I bank to third parties using MC?',
            content1:
              'Bank transfers to third parties are subject to special restrictions that include prior communication with the beneficiary who must confirm in writing the acceptance of the money before it is transferred. This can delay shipments to third parties and lead to additional costs.',
            content2: 'In certain cases certain restrictions apply.',
          },
          item5: {
            subtitle1: 'Can Swift transfers be made?',
            content1:
              'For special or commercial clients that handle amounts greater than the withdrawal and deposit limits established in the platform, we offer our certified international payments service, for this service contact our Customer Service Center.',
          },
          item6: {
            subtitle1: 'Can I deposit my bank account balance to MC?',
            content1:
              'If you are in a country where the MC network has Operating Partners, you can make money deposits in MoneyClick from your bank account.',
            content2:
              'To enable this option you must meet the 4 levels of registration:',
            subcontent21:
              '1. Validate valid cell number. (Real line not virtual)',
            subcontent22: '2. Validate valid email.',
            subcontent23:
              '3. Complete the Registration Form and upload the following documents:',
            subcontent23a: 'a. ID',
            subcontent23b: 'b. Selfie',
            subcontent23c: 'c. Proof of address',
            subcontent23d: 'd. Proof of Bank Account',
            subcontent24:
              '4. Certify the Bank Account in your name from which you can make the deposit to MC.',
            content3:
              'If you have not complied with the 4 security levels or your data has inconsistencies, it is possible that your deposit will be held until your information can be confirmed.',
          },
          item7: {
            subtitle1:
              'What are the documents to validate identity accepted by MC?',
            content1:
              '1. Types of personal identification accepted to validate identity',
            subcontent11: 'a. Passport',
            subcontent12: "b. Driver's license",
            subcontent13: 'c. National identification card Identification',
            subcontent13i: 'i. Document requirements:',
            subcontent13i1: '1. Color copy',
            subcontent13i2: '2. Show full date of birth',
            subcontent13i3: '3. Completely clear, legible and crisp.',
            subcontent13i4: '4. Full name and surname',
            subcontent13i5: '5. Valid expiration date',
            content2: '2. Selfie with ID:',
            subcontent21: 'a. Completely sharp',
            subcontent22: 'b. No glasses or caps',
            subcontent23: 'c. Without any kind of editing or alteration.',
            content3: '3. Proof of address and Bank Account Accepted',
            subcontent31: 'a. Utility bill',
            subcontent32: 'b. Credit card bill',
            subcontent33: 'c. Monthly bank statement',
            subcontent33i: 'i. Requirements',
            subcontent33i1: '1. Issue date less than 3 months old',
            subcontent33i2: '2. Logo of company / bank',
            subcontent33i3: '3. Full name matches user',
            subcontent33i4: '4. Display the full address',
            subcontent33i5: '5. Written with Latin characters',
          },
          item8: {
            subtitle1:
              'Who makes or receives bank payments on behalf of MoneyClick?',
            content1:
              'MoneyClick has a network of associated commercial agents called Operators to represent us in different countries or regions.',
          },
          item9: {
            subtitle1:
              'What is the benefit of being a MoneyClick Operator member?',
            content1:
              'The Operating partners obtain commissions for their management as bank intermediaries.',
          },
          item10: {
            subtitle1: 'What is a MoneyClick Exchange Point?',
            content1:
              'Any commercial establishment affiliated to the network that manages payments, advances or receipt of cash or sale of MC balance.',
          },
        },
        q5: {
          title: 'About Access Devices',
          item1: {
            subtitle1: 'From what devices can I access MC?',
            content1:
              'Any Android or IOS phone with a cellular line and with internet. You can also access from a computer, tablet or laptop through our website.',
          },
          item2: {
            subtitle1:
              'Why does it tell me: Connection failure, please try later?',
            content1:
              'If your internet connection is weak or unstable, the system blocks data transmission. Response times with the server are limited so that they are not left open and can be intercepted or exposed.',
            content2:
              'In most cases, this problem is solved by closing the app, restarting the device and looking for a better internet signal.',
            content3:
              'If the problem persists contact our Technical Support Center for assistance.',
          },
          item3: {
            subtitle1: "Why can't I open the app on my device?",
            content1:
              'In some cases the lack of memory or failures in the operating system of your device prevent the platform from opening correctly.',
            content2: 'In these cases we recommend:',
            subContent1: 'Increase or free up space in your memory.',
            subContent2: 'Delete and reinstall the app on your cell phone.',
            subContent3: 'Restart the cell phone.',
            content3:
              'If the problem persists contact our Technical Support Center for assistance.',
          },
          item4: {
            subtitle1:
              'Why does it tell me this is an unauthorized device when I try to open the APP from my cell phone?',
            content1:
              'In some cases, software updates renew the security codes and your device may lose its link with the system.',
            content2: 'To solve it, follow the instructions to ',
            content3: 'Activate / Deactivate Devices from the Profile Menu ',
            content4: 'by accessing our website ',
            content5: 'http://moneyclick.com',
          },
          item5: {
            subtitle1:
              'What happens if I lose or change my cell phone for a new one?',
            content1:
              'If you lose or change your linked cell phone, follow the instructions to activate or deactivate devices authorized to your account.',
          },
          item6: {
            subtitle1: 'How can I Activate or Deactivate the access devices?',
            content1:
              'Instructions to Activate / Deactivate Associated Devices:',
            content2: 'Go to ',
            content3: 'http://moneyclick.com',
            content4:
              'Access your account with your cell phone number and password.',
            content5: 'Go to: Profile> Account> Security> Devices> Actions',
            content6:
              'There, check the list of cellular devices or computers from which you have entered the system, select the name of the lost device and in the upper right column: ',
            content7: '“Actions” ',
            content8:
              ', press the Option / Disable or Delete. You can temporarily or permanently block access to any computer associated with your account.',
            content9:
              'In case of recovering your device or buying a new one, carry out the same operation in “Actions” by checking “Activate” to allow the link again.',
            content10:
              'If a device is deactivated, it will no longer be able to enter even if you enter the password.',
            content11: 'Important:',
            content12:
              '  Remember if it is a new cell phone you must first download the App and upload your access data so that the system recognizes it and you can Activate it.',
          },
          item7: {
            subtitle1: 'Does MC have a double safety factor?',
            content1: 'Yes, to activate this function go to ',
            content2: 'MoneyClick Web ',
            content3: ' and confirm the activation in:',
            content4: 'Activate 2FA in Menu Profile.',
            content5:
              '  This generates a double security factor for your account on the web and you can optionally select SMS or use the Google Authenticator tool (recommended) to receive the dynamic access code.',
          },
        },
      },
    },
    buyBTC: {
      header: 'Buy Crypto',
      modal: {
        accept: 'Accept',
        totalToReceive: 'Total To Receive',
        totalToSend: 'Total To Send',
        confirm: 'Confirm',
        cancel: 'Cancel',
        amountSend: 'Amount To Send',
        buyReceipt: 'Buy Receipt',
        sellReceipt: 'Sell Receipt',
        changeFactor: 'Exchange Rate', //"Change Factor",
        changeFactorInverse: 'Exchange Rate', //"Change Factor Inverse",
        tax: 'Tax',
        amountReceive: 'Amount To Receive',
        Commission: 'Commission',
        rejectBuy: 'Reject Buy',
        acceptBuy: 'Accept Buy',
        rejectSell: 'Reject Sell',
        acceptSell: 'Accept Sell',
        timetoproceed:
          'Your bitcoins will be credited in the next 72 business hours',
        close: 'Close',
      },
      pdf: {
        buy: 'Buy',
        sell: 'Sell',
        invoice: 'Invoice',
      },
    },
    sellBTC: {
      header: 'Sell Crypto',
      modal: {
        accept: 'Accept',
        totalToReceive: 'Total To Receive',
        totalToSend: 'Total To Sell',
        confirm: 'Confirm',
        cancel: 'Cancel',
        amountSend: 'Amount To Sell',
        sellReceipt: 'Sell Ticket',
        changeFactor: 'Exchange Rate', //"Change Factor",
        changeFactorInverse: 'Exchange Rate', //"Change Factor Inverse",
        tax: 'Tax',
        amountReceive: 'Amount To Receive',
        Commission: 'Commission',
        rejectSell: 'Reject Sell',
        acceptSell: 'Accept Sell',
        close: 'Close',
      },
      pdf: {
        buy: 'Buy',
        sell: 'Sell',
        invoice: 'Invoice',
      },
    },
    fiatCarouselStatistics: {
      buy: 'Buy:',
      sell: 'Sell:',
      usdChange: 'USD change',
      forexPrice: 'Forex price',
      statistics: 'Statistics',
      footerLabel: 'Bitcoin Reference Prices at the Local Level Worldwide',
    },
    newHome: {
      title: 'The Local Bank of the World!',
      contact: 'Contact us',
      subTitle: 'Deposit or withdraw your balance at:',
      nationalBanks: 'National Banks',
      cryptoCurrency: 'Cryptocurrencies',
      creditCard: 'Credit card',
      buyAuthorized: 'Buy our Gift Cards in authorized stores',
      questionUse: 'How does MoneyClick work?',
      visitYoutube: 'visit our Youtube channel',
      haveQuestion: 'Do you have any questions? we can help you',
      contactMessage:
        'Contact us via WhatsApp through our immediate service numbers from Monday to Sunday from 8am to 8pm New York Time.',
      customerService: 'Customer Service',
      mexService: 'Mexico Service Center',
      comercialAtention: 'Commercial Attention',
      techSupport: 'Technical Support',
      inmediatPaymentTitle: 'Immediate payments in MC network without costs',
      inmediatPaymentMessage:
        'Your transactions within the network are free, instantaneous and irreversible.',
      antiFraudTitle: 'Anti-fraud  and protection personal information',
      antiFraudMessage:
        'Pay or charge without exposing your personal data,only with your cell phone or QR code.',
      freeConvertTitle: 'Free convertibility Monetary',
      freeConvertMessage:
        'The fast change allows you to pay or send in any currency without any complications,at the best market rate and have your balance in your preferred currency.',
      secureTitle: 'Secure connection to Blockchain',
      secureMessage:
        'Your operations are encrypted and protected by the safest global network, you no longer need intermediaries.',
      verifySampleLineOne: 'Simple',
      verifySampleLineTwo: 'Verify',
      verifyCompleLineOne: 'Complete',
      verifyCompleLineTwo: 'Verify',
      howSignupLineOne: 'How to',
      howSignupLineTwo: 'Register?',
      instructiveMessage: 'Instructions for use',
      textLogCurrency: 'Banks',
      textLogCurrencyTwo: 'Nationals*',
      textCryptoCurrency: 'Cryptocurrencies',
      textGiftCardOne: 'GiftCards or',
      textGiftCardTwo: 'Cash balance**',
      titleMethods:
        'How to deposit or withdraw balance from your MoneyClick account',
      bannerMoney: 'Money Exchange only available in the mobile version',
      messageMethods:
        '*You must consult in each country, the available banks, limits per transaction and the restrictions or local processes, for any bank transaction you must have a type C validation approved.',
      messageMethodsTwo:
        'Certain restrictions may apply to our network of business partners.',
      messageMethodsTree: '**Available in our network of commercial partners.',
      titleTableExchange: 'Active Exchange Rates',
      titleHomeLog: 'MoneyClick Control Panel',
      titleBalance: 'Estimated Global Position',
    },
    paymentGateway: {
      title: 'Payment Gateway',
      send: "Send : ",
      to: "To :",
      buttonYes: "Yes",
      buttonNo: "No",
      buttonAccept: "Accept",
      buttonSend: "Send",
      buttonCancel: "Cancel",
      paymentTo: "Payment to ",
    },
      termAnsConditionsMC: termEn
  },
};
