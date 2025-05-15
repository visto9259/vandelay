import React from 'react';
import {Spinner as BsSpinner, Stack} from "react-bootstrap";

/*
interface Props {
  text?: string;
}
*/

export const Spinner = ({show = false, text = 'Loading'}) => {
  const display = (show) ? 'block' : 'none';
  return (
    <div className="vandelay-spinner" style={{display: display}}>
      <div className="vandelay-spinner-mask"></div>
      <div className="vandelay-spinner-body">
        <Stack direction="horizontal" gap={2}>
          <BsSpinner animation="border"/><strong> {text}</strong>
        </Stack>
      </div>
    </div>
  );

};

/*
.enofily-spinner {
	display: none;
}

.enofily-spinner-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
	z-index: 998;
}

.enofily-spinner-body {
  position: fixed;
  top: 45vh;
  left: 45vw;
  width: 64px;
  height: 64px;
	z-index: 999;
}
export const Spinner = (props) => {
    const {show} = props;
    const display = (show) ? 'block' : 'none';
    return (
        <div className={'enofily-spinner'} style={{display: display}}>
            <div className={'enofily-spinner-mask'}></div>
            <div className={'enofily-spinner-body'}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}


 */