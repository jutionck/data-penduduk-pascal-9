const {Province} = require('../model/index');
const {ProvinceService} = require('../service/index');

const provinceService = new ProvinceService();

const ProvinceController = async () => {
    try {
        const provinces = await provinceService.get();
        console.log(provinces);
    } catch (err) {
        console.error(err);
    }
    try {
        const province01 = new Province()
        const add01 = await provinceService.add(province01);
        console.log(add01);
    } catch (err) {
        console.error(err);
    }
    try {
        const province02 = new Province('00', 'Jawa Barat')
        const add02 = await provinceService.add(province02);
        console.log(add02)
    } catch (err) {
        console.error(err);
    }
    try {
        const province03 = new Province('01', 'Jawa Timur')
        const add03 = await provinceService.add(province03);
        console.log(add03);
    } catch (err) {
        console.error(err);
    }
    try {
        const province = await provinceService.getById('XX');
        console.log(province);
    } catch (err) {
        console.error(err);
    }
    try {
        const province = await provinceService.getById('00');
        console.log(province);
    } catch (err) {
        console.error(err);
    }
    try {
        const province01 = await provinceService.delete('00');
        console.log(province01);
    } catch (err) {
        console.error(err);
    }
    try {
        const province = new Province('01', 'Jakarta')
        const provinceUpdate = await provinceService.update(province);
        console.log(provinceUpdate);
    } catch (err) {
        console.error(err);
    }
    try {
        const provinces = await provinceService.get();
        console.log(provinces);
    } catch (err) {
        console.error(err);
    }

}

module.exports = ProvinceController
