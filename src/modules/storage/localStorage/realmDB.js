const Realm = require('realm');

export class Position {}
Position.schema = {
    name: 'Position',
    properties: {
        rideId: 'string',
        longitude:  'double',
        latitude: 'double',
        date: 'date',
        speed: 'int',
        gait: 'string',
        accuracy: 'float',
    }
};
const realm = new Realm({
    schema: [Position]
});
export default realm;