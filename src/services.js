import Vue from 'vue'
import CryptoJs from "crypto-js"
import VueResource from 'vue-resource'
// Vue.use(VueResource);
export default {
    
    login: false,
    // encryptedAES: encrypt("Message", "My Secret Passphrase"),
    encrypt: function (str, key) {
        key = CryptoJs.enc.Utf8.parse(key);
        let iv = CryptoJs.enc.Utf8.parse("1234567812345678");
        let encrypted = CryptoJs.AES.encrypt(str, key, {
            iv: iv,
            padding: CryptoJs.pad.Pkcs7
        });
        return encrypted.toString();
        //   return  CryptoJS.AES.encrypt(str, key);
    },
    decrypt: function (str, key) {
        key = CryptoJs.enc.Utf8.parse(key);
        let iv = CryptoJs.enc.Utf8.parse("1234567812345678");
        let encrypted = CryptoJs.AES.decrypt(str.toString(), key, {
            iv: iv,
            padding: CryptoJs.pad.Pkcs7
        });
        return encrypted.toString(CryptoJs.enc.Utf8);
    },
    key: '!@@##@$$#123',
    baseurl: 'http://localhost:8000/api',
    iss: {
        login: 'http://localhost:8000/api/login',
        // signup: 'http://localhost:8000/api/signup'
    },
    signup: function (data) {
       
        return Vue.http.post(`${this.baseurl}/signup`, data, {
            headers: {
                'Content-Type':' application/json'
            }
             });
      
    },
    login: function (data) {
        return Vue.http.post(`${this.baseurl}/login`, data, {
            headers: {
                'Content-Type': ' application/json'
            }
        });
    },
    sendPasswordResetLink: function (data) {
        return Vue.http.post(`${this.baseurl}/sendPasswordResetLink`, data, {
            headers: {
                'Content-Type': ' application/json'
            }
        });
    },
    changePassword: function (data) {
        return Vue.http.post(`${this.baseurl}/changePassword`, data, {
            headers: {
                'Content-Type': ' application/json'
            }
        });
    },
    handle: function (token) {
        
        this.set(token);
        // console.log(this.isValid());
    },
    set: function (token) {
        var $token = this.encrypt(token, this.key);
        sessionStorage.setItem('token', $token);
    },
    get: function () {
        let $hashtoken = sessionStorage.getItem('token');
        if ($hashtoken) {

            return this.decrypt($hashtoken, this.key);
        }
        return false;
    },
    removeToken: function () {
        return sessionStorage.removeItem('token');
    },
    removeType: function () {
        return sessionStorage.removeItem('type');
    },
    isValid: function () {
        const token = this.get();
        if (token) {
            const payload = this.payload(token);
            if (payload) {
                return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
            }
            return false;
        }


    },
    payload: function (token) {
        const payload = token.split('.')[1];
        if (payload) {
            if (this.decode(payload)) {

                return this.decode(payload);
            }
            return false;

        }
        return false;

    },
    decode: function (payload) {
        return JSON.parse(atob(payload));
    },
    isloggedIn: function () {
        return this.isValid();
    },
    isExpired: function () {
        const token = this.get();
        if (token) {
            const payload = this.payload(token);
            let current_time = new Date().getTime() / 1000;
            if (current_time > payload.exp) {
                return true;
            }
            return false;

        }

    },
    handleAdmin: function (type) {

        let $type = this.encrypt(type.toString(), this.key);
        sessionStorage.setItem('type', $type);
    },
    isAdmin: function () {
        let $hashtype = sessionStorage.getItem('type');
        if ($hashtype) {
            return this.decrypt($hashtype, this.key);

        }
        return false;
    },

    upload: function(data){
        return Vue.http.post(`${this.baseurl}/upload`, data, {
            headers: {
                'Content-Type': ' application/json',
                'Authorization': "Bearer" + this.get(),
            }
        });

    },
    uploadGuide: function(data){
        return Vue.http.post(`${this.baseurl}/upload-material`, data, {
            headers: {
                'Content-Type': ' application/json',
                'Authorization': "Bearer" + this.get(),
            }
        });

    },
    uploadImages: function(data){
        return Vue.http.post(`${this.baseurl}/upload-images`, data, {
            headers: {
                'Content-Type': ' application/json',
                'Authorization': "Bearer" + this.get(),
            }
        });

    },

    studyMaterials: function () {
        return Vue.http.get(`${this.baseurl}/quiz-material`);

    },

    studyMaterialCached:false,

    setStudyMaterials: function (material) {
        const $material = this.encrypt(JSON.stringify(material), this.key);
        sessionStorage.setItem('material', $material);
    },
    getStudyMaterials: function(){
        const $hashMaterial = sessionStorage.getItem('material');
        return JSON.parse(this.decrypt($hashMaterial, this.key));
      
    }




}