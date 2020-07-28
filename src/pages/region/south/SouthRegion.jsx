import React from 'react';
import { Map } from 'react-arcgis';
//import { Scene } from '@esri/react-arcgis';
import { Row } from 'reactstrap';
import './south.css';
import SouthWidget from './SouthWidget';
/* import Query from './Query';
import SpatialQuery from './SpatialQuery'; */
import SouthLayers from './southlayer/SouthLayers';


 class SouthRegion extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            viewProperties: {
                center: [67.050987, 24.894766],
                scale: 288895,
                 popup: {
                    dockEnabled: false,
                    dockOptions: {
                       
                        buttonEnabled: true,
                    
                        breakpoint: false,
                        position: "bottom-left"
                    }
                }, 
                 ui: {
                     components: ["zoom", "compass", "attribution"]
                 }

            },
            height: '91vh',
            relheight:'0vh'
        }
        this.updateText1 = this.updateText1
    }
    updateText1 = (height, relheight) => {
        this.setState({height, relheight })
    }
    
    render(){
        return (
            <div className="page-wrapper">
                <div className="container-fluid" style={{maxHeight:'91vh'}}>
                    <Row>

                    <Map
                        className="scene__container"
                        style={{ width: '100vw', height: this.state.height, marginTop: -10 }}
                        mapProperties={{ basemap: 'satellite' }}
                        viewProperties={this.state.viewProperties}
                        >
                        <SouthLayers height={this.updateText1} />                   
                        <SouthWidget height={this.updateText1} />
                        {/*  <SpatialQuery height={this.updateText1} />
                        <Query height={this.updateText1} />  */}
                             
                    </Map>
        
                     {/*    <button style={{ height: '25px' }} onClick={() => this.setState({ height: '90vh', relheight: '0vh' })}>-</button> */}
                        <div className='rel' style={{height:this.state.relheight}}></div>
                    </Row>       
                
                </div>
               
            </div> 
        )  
    }
}

export { SouthRegion}