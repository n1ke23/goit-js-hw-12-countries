import css from "./css/style.css";
import { alert, error, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import "../node_modules/@pnotify/core/dist/BrightTheme.css";
import "../node_modules/@pnotify/core/dist/PNotify.css";
import debounce from "lodash.debounce";
import template from './template/template.hbs';
defaultModules.set(PNotifyMobile, {});
const url = `https://restcountries.eu/rest/v2/name/`;
const input = document.getElementById('get-country');
const div = document.getElementById('country-box');
let name, norice;
input.addEventListener('input', debounce(() => {   
    name = input.value;
    div.innerHTML = '';
    fetch(`${url}${name}`)
    .then(response => {
      if(response.status == 200 ){
          return  response.json();
      }else if(!name){
        div.innerHTML = '';
      }else{
        norice = alert({title:'NOT Found', hide: true, delay: 1000})
    }
    if(response.status == 404 ){
        error({text: 'error: 404'})
    }
    })
    .then(data => {
        if(data.length > 10|| !data.length) {
            return error({text: 'Введите точный запрос'})
        }
        // if(!data.length ){
        //     error({text: 'Пустой запрос'})
        // }
        // console.log(data.length);
        const country = template(data)
        div.insertAdjacentHTML('afterbegin', country);
    })
    .catch(err => {
        // div.innerHTML = '<h1>LOL: 404</h1>';
        if(!err.length ){
            error({text: 'Пустой запрос'})
        }
        console.log("err");
    })
    
}, 1500))