import {emitter} from '../../utils/EventEmitter.js';
import {debounce, each, filter, map} from 'lodash-es';
import * as cityList from '../../data/cities.json';

export class autocompleteComponent {

    constructor() {
        this.elem = document.createElement('input');
        this.elem.setAttribute('placeholder', 'Город');
        this.elem.classList.add('form-control');

        this.drop = document.createElement('div');
        this.drop.classList.add('dropdown-menu');


        this.elem.addEventListener('input', debounce((event) => {
            this.autocomplete(event.srcElement.value);
        }, 300));

        this.wrapper = document.getElementById('autocomplete-wrapper');
        this.wrapper.classList.add('dropdown');
        this.wrapper.appendChild(this.elem);
        this.wrapper.appendChild(this.drop);
    }

    autocomplete(str) {
        let data = [];

        if (str.length) {
            data = filter(cityList, city => {
                const name = city.name.toLowerCase();
                const serach = str.toLowerCase();
                const reg = name.match(new RegExp(serach));
                return (name.match(reg));
            });
        } else {
            emitter.emit('mapDefault');
        }

        this.drop.innerHTML = '';

        if (data.length) {
            if (!this.wrapper.classList.contains('show')) { this.wrapper.classList.add('show'); }
            ;
            each(this.getList(data), item => {
                this.drop.appendChild(item);
            });
        } else {
            if (this.wrapper.classList.contains('show')) { this.wrapper.classList.remove('show'); }
            ;
        }

    }

    getList(data) {
        return map(data, item => {
            let listElem = document.createElement('span');
            listElem.classList.add('dropdown-item');
            listElem.innerHTML = item.name;
            listElem.addEventListener('click', (event) => {
                this.change(event);
            });

            return listElem;
        });
    }

    change(event) {
        const value = event.srcElement.innerText;
        this.elem.value = value;
        this.wrapper.classList.remove('show');
        emitter.emit('changeCity', {city: value});
    }
}