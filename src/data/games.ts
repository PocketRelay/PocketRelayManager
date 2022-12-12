export const ENEMY_ATTR: string = "ME3gameEnemyType";
export const DIFFICULTY_ATTR: string = "ME3gameDifficulty";
export const MAP_ATTR: string = "ME3map";


export const ENEMY_IMAGES: Record<string, string> = {
    "random": "OptEmyRandom.png",
    "enemy1": "OptEmyCerberus.png",
    "enemy2": "OptEmyGeth.png",
    "enemy3": "OptEmyReapers.png",
    "enemy4": "OptEmyCollector.png",
}

export const DIFFICULTY_IMAGES: Record<string, string> = {
    "random": "OptChallgRandom.png",
    "difficulty0": "OptChallgBrnz.png",
    "difficulty1": "OptChallgSilver.png",
    "difficulty2": "OptChallgGold.png",
    "difficulty3": "OptChallgPlatinum.png",
}

export interface Map {
    name: string;
    location: string;
    image: string;
}

const UNKNOWN_MAP: Map = {
    name: "Unknown Location",
    location: "?",
    image: "OptMapRandom.png"
}

export function getMap(name: string): Map {
    const value: Map | undefined = MAPS[name];
    if (value == undefined) {
        return UNKNOWN_MAP;
    } else {
        return value;
    }
}

const MAPS: Record<string, Map> = {
    // Random Maps
    "map0": UNKNOWN_MAP,
    "random": UNKNOWN_MAP,
    // Standard Maps
    "map2": {
        name: "Firebase Dagger",
        location: "Ontarom",
        image: "OptMapDish"
    },
    "map3": {
        name: "Firebase Ghost",
        location: "Benning",
        image: "OptMapSlum"
    },
    "map4": {
        name: "Firebase Giant",
        location: "Tuchanka",
        image: "OptMapTowr"
    },
    "map5": {
        name: "Firebase Reactor",
        location: "Cyone",
        image: "OptMapRctr"
    },
    "map7": {
        name: "Firebase Glacier",
        location: "Sanctum",
        image: "OptMapCer"
    },
    "map8": {
        name: "Firebase White",
        location: "Noveria",
        image: "OptMapNoveria"
    },
    // Resurgence Pack Maps
    "map9": {
        name: "Firebase Condor",
        location: "Paleven",
        image: "OptMapMoon"
    },
    "map10": {
        name: "Firebase Hydra",
        location: "Arvuna",
        image: "OptMapGeth"
    },
    // Rebellion Pack Maps
    "map11": {
        name: "Firebase Jade",
        location: "Sur'Kesh",
        image: "OptMapJade"
    },
    "map13": {
        name: "Firebase Goddess",
        location: "Thessia",
        image: "OptMapGoddess"
    },
    // Earth Maps   
    "map14": {
        name: "Firebase Rio",
        location: "Earth",
        image: "OptMapRio"
    },
    "map15": {
        name: "Firebase Vancouver",
        location: "Earth",
        image: "OptMapHosp"
    },
    "map16": {
        name: "Firebase London",
        location: "Earth",
        image: "OptMapLondon"
    },
    // Retaliation Hazard Maps
    "map17": {
        name: "☣ Firebase Glacier ☣",
        location: "Sanctum",
        image: "OptMapSwarm"
    },
    "map18": {
        name: "☣ Firebase Dagger ☣",
        location: "Ontarom",
        image: "OptMapSandstorm"
    },
    "map19": {
        name: "☣ Firebase Reactor ☣",
        location: "Cyone",
        image: "OptMapMeltdown"
    },
    "map20": {
        name: "☣ Firebase Ghost ☣",
        location: "Benning",
        image: "OptMapAcid"
    },
    "map21": {
        name: "☣ Firebase Giant ☣",
        location: "Tuchanka",
        image: "OptMapTower"
    },
    "map22": {
        name: "☣ Firebase White ☣",
        location: "Noveria",
        image: "OptMapSnowstorm"
    }
}