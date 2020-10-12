import React from 'react';
import { Helmet } from 'react-helmet';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { useSiteMetadata } from 'hooks';

import Layout from 'components/Layout';
import Container from 'components/Container';

const SecondPage = () => {
  const { companyName, companyUrl, authorName, authorUrl, siteDescription } = useSiteMetadata();
  const {t} = useTranslation();
  return (
    <Layout pageName="about">
      <Helmet>
        <title>{ t( 'About' ) }</title>
      </Helmet>
      <Container type="content">
        <h1><Trans>About</Trans></h1>

        <h2>{ companyName }<Trans></Trans></h2>
        <p><Trans>{ siteDescription }</Trans></p>
        <p>
          <a href={companyUrl}><Trans>View on Github</Trans></a>
        </p>

        <h2><Trans>Created By</Trans></h2>
        <p>
          <a href={authorUrl}>{ authorName }</a>
        </p>
      </Container>
    </Layout>
  );
};

export default SecondPage;
