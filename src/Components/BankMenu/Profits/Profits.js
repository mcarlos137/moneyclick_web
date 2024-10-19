import React, { Component } from "react";
import ReactTable from "react-table-6";
import translate from "../../../i18n/translate";
import {
	Container,
	Grid,
	Segment,
	Form,
	Divider,
	Button,
	Icon,
	Header,
	Loader,
	Dimmer,
	Popup,
	Flag,
	Select,
	List,
	Label,
	Input,
} from "semantic-ui-react";
class Profits extends Component {
	constructor(props) {
		super(props);
		this.state = {
			translator: props.translate,
		};
	}
	componentWillReceiveProps(nextProps, nextContext) {
		if (this.props.language !== nextProps.language) {
			this.setState({
				translator: nextProps.translate,
			});
		}
	}
	render() {
		let t = this.state.translator;
		const paymentMethodsTableHeaders = [
			{
				Header: "Id",
				accessor: "id",
				Cell: (row) => {
					return row.value.slice(-4);
				},
				width: 60,
			},
			{
				Header: t("profile.optionDevices.tableHeader.currency"),
				accessor: "currency",
				Cell: (row) => {
					if (row.value !== "ETH") {
						return (
							<div>
								<Flag name={row.original.flag} /> {row.value}
							</div>
						);
					} else {
						return (
							<div>
								<Icon name={row.original.icon} /> {row.value}
							</div>
						);
					}
				},
				width: 70,
			},
			{
				Header: t("profile.optionDevices.tableHeader.type"),
				accessor: "type",
				width: 260,
				filterable: false,
			},
			{
				Header: t("profile.optionDevices.tableHeader.information"),
				accessor: "info",
				filterable: false,
			},
			{
				Header: t("profile.optionDevices.tableHeader.debit"),
				accessor: "acceptOut",
				filterable: false,
				Cell: (row) => {
					if (row.value === true) {
						return (
							<Button
								size='tiny'
								animated='vertical'
								onClick={() =>
									this.openEditOptsModal(row.original, "out__inactivate")
								}>
								<Button.Content hidden>
									<Icon color='red' name='cancel' />
								</Button.Content>
								<Button.Content visible>
									<Icon color='green' name='checkmark' />
								</Button.Content>
							</Button>
						);
					} else {
						return (
							<Button
								size='tiny'
								animated='vertical'
								onClick={() =>
									this.openEditOptsModal(row.original, "out__activate")
								}>
								<Button.Content visible>
									<Icon color='red' name='cancel' />
								</Button.Content>
								<Button.Content hidden>
									<Icon color='green' name='checkmark' />
								</Button.Content>
							</Button>
						);
					}
				},
				width: 70,
			},
			{
				Header: t("profile.optionDevices.tableHeader.accredit"),
				accessor: "acceptIn",
				filterable: false,
				Cell: (row) => {
					if (row.value === true) {
						return (
							<Button
								size='tiny'
								animated='vertical'
								onClick={() =>
									this.openEditOptsModal(row.original, "in__inactivate")
								}>
								<Button.Content hidden>
									<Icon color='red' name='cancel' />
								</Button.Content>
								<Button.Content visible>
									<Icon color='green' name='checkmark' />
								</Button.Content>
							</Button>
						);
					} else {
						return (
							<Button
								size='tiny'
								animated='vertical'
								onClick={() =>
									this.openEditOptsModal(row.original, "in__activate")
								}>
								<Button.Content visible>
									<Icon color='red' name='cancel' />
								</Button.Content>
								<Button.Content hidden>
									<Icon color='green' name='checkmark' />
								</Button.Content>
							</Button>
						);
					}
				},
				width: 85,
			},
			{
				Header: t("profile.optionDevices.tableHeader.status"),
				accessor: "active",
				Cell: (row) => {
					if (row.value === true) {
						return (
							<Label color='green'>
								<Icon name='checkmark' />{" "}
								{t("profile.optionDevices.statusActive")}
							</Label>
						);
					} else {
						return (
							<Label color='red'>
								<Icon name='cancel' />{" "}
								{t("profile.optionDevices.statusInactive")}
							</Label>
						);
					}
				},
				width: 110,
			},
			{
				Header: t("profile.optionDevices.tableHeader.actions"),
				accessor: "actions",
				width: 75,
				filterable: false,
				Cell: (row) => {
					return (
						<div>
							<Button
								onClick={() => this.openEditModal(row.original)}
								color='blue'
								size='tiny'
								title={t("homeLoggedIn.transactions.detail.labels.edit")}
								circular
								icon>
								<Icon name='edit outline' />
							</Button>
							<Button
								onClick={() => this.openTransferModal(row.original)}
								color='blue'
								size='tiny'
								title={t(
									"homeLoggedIn.transactions.detail.labels.addSubsBalance",
								)}
								circular
								icon>
								<Icon name='exchange' />
							</Button>
						</div>
					);
				},
			},
		];
		return (
			<div>
				<Segment>
					<Grid>
						<Grid.Row>
							<Grid.Column></Grid.Column>
							<Grid.Column>
								<Segment></Segment>
							</Grid.Column>
						</Grid.Row>
					</Grid>

					<Divider></Divider>
					<ReactTable
						className='transactionTable'
						data={this.state.listPaymentMethods}
						columns={paymentMethodsTableHeaders}
						defaultPageSize={5}
						previousText={t("homeLoggedIn.table.previous")}
						nextText={t("homeLoggedIn.table.next")}
						loadingText={t("homeLoggedIn.table.loading")}
						noDataText={t("homeLoggedIn.table.noData")}
						pageText={t("homeLoggedIn.table.page")}
						ofText={t("homeLoggedIn.table.of")}
						rowsText={t("homeLoggedIn.table.rows")}
						pageJumpText={t("homeLoggedIn.table.pageJump")}
						rowsSelectorText={t("homeLoggedIn.table.rowsSelector")}
						minRow={5}
						filterable
						defaultFilterMethod={(filter, row, column) => {
							const id = filter.pivotId || filter.id;
							return row[id] !== undefined
								? String(row[id]).startsWith(filter.value.toUpperCase()) ||
										String(row[id]).includes(filter.value) ||
										(row[id] && filter.value.toLowerCase().startsWith("a")) ||
										(!row[id] && filter.value.toLowerCase().startsWith("i"))
								: true;
						}}
					/>
				</Segment>
			</div>
		);
	}
}
export default translate(Profits);
