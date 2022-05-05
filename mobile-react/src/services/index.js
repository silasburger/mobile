import axios from 'axios';
import * as uuid from 'uuid';

class AdService {
    static async getAds() {
        
        try {
            const res = await axios({
                method: 'get',
                url: 'http://localhost:3000/posts',
            });
            return res;
        } catch(error) {
            window.alert('error', {error});
        }
    }
    static async postAd(adData) {
        try {
            const res = await axios({
                method: 'post',
                url: 'http://localhost:3000/posts',
                data: {
                    ...adData, 
                    id: uuid.v1()
                }
            });
            return res;
        } catch(error) {
            window.alert('error', {error});
        }
    }
    static async getAd(id) {
        try {
            const res = await axios({
                method: 'get',
                url: `http://localhost:3000/posts/${id}`,
            });
            return res;
        } catch(error) {
            window.alert('error', {error});
        }
    }
}

export default AdService;
