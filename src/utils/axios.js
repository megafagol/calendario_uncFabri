import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Basic YWRtaW46NzUzOTUx`;

export const http = axios.create({
    baseURL: 'https://backffabri-ksdb-dev.fl0.io/',
    timeout: 2000000
});

// create(App).use(VueAxios, axios).mount('#app')