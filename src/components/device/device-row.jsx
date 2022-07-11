import React from 'react'
import { useNavigate } from 'react-router-dom';
export default function DeviceRow({index, id, code, name, imei, businessVersion, firmwareVersion, managementVersion, status}) {
    let navigate = useNavigate();
    
    const GoToDetail = (id) => {
        navigate(`${id}`)
    }

  return (
    <tr onDoubleClick={() => GoToDetail(id)} style={{cursor: 'pointer'}}>
        <th scope="row">{index + 1}</th>
        <td>{code}</td>
        <td>{name}</td>
        <td>{imei}</td>
        <td>{businessVersion} </td>
        <td>{firmwareVersion}</td>
        <td>{managementVersion}</td>
        <td>{status == 1 ? 'InUse' : 'New'}</td>
    </tr>
  )
}
