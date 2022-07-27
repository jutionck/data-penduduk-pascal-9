const {People} = require('../model/index');
const {ProvinceService, CityService, DistrictService, PeopleService} = require('../service/index');

const provinceService = new ProvinceService();
const cityService = new CityService();
const districtService = new DistrictService();
const peopleService = new PeopleService();

const PeopleController = async () => {
    try {
        const province = await provinceService.getById('01');
        const city = await cityService.getByProvinceId(province.data[0].id);
        const district = await districtService.getByCityId(city.data[0].id);
        const person01 = new People(
            'P0001',
            'Mama',
            'L',
            '03-07-1995',
            province.data[0].id,
            city.data[0].id,
            district.data[0].id
        )
        const add01 = await peopleService.register(person01);
        console.log(add01)
    } catch (err) {
        console.error(err);
    }
}

module.exports = PeopleController
