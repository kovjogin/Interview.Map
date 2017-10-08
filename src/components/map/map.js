import { emitter } from '../../utils/EventEmitter.js';
import { each } from 'lodash-es';

export class mapComponent {

    constructor(gmaps) {
        this.points = [];
        this.markers = [];

        gmaps.load(google => {
            this.map = new google.maps.Map(document.getElementById('map'), {zoom: 13, center: {lat: 47.222527, lng: 39.711181} } );
            this.renderMarkers();
        });

        emitter.subscribe('setMarkers', data => {
            this.points = data;
            gmaps.load(google => {
                this.renderMarkers();
            })

        });

        emitter.subscribe('resetMap', () => { this.clearMarkers() })

        this.elem = document.createElement('div');
        this.elem.setAttribute('id', 'map');
        document.getElementById('map-wrapper').appendChild(this.elem);

    };

    clearMarkers() {
        each(this.markers, item => { item.setMap(null); })
    }

    renderMarkers() {
        let bounds = new google.maps.LatLngBounds();
        each(this.points, item => {
            const marker = new google.maps.Marker({
                position: {lat: item.coords.lat, lng: item.coords.lng},
                map: this.map,
                title: item.name
            });
            bounds.extend(marker.getPosition());
            this.markers.push(marker);
        })

        this.map.fitBounds(bounds);
    }
}