module.exports = class Validate {
    constructor() {}
    isExist(data) {
        return data.length !== 0;
    }

    isOfficeHour(hour) {
        return hour >= 8 && hour <= 14;
    }


    isOfficeDay(days) {
        const dayList =  ['senin', 'selasa', 'rabu', 'kamis', 'jumat'];
        return dayList.includes(days.toLocaleString())
    }

    isGenderValid(gender) {
        return  gender.toLowerCase() === 'laki-laki' || gender.toLowerCase() === 'perempuan';
    }
}
