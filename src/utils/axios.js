import axios from 'axios';



export const http = axios.create({
    baseURL: 'https://uncalendar.herokuapp.com/',
    timeout: 3000
});

export const httpCarreras = axios.create({
    baseURL: 'https://uncalendar.herokuapp.com/get-carreras/',
    timeout: 3000
});
console.log(httpCarreras)
// create(App).use(VueAxios, axios).mount('#app')