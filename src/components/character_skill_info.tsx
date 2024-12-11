import {SkillEntity, StatEntity} from "../entity.tsx";
import Character from "../Character.ts";
import {FC} from "react";
import {ListItemText, Slider} from "@mui/material";

interface SkillProps {
    skill: SkillEntity;
    stat: StatEntity
    character: Character;
    handleUpdateSkill: (key: string, value: number) => void;
}

const CharacterSkillInfo: FC<SkillProps> = ({skill, stat, character, handleUpdateSkill}) => {
    return (
        <div>
            <ListItemText primary={skill.name} secondary={character.getSkillLevelName(skill)}/>
            <Slider
                value={skill.level == 0 ? -1 : skill.level}
                step={1}
                onChange={(_, v) => handleUpdateSkill(skill.name, v as number)}
                min={skill.level == 0 ? -1 : 0}
                max={Math.min(stat.level, character.maxSkillLevel)}
                valueLabelDisplay="auto"
            />
        </div>
    )
}

export default CharacterSkillInfo;