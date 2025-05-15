import {Col, Row, Table} from "react-bootstrap";
import {useSelector} from "react-redux";
import {Device} from "../chorus/index.js";
import {Link} from "react-router";


function Devices() {
  const loaded = useSelector(state => state.devices.loaded);
  /** @var devices {Device[]} */
  const devices = useSelector(state => {
    return state.devices.devices;
  });

  return (
    <>
      {loaded && (
        <Row>
          <Col>
            <h2>Available Systems</h2>
            <Table striped bordered hover>
              <thead>
              <tr>
                <th scope="col">Serial Number</th>
                <th scope="col">Model</th>
                <th scope="col">Status</th>
              </tr>
              </thead>
              <tbody>
              {devices && devices.map((device) => (
                <tr key={device.id}>
                  <td><Link to={'/devices/'+device.id}>{device.serialNumber}</Link></td>
                  <td>{device.model}</td>
                  <td>{device.status.status}</td>
                </tr>
              ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </>
  )
}
export default Devices;