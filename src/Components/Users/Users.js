import React, { Component } from "react";
import "../Admin.css";
import translate from "../../i18n/translate";
import { Menu, Segment, Container, Grid, Divider } from "semantic-ui-react";
import userService from "../../services/user";
//import UserAdministration from "./UserAdministration/UserAdministration";
import UserBalance from "./UserBalance/UserBalance";
import ProfileBalance from "./ProfileBalance/ProfileBalance";
//import ContainerUserVerification from "../Containers/ContainerUserVerification";

class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			translator: props.translate,
			activeItem: "userBalance",
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
								<h4 className='headerComponent'>{t("nav.userData")}</h4>
							</Segment>
							<Menu size='large' pointing secondary>
								{/* {this.state.actionsUser.indexOf("users_verifications") !== -1 && (
            <Menu.Item
              content="Procesos de verificación"
              name="userVerification"
              active={this.state.activeItem === "userVerification"}
              onClick={this.handleItemClick}
            />
          )} */}
								{this.state.actionsUser.indexOf("users_data") !== -1 && (
									<Menu.Item
										content='Datos de usuarios'
										name='userBalance'
										active
										onClick={this.handleItemClick}
									/>
								)}
								{/* {this.state.actionsUser.indexOf("users_profiles") !== -1 && (
						<Menu.Item
							content='Perfiles de usuarios'
							name='userProfile'
							active={this.state.activeItem === "userProfile"}
							onClick={this.handleItemClick}
						/>
					)} */}
								{/* {this.state.actionsUser.indexOf("users_administration") !== -1 && (
            <Menu.Item
              content="Administrar usuarios"
              name="userAdministration"
              active={this.state.activeItem === "userAdministration"}
              onClick={this.handleItemClick}
            />
          )} */}
							</Menu>
							<Segment color='orange'>
								{/* {this.state.activeItem === "userVerification" && (
            <Container as={ContainerUserVerification} />
          )} */}
								{this.state.activeItem === "userBalance" && (
									<Container as={UserBalance} />
								)}
								{/* {this.state.activeItem === "userProfile" && (
						<Container as={ProfileBalance} />
					)} */}
								{/* {this.state.activeItem === "userAdministration" && (
            <Container as={UserAdministration} />
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

export default translate(Users);
