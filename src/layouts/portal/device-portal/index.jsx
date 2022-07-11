import React, {useEffect} from 'react'
import ScreenHeader from '../../../components/headers/screen-header';
import {
  Card,
  CardHeader,
  Table,
  Row,
  Col,
  Container
} from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import {deviceFetch} from '../../../slices/deviceSlice';
import {triggerLoading} from '../../../slices/loadingSlice';

import DeviceRow from '../../../components/device/device-row'

const renderRow = (data) => {
  let result = null;
    if(!Array.isArray(data)) {
        return result;
    }
    if (data.length > 0) {
      result = data.map((val, index) => {
          return (
            <DeviceRow key={index} index={index} id={val.id} code={val.code} name={val.name} firmwareVersion={val.firmwareVersion} 
                      imei={val.imei} businessVersion={val.businessVersion} managementVersion={val.managementVersion} status={val.status}/>
          )
      });
  }
  return result;
}

export default function DevicePortal() {

  const deviceState = useSelector((state) => state.device);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(deviceFetch());
  }, [])

  return (
    <>
      <ScreenHeader/>
      <Container fluid>
        <Row className="mt-5">
          <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-0">
                      <Row className="align-items-center">
                          <Col lg="9">
                              <h4 className="mb-0">Device List</h4>
                          </Col>
                      </Row>
                  </CardHeader>
                  <Table className="align-items-center table-hover" responsive hover>
                  <thead>
                        <tr>
                          <th>#</th>
                          <th>Code </th>
                          <th>Name</th>
                          <th>Imei </th>
                          <th>BusinessVersion  </th>
                          <th>FirmwareVersion  </th>
                          <th>ManagementVersion  </th>
                          <th>Status   </th>
                        </tr>
                      </thead>
                      <tbody>
                        {renderRow(deviceState.items)}
                      </tbody>
                  </Table>
                </Card>
            </div>
        </Row>
      </Container>
    </>
  )
}




