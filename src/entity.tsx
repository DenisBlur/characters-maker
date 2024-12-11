export interface SkillEntity {
    name: string;
    level: number;
    baseStat: string;
}

export interface StatEntity {
    name: string;
    level: number;
    edit: boolean;
}

export interface  CharacterStats {
    strength: StatEntity;
    dexterity: StatEntity;
    intelligence: StatEntity;
    charisma: StatEntity;
    health: StatEntity;
    dodge: StatEntity;
    energy: StatEntity;

    [key: string]: StatEntity;
}

