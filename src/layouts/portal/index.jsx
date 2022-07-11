import React from 'react'
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import ScreenHeader from '../../components/headers/screen-header';
import {
  Container
} from "reactstrap";
import Loading from '../../components/loading/loading'
export default function Portal() {
  return (
    <>
      <ScreenHeader/>
      <Container fluid>
      </Container>
    </>
  )
}
