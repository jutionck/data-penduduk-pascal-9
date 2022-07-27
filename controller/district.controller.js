const {District} = require('../model/index');
const {DistrictService, CityService} = require('../service/index');

const cityService = new CityService();
const districtService = new DistrictService();

const DistrictController = async () => {
    try {
        console.log(`CITY`)
        const getCity = await cityService.getById('11');
        const city = new District('00', 'Bandung Barat', getCity.data[0].id)
        const add01 = await districtService.add(city);
        console.log(add01)
    } catch (err) {
        console.error(err);
    }
}

module.exports = DistrictController
