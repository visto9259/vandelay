function TransactionDefinitionApiModelResponseModel(data) {
    this.statusCode = data.statusCode;
    this.statusMessage = data.statusMessage;
    this.requestTime = data.requestTime;
    this.data = data.data;
    this.continuationToken = data.continuationToken;
    this.getStatusCode = () => this.statusCode;
    this.getRequestTime = () => this.requestTime;
    this.getData = () => this.data;
    this.getStatusMessage = () => this.statusMessage;
    this.getContinuationToken = () => this.continuationToken;
    this.setData = (data) => {this.data = data;};
}

export default TransactionDefinitionApiModelResponseModel;