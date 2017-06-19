import realm from "./realmDB"


export const save = (rides) => {
    return this.empty().then(() => {

        let promises = [];
        for (let rideIndex = 0; rideIndex < rides.length; rideIndex++) {
            let ride = rides[rideIndex];
            promises.push(this.addRide(ride));
        }
        return Promise.all(promises);
    })
}

export const loadAllPositions = () => {
    return Promise.resolve(realm.objects('Position'))
};

/**
 * load by ride id
 * @param id the ride id
 */
export const loadById = (id) => {
    return Promise.resolve(realm.objects('Position').filtered('rideId = "' + id + '"'));
};

export const addRide = (ride) => {
    return Promise.resolve(
        realm.write(() => {
            for (let positionIndex = 0; positionIndex < ride.positions.length; positionIndex++) {
                realm.create('Position', {
                    rideId: ride.id,
                    longitude: ride.positions[positionIndex][0],
                    latitude: ride.positions[positionIndex][1],
                    date: new Date(ride.positions[positionIndex][2]),
                    speed: ride.positions[positionIndex][3],
                    gait: ride.positions[positionIndex][4],
                    accuracy: ride.positions[positionIndex][5],
                });
            }
        })
    )
}

export const removeRide = (id: string) => {
    return Promise.resolve(
        this.loadById(id)
            .then((positions) => {
                realm.write(() => {
                    realm.delete(positions);
                })
            })
    )
}

export const empty = () => {
    var allPositions = realm.objects('Position');
    return Promise.resolve(
        realm.write(() => {
            realm.delete(allPositions);
        })
    )
}

export const addPosition = (position, rideId) => {
    return Promise.resolve(
        realm.write(() => {
            realm.create('Position', {
                rideId: rideId,
                longitude: position[0],
                latitude: position[1],
                date: new Date(position[2]),
                speed: position[3],
                gait: position[4],
                accuracy: position[5],
            });
        })
    )
}

export const getLastPosition = () => {
    let allPositions = realm.objects('Position');
    return allPositions.sorted('date')[allPositions.length-1];
}