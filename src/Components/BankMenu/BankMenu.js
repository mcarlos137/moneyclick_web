import React, { Component } from "react";
import "../../Components/Admin.css";
import { Menu, Segment, Container, Divider, Grid } from "semantic-ui-react";
import userService from "../../services/user";
import CreatePaymentMethods from "../BankMenu/CreatePaymentMethods/CreatePaymentMethods";
import Scrow from "../BankMenu/Scrow/Scrow";
import ListPaymentMethods from "../BankMenu/ListPaymentMethods/ListPaymentMethods";
import BalancePaymentMethods from "../BankMenu/BalancePaymentMethods/BalancePaymentMethods";
import AddUserPaymentMethod from "../BankMenu//AddUserPaymentMethod/AddUserPaymentMethod";
import Profits from "../BankMenu/Profits/Profits";
import translate from "../../i18n/translate";

class BankMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			translator: props.translate,
			activeItem: "listPaymentMethods",
			actionsUser: [],
		};
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if (this.props.language !== nextProps.language) {
			this.setState({
				translator: nextProps.translate,
			});
		}
	}
	componentDidMount() {
		let availableFunctionsUser = userService.getUserRol();
		// //console.log(availableFunctionsUser);
		if (availableFunctionsUser !== null) {
			////console.log(availableFunctionsUser.functionsAvailables);
			this.setState({
				actionsUser: availableFunctionsUser.functionsAvailables,
			});
		}
		//  this.setState({ actionsUser: new Array() });
	}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });
	render() {
		let t = this.state.translator;
		return (
			<div>
				<Divider hidden />
				<Grid>
					<Grid.Column largeScreen={2} computer={1} widescreen={2} />

					<Grid.Column largeScreen={12} computer={14} widescreen={12}>
						<Container>
							<Segment inverted textAlign='left' className='titleComponents'>
								<h4 className='headerComponent'>{t("nav.paymentMethods")}</h4>
							</Segment>
							<Divider hidden></Divider>
							<Menu size='small' pointing secondary>
								{/* {this.state.actionsUser.indexOf("balance_payments_add") !==
									-1 && ( */}
								<Menu.Item
									content={t("nav.consultPaymentMethod")}
									name='listPaymentMethods'
									active={this.state.activeItem === "listPaymentMethods"}
									onClick={this.handleItemClick}
								/>
								<Menu.Item
									content={t("nav.consultBalance")}
									name='balancePaymentMethods'
									active={this.state.activeItem === "balancePaymentMethods"}
									onClick={this.handleItemClick}
								/>
								<Menu.Item
									content={t("nav.createPaymentMethod")}
									name='createPaymentMethods'
									active={this.state.activeItem === "createPaymentMethods"}
									onClick={this.handleItemClick}
								/>
								<Menu.Item
									content={t("nav.scrow")}
									name='Scrow'
									active={this.state.activeItem === "Scrow"}
									onClick={this.handleItemClick}
								/>
								<Menu.Item
									content={t("nav.profits")}
									name='Profits'
									active={this.state.activeItem === "Profits"}
									onClick={this.handleItemClick}
								/>
								{/* )} */}

								{/* <Menu.Item
            content="Consultar movimientos"
            name="listPaymentMovements"
            active={this.state.activeItem === "listPaymentMovements"}
            onClick={this.handleItemClick}
          /> */}
							</Menu>
							<Segment color='orange'>
								{this.state.activeItem === "createPaymentMethods" && (
									<Container as={CreatePaymentMethods} />
								)}
								{this.state.activeItem === "listPaymentMethods" && (
									<Container as={ListPaymentMethods} />
								)}
								{this.state.activeItem === "balancePaymentMethods" && (
									<Container as={BalancePaymentMethods} />
								)}
								{this.state.activeItem === "addUserPaymentMethod" && (
									<Container as={AddUserPaymentMethod} />
								)}
								{this.state.activeItem === "Scrow" && <Container as={Scrow} />}

								{this.state.activeItem === "Profits" && (
									<Container as={Profits} />
								)}
								{/* {this.state.activeItem === "listPaymentMovements" && (
            <Container as={ListPaymentMovements} />
          )} */}
							</Segment>
						</Container>
					</Grid.Column>
					<Grid.Column largeScreen={2} computer={1} widescreen={2} />
				</Grid>
			</div>
		);
	}
}

export default translate(BankMenu);
