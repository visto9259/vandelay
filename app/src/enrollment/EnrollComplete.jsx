import React from 'react';
import {Col, Row} from "react-bootstrap";
import {useParams, useSearchParams} from "react-router";
import {useSelector} from "react-redux";

export const EnrollComplete = () => {
  const {installationId} = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const applications = useSelector(state => state.applications.applications);
  const _findInstallation = (installationId) => {
    let foundItem = null;
    applications.forEach((application) => {
      foundItem = application.installations.find((item) => item.id === installationId);
    })
    return foundItem === undefined ? null : foundItem;
  }
  const installation = _findInstallation(installationId);
  const application = applications.find((item) => item.id === installation.appId);
  const version = application.versions.find((item) => item.id === installation.versionId);

  return (
    <Row>
      <Col>
        <p>Congratulations {searchParams.get('name')}!</p>
        <p>You are now enrolled into the {version.appName} program.</p>
      </Col>
    </Row>
  );

};