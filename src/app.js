import './style.scss';
import  GoogleMapsLoader from 'google-maps';
import { mapComponent } from './components/map/map.js';
import { autocompleteComponent } from './components/autocomplete/autocomplete.js';
import { markersComponent } from './components/markers/markers.js';
import { emitter } from './utils/EventEmitter.js';


GoogleMapsLoader.KEY = 'AIzaSyDgO6WEe8Na5ZwAemVtvZK8CKUt6KgPTcM';
GoogleMapsLoader.LANGUAGE = 'ru';
GoogleMapsLoader.REGION = 'RU';


new mapComponent(GoogleMapsLoader);
new markersComponent();
new autocompleteComponent();



// map.addEventListener('click', () => {
//     emitter.emit('event:name-changed', {name: 'test'});
// });
//
// emitter.subscribe('event:name-changed', data => {
//     console.log(`Your name is: ${data.name}`);
// });



//AIzaSyDgO6WEe8Na5ZwAemVtvZK8CKUt6KgPTcM