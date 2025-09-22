import React from 'react';
import {Col, Image, Row} from "react-bootstrap";
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
  //const installation = _findInstallation(installationId);
  //const application = applications.find((item) => item.id === installation.appId);
  //oconst version = application.versions.find((item) => item.id === installation.versionId);

    /**
     * For now fake it
     */

  return (
      <>
      <Row>
          <Col>
              <p>Congratulations {searchParams.get('name')}!</p>
              <p>You are now enrolled into the Vandelay Energy program.</p>
              <p>To activate the program, go to the Vandelay Energy app in the dcbel mobile portal
                  and grant access to your Home Energy Station.</p>
          </Col>
      </Row>
      <Row>
          <Col className="text-center">
              <Image fluid width='50%' height='50%' src='/dist/grant.jpg' alt='Grant' />
          </Col>
      </Row>
          </>
  );

};
