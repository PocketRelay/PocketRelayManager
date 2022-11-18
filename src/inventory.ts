
export enum WeaponType {
    AssaultRifle,
    SniperRifle,
    Shotgun,
    Pistol,
    SMG,
}

export interface Weapon {
    // Index of weapon level in inventory
    level_index: number;
    // Name of the weapon
    name: string;
    // Path to the weapon image
    image: string;
}


const ASSAULT_RIFLES: Weapon[] = [
    { level_index: 0, name: "M-8 Avenger", image: "AssaultRifle_Avenger.png", },
    { level_index: 1, name: "Collector Rifle", image: "AssaultRifle_Collector.png" },
    { level_index: 2, name: "Geth Pulse Rifle", image: "AssaultRifle_Geth.png" },
    { level_index: 3, name: "M-96 Mattock", image: "AssaultRifle_Mattock.png" },
    { level_index: 4, name: "Phaeston", image: "AssaultRifle_Cobra.png" },
    { level_index: 5, name: "M-37 Falcon", image: "AssaultRifle_Falcon.png" },
    { level_index: 6, name: "M-76 Revenant", image: "AssaultRifle_Revenant.png" },
    { level_index: 7, name: "M-15 Vindicator", image: "AssaultRifle_Vindicator.png" },
    { level_index: 135, name: "M-99 Saber", image: "AssaultRifle_Saber.png" },
    { level_index: 274, name: "Striker Assault Rifle", image: "AssaultRifle_Krogan.png" },
    { level_index: 286, name: "Cerberus Harrier", image: "AssaultRifle_Cerberus.png" },
    { level_index: 358, name: "Particle Rifle", image: "AssaultRifle_Prothean_MP.png" },
    { level_index: 367, name: "M-55 Argus", image: "AssaultRifle_Argus.png" },
    { level_index: 368, name: "N7 Valkyrie", image: "AssaultRifle_Valkyrie.png" },
    { level_index: 468, name: "N7 Typhoon", image: "AssaultRifle_LMG.png" },
    { level_index: 623, name: "M-7 Lancer", image: "AssaultRifle_Lancer_MP.png" },
    { level_index: 626, name: "Geth Spitfire", image: "AssaultRifle_Spitfire.png" },
    { level_index: 627, name: "Adas Anti-Synthetic Rifle", image: "AssaultRifle_Adas_MP.png" },
];

const SNIPER_RIFLES: Weapon[] = [
    { level_index: 8, name: "M-29 Incisor", image: "SniperRifle_Incisor.png", },
    { level_index: 9, name: "M-92 Mantis", image: "SniperRifle_Mantis.png", },
    { level_index: 10, name: "M-13 Raptor", image: "SniperRifle_Raptor.png", },
    { level_index: 11, name: "Javelin", image: "SniperRifle_Javelin.png", },
    { level_index: 12, name: "M-97 Viper", image: "SniperRifle_Viper.png", },
    { level_index: 13, name: "M-98 Widow", image: "SniperRifle_Widow.png", },
    { level_index: 110, name: "N7 Valiant", image: "SniperRifle_Valiant.png", },
    { level_index: 136, name: "Black Widow", image: "SniperRifle_Widow.png", },
    { level_index: 275, name: "Kishock Harpoon Gun", image: "SniperRifle_Baterian.png", },
    { level_index: 288, name: "Krysae Sniper Rifle", image: "SniperRifle_Turian.png", },
    { level_index: 369, name: "M-90 Indra", image: "SniperRifle_Indra.png", },
    { level_index: 532, name: "Collector Sniper Rifle", image: "SniperRifle_Collector.png", },
];

const SHOTGUNS: Weapon[] = [
    { level_index: 14, name: "M-300 Claymore", image: "Shotgun_Claymore.png", },
    { level_index: 15, name: "M-22 Eviscerator", image: "Shotgun_Eviscerator.png", },
    { level_index: 16, name: "Geth Plasma Shotgun", image: "Shotgun_Geth.png", },
    { level_index: 17, name: "M-23 Katana", image: "Shotgun_Katana.png", },
    { level_index: 18, name: "Graal Spike Thrower", image: "Shotgun_Graal.png", },
    { level_index: 19, name: "Disciple", image: "Shotgun_Disciple.png", },
    { level_index: 20, name: "M-27 Scimitar", image: "Shotgun_Scimitar.png", },
    { level_index: 137, name: "M-11 Wraith", image: "Shotgun_Striker.png", },
    { level_index: 262, name: "N7 Crusader", image: "Shotgun_Crusader.png", },
    { level_index: 287, name: "Reegar Carbine", image: "Shotgun_Quarian.png", },
    { level_index: 370, name: "AT-12 Raider", image: "Shotgun_Raider.png", },
    { level_index: 469, name: "N7 Piranha", image: "Shotgun_Assault.png", },
    { level_index: 525, name: "Venom Shotgun", image: "Shotgun_Salarian_MP.png", },
];

const PISTOLS: Weapon[] = [
    { level_index: 21, name: "M-6 Carnifex", image: "Pistol_Carnifex.png", },
    { level_index: 22, name: "M-358 Talon", image: "Pistol_Talon.png", },
    { level_index: 23, name: "Arc Pistol", image: "Pistol_Thor.png", },
    { level_index: 24, name: "M-5 Phalanx", image: "Pistol_Phalanx.png", },
    { level_index: 25, name: "M-3 Predator", image: "Pistol_Predator.png", },
    { level_index: 26, name: "Scorpion", image: "Pistol_Scorpion.png", },
    { level_index: 138, name: "M-77 Paladin", image: "Pistol_Ivory.png", },
    { level_index: 263, name: "N7 Eagle", image: "Pistol_Eagle.png", },
    { level_index: 470, name: "Acolyte", image: "Pistol_Asari.png", },
    { level_index: 628, name: "Executioner Pistol", image: "Pistol_Bloodpack_MP.png", },
    { level_index: 629, name: "M-11 Suppressor", image: "Pistol_Silencer_MP.png", },
];

const SUB_MACHINE_GUNS: Weapon[] = [
    { level_index: 27, name: "M-12 Locust", image: "SMG_Locust.png", },
    { level_index: 28, name: "M-25 Hornet", image: "SMG_Hornet.png", },
    { level_index: 29, name: "M-4 Shuriken", image: "SMG_Shuriken.png", },
    { level_index: 30, name: "M-9 Tempest", image: "SMG_Tempest.png", },
    { level_index: 264, name: "N7 Hurricane", image: "SMG_Hurricane.png", },
    { level_index: 276, name: "Geth Plasma SMG", image: "SMG_Geth.png", },
    { level_index: 533, name: "Collector SMG", image: "SMG_Collector.png", },
    { level_index: 624, name: "Blood Pack Punisher", image: "SMG_Bloodpack_MP.png", },
];

const WEAPON_CATEGORIES: Weapon[][] = [
    ASSAULT_RIFLES,
    SNIPER_RIFLES,
    SHOTGUNS,
    PISTOLS,
    SUB_MACHINE_GUNS,
]