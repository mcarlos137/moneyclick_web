import React, { Component } from "react";
import "./Footer.css";
import { Segment, Grid, Image, Menu, Label, Button, Container, Divider } from "semantic-ui-react";
import imgBlockChain from "../../img/logo-blockchain.jpg";
import imgAws from "../../img/logo-aws.jpg";
import imgBitcoinRechargue from "../../img/logo-bitcoinr.jpg";
import imgDollarBTC from "../../img/logo-dollarbtc.jpg";
import { Link } from "react-router-dom";
import translate from "../../i18n/translate";

class Footer extends Component {
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
    return (
      <Grid>
         <Grid.Row>
              <Grid.Column largeScreen={2} computer={2} widescreen={2} />
              <Grid.Column largeScreen={12} computer={12} widescreen={12} >
                <Divider style={{ marginTop: 20 ,marginBottom: -30, borderColor:"#055990"}} />
              </Grid.Column>
              <Grid.Column largeScreen={2} computer={2} widescreen={2} />
        </Grid.Row>
        <Grid.Row>
         <Grid.Column width={2}/>
          <Grid.Column width={5} verticalAlign={"middle"}>
             <Grid>
                <Grid.Row columns={4}>
                <Grid.Column size={4}>
                   <div style={{width: "130%", height: "110%"}}>
                     <Image
                    src={imgBlockChain}
                  verticalAlign="middle"
                      style={{ paddingTop: 35 }} />
                    </div>
                  </Grid.Column>
                <Grid.Column size={4}>
                   <div style={{width: "130%", height: "110%"}}>
                  <Image
                    src={imgAws}
                    verticalAlign="middle"
                     style={{paddingTop: 35}}
                    />
                    </div>
                  </Grid.Column>
                <Grid.Column size={4}>
                  <div style={{width: "130%", height: "110%"}}>
                      <Image
                    src={imgBitcoinRechargue}
                    verticalAlign="middle"
                     style={{paddingTop: 35}}/></div>
                      </Grid.Column>
                <Grid.Column size={2}>
                   <div style={{width: "60%", height: "60%"}}>
                 <Image
                    src={imgDollarBTC}
                    verticalAlign="middle"
                    size="medium"
                     style={{paddingTop: 26, marginLeft: 5}}
                    />
                    </div></Grid.Column>
              </Grid.Row>
              </Grid>
        </Grid.Column>
        <Grid.Column width={7}>
        <Menu
              text
              fluid
            style={{
              marginBottom: "0px",
                  backgroundColor: "#FFFFFF"
                }}
          >
                    <Menu.Menu
                    >
                      <Menu.Item
                        className="footerMenu"
                        onClick={() => {
                          window.location.href = "/instructive";
                        }}
                        id="signup"
                      >
                        <div className={"menuLink"}>{t("nav.instructive")}</div>
                      </Menu.Item>
                      <Menu.Item
                        className="footerMenu"
                        name="Login"
                        onClick={() => {
                          window.location.href = "/faq";
                        }}
                        id="login"
                      >
                <div className={"menuLink"}>{t("nav.faqs")}</div>
                      </Menu.Item>
                      <Menu.Item
                        className="footerMenu"
                        name="Login"
                        onClick={() => {
                          window.location.href = "/contact";
                        }}
                      >
                <div className={"menuLink"}>{t("nav.contactUs")}</div>
              </Menu.Item>
              <Menu.Item
                        className="footerMenu"
                        name="Login"
                        onClick={() => {
                          window.location.href = "/newCharges";
                        }}
                      >
                <div className={"menuLink"}>{t("nav.charges")}</div>
              </Menu.Item>
              <Menu.Item
                        className="footerMenu"
                        name="Login"
                        onClick={() => {
                          window.location.href = "/legal";
                        }}
                      >
                <div className={"menuLink"}>{t("nav.legal")}</div>
                      </Menu.Item>
                    </Menu.Menu>
              </Menu>
            <Grid.Row style={{width: "500px"}}>
            <div className={"menuLinkText"}>© COPYRIGHT 2020 MoneyClick Systems INC | ALL RIGHTS RESERVED</div>
          <div className={"menuLinkText"}><span style={{fontWeight: "bold"}}>Business Partners: </span>  AWS | YTG | Mountain View | Dollarbtc | Diginet | SmartPay | GBS | Novodasi</div>
        </Grid.Row>
        </Grid.Column>
        <Grid.Column width={2} />
        </Grid.Row>
      </Grid>
    );
  }
}
{/**
          
          <br></br>
          MVP llc is an MSB Fincen Code MVPL7321 */}
export default translate(Footer);
