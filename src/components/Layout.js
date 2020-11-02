/* eslint-disable   */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'assets/stylesheets/application.scss';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import SideNav, { NavItem, NavText } from '@trendmicro/react-sidenav';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import getLogo from '../data/DataURI'
import ModalFAQ from './Modal';
/* import DropdownC from "./DropdownC";

import RSwitch from "./RSwitch"; */


const localStyled = {
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  flexCenterFAQ: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 30 
  },
  flexCenterVersion: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    bottom: '10px',
    right: '20px'
  },
  total: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'left',
    fontSize: 60,
    font: 'normal normal medium 60px/71px Roboto',
    letterSpacing: 0,
    color: '#00FFD9',
    marginTop: 38,
    opacity: 1,
  },
  LpwanTotal: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'left',
    fontSize: 30,
    font: 'normal normal medium 60px/71px Roboto',
    letterSpacing: 0,
    color: '#FFFFFF',
    marginTop: 16,
    opacity: 1,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'left',
    fontSize: 20,
    padding: '0px 30px',
    font: 'normal normal medium 60px/71px Roboto',
    letterSpacing: 0,
    color: 'white',
    marginTop: 10,
    opacity: 1,
  }
};

const Layout = ({ children, pageName, total, lpwanTotal, open }) => {
  let className = '';

  if ( pageName ) {
    className = `${className} page-${pageName}`;
  }
  const { t } = useTranslation();
  
  const [expanded, setExpanded] = useState( open );
  /* const online = 9567;
  const offline = 57;

  const [state, setState] = React.useState({
    checked: props.on
  });

  React.useEffect(() => {
    setState({checked: props.on})
  }, [props.on])

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
    
    props.onSwitchChange(props.dvId, event.target.checked, event);
  }; */

  return (
    <>
      <Helmet 
        title={t( 'project' )}
        link={[
          {
            rel: 'icon',
            type: 'image/png',
            href: 'favicon.png'
          }
        ]}
        bodyAttributes={{ class: className }}/>

      <div className="wrapper">
        <main>
          <div style={{ position: 'absolute', zIndex: 1000, top: 7, left: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '0px 15px 10px 15px' }}>
              <img src={getLogo()} alt='mxclogo' style={{height: 48}} />
            </div>
          </div>
          { /* <div style={{ backgroundColor:'rgba(255, 255, 255, .6)',  borderRadius: 5, position: 'absolute', zIndex: 1000, top: 16, right: `${ 20 + (expanded ? 306 : 64 )}px` }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '15px 15px 10px 15px' }}>
                  <RSwitch />
                  <span style={{ padding: '0px 16px'}}>Show Footprint</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', padding: '15px 15px 10px 15px' }}>
                  <RSwitch />
                  <span style={{ padding: '0px 16px'}}>Coverage</span>
              </div>
          </div> */ } 
          
          { children }
        </main>
        { /* <Footer /> */ }

        <SideNav
          className={expanded ? 'nav-expanded' : 'nav-collapsed'}
          expanded={expanded}
          onToggle={( expanded ) => {
            setExpanded( expanded );
          }}
          /* onSelect={(selected) => {
            
          }} */
        >
          <SideNav.Toggle />

          {!open ? 
            <img src={getLogo('dark')} alt='mxclogo' style={{height: 24, marginTop: 14}} />
          : null}
          
          { expanded && <SideNav.Nav >
            <NavItem eventKey="title">
              <NavText style={localStyled.title}>
                Welcome to MXC Mapper
              </NavText>
            </NavItem>
            { /* <NavItem eventKey="home" style={localStyled.flexCenter} >
              <DropdownC />
            </NavItem> */ }
            
            <NavItem eventKey="charts">
              <NavText style={localStyled.total} >
                { total }
              </NavText>
            </NavItem>
            <NavItem eventKey="gate">
              <NavText style={localStyled.flexCenter} >
              M2 Pro Miners
              </NavText>
            </NavItem>
            <NavItem eventKey="charts">
              <NavText style={localStyled.LpwanTotal} >
                { lpwanTotal }
              </NavText>
            </NavItem>
            <NavItem eventKey="gate">
              <NavText style={localStyled.flexCenter} >
              LPWAN Gateway
              </NavText>
            </NavItem>

            { /* <NavItem eventKey="totAmount" style={{ padding: '0px 16px' }}>
              <NavText>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16 }}>
                  <span>Total Amount :</span>
                  <span>43453453 MXC</span>
                </div>
              </NavText>
            </NavItem>

            <NavItem eventKey="dailyRevenue" style={{ padding: '0px 16px' }}>
              <NavText>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16 }}>
                  <span>Daily Revenue (avg.):</span>
                  <span>453.34 MXC</span>
                </div>
              </NavText>
            </NavItem> 

            <NavItem eventKey="check" style={{ padding: '0px 16px', marginTop: 39 }}>
              <NavText>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: '1rem' }}>
                    <input type="checkbox" onChange={() => { }} ></input>
                    <span style={{ marginLeft: '0.5rem' }}>{"View All"}</span>
                  </label>
                  <label style={{ fontSize: '1rem' }}>
                    <input type="checkbox" onChange={() => { }}></input>
                    <span style={{ marginLeft: '0.5rem' }}>{`View online(${online})`}</span>
                  </label>
                  <label style={{ fontSize: '1rem' }}>
                    <input type="checkbox" onChange={() => { }}></input>
                    <span style={{ marginLeft: '0.5rem' }}>{`View offline(${offline})`}</span>
                  </label>
                </div>
              </NavText>
            </NavItem> */ }
            <NavItem eventKey="faq">
              <NavText style={localStyled.flexCenterFAQ} >
                <ModalFAQ buttonLabel={"FAQ"}/>
              </NavText>
            </NavItem>
            <NavItem eventKey="version">
              <NavText style={localStyled.flexCenterVersion} >
                version: 1.0.1          
              </NavText>
            </NavItem>
          </SideNav.Nav> }
        </SideNav>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageName: PropTypes.string,
};






export default Layout;
