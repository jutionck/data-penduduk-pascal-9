const BaseService = require('./base.service');
const {commonResponse, Response} = require('../utils/response');
const Validate = require('../utils/validate');

let cities = [];
module.exports = class CityService extends BaseService {
    constructor() {
        super();
        this.cities = cities;
        this.validate = new Validate()
    }

    add(city) {
        super.add(city);
        console.log(`[ADD] Tambah Data Kabupaten`)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.isCodeExist(city.id)) {
                    reject(new Response().errorMessage('400', commonResponse.dataExist))
                } else if (city.id || city.name || city.provinceCode) {
                    this.cities.push(city);
                    resolve(new Response().successMessage('200', commonResponse.successMessage, city))
                } else {
                    reject(new Response().errorMessage('400', commonResponse.isRequire))
                }
            }, 1000)
        })
    }

    get() {
        super.get();
        console.log(`[LIST] List Data Kabupaten`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.validate.isExist(this.cities)) {
                    resolve(new Response().successMessage('200', commonResponse.successMessage, this.cities));
                } else {
                    reject(new Response().errorMessage('400', commonResponse.dataNotExist))
                }
            }, 1000)
        })
    }

   getById(id) {
       super.getById(id);
       console.log(`[GET] Mencari kabupaten dengan ID ${id}`)
       return new Promise((resolve, reject) => {
           setTimeout(() => {
               const city = this.cities.filter((city) => city.id === id);
               if (city.length === 0) {
                   reject(new Response().errorMessage('400',`City with ID ${id} not found`));
               } else {
                   resolve(new Response().successMessage('200', commonResponse.successMessage, city));
               }
           }, 1000)
       })
   }

    getByProvinceId(provinceCode) {
        console.log(`[GET] Mencari kabupaten dengan kode provinsi ${provinceCode}`)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const city = this.cities.filter((city) => city.provinceCode === provinceCode);
                if (city.length === 0) {
                    reject(new Response().errorMessage('400',`City with province code ${provinceCode} not found`));
                } else {
                    resolve(new Response().successMessage('200', commonResponse.successMessage, city));
                }
            }, 1000)
        })
    }

    delete(id) {
        super.delete(id);
        console.log(`[DELETE] Menghapus kabupaten dengan ID ${id}`)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.validate.isExist(this.cities)) {
                    let i = 0;
                    for (let city of this.cities){
                        if (city.id === id){
                            this.cities.splice(i, 1);
                            resolve(new Response().successMessage('200', commonResponse.successMessage, id));
                        }
                        i++;
                    }
                } else {
                    reject(new Response().errorMessage('400',`City with ID ${id} not found`));
                }
            }, 1000)
        })
    }

    update(newCity) {
        super.update(newCity);
        console.log(`[UPDATE] Mengubah data Kabupaten`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const city = this.provinces.find(p => p.id === newCity.id)
                if (city) {
                    city.name = newCity.name === undefined ? city.name : newCity.name;
                    city.provinceCode = newCity.provinceCode === undefined ? city.provinceCode : newCity.provinceCode;
                    resolve(new Response().successMessage('200', commonResponse.successMessage, newCity));
                } else {
                    reject(new Response().errorMessage('400'));
                }
            }, 1000)
        })
    }

    isCodeExist(code) {
        const cities = this.cities.filter((v) => v.id === code)
        if (cities.length > 0) {
            return true
        }
    }
}
