import React from 'react';
import './Map.css';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';

class Map extends React.Component {
    position = [51.505, -0.09]

    render() {
        return (
            <div className="Map" data-testid="Map">
                <MapContainer center={this.position} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={this.position}>
                        <Popup>
                            A pretty CSS3 popup. <br/> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        )
    }
}

export default Map;
