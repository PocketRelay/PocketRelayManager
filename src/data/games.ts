export const ENEMY_ATTR: string = "ME3gameEnemyType";
export const DIFFICULTY_ATTR: string = "ME3gameDifficulty";
export const MAP_ATTR: string = "ME3map";
export const VISIBILITY_ATTR :string = "ME3privacy";

export interface Visibility {
    name: string;
    image: string;
}

export const VISIBILITIES: Record<string, Visibility> = {
    "PUBLIC": {
        name: "Public",
        image: "OptTeamPublic"
    },
    "PRIVATE": {
        name: "Private",
        image: "OptTeamPrivate"
    },
    "FRIENDS": {
        name: "Friends",
        image: "OptTeamFriends"
    },
}

export interface Enemy {
    name: string;
    image: string;
}

export const ENEMIES: Record<string, Enemy> = {
    "random": {
        name: "Any Enemy",
        image: "OptEmyRandom"
    },
    "enemy1": {
        name: "Cerberus",
        image: "OptEmyCerberus"
    },
    "enemy2": {
        name: "Geth",
        image: "OptEmyGeth"
    },
    "enemy3": {
        name: "Reapers",
        image: "OptEmyReapers"
    },
    "enemy4": {
        name: "Collectors",
        image: "OptEmyCollector"
    }
}

export interface Challenge {
    name: string;
    image: string;
}

export const CHALLENGES: Record<string, Challenge> = {
    "random": {
        name: "Any Challenge",
        image: "OptChallgRandom"
    },
    "difficulty0": {
        name: "Bronze",
        image: "OptChallgBrnz"
    },
    "difficulty1": {
        name: "Silver",
        image: "OptChallgSilver"
    },
    "difficulty2": {
        name: "Gold",
        image: "OptChallgGold"
    },
    "difficulty3": {
        name: "Platinum",
        image: "OptChallgPlatinum"
    }
}

export interface Map {
    name: string;
    location: string;
    image: string;
}

const UNKNOWN_MAP: Map = {
    name: "Unknown Location",
    location: "?",
    image: "OptMapRandom"
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