import axios from 'axios';
import {URL} from '../constants'

class AdService {
    static async getAds() {
        
        try {
            const res = await axios({
                method: 'get',
                url: URL + '/posts',
            });
            return res;
        } catch(error) {
            window.alert('error', error);
        }
    }
    static async postAd(adData) {
        try {
            const res = await axios({
                method: 'put',
                url: URL + '/posts',
                data: adData, 
            });
            return res;
        } catch(error) {
            const message = error.response.data?.error;
            if(message) {
                window.alert(message);
            } else {
                window.alert(error)
            }   
        }
    }
    static async getAd(id) {
        try {
            const res = await axios({
                method: 'get',
                url: URL + '/posts/' + id,
            })
            return res;
        } catch(error) {
            window.alert('error', error);
        }
    }
}

export default AdService;
