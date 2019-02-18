const PROTO_PATH = `${ __dirname }/store.proto`;

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);

const storeProto = grpc.loadPackageDefinition(packageDefinition).store;

const Store = {};

function SetStore(call, callback) {
    Store.bag = call.request.bag;

    callback(null, 'OK');
}

function main() {
    const server = new grpc.Server();
    server.addService(storeProto.Store.service, { SetStore });
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}

main();