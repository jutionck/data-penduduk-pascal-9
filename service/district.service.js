const BaseService = require('./base.service');
const {commonResponse, Response} = require('../utils/response');
const Validate = require('../utils/validate');

let districts = [];
module.exports = class DistrictService extends BaseService {
    constructor() {
        super();
        this.districts = districts;
        this.validate = new Validate()
    }

    add(newDistrict) {
        super.add(newDistrict);
        console.log(`[ADD] Tambah Data Kecamatan`)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.isCodeExist(newDistrict.id)) {
                    reject(new Response().errorMessage('400', commonResponse.dataExist))
                } else if (newDistrict.id || newDistrict.name || newDistrict.cityCode) {
                    this.districts.push(newDistrict);
                    resolve(new Response().successMessage('200', commonResponse.successMessage, newDistrict))
                } else {
                    reject(new Response().errorMessage('400', commonResponse.isRequire))
                }
            }, 1000)
        })
    }

    get() {
        super.get();
        console.log(`[LIST] List Data Kecamatan`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.validate.isExist(this.districts)) {
                    resolve(new Response().successMessage('200', commonResponse.successMessage, this.districts));
                } else {
                    reject(new Response().errorMessage('400', commonResponse.dataNotExist))
                }
            }, 1000)
        })
    }

    getById(id) {
        super.getById(id);
        console.log(`[GET] Mencari Kecamatan dengan ID ${id}`)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const district = this.districts.filter((district) => district.id === id);
                if (district.length === 0) {
                    reject(new Response().errorMessage('400',`District with ID ${id} not found`));
                } else {
                    resolve(new Response().successMessage('200', commonResponse.successMessage, district));
                }
            }, 1000)
        })
    }

    getByCityId(cityCode) {
        console.log(`[GET] Mencari kabupaten dengan kode kabupaten ${cityCode}`)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const district = this.districts.filter((district) => district.cityCode === cityCode);
                if (district.length === 0) {
                    reject(new Response().errorMessage('400',`District with city code ${cityCode} not found`));
                } else {
                    resolve(new Response().successMessage('200', commonResponse.successMessage, district));
                }
            }, 1000)
        })
    }

    delete(id) {
        super.delete(id);
        console.log(`[DELETE] Menghapus Kecamatan dengan ID ${id}`)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.validate.isExist(this.districts)) {
                    let i = 0;
                    for (let district of this.districts){
                        if (district.id === id){
                            this.cities.splice(i, 1);
                            resolve(new Response().successMessage('200', commonResponse.successMessage, id));
                        }
                        i++;
                    }
                } else {
                    reject(new Response().errorMessage('400',`District with ID ${id} not found`));
                }
            }, 1000)
        })
    }

    update(newDistrict) {
        super.update(newDistrict);
        console.log(`[UPDATE] Mengubah data Kecamatan`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const district = this.districts.find(p => p.id === newDistrict.id)
                if (district) {
                    district.name = district.name === undefined ? district.name : district.name;
                    district.cityCode = district.cityCode === undefined ? district.cityCode : newDistrict.cityCode;
                    resolve(new Response().successMessage('200', commonResponse.successMessage, newDistrict));
                } else {
                    reject(new Response().errorMessage('400'));
                }
            }, 1000)
        })
    }

    isCodeExist(code) {
        const cities = this.districts.filter((v) => v.id === code)
        if (cities.length > 0) {
            return true
        }
    }
}
