const PROTO_PATH = `${__dirname}/../Store/store.proto`;

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

function main() {
    const client = new storeProto.Store('0.0.0.0:50051', grpc.credentials.createInsecure());

    client.setStore({ txt: 'New Store value'}, function (err, response) {
        if (err) {
            throw new Error(`Unable to run RPC call` + err);
        }
        console.log('store replied with', response);
    });
}

main();