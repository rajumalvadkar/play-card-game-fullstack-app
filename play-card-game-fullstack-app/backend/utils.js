module.exports = {
    sendResponse: function (statusFlag, statusCode, data, errorMessage) {
        const response = {
            'status': statusFlag ? 'Success' : 'Failure',
            'statusCode': statusCode,
            'data': data,
            'errorMessage': errorMessage
        };
        return response;
    }
};