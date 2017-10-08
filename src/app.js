import './style.scss';
import  GoogleMapsLoader from 'google-maps';
import { mapComponent } from './components/map/map.js';
import { autocompleteComponent } from './components/autocomplete/autocomplete.js';
import { markersComponent } from './components/markers/markers.js';

GoogleMapsLoader.KEY = 'AIzaSyDgO6WEe8Na5ZwAemVtvZK8CKUt6KgPTcM';
GoogleMapsLoader.LANGUAGE = 'ru';
GoogleMapsLoader.REGION = 'RU';


new mapComponent(GoogleMapsLoader);
new markersComponent();
new autocompleteComponent();