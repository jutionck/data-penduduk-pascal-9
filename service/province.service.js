const BaseService = require('./base.service');
const {commonResponse, Response} = require('../utils/response');
const Validate = require('../utils/validate');

let provinces = [];
module.exports = class ProvinceService extends BaseService {
    constructor() {
        super();
        this.validate = new Validate()
        this.provinces = provinces;
    }

    add(province) {
        super.add(province);
        console.log(`[ADD] Tambah Data Provinsi`)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.isCodeExist(province.id)) {
                    reject(new Response().errorMessage('400', commonResponse.dataExist))
                } else if (province.id || province.name) {
                    this.provinces.push(province);
                    resolve(new Response().successMessage('200', commonResponse.successMessage, province))
                } else {
                    reject(new Response().errorMessage('400', commonResponse.isRequire))
                }
            }, 1000)
        })
    }

    get() {
        super.get();
        console.log(`[LIST] List Data Provinsi`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.validate.isExist(this.provinces)) {
                    resolve(new Response().successMessage('200', commonResponse.successMessage, this.provinces));
                } else {
                    reject(new Response().errorMessage('400', commonResponse.dataNotExist))
                }
            }, 1000)
        })
    }

   getById(id) {
       super.getById(id);
       console.log(`[GET] Mencari province dengan ID ${id}`)
       return new Promise((resolve, reject) => {
           setTimeout(() => {
               const province = this.provinces.filter((province) => province.id === id);
               if (province.length === 0) {
                   reject(new Response().errorMessage('400',`Province with ID ${id} not found`));
               } else {
                   resolve(new Response().successMessage('200', commonResponse.successMessage, province));
               }
           }, 1000)
       })
   }

    delete(id) {
        super.delete(id);
        console.log(`[DELETE] Menghapus province dengan ID ${id}`)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.validate.isExist(this.provinces)) {
                    let i = 0;
                    for (let province of this.provinces){
                        if (province.id === id){
                            this.provinces.splice(i, 1);
                            resolve(new Response().successMessage('200', commonResponse.successMessage, id));
                        }
                        i++;
                    }
                } else {
                    reject(new Response().errorMessage('400',`Province with ID ${id} not found`));
                }
            }, 1000)
        })
    }

    update(newProvince) {
        console.log(`[UPDATE] Mengubah data provinsi`);
        super.update(newProvince);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const province = this.provinces.find(p => p.id === newProvince.id)
                if (province) {
                    province.name = newProvince.name === undefined ? province.name : newProvince.name;
                    resolve(new Response().successMessage('200', commonResponse.successMessage, newProvince));
                } else {
                    reject(new Response().errorMessage('400'));
                }
            }, 1000)
        })
    }

    isCodeExist(code) {
        const province = this.provinces.filter((v) => v.id === code)
        if (province.length > 0) {
            return true
        }
    }
}
