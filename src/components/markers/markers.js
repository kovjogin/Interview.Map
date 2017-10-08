import { emitter } from '../../utils/EventEmitter.js';
import { map, each, concat, find } from 'lodash-es';
import * as markersList from '../../data/markers.json';

export class markersComponent {

    constructor() {
        this.elem = document.createElement('div');
        this.elem.classList.add('list-group');
        document.getElementById('markers-wrapper').appendChild(this.elem);

        this.allMarkers = [];
        each(markersList, city => {  this.allMarkers = concat(this.allMarkers, city.markers) });
        this.render(this.allMarkers);

        emitter.subscribe('mapDefault', () => { this.render(this.allMarkers); })

        emitter.subscribe('changeCity', event => {
            const markerByCity = [];
            const city = find(markersList, {city: event.city});
            this.render(city.markers);
        })
    }

    render(data) {
        emitter.emit('resetMap');
        emitter.emit('setMarkers', data);

        const strings = map(data, item => {
            return `<span class="list-group-item flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between flex-column">
                    <h5 class="mb-1">${item.name}</h5>
                    <small>${item.coords.lat}, ${item.coords.lng}</small>
                </div>
            </span>`;
        });

        this.elem.innerHTML = strings.join('');
    }
}