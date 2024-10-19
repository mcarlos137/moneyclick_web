import React, { Component } from "react";

import Pdf from "react-to-pdf";
import logoMC from "../../img/logo.png";
import {
	Grid,
	Form,
	Button,
	Header,
	Image,
	Modal,
	Label,
	Divider,
	Segment,
	Loader,
	Message,
	Container,
	Select,
} from "semantic-ui-react";
import translate from "../../i18n/translate";
const ref = React.createRef();
class Receipt extends Component {
	constructor(props) {
		super(props);
		this.state = {
			translator: props.translate,
			data: this.props.data,
			isClicked: false,
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
		// window.sessionStorage.setItem("isClicked", false);
	}

	render() {
		let t = this.state.translator;
		const list =
			this.props.data !== "" &&
			this.props.data.map((item, index) => (
				<div>
					<label key={index} style={{ marginBottom: 10 }}>
						<b>{item.label}</b>
						<b>{":"} </b>
						{item.value}
					</label>
					<br></br>
				</div>
			));

		return (
			<div>
				<Pdf
					targetRef={ref}
					filename='code-example.pdf'
					x={60}
					y={10}
					onComplete>
					{function ({ toPdf }) {
						return <Button onClick={toPdf}>{t("fastChange.print")}</Button>;
					}}
				</Pdf>
				<div ref={ref} style={{ textAlign: "center" }}>
					<Segment basic size='small' style={{ marginTop: "10px" }}>
						<Image
							src={logoMC}
							size='small'
							style={{ marginLeft: "110px" }}></Image>
						<br />
						<br />
						<strong>
							<span style={{ fontSize: "15px" }}>Mountain View Pay LLC.</span>
						</strong>
						<br />
						<strong>
							<span style={{ fontSize: "15px" }} text-align='center'>
								+1 (470) 273-9398
							</span>
						</strong>
						<br />
						2003 Monterey Parkway Sandy Springs, GA Zip code 30350
						<br />
						<span
							style={{
								fontFamily: "Tahoma , Geneva, sans-serif",
								fontSize: "17px",
							}}
							text-align='center'>
							BUY
						</span>
						<br />
						<span
							style={{
								fontFamily: "Tahoma , Geneva, sans-serif",
								fontSize: "17px",
							}}
							text-align='center'>
							TICKET
						</span>
						{list}
						<br />
						<span> https://moneyclick.com </span>
					</Segment>
				</div>
			</div>
		);
	}
}
export default translate(Receipt);
