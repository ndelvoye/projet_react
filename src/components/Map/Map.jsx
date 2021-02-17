import React from 'react';
import './Map.css';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import * as PropTypes from "prop-types";
import * as DateUtils from '../../utils/DateUtils';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

class Map extends React.Component {
    static propTypes = {
        isDataLoaded: PropTypes.bool.isRequired,
        waypoints: PropTypes.arrayOf(String).isRequired,
        currentTime: PropTypes.number.isRequired,
        onClick: PropTypes.func.isRequired
    };

    /**
     * Sends desiredTimestamp to App component
     * @param desiredTimestamp
     */
    handleClick(desiredTimestamp) {
        this.props.onClick(desiredTimestamp);
    }

    render() {
        if (this.props.isDataLoaded) {
            const lats = [].concat(...this.props.waypoints).map(({lat}) => parseFloat(lat));
            const lngs = [].concat(...this.props.waypoints).map(({lng}) => parseFloat(lng));
            const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length

            return (
                <div className="Map" data-testid="Map">
                    <MapContainer
                        center={[arrAvg(lats), arrAvg(lngs)]}
                        zoom={3} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {this.props.waypoints.map((waypoint, index) => (
                            <Marker key={waypoint + index}
                                    position={[parseFloat(waypoint.lat), parseFloat(waypoint.lng)]}>
                                <Popup>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a onClick={() => this.handleClick(waypoint.timestamp)}>
                                        <div id='goToHref'>
                                            {DateUtils.timestampToHoursMinutesSeconds(waypoint.timestamp)}
                                        </div>
                                        {waypoint.label}
                                    </a>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            )
        } else {
            return <p>Loading...</p>;
        }
    }
}

export default Map;
