import {CharacterStats, SkillEntity} from "./entity.tsx";
import {createBaseSkills, createBaseStats} from "./store";

export type SkillLevelName =
    | "Нетренированный"
    | "Новичок"
    | "Ученик"
    | "Адепт"
    | "Эксперт"
    | "Мастер";

export type CharacterProps = {
    name: string;
    stats: CharacterStats;
    skills: SkillEntity[];
};

export class Character {

    id: string;
    name: string;
    stats: CharacterStats;
    skills: SkillEntity[];

    private _maxSkillLevel: number = 5;

    constructor(id: string, props: Partial<CharacterProps> = {}) {

        const {name, stats, skills} = props;

        this.id = id;
        this.name = name || '';
        this.stats = stats || createBaseStats();
        this.skills = skills || createBaseSkills();

        this.applyCalculatedStats();
    }

    static skillLevelName: SkillLevelName[] = [
        "Нетренированный",
        "Новичок",
        "Ученик",
        "Адепт",
        "Эксперт",
        "Мастер",
    ];

    get maxSkillLevel(): number {
        return this._maxSkillLevel;
    }
    getSkillLevelName(skill: SkillEntity): string {
        return Character.skillLevelName[skill.level];
    }

    getSkillsByStat(key: string): SkillEntity[] {
        return this.skills.filter((skill: SkillEntity) => key === skill.baseStat);
    }

    updateStatLevel(stat: string, value: number): void {
        if (this.stats[stat] !== undefined) {
            this.stats[stat].level = Math.max(0, this.stats[stat]?.level + value || 0);
            this.applyCalculatedStats();
        } else {
            console.warn(`Стат "${stat}" не найден в персонаже.`);
        }
    }

    updateSkillLevel(skillName: string, value: number): void {
        const skill = this.skills.find((s) => s.name === skillName);
        if (skill && this.stats[skill.baseStat] !== undefined) {
            skill.level = Math.min(this._maxSkillLevel, value, this.stats[skill.baseStat].level);
        }
    }

    handleDamage(): void {
        if (this.stats.health.level == 0) {
            this.applyCalculatedStats();
            return;
        }
        this.stats.health.level = Math.max(0, this.stats.health.level - 1 || 0);
    }

    calculatedStats(): { health: number; dodge: number; energy: number } {
        return {
            health: 3 + (this.stats.strength.level || 0),
            dodge: 10 + (this.stats.dexterity.level || 0),
            energy: (this.stats.dexterity.level || 0) + (this.stats.intelligence.level || 0),
        };
    }

    applyCalculatedStats(): void {
        const calculated = this.calculatedStats();
        this.stats.health.level = calculated.health;
        this.stats.dodge.level = calculated.dodge;
        this.stats.energy.level = calculated.energy;

        this.skills.forEach((skill: SkillEntity) => {
            this.updateSkillLevel(skill.name, skill.level);
        })
    }

    toJSON(): string {
        return JSON.stringify({
            name: this.name,
            id: this.id,
            skills: this.skills,
            stats: this.stats,
        });
    }

    static fromJSON(jsonString: string): Character | null {
        try {
            const data = JSON.parse(jsonString);
            return new Character(data.id, data);
        } catch (error) {
            console.error('Error parsing character JSON:', error);
            return null;
        }
    }

}

export default Character;