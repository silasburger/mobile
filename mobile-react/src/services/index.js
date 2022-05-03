import axios from 'axios';

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
    static async postAd() {
        
        try {
            const res = await axios({
                method: 'post',
                url: 'localhost:3000/posts',
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
                url: `localhost:3000/post/${id}`,
            });
            return res;
        } catch(error) {
            window.alert('error', {error});
        }
    }
}

export default AdService;