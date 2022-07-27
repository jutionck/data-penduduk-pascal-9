const ProvinceController = require('./province.controller');
const CityController = require('./city.controller');
const DistrictController = require('./district.controller');
const PeopleController = require("./people.controller");

const main = async () => {
    await ProvinceController();
    await CityController();
    await DistrictController();
    await PeopleController()
}

module.exports = {main}
