module.exports = class People {
    constructor(id,name,gender,birthDate,provinceId,CityId,districtId) {
        this.id = id;
        this.nik = '';
        this.name = name;
        this.gender = gender;
        this.birthDate = birthDate;
        this.provinceId = provinceId;
        this.cityId = CityId;
        this.districtId = districtId;
    }
}
