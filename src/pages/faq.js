import React from "react";
import { Helmet } from "react-helmet";
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
import FAQ from "../components/Faq";

import Layout from "../components/Layout";
import Container from "../components/Container";

const FaqPage = () => {
  const { t } = useTranslation();
  return (
    <Layout pageName="faq">
      <Helmet>
        <title>{t("MXC Mapper FAQ")}</title>
      </Helmet>
      <Container type="content">
        <FAQ />
      </Container>
    </Layout>
  );
};

export default FaqPage;
