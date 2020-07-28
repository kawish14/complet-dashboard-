import React, { Component } from 'react';
import { Scene } from 'react-arcgis';
import { Row } from 'reactstrap';
import './north.css'
import NorthLayers from './CentralLayers';

class CentralRegion extends Component {
    render() {
        return (
            <div className="page-wrapper">
                <div className="container-fluid">
                    <Row className="map">
                        <Scene
                            className="scene__container"
                            style={{ width: '100vw', height: '90vh' }}
                            mapProperties={{ basemap: 'satellite' }}
                            viewProperties={{
                                center: [74.368137, 31.495788],
                                scale: 220000,
                                popup: {
                                    dockEnabled: true,
                                    dockOptions: {
                                        // Disables the dock button from the popup
                                        buttonEnabled: true,
                                        // Ignore the default sizes that trigger responsive docking
                                        breakpoint: false,
                                        position: "bottom-left"
                                    }
                                }

                            }}
                        >
                        <NorthLayers />
                        </Scene>
                    </Row>
                </div>

            </div> 
        );
    }
}

export default CentralRegion;
