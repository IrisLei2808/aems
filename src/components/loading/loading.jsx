import ReactLoading from "react-loading";
import React from 'react';
import { useSelector } from "react-redux";


const loadingStyle = {
    position: 'fixed', 
    left: '0', 
    right: '0', 
    top: '0', 
    bottom: '0', 
    zIndex: '99', 
    background: 'rgba(0, 0, 0, 0.4)', 
    justifyContent: 'center', 
    display: 'grid', 
    alignItems: 'center'
}

export default function Loading() {
  const isLoading = useSelector((state) => state.loading)
  let xhtml = null;
  if (isLoading) {
    xhtml = (
          <div style={loadingStyle} >
            <ReactLoading type='spin' color="#060606" />
          </div>
    )
  }
  return xhtml
}
