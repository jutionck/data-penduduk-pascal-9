const commonResponse = {
    successCode: '00',
    successMessage: 'Success',
    defaultErrorCode: 'XX',
    defaultErrorMessage: 'Something went wrong',
    dataExist: 'Data already exists',
    dataNotExist: 'Data not exist',
    isRequire: 'Can\'t add, there is missing property',
}

class Response {
    constructor() {
        this.response = {
            code: '',
            message: '',
            data: ''
        }
    }

    successMessage(code, msg = commonResponse.successMessage, data) {
        this.response.code = code;
        this.response.message = msg;
        this.response.data = data;
        return this.response;
    }

    errorMessage(code, msg = commonResponse.defaultErrorMessage) {
        this.response.code = code;
        this.response.message = msg;
        this.response.data = null;
        return this.response;
    }
}

module.exports = {commonResponse, Response}
