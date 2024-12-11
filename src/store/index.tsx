import {create} from "zustand";
import {Character} from "../Character.ts";
import {CharacterStats, SkillEntity} from "../entity.tsx";

export type CharactersStore = {
    characters: Character[];
    addCharacter: (name: string) => void;
    updateCharacter: (update: Character) => void;
    removeCharacter: (id: string) => void;
    importCharacter: (jsonString: string) => void;
};

export const createBaseSkills = (): SkillEntity[] => [
    {name: 'Атака', level: 0, baseStat: 'strength'},
    {name: 'Стелс', level: 0, baseStat: 'dexterity'},
    {name: 'Стрельба из лука', level: 0, baseStat: 'dexterity'},
    {name: 'Обучаемость', level: 0, baseStat: 'intelligence'},
    {name: 'Выживание', level: 0, baseStat: 'intelligence'},
    {name: 'Медицина', level: 0, baseStat: 'intelligence'},
    {name: 'Запугивание', level: 0, baseStat: 'charisma'},
    {name: 'Проницательность', level: 0, baseStat: 'charisma'},
    {name: 'Внешний вид', level: 0, baseStat: 'charisma'},
    {name: 'Манипулирование', level: 0, baseStat: 'charisma'},
];

export const createBaseStats = (): CharacterStats => {
    return {
        strength: {name: "Сила", level: 0, edit: true},
        dexterity: {name: "Ловкость", level: 0, edit: true},
        intelligence: {name: "Интеллект", level: 0, edit: true},
        charisma: {name: "Харизма", level: 0, edit: true},
        health: {name: "Здоровье", level: 0, edit: false},
        dodge: {name: "Уклонение", level: 0, edit: false},
        energy: {name: "Энергичность", level: 0, edit: false},
    }
};

const useCharacterStore = create<CharactersStore>(
    (set) => ({
        characters: [],
        addCharacter: (name: string) => {
            const newCharacter = new Character(Math.random().toString(36).substring(2, 15), {
                name: name === "" ? "Default" : name,
                skills: createBaseSkills(),
                stats: createBaseStats(),
            });
            set((state) => ({characters: [...state.characters, newCharacter]}));
        },
        updateCharacter: (update: Character) => {
            set((state) => ({characters: state.characters.map((c) => (c.id === update.id ? update : c))}));
        },
        removeCharacter: (id: string) =>
            set((state) => ({characters: state.characters.filter((char) => char.id !== id)})),
        importCharacter: (jsonString: string) => {
            const importedCharacter: Character | null = Character.fromJSON(jsonString);
            if (!importedCharacter) {
                console.error('Error importing character');
                return;
            }
            set((state) => ({characters: [...state.characters, importedCharacter]}));
        },
    })
);

export default useCharacterStore;