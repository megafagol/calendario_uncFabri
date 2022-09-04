import axios from 'axios';



export const http = axios.create({
    baseURL: 'https://uncalendar.herokuapp.com',
    timeout: 3000
});
export const comHttp = axios.create({
    baseURL: 'https://uncalendar.herokuapp.com/get-comisiones/',
    timeout: 3000
});
// create(App).use(VueAxios, axios).mount('#app')