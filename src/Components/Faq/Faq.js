import { values } from 'office-ui-fabric-react';
import React, { Component } from 'react';
import {
  Header,
  Loader,
  Accordion,
  Grid,
  Container,
  Segment,
  Icon,
  Divider,
  Image,
  Form,
  Responsive
} from 'semantic-ui-react';
import translate from '../../i18n/translate';
import img1 from "../../img/icn-seccion-1.png";
import img2 from "../../img/icn-seccion-2.png";
import img3 from "../../img/icn-seccion-3.png";
import img4 from "../../img/icn-seccion-4.png";
import img5 from "../../img/icn-seccion-5.png";
import subimg1 from "../../img/icon-new-1.png";
import subimg2 from "../../img/icon-new-2.png";
import subimg3 from "../../img/icon-new-3.png";
import subimg4 from "../../img/icon-new-4.png";
import subimg5 from "../../img/icon-new-5.png";
import subimg6 from "../../img/icon-new-6.png";
import subimg7 from "../../img/icon-new-7.png";
import subimg8 from "../../img/icon-new-8.png";
import subimg9 from "../../img/icon-new-9.png";
import subimg10 from "../../img/icon-new-10.png";
import subimg11 from "../../img/icon-new-11.png";
import subimg12 from "../../img/icon-new-12.png";
import subimg13 from "../../img/icon-new-13.png";
import subimg14 from "../../img/icon-new-14.png";
import subimg15 from "../../img/icon-new-15.png";
import subimg16 from "../../img/icon-new-16.png";
import subimg17 from "../../img/icon-new-17.png";
import subimg18 from "../../img/icon-new-18.png";
import subimg19 from "../../img/icon-new-19.png";
import subimg20 from "../../img/icon-new-20.png";
import subimg21 from "../../img/icon-new-21.png";
import subimg22 from "../../img/icon-new-22.png";
import subimg23 from "../../img/icon-new-23.png";
import subimg24 from "../../img/icon-new-24.png";
import subimg25 from "../../img/icon-new-25.png";
import subimg26 from "../../img/icon-new-26.png";
import subimg27 from "../../img/icon-new-27.png";
import subimg28 from "../../img/icon-new-28.png";
import subimg29 from "../../img/icon-new-29.png";
import subimg30 from "../../img/icon-new-30.png";
import subimg31 from "../../img/icon-new-31.png";
import subimg32 from "../../img/icon-new-32.png";
import subimg33 from "../../img/icon-new-33.png";
import subimg34 from "../../img/icon-new-34.png";
import subimg35 from "../../img/icon-new-35.png";
import subimg36 from "../../img/icon-new-36.png";
import subimg37 from "../../img/icon-new-37.png";
import subimg38 from "../../img/icon-new-38.png";
import subimg39 from "../../img/icon-new-39.png";
import subimg40 from "../../img/icon-new-40.png";
import subimg41 from "../../img/icon-new-41.png";
import subimg42 from "../../img/icon-new-42.png";
import subimg43 from "../../img/icon-new-43.png";
import subimg44 from "../../img/icon-new-44.png";
import subimg45 from "../../img/icon-new-45.png";
import subimg46 from "../../img/icon-new-46.png";
import subimg47 from "../../img/icon-new-47.png";
import subimg48 from "../../img/icon-new-48.png";
import subimg49 from "../../img/icon-new-49.png";
import subimg50 from "../../img/icon-new-50.png";
import subimg51 from "../../img/icon-new-51.png";
import subimg52 from "../../img/icon-new-52.png";
import subimg53 from "../../img/icon-new-53.png";
import subimg54 from "../../img/icon-new-54.png";
import subimg55 from "../../img/icon-new-55.png";
// import subimg16 from "../../img/icon-new-16.png";
// import subimg17 from "../../img/icon-new-17.png";
import img6 from "../../img/icon-6.png";
import img7 from "../../img/icon-7.png";
import img8 from "../../img/icon-8.png";
import img9 from "../../img/icon-9.png";
import img10 from "../../img/icon-10.png";
import img11 from "../../img/icon-11.png";
import img12 from "../../img/icon-12.png";
import img13 from "../../img/icon-13.png";
import img14 from "../../img/icon-14.png";
import img15 from "../../img/icon-15.png";
import img16 from "../../img/icon-16.png";
import img17 from "../../img/icon-17.png";
import img18 from "../../img/icon-18.png";
import img19 from "../../img/icon-19.png";
import img20 from "../../img/icon-20.png";
import img21 from "../../img/icon-21.png";
import img22 from "../../img/icon-22.png";
import img23 from "../../img/icon-23.png";
import img24 from "../../img/icon-24.png";
import img25 from "../../img/icon-25.png";
import img26 from "../../img/icon-26.png";
import img27 from "../../img/icon-27.png";
import img28 from "../../img/icon-28.png";
import img29 from "../../img/icon-29.png";
import img30 from "../../img/icon-30.png";
import img31 from "../../img/icon-31.png";
import img32 from "../../img/icon-32.png";
import img33 from "../../img/icon-33.png";
import img34 from "../../img/icon-34.png";
import img35 from "../../img/icon-35.png";
import img36 from "../../img/icon-36.png";
import img37 from "../../img/icon-37.png";
import img38 from "../../img/icon-38.png";
import img39 from "../../img/icn_6@4x.png";
import img40 from "../../img/icn_7@4x.png";
import img41 from "../../img/icn_8@4x.png";
import img42 from "../../img/icn_9@4x.png";
import img43 from "../../img/icn_15@4x.png";
import img44 from "../../img/icn_16@4x.png";
import img45 from "../../img/icn_19@4x.png";
import img46 from "../../img/icn_23@4x.png";
import img47 from "../../img/icn_24@4x.png";
import img48 from "../../img/icn_25@4x.png";
import img49 from "../../img/icn_30@4x.png";
import img50 from "../../img/icn_32@4x.png";
import img51 from "../../img/icn_47@4x.png";
import img52 from "../../img/icn_48@4x.png";
import img53 from "../../img/icn_49@4x.png";
import img54 from "../../img/icn_52@4x.png";
import img55 from "../../img/icn_53@4x.png";
import img56 from "../../img/icn_pregunta10.png";
import otcService from '../../services/otc';
import currenciesFlag from '../../common/currencyFlag';
import { isMobile } from "react-device-detect";
import { parse } from "query-string";
import "./Faq.css";
class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: "",
      activeSubIndex: "",
      activeSub1Index: "",
      activeSub2Index: "",
      activeSub3Index: "",
      activeSub4Index: "",
      subItem:false,
      subItem1:false,
      subItem2:false,
      subItem3:false,
      subItem4:false,
      translator: props.translate,
    };
  }
  
  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex,activeSubIndex: "",
      activeSub1Index: "",
      activeSub2Index: "",
      activeSub3Index: "",
      activeSub4Index: ""});
      if(newIndex===0){
         window.location.href = "#a1";
      }
      else if(newIndex===1){
        window.location.href = "#a2";
      }
       else if(newIndex===2){
        window.location.href = "#a3";
      }
       else if(newIndex===3){
        window.location.href = "#a4";
      }
       else if(newIndex===4){
        window.location.href = "#a5";
      }
     
      
  };
   handleClickItem = (e, titleProps) => {
  const { index } = titleProps;
    const { activeSubIndex } = this.state;
    const newIndex = activeSubIndex === index ? -1 : index;
    this.setState({ activeSubIndex: newIndex});
  };
    handleClickItem1 = (e, titleProps) => {
    const { index } = titleProps;
    const { activeSub1Index } = this.state;
    const newIndex = activeSub1Index === index ? -1 : index;
    this.setState({ activeSub1Index: newIndex});
  };
   handleClickItem2 = (e, titleProps) => {
    const { index } = titleProps;
    const { activeSub2Index } = this.state;
    const newIndex = activeSub2Index === index ? -1 : index;
    this.setState({ activeSub2Index: newIndex});
  };
   handleClickItem3 = (e, titleProps) => {
    const { index } = titleProps;
    const { activeSub3Index } = this.state;
    const newIndex = activeSub3Index === index ? -1 : index;
    this.setState({ activeSub3Index: newIndex});
  };
   handleClickItem4 = (e, titleProps) => {
   const { index } = titleProps;
    const { activeSub4Index } = this.state;
    const newIndex = activeSub4Index === index ? -1 : index;
    this.setState({ activeSub4Index: newIndex});
  };
  componentDidMount() {
   const query = parse(window.location.search);
    if (query.l !== undefined) {
      let lang = { value: query.l };
      this.props.handleClick(null, lang);
  }
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
    const { activeIndex } = this.state;
    const { activeSubIndex } = this.state;
    return (
      <div>
        <Divider hidden />
        <Responsive>
        <Grid >
          {!isMobile && (<Grid.Column largeScreen={2} computer={1} widescreen={2} />)}
          <Grid.Column largeScreen={12} computer={14} mobile={16} widescreen={12}>
             {!isMobile && (  <Divider hiddenid="a1" ></Divider>)}
            <Segment basic={true} className="scroll-container">
               {!isMobile &&( <Segment inverted textAlign="left" className="titleComponents">
                  <h4 className="headerComponent">{t("faqs.header")}</h4>
                </Segment>)}
              <Divider hidden></Divider>
              <Container>
                <Grid columns={1}>
                  <Grid.Column
                    largeScreen={16}
                    mobile={16}
                    tablet={16}
                    computer={16}
                  >
                   
                    <Accordion
                      fluid
                      id="a2"
                    >
                      <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={this.handleClick.bind(this)}
                        style={{marginTop:-15,}}
                        id="a3"
                      >
                         <Segment inverted color='blue' className="segment" style={{borderRadius: "10px/10px",}}>
                                  <Grid>
                                    <Grid.Column width={isMobile?4:1}><Image size="mini"  src={img1}></Image></Grid.Column>
                                    <Grid.Column width={isMobile?12:15}><p style={isMobile? {marginLeft:-30,fontSize:15,marginTop:5}:{marginLeft:0,fontSize:17}}><strong>{t("faqs.questions.q1.title")}</strong></p></Grid.Column>
                                  </Grid>
                        </Segment>
                      </Accordion.Title>
                      <Accordion.Content
                        active={this.state.activeIndex === 0}
                      >
                        <Accordion
                            fluid
                            style={{marginTop:-10}}
                        >
                              <Accordion.Title
                                active={this.state.activeSubIndex === 0}
                                index={0}
                                onClick={this.handleClickItem.bind(this)}
                                
                              >
                                <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg1}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q1.item1.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSubIndex !== 0 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                active={this.state.activeSubIndex === 0}
                              >
                                <Segment basic style={{marginTop:-35}}>
                                  <Grid>
                                    <Grid.Column width={16}>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item1.content1")}</p>
                                    </Grid.Column>
                                  </Grid>
                                </Segment>
                              </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                active={activeSubIndex === 1}
                                index={1}
                                onClick={this.handleClickItem.bind(this)}
                              >
                                   <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg2}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q1.item2.subtitle2")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSubIndex !== 1 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                              active={this.state.activeSubIndex === 1}
                              >
                                  <Segment basic style={{marginTop:-35}}>
                                  <Grid>
                                    <Grid.Column width={16}>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item2.content2")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item2.content3")}</p>
                                    </Grid.Column>
                                  </Grid>
                                </Segment>
                              </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={activeSubIndex === 2}
                                  index={2}
                                  onClick={this.handleClickItem.bind(this)}
                              >
                                       <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg3}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q1.item3.subtitle3")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSubIndex !== 2 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSubIndex === 2}
                                >
                                        <Segment basic style={{marginTop:-35}}>
                                  <Grid>
                                    <Grid.Column width={16}>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item3.content3")}</p>
                                    </Grid.Column>
                                  </Grid>
                                </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={activeSubIndex === 3}
                                  index={3}
                                  onClick={this.handleClickItem.bind(this)}
                              >
                                       <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg4}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q1.item4.subtitle4")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSubIndex !== 3 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSubIndex === 3}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item4.content1")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item4.content2")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item4.content3")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item4.content4")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item4.content5")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item4.content6")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={activeSubIndex === 4}
                                  index={4}
                                  onClick={this.handleClickItem.bind(this)}
                              >
                                       <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg5}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q1.item5.subtitle5")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSubIndex !== 4 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSubIndex === 4}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}><strong>{t("faqs.questions.q1.item5.content1")}</strong>{t("faqs.questions.q1.item5.content2")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}><strong>{t("faqs.questions.q1.item5.content3")}</strong>{t("faqs.questions.q1.item5.content4")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}><strong>{t("faqs.questions.q1.item5.content5")}</strong>{t("faqs.questions.q1.item5.content6")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}><strong>{t("faqs.questions.q1.item5.content7")}</strong>{t("faqs.questions.q1.item5.content8")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}><strong>{t("faqs.questions.q1.item5.content9")}</strong>{t("faqs.questions.q1.item5.content10")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}><strong>{t("faqs.questions.q1.item5.content11")}</strong>{t("faqs.questions.q1.item5.content12")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={activeSubIndex === 5}
                                  index={5}
                                  onClick={this.handleClickItem.bind(this)}
                              >
                                       <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg6}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q1.item6.subtitle6")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSubIndex !== 5 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSubIndex === 5}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item6.content1")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={activeSubIndex === 6}
                                  index={6}
                                  onClick={this.handleClickItem.bind(this)}
                              >
                                       <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg7}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q1.item7.subtitle7")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSubIndex !== 6 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSubIndex === 6}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item7.content1")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item7.content2")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={activeSubIndex === 7}
                                  index={7}
                                  onClick={this.handleClickItem.bind(this)}
                              >
                                       <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg8}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q1.item8.subtitle8")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSubIndex !== 7 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSubIndex === 7}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item8.content1")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item8.content2")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item8.content3")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item8.content4")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item8.content5")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={activeSubIndex === 8}
                                  index={8}
                                  onClick={this.handleClickItem.bind(this)}
                              >
                                       <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg9}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q1.item9.subtitle9")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSubIndex !== 8 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSubIndex === 8}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item9.content1")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={activeSubIndex === 9}
                                  index={9}
                                  onClick={this.handleClickItem.bind(this)}
                              >
                                       <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg10}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q1.item10.subtitle10")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSubIndex !== 9 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSubIndex === 9}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item10.content1")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={activeSubIndex === 10}
                                  index={10}
                                  onClick={this.handleClickItem.bind(this)}
                              >
                                       <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg11}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q1.item11.subtitle11")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSubIndex !== 10 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSubIndex === 10}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item11.content1")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={activeSubIndex === 11}
                                  index={11}
                                  onClick={this.handleClickItem.bind(this)}
                              >
                                       <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg12}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q1.item12.subtitle12")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSubIndex !== 11 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSubIndex === 11}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item12.content1")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={activeSubIndex === 12}
                                  index={12}
                                  onClick={this.handleClickItem.bind(this)}
                              >
                                       <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg13}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q1.item13.subtitle13")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSubIndex !== 12 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSubIndex === 12}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item13.content1")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={activeSubIndex === 13}
                                  index={13}
                                  onClick={this.handleClickItem.bind(this)}
                              >
                                       <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg14}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q1.item14.subtitle14")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSubIndex !== 13 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSubIndex === 13}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item14.content1")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={activeSubIndex === 14}
                                  index={14}
                                  onClick={this.handleClickItem.bind(this)}
                              >
                                       <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg15}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q1.item15.subtitle15")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSubIndex !== 14 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSubIndex === 14}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q1.item15.content1")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>

                        </Accordion>
                       
                      </Accordion.Content>
                     <Divider hidden style={{marginTop:-5}}></Divider>
                      <Accordion.Title
                        active={activeSubIndex === 1}
                        index={1}
                        onClick={this.handleClick.bind(this)}
                        style={{marginTop:-15}}
                        id="a4"
                      >
                         <Segment inverted color='blue' className="segment" style={{borderRadius: "10px/10px",}}>
                                  <Grid>
                                    <Grid.Column width={isMobile?4:1}><Image size="mini"  src={img2}></Image></Grid.Column>
                                    <Grid.Column width={isMobile?12:15}><p style={isMobile? {marginLeft:-30,fontSize:15,marginTop:5}:{marginLeft:0,fontSize:17}}><strong>{t("faqs.questions.q2.title")}</strong></p></Grid.Column>
                                  </Grid>
                        </Segment>
                      </Accordion.Title>
                      <Accordion.Content
                        active={activeIndex === 1}
                        index={1}
                      >
                            <Accordion
                            fluid
                            style={{marginTop:-10}}
                        >

                              <Accordion.Title
                                active={this.state.activeSub1Index === 0}
                                index={0}
                                onClick={this.handleClickItem1.bind(this)}
                              >
                                    <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg16}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q2.item1.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub1Index !== 0 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                active={this.state.activeSub1Index === 0}
                              >
                                <Segment basic style={{marginTop:-35}}>
                                  <Grid>
                                    <Grid.Column width={16}>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item1.content1")}</p>
                                      <ul>
                                        <li className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item1.subContent11")}</li>
                                        <li className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item1.subContent12")}</li>
                                        <li className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item1.subContent13")}</li>
                                      </ul>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}><strong>{t("faqs.questions.q2.item1.content2")}</strong></p>
                                      <ul>
                                        <li className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item1.subContent21")}</li>
                                        <li className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item1.subContent22")}</li>
                                        <li className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item1.subContent23")}</li>
                                        <li className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item1.subContent24")}</li>
                                        <li className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item1.subContent25")}</li>
                                      </ul>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item1.content3")}</p>
                                    </Grid.Column>
                                  </Grid>
                                </Segment>
                              </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                active={this.state.activeSub1Index === 1}
                                index={1}
                                onClick={this.handleClickItem1.bind(this)}
                              >
                                <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg17}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q2.item2.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub1Index !== 1 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                              active={this.state.activeSub1Index === 1}
                              >
                                <Segment basic style={{marginTop:-35}}>
                                  <Grid>
                                    <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item2.content1")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item2.content2")}</p>
                                    </Grid.Column>
                                  </Grid>
                                </Segment>
                              </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={this.state.activeSub1Index === 2}
                                  index={2}
                                  onClick={this.handleClickItem1.bind(this)}
                              >
                                <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg18}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q2.item3.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub1Index !== 2 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSub1Index === 2}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item3.content1")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item3.content2")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item3.content3")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={this.state.activeSub1Index === 3}
                                  index={3}
                                  onClick={this.handleClickItem1.bind(this)}
                              >
                                <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg19}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q2.item4.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub1Index !== 3 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSub1Index === 3}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item4.content1")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item4.content2")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item4.content3")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item4.content4")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={this.state.activeSub1Index === 4}
                                  index={4}
                                  onClick={this.handleClickItem1.bind(this)}
                              >
                                <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg20}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q2.item5.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub1Index !== 4 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSub1Index === 4}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item5.content1")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item5.content2")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={this.state.activeSub1Index === 5}
                                  index={5}
                                  onClick={this.handleClickItem1.bind(this)}
                              >
                                <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg21}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q2.item6.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub1Index !== 5 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSub1Index === 5}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item6.content1")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={this.state.activeSub1Index === 6}
                                  index={6}
                                  onClick={this.handleClickItem1.bind(this)}
                              >
                               <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg22}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q2.item7.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub1Index !== 6 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSub1Index === 6}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item7.content1")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={this.state.activeSub1Index === 7}
                                  index={7}
                                  onClick={this.handleClickItem1.bind(this)}
                              >
                                <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg23}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q2.item8.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub1Index !== 7 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSub1Index === 7}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item8.content1")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={this.state.activeSub1Index === 8}
                                  index={8}
                                  onClick={this.handleClickItem1.bind(this)}
                              >
                                <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg24}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q2.item9.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub1Index !== 8 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSub1Index === 8}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item9.content1")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={this.state.activeSub1Index === 9}
                                  index={9}
                                  onClick={this.handleClickItem1.bind(this)}
                              >
                               <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg25}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q2.item10.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub1Index !== 9 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSub1Index === 9}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item10.content1")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={this.state.activeSub1Index === 10}
                                  index={10}
                                  onClick={this.handleClickItem1.bind(this)}
                              >
                                <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg26}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q2.item11.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub1Index !== 10 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSub1Index === 10}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item11.content1")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item11.content2")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={this.state.activeSub1Index === 11}
                                  index={11}
                                  onClick={this.handleClickItem1.bind(this)}
                              >
                                <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg27}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q2.item12.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub1Index !== 11 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSub1Index === 11}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <ul>
                                          <li className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item12.content1")}</li>
                                          <li className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item12.content2")}</li>
                                          <li className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item12.content3")}</li>
                                          <li className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item12.content4")}</li>
                                          <li className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item12.content5")}</li>
                                        </ul>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={this.state.activeSub1Index === 12}
                                  index={12}
                                  onClick={this.handleClickItem1.bind(this)}
                              >
                                <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg28}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q2.item13.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub1Index !== 12 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSub1Index === 12}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item13.content1")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={this.state.activeSub1Index === 13}
                                  index={13}
                                  onClick={this.handleClickItem1.bind(this)}
                              >
                                <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg29}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q2.item14.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub1Index !== 13 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSub1Index === 13}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q2.item14.content1")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>

                        </Accordion>
                      </Accordion.Content>
                       <Divider hidden style={{marginTop:-5}}></Divider>
                      <Accordion.Title
                        active={activeIndex === 2}
                        index={2}
                        onClick={this.handleClick.bind(this)}
                        style={{marginTop:-15}}
                        id="a5"
                      >
                         <Segment inverted color='blue' className="segment" style={{borderRadius: "10px/10px",}}>
                                  <Grid>
                                    <Grid.Column width={isMobile?4:1}><Image size="mini"  src={img3}></Image></Grid.Column>
                                    <Grid.Column width={isMobile?12:15}><p style={isMobile? {marginLeft:-30,fontSize:15,marginTop:5}:{marginLeft:0,fontSize:17}}><strong>{t("faqs.questions.q3.title")}</strong></p></Grid.Column>
                                  </Grid>
                        </Segment>
                      </Accordion.Title>
                      <Accordion.Content
                        active={activeIndex === 2}
                        index={2}
                      >
                         <Accordion
                            fluid
                            style={{marginTop:-10}}
                        >

                              <Accordion.Title
                                active={this.state.activeSub2Index === 0}
                                index={0}
                                onClick={this.handleClickItem2.bind(this)}
                              >
                                     <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg30}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q3.item1.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub2Index !== 0 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                active={this.state.activeSub2Index === 0}
                              >
                                <Segment basic style={{marginTop:-35}}>
                                  <Grid>
                                    <Grid.Column width={16}>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q3.item1.content1")}</p>
                                    </Grid.Column>
                                  </Grid>
                                </Segment>
                              </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                active={this.state.activeSub2Index === 1}
                                index={1}
                                onClick={this.handleClickItem2.bind(this)}
                              >
                                  <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg31}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q3.item2.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub2Index !== 1 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                              active={this.state.activeSub2Index === 1}
                              >
                                <Segment basic style={{marginTop:-35}}>
                                  <Grid>
                                    <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q3.item2.content1")}</p>
                                    </Grid.Column>
                                  </Grid>
                                </Segment>
                              </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={this.state.activeSub2Index === 2}
                                  index={2}
                                  onClick={this.handleClickItem2.bind(this)}
                              >
                               <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg32}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q3.item3.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub2Index !== 2 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSub2Index === 2}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q3.item3.content1")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q3.item3.content2")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={this.state.activeSub2Index === 3}
                                  index={3}
                                  onClick={this.handleClickItem2.bind(this)}
                              >
                                <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg33}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q3.item4.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub2Index !== 3 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSub2Index === 3}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q3.item4.content1")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={this.state.activeSub2Index === 4}
                                  index={4}
                                  onClick={this.handleClickItem2.bind(this)}
                              >
                                  <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg34}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q3.item5.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub2Index !== 4 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSub2Index === 4}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q3.item5.content1")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={this.state.activeSub2Index === 5}
                                  index={5}
                                  onClick={this.handleClickItem2.bind(this)}
                              >
                                  <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg35}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q3.item6.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub2Index !== 5 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSub2Index === 5}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q3.item6.content1")}</p>
                                        <ul>
                                        <li><p className={isMobile ? "faqs-title2": "faqs-title"}><strong>{t("faqs.questions.q3.item6.content2")}</strong></p></li>
                                        <ul>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q3.item6.subContent21")}</p>
                                        </ul>
                                        </ul>
                                        <ul>
                                        <li><p className={isMobile ? "faqs-title2": "faqs-title"}><strong>{t("faqs.questions.q3.item6.content3")}</strong></p></li>
                                        <ul><p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q3.item6.subContent31")}</p>
                                        </ul></ul>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q3.item6.content4")}</p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={this.state.activeSub2Index === 6}
                                  index={6}
                                  onClick={this.handleClickItem2.bind(this)}
                              >
                                  <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg36}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q3.item7.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub2Index !== 6 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSub2Index === 6}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}><strong>{t("faqs.questions.q3.item7.subtitle2")}</strong></p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q3.item7.content1")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q3.item7.content2")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q3.item7.content3")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q3.item7.content4")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q3.item7.content5")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q3.item7.content6")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q3.item7.content7")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q3.item7.content8")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q3.item7.content9")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}><i>{t("faqs.questions.q3.item7.content10")}</i></p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={this.state.activeSub2Index === 7}
                                  index={7}
                                  onClick={this.handleClickItem2.bind(this)}
                              >
                                 <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg37}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q3.item8.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub2Index !== 7 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                    active={this.state.activeSub2Index === 7}
                                >
                                  <Segment basic style={{marginTop:-35}}>
                                    <Grid>
                                      <Grid.Column width={16}>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q3.item8.content1")}</p>
                                        <p className={isMobile ? "faqs-title2": "faqs-title"}><strong>{t("faqs.questions.q3.item8.content2")}</strong></p>
                                      </Grid.Column>
                                    </Grid>
                                  </Segment>
                                </Accordion.Content>
                              <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                              <Accordion.Title
                                  active={this.state.activeSub2Index === 8}
                                  index={8}
                                  onClick={this.handleClickItem2.bind(this)}
                              >
                                  <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg38}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q3.item9.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub2Index !== 8 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                              <Accordion.Content
                                  active={this.state.activeSub2Index === 8}
                              >
                                <Segment basic style={{marginTop:-35}}>
                                  <Grid>
                                    <Grid.Column width={16}>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q3.item9.content1")}{t("faqs.questions.q3.item9.content2")}{t("faqs.questions.q3.item9.content3")}</p>
                                    </Grid.Column>
                                  </Grid>
                                </Segment>
                              </Accordion.Content>
                            </Accordion>
                        
                      </Accordion.Content>
                       <Divider hidden style={{marginTop:-5}}></Divider>
                      <Accordion.Title
                        active={activeIndex === 3}
                        index={3}
                        onClick={this.handleClick.bind(this)}
                        style={{marginTop:-15}}
                      >
                         <Segment inverted color='blue' className="segment" style={{borderRadius: "10px/10px",}}>
                                  <Grid>
                                    <Grid.Column width={isMobile?4:1}><Image size="mini"  src={img4}></Image></Grid.Column>
                                    <Grid.Column width={isMobile?12:15}><p style={isMobile? {marginLeft:-30,fontSize:15,marginTop:5}:{marginLeft:0,fontSize:17}}><strong>{t("faqs.questions.q4.title")}</strong></p></Grid.Column>
                                  </Grid>
                        </Segment>
                      </Accordion.Title>
                      <Accordion.Content
                        active={activeIndex === 3}
                        index={3}
                      >
                     
                         <Accordion
                            fluid
                            style={{marginTop:-10}}
                        >

                            <Accordion.Title
                                active={this.state.activeSub3Index === 0}
                                index={0}
                                onClick={this.handleClickItem3.bind(this)}
                              >
                               
                                   <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg39}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q4.item1.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub3Index !== 0 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                            <Accordion.Content
                                active={this.state.activeSub3Index === 0}
                              >
                                <Segment basic style={{marginTop:-35}}>
                                  <Grid>
                                    <Grid.Column width={16}>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item1.content1")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item1.content2")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item1.content3")}</p>
                                    </Grid.Column>
                                  </Grid>
                                </Segment>
                              </Accordion.Content>
                            <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                            <Accordion.Title
                              active={this.state.activeSub3Index === 1}
                              index={1}
                              onClick={this.handleClickItem3.bind(this)}
                            >
                                 <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg40}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q4.item2.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub3Index !== 1 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                            </Accordion.Title>
                            <Accordion.Content
                             active={this.state.activeSub3Index === 1}
                            >
                              <Segment basic style={{marginTop:-35}}>
                                <Grid>
                                  <Grid.Column width={16}>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item2.content1")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item2.content2")}</p>
                                  </Grid.Column>
                                </Grid>
                              </Segment>
                            </Accordion.Content>
                            <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                            <Accordion.Title
                                active={this.state.activeSub3Index === 2}
                                index={2}
                                onClick={this.handleClickItem3.bind(this)}
                            >
                                 <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg41}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q4.item3.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub3Index !== 2 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                            </Accordion.Title>
                            <Accordion.Content
                                  active={this.state.activeSub3Index === 2}
                              >
                                <Segment basic style={{marginTop:-35}}>
                                  <Grid>
                                    <Grid.Column width={16}>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item3.content1")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item3.content2")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item3.content3")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item3.content4")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item3.content5")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item3.content6")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item3.content7")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item3.content8")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item3.content9")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item3.content10")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item3.content11")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item3.content12")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item3.content13")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item3.content14")}</p>
                                    </Grid.Column>
                                  </Grid>
                                </Segment>
                              </Accordion.Content>
                            <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                            <Accordion.Title
                                active={this.state.activeSub3Index === 3}
                                index={3}
                                onClick={this.handleClickItem3.bind(this)}
                            >
                                  <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg42}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q4.item4.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub3Index !== 3 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                            </Accordion.Title>
                            <Accordion.Content
                                  active={this.state.activeSub3Index === 3}
                              >
                                <Segment basic style={{marginTop:-35}}>
                                  <Grid>
                                    <Grid.Column width={16}>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item4.content1")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item4.content2")}</p>
                                    </Grid.Column>
                                  </Grid>
                                </Segment>
                              </Accordion.Content>
                            <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                            <Accordion.Title
                                active={this.state.activeSub3Index === 4}
                                index={4}
                                onClick={this.handleClickItem3.bind(this)}
                            >
                                 <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg43}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q4.item5.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub3Index !== 4 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                            </Accordion.Title>
                            <Accordion.Content
                                  active={this.state.activeSub3Index === 4}
                              >
                                <Segment basic style={{marginTop:-35}}>
                                  <Grid>
                                    <Grid.Column width={16}>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item5.content1")}</p>
                                    </Grid.Column>
                                  </Grid>
                                </Segment>
                              </Accordion.Content>
                            <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                            <Accordion.Title
                                active={this.state.activeSub3Index === 5}
                                index={5}
                                onClick={this.handleClickItem3.bind(this)}
                            >
                                  <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg44}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q4.item6.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub3Index !== 5 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                            </Accordion.Title>
                            <Accordion.Content
                                  active={this.state.activeSub3Index === 5}
                              >
                                <Segment basic style={{marginTop:-35}}>
                                  <Grid>
                                    <Grid.Column width={16}>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item6.content1")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item6.content2")}</p>
                                      <ul>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item6.subcontent21")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item6.subcontent22")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item6.subcontent23")}</p>
                                      <ul>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item6.subcontent23a")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item6.subcontent23b")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item6.subcontent23c")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item6.subcontent23d")}</p>
                                      </ul>
                                      <br></br>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item6.subcontent24")}</p>
                                      </ul>
                                      <Divider hidden></Divider>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item6.content3")}</p>
                                    </Grid.Column>
                                  </Grid>
                                </Segment>
                              </Accordion.Content>
                            <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                            <Accordion.Title
                                active={this.state.activeSub3Index === 6}
                                index={6}
                                onClick={this.handleClickItem3.bind(this)}
                            >
                                  <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg45}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q4.item7.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub3Index !== 6 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                            </Accordion.Title>
                            <Accordion.Content
                                  active={this.state.activeSub3Index === 6}
                              >
                                <Segment basic style={{marginTop:-35}}>
                                  <Grid>
                                    <Grid.Column width={16}>
                                      <ul>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item7.content1")}</p>
                                      <ul>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item7.subcontent11")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item7.subcontent12")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item7.subcontent13")}</p>
                                      <ul>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item7.subcontent13i")}</p>
                                      <ul>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item7.subcontent13i1")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item7.subcontent13i2")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item7.subcontent13i3")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item7.subcontent13i4")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item7.subcontent13i5")}</p>
                                      </ul>
                                      </ul>
                                      </ul>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item7.content2")}</p>
                                      <ul>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item7.subcontent21")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item7.subcontent22")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item7.subcontent23")}</p>
                                      </ul>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item7.content3")}</p>
                                      <ul>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item7.subcontent31")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item7.subcontent32")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item7.subcontent33")}</p>
                                      <ul>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item7.subcontent33i")}</p>
                                      <ul>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item7.subcontent33i1")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item7.subcontent33i2")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item7.subcontent33i3")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item7.subcontent33i4")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item7.subcontent33i5")}</p>
                                      </ul>
                                      </ul>
                                      </ul>
                                      </ul>
                                      <Divider hidden></Divider>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item6.content3")}</p>
                                    </Grid.Column>
                                  </Grid>
                                </Segment>
                              </Accordion.Content>
                            <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                            <Accordion.Title
                                active={this.state.activeSub3Index === 7}
                                index={7}
                                onClick={this.handleClickItem3.bind(this)}
                            >
                                  <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg46}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q4.item8.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub3Index !== 7 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                            </Accordion.Title>
                            <Accordion.Content
                                  active={this.state.activeSub3Index === 7}
                              >
                                <Segment basic style={{marginTop:-35}}>
                                  <Grid>
                                    <Grid.Column width={16}>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item8.content1")}</p>
                                    </Grid.Column>
                                  </Grid>
                                </Segment>
                              </Accordion.Content>
                            <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                            <Accordion.Title
                                active={this.state.activeSub3Index === 8}
                                index={8}
                                onClick={this.handleClickItem3.bind(this)}
                            >
                                <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg47}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q4.item9.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub3Index !== 8 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                            </Accordion.Title>
                            <Accordion.Content
                                  active={this.state.activeSub3Index === 8}
                              >
                                <Segment basic style={{marginTop:-35}}>
                                  <Grid>
                                    <Grid.Column width={16}>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item9.content1")}</p>
                                    </Grid.Column>
                                  </Grid>
                                </Segment>
                              </Accordion.Content>
                            <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                            <Accordion.Title
                                active={this.state.activeSub3Index === 9}
                                index={9}
                                onClick={this.handleClickItem3.bind(this)}
                            >
                                 <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg48}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q4.item10.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub3Index !== 9 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                            </Accordion.Title>
                            <Accordion.Content
                                  active={this.state.activeSub3Index === 9}
                              >
                                <Segment basic style={{marginTop:-35}}>
                                  <Grid>
                                    <Grid.Column width={16}>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q4.item10.content1")}</p>
                                    </Grid.Column>
                                  </Grid>
                                </Segment>
                              </Accordion.Content>

                            </Accordion>
                       
                      </Accordion.Content>
                       <Divider hidden style={{marginTop:-5}}></Divider>
                      <Accordion.Title
                        active={activeIndex === 4}
                        index={4}
                        onClick={this.handleClick.bind(this)}
                        style={{marginTop:-15}}
                      >
                         <Segment inverted color='blue' className="segment" style={{borderRadius: "10px/10px",}}>
                                  <Grid>
                                    <Grid.Column width={isMobile?4:1}><Image size="mini"  src={img5}></Image></Grid.Column>
                                    <Grid.Column width={isMobile?12:15}><p style={isMobile? {marginLeft:-30,fontSize:15,marginTop:5}:{marginLeft:0,fontSize:17}}><strong>{t("faqs.questions.q5.title")}</strong></p></Grid.Column>
                                  </Grid>
                        </Segment>
                      </Accordion.Title>
                      <Accordion.Content
                        active={activeIndex === 4}
                        index={4}
                      >
                       
                         <Accordion
                            fluid
                            style={{marginTop:-10}}
                        >

                            <Accordion.Title
                                active={this.state.activeSub4Index === 0}
                                index={0}
                                onClick={this.handleClickItem4.bind(this)}
                              >
                                 <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg49}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q5.item1.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub4Index !== 0 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                            <Accordion.Content
                                active={this.state.activeSub4Index === 0}
                              >
                                <Segment basic style={{marginTop:-35}}>
                                  <Grid>
                                    <Grid.Column width={16}>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q5.item1.content1")}</p>
                                    </Grid.Column>
                                  </Grid>
                                </Segment>
                              </Accordion.Content>
                            <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                            <Accordion.Title
                                active={this.state.activeSub4Index === 1}
                                index={1}
                                onClick={this.handleClickItem4.bind(this)}
                              >
                                  <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg50}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q5.item2.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub4Index !== 1 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                              </Accordion.Title>
                            <Accordion.Content
                                active={this.state.activeSub4Index === 1}
                              >
                                <Segment basic style={{marginTop:-35}}>
                                  <Grid>
                                    <Grid.Column width={16}>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q5.item2.content1")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q5.item2.content2")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q5.item2.content3")}</p>
                                    </Grid.Column>
                                  </Grid>
                                </Segment>
                              </Accordion.Content>
                            <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                            <Accordion.Title
                              active={this.state.activeSub4Index === 2}
                              index={2}
                              onClick={this.handleClickItem4.bind(this)}
                            >
                                <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg51}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q5.item3.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub4Index !== 2 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                            </Accordion.Title>
                            <Accordion.Content
                             active={this.state.activeSub4Index === 2}
                            >
                              <Segment basic style={{marginTop:-35}}>
                                <Grid>
                                  <Grid.Column width={16}>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q5.item3.content1")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q5.item3.content2")}</p>
                                      <ul>
                                        <li><p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q5.item3.subContent1")}</p></li>
                                        <li><p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q5.item3.subContent2")}</p></li>
                                        <li><p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q5.item3.subContent3")}</p></li>
                                      </ul>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q5.item3.content3")}</p>
                                  </Grid.Column>
                                </Grid>
                              </Segment>
                            </Accordion.Content>
                            <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                            <Accordion.Title
                                active={this.state.activeSub4Index === 3}
                                index={3}
                                onClick={this.handleClickItem4.bind(this)}
                            >
                                <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg52}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q5.item4.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub4Index !== 3 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                            </Accordion.Title>
                            <Accordion.Content
                                  active={this.state.activeSub4Index === 3}
                              >
                                <Segment basic style={{marginTop:-35}}>
                                  <Grid>
                                    <Grid.Column width={16}>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q5.item4.content1")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q5.item4.content2")}<strong>{t("faqs.questions.q5.item4.content3")}</strong>{t("faqs.questions.q5.item4.content4")}{t("faqs.questions.q5.item4.content5")}</p>
                                    </Grid.Column>
                                  </Grid>
                                </Segment>
                              </Accordion.Content>
                            <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                            <Accordion.Title
                                active={this.state.activeSub4Index === 4}
                                index={4}
                                onClick={this.handleClickItem4.bind(this)}
                            >
                                <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg53}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q5.item5.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub4Index !== 4 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                            </Accordion.Title>
                            <Accordion.Content
                                  active={this.state.activeSub4Index === 4}
                              >
                                <Segment basic style={{marginTop:-35}}>
                                  <Grid>
                                    <Grid.Column width={16}>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q5.item5.content1")}</p>
                                    </Grid.Column>
                                  </Grid>
                                </Segment>
                              </Accordion.Content>
                            <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                            <Accordion.Title
                                active={this.state.activeSub4Index === 5}
                                index={5}
                                onClick={this.handleClickItem4.bind(this)}
                            >
                               <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg54}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q5.item6.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub4Index !== 5 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                            </Accordion.Title>
                            <Accordion.Content
                                  active={this.state.activeSub4Index === 5}
                              >
                                <Segment basic style={{marginTop:-35}}>
                                  <Grid>
                                    <Grid.Column width={16}>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}><u>{t("faqs.questions.q5.item6.content1")}</u></p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q5.item6.content2")}{t("faqs.questions.q5.item6.content3")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q5.item6.content4")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}><strong>{t("faqs.questions.q5.item6.content5")}</strong></p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q5.item6.content6")}<strong>{t("faqs.questions.q5.item6.content7")}</strong>{t("faqs.questions.q5.item6.content8")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q5.item6.content9")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q5.item6.content10")}</p>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}><u>{t("faqs.questions.q5.item6.content11")}</u>{t("faqs.questions.q5.item6.content12")}</p>
                                    </Grid.Column>
                                  </Grid>
                                </Segment>
                              </Accordion.Content>
                            <Divider style={isMobile ? { borderColor: "#969595", marginTop:-2 } :{ borderColor: "#055990", marginTop:-2 }}></Divider>
                            <Accordion.Title
                                active={this.state.activeSub4Index === 6}
                                index={6}
                                onClick={this.handleClickItem4.bind(this)}
                            >
                                <Segment basic>
                                <Grid>
                                   {!isMobile &&( <Grid.Column width={1}><Image size="mini" style={{marginTop:-5}}  src={subimg55}></Image></Grid.Column>)}
                                  <Grid.Column width={isMobile?14:14}> 
                                    <p className={isMobile ? "faqs-title2": "faqs-title"} style={{marginLeft: !isMobile ? -20:-5}}><strong>
                                      {t("faqs.questions.q5.item7.subtitle1")}
                                      </strong>
                                    </p>
                                  </Grid.Column>
                                  <Grid.Column textAlign="right" width={isMobile?1:1}><Icon className={isMobile ? "faqs-title2": "faqs-title"} name={this.state.activeSub4Index !== 6 ?  "angle down" :"angle up"} /></Grid.Column>
                                </Grid>
                              </Segment>
                            </Accordion.Title>
                            <Accordion.Content
                                  active={this.state.activeSub4Index === 6}
                              >
                                <Segment basic style={{marginTop:-35}}>
                                  <Grid>
                                    <Grid.Column width={16}>
                                      <p className={isMobile ? "faqs-title2": "faqs-title"}>{t("faqs.questions.q5.item7.content1")}{t("faqs.questions.q5.item7.content2")}{t("faqs.questions.q5.item7.content3")}<strong>{t("faqs.questions.q5.item7.content4")}</strong>{t("faqs.questions.q5.item7.content5")}</p>
                                    </Grid.Column>
                                  </Grid>
                                </Segment>
                              </Accordion.Content>

                            </Accordion>
                          
                      </Accordion.Content>
                    </Accordion>
                  </Grid.Column>
                </Grid>
              </Container>
            </Segment>
          </Grid.Column>
          {!isMobile && (<Grid.Column largeScreen={2} computer={1} widescreen={2} />)}
        </Grid>
        </Responsive>
      </div>
    );
  }
}
export default translate(Faq);
