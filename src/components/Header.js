import React from 'react';
import { Link } from 'gatsby';
import { Trans } from 'gatsby-plugin-react-i18next';
import { FaGithub } from 'react-icons/fa';

import { useSiteMetadata } from 'hooks';

import Container from 'components/Container';

const Header = () => {
  const { companyName, companyUrl } = useSiteMetadata();

  return (
    <header>
      <Container type="content">
        <p>
          <Link to="/">{ companyName }</Link>
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
        </ul>
      </Container>
    </header>
  );
};

export default Header;
