const Validate = require("../utils/validate");
const {Response, commonResponse} = require("../utils/response");
module.exports = class PeopleService {
    constructor() {
        this.people = [];
        this.validate = new Validate()
    }

    register(people) {
        console.log(`[ADD] Tambah Data Penduduk`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.isCodeExist(people.nik)) {
                    reject(new Response().errorMessage('400', commonResponse.dataExist))
                } else if (
                    people.id ||
                    people.name ||
                    people.gender ||
                    people.birthDate ||
                    people.provinceId ||
                    people.cityId ||
                    people.districtId
                ) {
                    if (this.validate.isGenderValid(people.gender)) {
                        people.nik = this.generateNIK(
                            people.gender,
                            people.birthDate,
                            people.provinceId,
                            people.cityId,
                            people.districtId
                        )
                        if (people.nik < 1 && people.nik > 16) {
                            reject(new Response().errorMessage('400', commonResponse.isLengthNikValid))
                        } else {
                            this.people.push(people);
                            resolve(new Response().successMessage('200', commonResponse.successMessage, people))
                        }
                    } else {
                        reject(new Response().errorMessage('400', commonResponse.isGenderValid))
                    }
                } else {
                    reject(new Response().errorMessage('400', commonResponse.isRequire))
                }
            }, 5000)
        })
    }

    get() {
        console.log(`[LIST] List Data Penduduk`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.validate.isExist(this.people)) {
                    resolve(new Response().successMessage('200', commonResponse.successMessage, this.people));
                } else {
                    reject(new Response().errorMessage('400', commonResponse.dataNotExist))
                }
            }, 1000)
        })
    }
    getByNIK(nik) {
        console.log(`[GET] Mencari penduduk dengan NIK ${nik}`)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const person = this.people.filter((person) => person.nik === nik);
                if (person.length === 0) {
                    reject(new Response().errorMessage('400',`Person with NIK ${nik} not found`));
                } else {
                    resolve(new Response().successMessage('200', commonResponse.successMessage, person));
                }
            }, 1000)
        })
    }

    isCodeExist(code) {
        const people = this.people.filter((v) => v.id === code)
        if (people.length > 0) {
            return true
        }
    }

    generateNIK = (gender, birthDate, provinceId, cityId, districtId) => {
        let nik = '';
        let birthDateCode = '';
        birthDate = birthDate.split('-');
        gender = gender.toLowerCase();
        if (gender.toLowerCase() === 'laki-laki'){
            birthDateCode = `${birthDate[0]}${birthDate[1]}${birthDate[2].slice(2,4)}`
        } else {
            birthDateCode = `${Number(birthDate[0]) + 40}${birthDate[1]}${birthDate[2].slice(2,4)}`
        }
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        nik = provinceId + cityId + districtId + birthDateCode + randomNumber;
        return nik;
    }



}
