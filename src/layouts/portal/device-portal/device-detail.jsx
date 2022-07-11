import React, {useState, useEffect} from 'react'
import ScreenHeader from '../../../components/headers/screen-header';
import {
  Card,
  CardHeader,
  CardTitle,
  CardText,
  Button,
  Badge,
  CardBody,
  Row,
  Col,
  Container
} from "reactstrap";
import {deviceDetailModel} from '../../../common/initial-state'
import {useParams} from "react-router-dom";

import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import axios from 'axios';
import {BaseApiUrlV1} from '../../../environment'
import {triggerLoading} from '../../../slices/loadingSlice';
import { useDispatch } from "react-redux";

const RemoteControlAction = {
    AccOn : "ACC_ON",
    AccOff: "ACC_OFF",
    BatteryReportOn: "BATTERY_REPORT_ON",
    BatteryReportOff: "BATTERY_REPORT_OFF",
    TemperatureReportOn: "TEMPERATURE_REPORT_ON",
    TemperatureReportOff: "TEMPERATURE_REPORT_OFF"
}


export default function DeviceDetail() {
  let { id } = useParams();
  const [DeviceDetail, setDeviceDetail] = useState(() => deviceDetailModel);

  const dispatch =  useDispatch();

  const RemoteControl = async (code, message, action) => {
    dispatch(triggerLoading(true));
    let apiUrl = `${BaseApiUrlV1}/remotecontrol`;

    await axios({
      method: 'POST',
      url: apiUrl,
      data: {
        deviceId: code,
        status: 0,
        message: message,
        action: action
      }
    }).then((res) => {
        dispatch(triggerLoading(false));
        alert('Execute the action successfully')
    }).catch((err) => {
      dispatch(triggerLoading(false));
      console.log(err.message);
    })
  }
  useEffect(() => {
    async function getDeviceDetail() {
      let apiUrl = `${BaseApiUrlV1}/device/detail?id=${id}`;
      dispatch(triggerLoading(true));
        
        await axios.get(apiUrl).then((res) => {
            let response = res.data;
            let data = response.resData;
            console.log(data);
            setDeviceDetail({
              id: data.id,
              code: data.code,
              name: data.name,
              imei: data.imei,
              firmwareVersion: data.firmwareVersion,
              businessVersion: data.businessVersion,
              managementVersion: data.managementVersion,
              areaCode: data.areaCode,
              areaName: data.areaName,
              categoryCode: data.categoryCode,
              categoryName: data.categoryName,
              region: data.region,
              description: data.description,
              photos: data.photos,
              powerBiEmbed: {
                embedToken: data.powerBiEmbed.emmbedToken,
                embedUrl: data.powerBiEmbed.emmbedUrl,
                id: data.powerBiEmbed.id,
                type: data.powerBiEmbed.type,
                errorMessage: data.powerBiEmbed.errorMessage
              }
            })
        }).catch((err) => {
           console.log(err);         
        });
        dispatch(triggerLoading(false));
    }
    getDeviceDetail();
  }, [])

  return (
    <>
      <ScreenHeader/>
      <Container fluid>
        <Row className="mt-3">
            <Col lg="5">
              <Row >
                <Col lg="5">
                  <label>
                      Device Code: &nbsp; {DeviceDetail.code}
                  </label>
                </Col>
                <Col lg="5">
                  <label>
                      Device Name: &nbsp; {DeviceDetail.name}
                  </label>
                </Col>
                <Col lg="5">
                  <label>
                      Imei: &nbsp; {DeviceDetail.imei}
                  </label>
                </Col>
              </Row>
              <Row >
                <Col lg="5">
                  <label>
                      Category Code: &nbsp; {DeviceDetail.categoryCode}
                  </label>
                </Col>
                <Col lg="5">
                  <label>
                      Category Name: &nbsp; {DeviceDetail.categoryName}
                  </label>
                </Col>
              </Row>
              <Row >
                <Col lg="5">
                  <label>
                      Firmware Version: &nbsp; {DeviceDetail.firmwareVersion}
                  </label>
                </Col>
                <Col lg="5">
                  <label>
                      Management Version:  &nbsp; {DeviceDetail.managementVersion}
                  </label>
                </Col>
                <Col lg="5">
                  <label>
                      Business Version:  &nbsp; {DeviceDetail.businessVersion}
                  </label>
                </Col>
              </Row>
            </Col>
            <Row className="mt-1">
              <Col lg="2">
                <Button color="dark" onClick={() => RemoteControl(DeviceDetail.code, 'Acc On', RemoteControlAction.AccOn)}>
                   Start Sending
                </Button>
              </Col>
              <Col lg="2">
                <Button color="dark" onClick={() => RemoteControl(DeviceDetail.code, 'Acc Off', RemoteControlAction.AccOff)}>
                   Stop Sending
                </Button>
              </Col>
            </Row>
            {/* <Col lg="5">
               TODO:
              <img src={DeviceDetail.photos[0]} alt="" />
              <img src={DeviceDetail.photos[1]} alt="" />
            </Col> */}
        </Row>
        <Row className="mt-2" style={{padding: '0px'}}>
            <Card className="shadow" style={{padding: '0px'}}>
              {
                DeviceDetail.id ? <PowerBIEmbed
                embedConfig = {{
                  type: DeviceDetail.powerBiEmbed.type,   // Supported types: report, dashboard, tile, visual and qna
                  id: DeviceDetail.powerBiEmbed.id,
                  embedUrl: DeviceDetail.powerBiEmbed.embedUrl,
                  accessToken: DeviceDetail.powerBiEmbed.embedToken,
                  tokenType: models.TokenType.Embed,
                  settings: {
                    panes: {
                      filters: {
                        expanded: false,
                        visible: false
                      }
                    },
                    background: models.BackgroundType.Transparent,
                  }
                }}
      
                cssClassName = { "dashboard-style-class" }
      
                eventHandlers = { 
                  new Map([
                    ['loaded', function () {console.log('Report loaded');}],
                    ['rendered', function () {console.log('Report rendered');}],
                    ['error', function (event) {console.log(event.detail);}]
                  ])
                }
                getEmbeddedComponent = { (embeddedReport) => {
                  window.report = embeddedReport;
                }}
              /> : ''
              }
            </Card>
        </Row>
      </Container>
    </>
  )
}
