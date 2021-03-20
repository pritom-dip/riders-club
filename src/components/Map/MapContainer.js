import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import './Map.css';

class MapContainer extends Component {

    render() {
        return (
            <Map className="custom-map-container" google={this.props.google} zoom={14} >

                <Marker className="marker" style={{ width: '100%', height: '100%' }} onClick={this.onMarkerClick}
                    name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>

                </InfoWindow>
            </Map >
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyDPEr0O59FNdRYLYJT7p0BuFeH0lv2CxnA')
})(MapContainer)