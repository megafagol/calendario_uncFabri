import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Basic YWRtaW46NzUzOTUx`;

export const http = axios.create({
    baseURL: 'http://50.16.25.112:8080/',
    timeout: 3000
});

// create(App).use(VueAxios, axios).mount('#app')