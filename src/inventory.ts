
export enum WeaponType {
    AssaultRifle,
    SniperRifle,
    Shotgun,
    Pistol,
    SMG,
}

export const MAX_LEVEL_UNSAFE: number = 255;

export interface Weapon {
    // Index of weapon level in inventory
    level_index: number;
    // Name of the weapon
    name: string;
    // Path to the weapon image
    image: string;
}

export const MAX_WEAPON_LEVEL: number = 10;

export const ASSAULT_RIFLES: Weapon[] = [
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

export const SNIPER_RIFLES: Weapon[] = [
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

export const SHOTGUNS: Weapon[] = [
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

export const PISTOLS: Weapon[] = [
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

export const SUB_MACHINE_GUNS: Weapon[] = [
    { level_index: 27, name: "M-12 Locust", image: "SMG_Locust.png", },
    { level_index: 28, name: "M-25 Hornet", image: "SMG_Hornet.png", },
    { level_index: 29, name: "M-4 Shuriken", image: "SMG_Shuriken.png", },
    { level_index: 30, name: "M-9 Tempest", image: "SMG_Tempest.png", },
    { level_index: 264, name: "N7 Hurricane", image: "SMG_Hurricane.png", },
    { level_index: 276, name: "Geth Plasma SMG", image: "SMG_Geth.png", },
    { level_index: 533, name: "Collector SMG", image: "SMG_Collector.png", },
    { level_index: 624, name: "Blood Pack Punisher", image: "SMG_Bloodpack_MP.png", },
];


export interface WeaponCategory {
    name: string,
    values: Weapon[],
}

export const WEAPON_CATEGORIES: WeaponCategory[] = [
    { name: "Assault Rifles", values: ASSAULT_RIFLES },
    { name: "Sniper Rifles", values: SNIPER_RIFLES },
    { name: "Shotguns", values: SHOTGUNS },
    { name: "Pistols", values: PISTOLS },
    { name: "Sub Machine Guns", values: SUB_MACHINE_GUNS }
];

export interface Character {
    index: number,
    name: string,
    image: string;
}

export const ADEPT_CHARACTERS: Character[] = [
    { index: 217, name: "Asari", image: "MP_Asari0.png" },
    { index: 218, name: "Drell", image: "MP_Drell0.png" },
    { index: 247, name: "Human Female", image: "AdeptHumanFemale.png" },
    { index: 248, name: "Human Male", image: "AdeptHumanMale.png" },
    { index: 273, name: "Asari Justicar", image: "MP_AsariComm.png" },
    { index: 282, name: "Phoenix", image: "MP_Cerberus.png" },
    { index: 373, name: "N7 Fury", image: "MP_AllianceADP.png" },
    { index: 500, name: "Volus", image: "MP_VolusADP.png" },
    { index: 508, name: "Batarian Slasher", image: "MP_BatarianADP.png" },
    { index: 514, name: "Krogan Shaman", image: "MP_KroganADP.png" },
    { index: 577, name: "Awakened Collector", image: "MP_CollectADP.png" },
];
export const ENGINEER_CHARACTERS: Character[] = [
    { index: 219, name: "Quarian", image: "MP_Quarian0.png" },
    { index: 220, name: "Salarian", image: "MP_Salarian0.png" },
    { index: 238, name: "Geth", image: "MP_GethEngineer.png" },
    { index: 249, name: "Human Female", image: "EngineerHumanFemale.png" },
    { index: 250, name: "Human Male", image: "EngineerHumanMale.png" },
    { index: 280, name: "Quarian Male", image: "MP_QuarianMale0.png" },
    { index: 374, name: "N7 Demolisher", image: "MP_AllianceENG.png" },
    { index: 501, name: "Volus", image: "MP_VolusENG.png" },
    { index: 503, name: "Turian Saboteur", image: "MP_TurianENG.png" },
    { index: 509, name: "Vorcha Hunter", image: "MP_VorchaENG.png" },
    { index: 584, name: "Talon Mercenary", image: "MP_MercENG.png" },
];
export const INFILTRATOR_CHARACTERS: Character[] = [
    { index: 221, name: "Salarian", image: "MP_Salarian0.png" },
    { index: 222, name: "Quarian", image: "MP_Quarian0.png" },
    { index: 239, name: "Geth", image: "MP_GethInfiltrator.png" },
    { index: 251, name: "Human Female", image: "InfiltratorHumanFemale.png" },
    { index: 252, name: "Human Male", image: "InfiltratorHumanMale.png" },
    { index: 281, name: "Quarian Male", image: "MP_QuarianMale0.png" },
    { index: 281, name: "N7 Shadow", image: "MP_AllianceINF.png" },
    { index: 381, name: "Turian Ghost", image: "MP_TurianINF.png" },
    { index: 504, name: "Drell Assassin", image: "MP_DrellINF.png" },
    { index: 510, name: "Asari Huntress", image: "MP_AsariINF.png" },
    { index: 602, name: "Alliance Infiltration Unit", image: "MP_FBotINF.png" },
    
];
export const SENTINEL_CHARACTERS: Character[] = [
    { index: 223, name: "Turian", image: "MP_Turian0.png" },
    { index: 224, name: "Krogan", image: "MP_Krogan0.png" },
    { index: 253, name: "Human Female", image: "SentinelHumanFemale.png" },
    { index: 254, name: "Human Male", image: "SentinelHumanMale.png" },
    { index: 267, name: "Batarian", image: "MP_Batarian.png" },
    { index: 279, name: "Vorcha", image: "MP_Vorcha.png" },
    { index: 375, name: "N7 Paladin", image: "MP_AllianceSEN.png" },
    { index: 505, name: "Volus Mercenary", image: "MP_VolusENG2.png" },
    { index: 511, name: "Asari Valkyrie", image: "MP_AsariSEN.png" },
    { index: 583, name: "Krogan Warlord", image: "MP_BloodSEN.png" },

];
export const SOLDIER_CHARACTERS: Character[] = [
    { index: 225, name: "Krogan", image: "MP_Krogan0.png" },
    { index: 226, name: "Turian", image: "MP_Turian0.png" },
    { index: 240, name: "Batarian", image: "MP_Batarian.png" },
    { index: 255, name: "Human Female", image: "SoldierHumanFemale.png" },
    { index: 256, name: "Human Male", image: "SoldierHumanMale.png" },
    { index: 268, name: "Battlefield 3", image: "MP_FB_HMM0.png" },
    { index: 278, name: "Vorcha", image: "MP_Vorcha.png" },
    { index: 378, name: "N7 Destroyer", image: "MP_AllianceSOL.png" },
    { index: 480, name: "Turian Havoc", image: "MP_TurianSLD.png" },
    { index: 506, name: "Geth Trooper", image: "MP_GethSLD.png" },
    { index: 512, name: "Quarian Marksman", image: "MP_QuarianMSLD.png" },
    { index: 576, name: "Geth Juggernaut", image: "MP_GethPSLD.png" },
];
export const VANGUARD_CHARACTERS: Character[] = [
    { index: 227, name: "Drell", image: "MP_Drell0.png" },
    { index: 228, name: "Asari", image: "MP_Asari0.png" },
    { index: 257, name: "Human Female", image: "VanguardHumanFemale.png" },
    { index: 258, name: "Human Male", image: "VanguardHumanMale.png" },
    { index: 272, name: "Krogan", image: "MP_Krogan0.png" },
    { index: 283, name: "Phoenix", image: "MP_Cerberus.png" },
    { index: 376, name: "N7 Slayer", image: "MP_AllianceVAN.png" },
    { index: 507, name: "Volus Protector", image: "MP_VolusVAN.png" },
    { index: 513, name: "Batarian Brawler", image: "MP_BatarianVAN.png" },
    { index: 592, name: "Cabal", image: "MP_TurianVAN.png" },
];

export interface CharacterClass {
    name: string;
    values: Character[],
}

export const CHARACTER_CLASSES: CharacterClass[] = [
    {name: "Adept", values: ADEPT_CHARACTERS},
    {name: "Engineer", values: ENGINEER_CHARACTERS},
    {name: "Infiltrator", values: INFILTRATOR_CHARACTERS},
    {name: "Sentinel", values: SENTINEL_CHARACTERS},
    {name: "Vanguard", values: VANGUARD_CHARACTERS}
]

export interface WeaponMod {
    level_index: number;
    name: string;
    image: string;
}

export const ASSAULT_RIFLE_MODS: WeaponMod[] = [
    { level_index: 31, name: "Extended Barrel", image: "AssaultRifleDamage.png", },
    { level_index: 32, name: "Precision Scope", image: "AssaultRifleAccuracy.png", },
    { level_index: 33, name: "Stability Dampner", image: "AssaultRifleStability.png", },
    { level_index: 34, name: "Magazine Upgrade", image: "AssaultRifleMagSize.png", },
    { level_index: 35, name: "Piercing Mod", image: "AssaultRifleForce.png", },
    { level_index: 406, name: "Thermal Scope", image: "AssaultRifleSuperScope.png", },
    { level_index: 466, name: "Omni-Blade", image: "AssaultRifleMelee.png", },
    { level_index: 467, name: "High-Velocity Barrel", image: "AssaultRifleSuperPen.png", },
    { level_index: 653, name: "Ultralight Materials", image: "AssaultRifleUltraLight_MP5.png", },
];

export const SNIPER_RIFLE_MODS: WeaponMod[] = [
    { level_index: 36, name: "Extended Barrel", image: "SniperRifleDamage.png", },
    { level_index: 37, name: "Enhanced Scope", image: "SniperRifleAccuracy.png", },
    { level_index: 38, name: "Spare Thermal Clip", image: "SniperRifleReloadSpeed.png", },
    { level_index: 40, name: "Piercing Mod", image: "SniperRifleConstraintDamage.png", },
    { level_index: 414, name: "High-Velocity Barrel", image: "SniperRifleDamageAndPen.png", },
    { level_index: 415, name: "Thermal Scope", image: "SniperRifleSuperScope.png", },
    { level_index: 654, name: "Ultralight Materials", image: "SniperRifleUltraLight_MP5.png", },
];

export const SHOTGUN_MODS: WeaponMod[] = [
    { level_index: 41, name: "High Caliber Barrel", image: "ShotgunDamage.png", },
    { level_index: 42, name: "Blade Attachment", image: "ShotgunMeleeDamage.png", },
    { level_index: 43, name: "Spare Thermal Clip", image: "ShotgunReloadSpeed.png", },
    { level_index: 44, name: "Smart Choke", image: "ShotgunAccuracy.png", },
    { level_index: 45, name: "Shredder Mod", image: "ShotgunReloadSpeed.png", },
    { level_index: 410, name: "High-Velocity Barrel", image: "ShotgunDamageAndPen.png", },
    { level_index: 411, name: "Omni-Blade", image: "ShotgunSuperMelee.png", },
    { level_index: 655, name: "Ultralight Materials", image: "ShotgunUltraLight_MP5.png", },
];

export const PISTOL_MODS: WeaponMod[] = [
    { level_index: 46, name: "High-Caliber Barrel", image: "PistolDamage.png", },
    { level_index: 47, name: "Scope", image: "PistolAccuracy.png", },
    { level_index: 48, name: "Melee Stunner", image: "PistolStability.png", },
    { level_index: 49, name: "Magazine Upgrade", image: "PistolMagSize.png", },
    { level_index: 50, name: "Piercing Mod", image: "PistolReloadSpeed.png", },
    { level_index: 407, name: "Cranial Trauma System", image: "PistolHeadShot.png", },
    { level_index: 408, name: "Heavy Barrel", image: "PistolSuperDamage.png", },
    { level_index: 409, name: "Ultralight Materials", image: "PistolUltraLight.png", },
    { level_index: 656, name: "Power Magnifier", image: "PistolPowerDamage_MP5.png", },
];

export const SUB_MACHINE_GUN_MODS: WeaponMod[] = [
    { level_index: 51, name: "High Caliber Barrel", image: "SMGDamage.png", },
    { level_index: 52, name: "Scope", image: "SMGAccuracy.png", },
    { level_index: 53, name: "Ultralight Materials", image: "SMGStability.png", },
    { level_index: 54, name: "Magazine Upgrade", image: "SMGMagSize.png", },
    { level_index: 55, name: "Heat Sink", image: "SMGConstraintDamage.png", },
    { level_index: 412, name: "High-Velocity Barrel", image: "SMGPenetration.png", },
    { level_index: 413, name: "Recoil System", image: "SMGStabilization.png", },
    { level_index: 657, name: "Power Magnifier", image: "SMGPowerDamage_MP5.png", },
];

export interface WeaponModCategory {
    name: string;
    values: WeaponMod[]
}

export const MAX_WEAPON_MOD_LEVEL: number = 5;

export const WEAPON_MODS: WeaponModCategory[] = [
    {name: "Assault Rifle", values: ASSAULT_RIFLE_MODS},
    {name: "Sniper Rifle", values: SNIPER_RIFLE_MODS},
    {name: "Shotugn", values: SHOTGUN_MODS},
    {name: "Pistol", values: PISTOL_MODS},
    {name: "SMG", values: SUB_MACHINE_GUN_MODS}
]