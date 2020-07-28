import React from 'react';
import { Map } from 'react-arcgis';
//import { Scene } from '@esri/react-arcgis';
import { Row } from 'reactstrap';
import Services from './Services';


export default class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewProperties: {
                center: [67.050987, 24.894766],
                scale: 288895,
                /*  popup: {
                     dockEnabled: true,
                     dockOptions: {
                        
                         buttonEnabled: false,
                     
                         breakpoint: false,
                         position: "bottom-left"
                     }
                 }, */
                ui: {
                    components: ["zoom", "compass", "attribution"]
                }

            },
            height: '90vh',
            relheight: '0vh'
        }
        this.updateText1 = this.updateText1
    
    }
    updateText1 = (height, relheight) => {
        this.setState({ height, relheight })
    }
    render() {
        return (
            <div className="page-wrapper">
                <div className="container-fluid">
                    <Row>

                        <Map
                            className="scene__container"
                            style={{ width: '100vw', height: this.state.height}}
                            mapProperties={{ basemap: 'satellite' }}
                            viewProperties={this.state.viewProperties}
                        >
                            <Services height={this.updateText1}  />
                        </Map>
                        <div className='rel' style={{ height: this.state.relheight }}></div>
                    </Row>

                </div>

            </div>
        )
    }
}