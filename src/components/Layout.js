import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import 'assets/stylesheets/application.scss';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import SideNav, { NavItem, NavText } from '@trendmicro/react-sidenav';
import DropdownC from "./DropdownC";
//import Header from 'components/Header';
//import Footer from 'components/Footer';

const localStyled = {
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
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
  title: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'left',
    fontSize: 20,
    font: 'normal normal medium 60px/71px Roboto',
    letterSpacing: 0,
    color: 'white',
    marginTop: 10,
    opacity: 1,
  }
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const Layout = ({ children, pageName }) => {
  let className = '';

  if (pageName) {
    className = `${className} page-${pageName}`;
  }

  const [expanded, setExpanded] = useState(false);
  const online = 9567;
  const offline = 57;
  return (
    <>
      <Helmet bodyAttributes={{ class: className }}>
        <title>Gatsby Site</title>
      </Helmet>
      <div className="wrapper">


        <main>{children}</main>
        {/* <Footer /> */}

        <SideNav
          expanded={expanded}
          onToggle={(expanded) => {
            setExpanded(expanded);
          }}
          onSelect={(selected) => {
            // Add your code here
          }}
        >
          <SideNav.Toggle />
          {expanded && <SideNav.Nav >
            <NavItem eventKey="title">
              <NavText style={localStyled.title}>
                Welcome to MXC Mapper
              </NavText>
            </NavItem>
            <NavItem eventKey="home" style={localStyled.flexCenter} >
              {/* <Select options={options} style={{height: 40}}/> */}
              <DropdownC />
            </NavItem>
            <NavItem eventKey="charts">
              <NavText style={localStyled.total} >
                9450
              </NavText>
            </NavItem>
            <NavItem eventKey="gate">
              <NavText style={localStyled.flexCenter} >
                Gateways
                  </NavText>
            </NavItem>

            <NavItem eventKey="totAmount" style={{ padding: '0px 16px' }}>
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
                    <input type="checkbox" onChange={() => {}} ></input>
                    <span style={{ marginLeft: '0.5rem' }}>{"View All"}</span>
                  </label>
                  <label style={{ fontSize: '1rem' }}>
                    <input type="checkbox" onChange={() => {}}></input>
                    <span style={{ marginLeft: '0.5rem' }}>{`View online(${online})`}</span>
                  </label>
                  <label style={{ fontSize: '1rem' }}>
                    <input type="checkbox" onChange={() => {}}></input>
                    <span style={{ marginLeft: '0.5rem' }}>{`View offline(${offline})`}</span>
                  </label>
                </div>
              </NavText>
            </NavItem>
          </SideNav.Nav>}
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
