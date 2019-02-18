const PROTO_PATH = `${ __dirname }/../Store/store.proto`;

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
    Store.txt = call.request.txt;

    console.log(`Store state is now: ${JSON.stringify(Store)}`);

    callback(null, {message: 'OKAY'});
}

function main() {
    const server = new grpc.Server();
    server.addService(storeProto.Store.service, { SetStore });
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}

main();