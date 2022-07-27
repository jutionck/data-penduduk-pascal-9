const {City} = require('../model/index');
const {CityService, ProvinceService} = require('../service/index');

const provinceService = new ProvinceService();
const cityService = new CityService();

const CityController = async () => {
    try {
        console.log(`CITY`)
        const province = await provinceService.getById('01');
        const city01 = new City('11', 'Bandung', province.data[0].id)
        const add01 = await cityService.add(city01);
        console.log(add01)
    } catch (err) {
        console.error(err);
    }
}

module.exports = CityController
