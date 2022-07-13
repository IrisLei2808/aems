import React, { useState, useEffect } from 'react'
import ScreenHeader from '../../../components/headers/screen-header';

import { deviceDetailModel } from '../../../common/initial-state'
import { useParams } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import axios from 'axios';
import { BaseApiUrlV1 } from '../../../environment'
import { triggerLoading } from '../../../slices/loadingSlice';
import { useDispatch } from "react-redux";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DownloadIcon from '@mui/icons-material/Download';

const RemoteControlAction = {
  AccOn: "ACC_ON",
  AccOff: "ACC_OFF",
  BatteryReportOn: "BATTERY_REPORT_ON",
  BatteryReportOff: "BATTERY_REPORT_OFF",
  TemperatureReportOn: "TEMPERATURE_REPORT_ON",
  TemperatureReportOff: "TEMPERATURE_REPORT_OFF"
}


export default function DeviceDetail() {
  let { id } = useParams();
  const [DeviceDetail, setDeviceDetail] = useState(() => deviceDetailModel);
  const [download, setDownload] = useState(false);

  const dispatch = useDispatch();

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

  useEffect(() => {
    async function downloadApi() {
      try {
        // It doesn't matter whether this api responds with the Content-Disposition header or not
        const response = await axios.get(
          `${BaseApiUrlV1}/device/export-log?DeviceCode=${DeviceDetail.code}`,
          {
            responseType: "blob", // this is important!
           // headers: { Authorization: localStorage.getItem("token") },
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data])); // you can mention a type if you wish
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "dummy.xlsx"); //this is the name with which the file will be downloaded
        link.click();
        // no need to append link as child to body.
        setTimeout(() => window.URL.revokeObjectURL(url), 0); // this is important too, otherwise we will be unnecessarily spiking memory!
        setDownload(false);
      } catch (e) {} //error handling }
    }

    if (download) {
      downloadApi();
    }
  }, [download]);

  return (
    <>
      <ScreenHeader />

      <Box display="flex" justifyContent="space-between" sx={{mt: 1}}>
        <div>
          <Button variant="contained" onClick={() => RemoteControl(DeviceDetail.code, 'Acc On', RemoteControlAction.AccOn)}>Start Sending</Button>
          <Button variant="contained" sx={{ml: 2}} onClick={() => RemoteControl(DeviceDetail.code, 'Acc Off', RemoteControlAction.AccOff)}>Stop Sending</Button>
        </div>
        <div>
        <Button variant="outlined" startIcon={<DownloadIcon />} onClick={() => setDownload(true)}>
        Download Excel
      </Button>
        </div>

      </Box>

      <List>
        <ListItem disablePadding>
          <ListItemText>Device Code: &nbsp; {DeviceDetail.code}</ListItemText>
        </ListItem>
        <ListItem disablePadding>
          <ListItemText>Device Name: &nbsp; {DeviceDetail.name}</ListItemText>
        </ListItem>
        <ListItem disablePadding>
          <ListItemText>Imei: &nbsp; {DeviceDetail.imei}</ListItemText>
        </ListItem>
        <ListItem disablePadding>
          <ListItemText>Category Code: &nbsp; {DeviceDetail.categoryCode}</ListItemText>
        </ListItem>
        <ListItem disablePadding>
          <ListItemText>Category Name: &nbsp; {DeviceDetail.categoryName}</ListItemText>
        </ListItem>
        <ListItem disablePadding>
          <ListItemText>Firmware Version: &nbsp; {DeviceDetail.firmwareVersion}</ListItemText>
        </ListItem>
        <ListItem disablePadding>
          <ListItemText>Management Version:  &nbsp; {DeviceDetail.managementVersion}</ListItemText>
        </ListItem>
        <ListItem disablePadding>
          <ListItemText>Management Version:  &nbsp; {DeviceDetail.businessVersion}</ListItemText>
        </ListItem>
      </List>

      <ImageList sx={{ width: '100%', height: '100%' }} cols={3}>
        {DeviceDetail.photos.map((item) => (
          <ImageListItem key={item.id}>
            <img
              src={item}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Grid container>
        {
          DeviceDetail.id ? <PowerBIEmbed
            embedConfig={{
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

            cssClassName={"dashboard-style-class"}

            eventHandlers={
              new Map([
                ['loaded', function () { console.log('Report loaded'); }],
                ['rendered', function () { console.log('Report rendered'); }],
                ['error', function (event) { console.log(event.detail); }]
              ])
            }
            getEmbeddedComponent={(embeddedReport) => {
              window.report = embeddedReport;
            }}
          /> : ''
        }
      </Grid>

    </>
  )
}
