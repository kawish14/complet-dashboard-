import React from 'react';
import { Map } from 'react-arcgis';
import { Row } from 'reactstrap';
import './gponsouth.css'
import GponSouthEdit from './GponSouthEdit';

export default class GponSouth extends React.Component {
    render() {
        return (
            <div className="page-wrapper">
                <div className="container-fluid">
                    <Row className="map">
                        <Map
                            className="scene__container"
                            style={{ width: '100vw', height: '90vh' }}
                            mapProperties={{ basemap: 'satellite' }}
                            viewProperties={{
                                center: [67.110382, 24.8776361],
                                scale: 220000,
                                popup: {
                                    dockEnabled: true,
                                    dockOptions: {
                                        // Disables the dock button from the popup
                                        buttonEnabled: false,
                                        // Ignore the default sizes that trigger responsive docking
                                        breakpoint: false,
                                        position: "bottom-left"
                                    }
                                },
                              

                            }}
                        >
                        <GponSouthEdit />
                        </Map>
                    </Row>
                </div>

            </div>
        )
    }
}