import React from 'react';
import { Link } from 'gatsby';
import { Trans, useTranslation, useI18next } from 'gatsby-plugin-react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import { FaGithub } from 'react-icons/fa';

import { useSiteMetadata } from 'hooks';

import Container from 'components/Container';

const Header = () => {
  const { companyName, companyUrl } = useSiteMetadata();
  const { languages, changeLanguage } = useI18next();
  return (
    <header>
      <Container type="content">
        <p>
          <Link to="/">{companyName}</Link>
        </p>
        <ul>
          <li>
            <Link to="/about/"><Trans>About</Trans></Link>
          </li>
          <li>
            <a href={companyUrl}>
              <span className="visually-hidden"><Trans>Github</Trans></span>
              <FaGithub />
            </a>
          </li>
          <Dropdown style={{ padding: '0px 10px' }}>
            <Dropdown.Toggle style={{backgroundColor: 'rebeccapurple'}}/* variant="success" */ id="dropdown-basic">
              Languages
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {languages.map((lng) => (
                <Dropdown.Item href="#" onClick={(e) => {
                  e.preventDefault();
                  changeLanguage(lng);
                }} >{lng}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </ul>
      </Container>
    </header>
  );
};

export default Header;
