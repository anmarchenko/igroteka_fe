import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Helmet } from 'react-helmet';
import { Info, ExternalLink as FeatherExternalLink } from 'react-feather';
import { Switch, Route, useParams } from 'react-router-dom';

import Logo from './Logo';
import Flag from './Flag';
import ExternalLink from './ExternalLink';
import { COMPANY_FETCH_REQUESTED } from '../store/companyPage';
import { renderDate } from '../utils';

import CompanyTabs from './CompanyTabs';
import CompanyTabsDeveloped from './CompanyTabDeveloped';
import CompanyTabPublished from './CompanyTabPublished';

import './CompanyPage.css';
import { Loading } from './Loading';

export const CompanyPage = () => {
  const { companyId } = useParams();

  const { companyFetching, company } = useSelector(
    (state) => state.companyPage
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: COMPANY_FETCH_REQUESTED, companyId });
  }, [dispatch, companyId]);

  const ready = !companyFetching && !!company.name;

  return (
    <div>
      <Helmet>
        <title>{`${company.name} | Igroteka`}</title>
      </Helmet>
      {ready && company.id && (
        <div className="container CompanyPage">
          <div className="CompanyPage-header">
            <div className="CompanyPage-info">
              <div className="CompanyPage-name">{company.name}</div>
              <div className="CompanyPage-add-info">
                {company.start_date && renderDate(company.start_date)}
                {company.start_date && company.country && <>&nbsp;·&nbsp;</>}
                {company.country && (
                  <Flag
                    key={company.country}
                    country={company.country}
                    size={16}
                  />
                )}
              </div>
              <div className="CompanyPage-links">
                <ExternalLink url={company.website} label="Official">
                  <FeatherExternalLink />
                </ExternalLink>
                &nbsp;·&nbsp;
                <ExternalLink url={company.external_url} label="IGDB">
                  <Info />
                </ExternalLink>
              </div>
              <div className="CompanyPage-description">
                {company.description}
              </div>
            </div>
            <div className="CompanyPage-logo d-none d-md-block">
              {company.logo && <Logo url={company.logo.medium_url} />}
            </div>
          </div>
          <CompanyTabs companyId={company.id} />
          <Switch>
            <Route path={`/companies/${companyId}/developed`}>
              <CompanyTabsDeveloped company={company} />
            </Route>
            <Route path={`/companies/${companyId}/published`}>
              <CompanyTabPublished company={company} />
            </Route>
          </Switch>
        </div>
      )}
      <Loading visible={!ready} />
    </div>
  );
};

export default CompanyPage;
