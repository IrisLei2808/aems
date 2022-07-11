import React, {useState, useEffect} from 'react'
import { Container } from "reactstrap";

import ScreenHeader from '../../../components/headers/screen-header';
import {powerBiEmbedTokenModel} from '../../../common/initial-state'
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import axios from 'axios';
import {BaseApiUrlV1} from '../../../environment'
import {triggerLoading} from '../../../slices/loadingSlice';
import { useDispatch } from "react-redux";

export default function DeviceDashboardPortal() {
  const dispatch = useDispatch();
  const [EmbedToken, setEmbedToken] = useState(powerBiEmbedTokenModel)

  useEffect(() => {
    async function getEmbedToken() {
        let apiUrl = `${BaseApiUrlV1}/powerbi/device`;
        
        dispatch(triggerLoading(true));
        await axios.get(apiUrl).then((res) => {
            console.log(res.data);
            let response = res.data;
            let data = response.resData;
            setEmbedToken({
              ...EmbedToken,
              id : data.id,
              embedToken: data.emmbedToken,
              embedUrl: data.emmbedUrl,
              errorMessage: data.errorMessage,
              type: data.type
            });
        }).catch((err) => {
           console.log(err);
           setEmbedToken({
            ...EmbedToken,
            errorMessage: err.message,
          });
        });
        dispatch(triggerLoading(false));
    }
    getEmbedToken();
  }, [])
  return (
    <>
      <ScreenHeader/>
      <Container fluid>
        {
          EmbedToken.id ? <PowerBIEmbed
          embedConfig = {{
            type: EmbedToken.type,   // Supported types: report, dashboard, tile, visual and qna
            id: EmbedToken.id,
            embedUrl: EmbedToken.embedUrl,
            accessToken: EmbedToken.embedToken,
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

          cssClassName = { "report-style-class" }

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
      </Container>
    </>
  )
}
