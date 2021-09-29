import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import ReactPlaceholder from 'react-placeholder';
import {
  TextBlock,
  TextRow,
  RectShape,
} from 'react-placeholder/lib/placeholders';
import { Helmet } from 'react-helmet';
import { Info, ExternalLink as FeatherExternalLink } from 'react-feather';
import { Switch, Route } from 'react-router-dom';

import Logo from './Logo';
import Flag from './Flag';
import ExternalLink from './ExternalLink';
import { COMPANY_FETCH_REQUESTED } from '../store/companyPage';
import { renderDate } from '../utils';

import CompanyTabs from './CompanyTabs';
import CompanyTabsDeveloped from './CompanyTabDeveloped';
import CompanyTabPublished from './CompanyTabPublished';

import './CompanyPage.css';

const placeholder = (
  <div className="container CompanyPage">
    <div className="row">
      <div className="col-12 col-md-8">
        <TextRow color="#ddd" style={{ height: 35 }} />
        <TextBlock color="#ddd" rows={10} />
      </div>
      <div className="col-12 col-md-2 d-none d-sm-block">
        <RectShape
          showLoadingAnimation
          color="#ddd"
          style={{ width: 160, height: 200 }}
        />
      </div>
    </div>
  </div>
);

export const CompanyPage = (props) => {
  const companyId = props.match.params.companyId;

  const { companyFetching, company } = useSelector(
    (state) => state.companyPage
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: COMPANY_FETCH_REQUESTED, companyId });
  }, [dispatch, companyId]);

  const ready = !companyFetching && !!company.name;

  return (
    <ReactPlaceholder
      showLoadingAnimation
      ready={ready}
      customPlaceholder={placeholder}
    >
      <Helmet>
        <title>{`${company.name} | Igroteka`}</title>
      </Helmet>
      {company.id && (
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
            <Route
              path={`/companies/${companyId}/developed`}
              render={(props) => (
                <CompanyTabsDeveloped {...props} company={company} />
              )}
            />
            <Route
              path={`/companies/${companyId}/published`}
              render={(props) => (
                <CompanyTabPublished {...props} company={company} />
              )}
            />
          </Switch>
        </div>
      )}
    </ReactPlaceholder>
  );
};

CompanyPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      companyId: PropTypes.string,
    }),
  }).isRequired,
};

export default CompanyPage;
