import React, {useState} from 'react';
import {useSelector} from "react-redux";

export const Schedule = ({device}) => {

  const application = device.application;
  const applications = useSelector(state => state.applications.applications)

  return (
    <>
    </>
  );

};