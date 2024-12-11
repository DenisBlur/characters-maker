import {FC} from "react";
import Character from "../Character.ts";
import {Button, Card, CardActions, CardContent, Divider, List, Typography} from "@mui/material";
import useCharacterStore from "../store";
import CharacterStatInfo from "./character_stat_info.tsx";
import CharacterSkillInfo from "./character_skill_info.tsx";

interface Props {
    character: Character;
}


const CharacterCard: FC<Props> = ({character}) => {

    const {updateCharacter, removeCharacter} = useCharacterStore();

    const handleUpdateSkill = (key: string, value: number) => {
        character.updateSkillLevel(key, value);
        updateCharacter(character)
    }

    const handleAddStats = (key: string) => {
        character.updateStatLevel(key, 1);
        updateCharacter(character)
    }

    const handleRemoveStats = (key: string) => {
        character.updateStatLevel(key, -1);
        updateCharacter(character)
    }

    const handleTakeDamage = () => {
        character.handleDamage();
        updateCharacter(character)
    }

    const handleRemoveCharacter = () => {
        removeCharacter(character.id);
    }

    const handleExportCharacter = () => {
        const characterJson = character.toJSON();
        const blob = new Blob([characterJson], {type: "application/json"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${character.name}.json`;
        a.click();
    }

    return (
        <Card sx={{minWidth: 550, maxHeight: "90vh", overflowY: "auto"}}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {character.name}
                </Typography>
                <List>
                    {Object.keys(character.stats).map((value) => {
                        const statItem = character.stats[value];
                        const skills = character.getSkillsByStat(value);
                        return (
                            <>
                                <CharacterStatInfo
                                    key={value}
                                    addStat={() => handleAddStats(value)}
                                    removeStat={() => handleRemoveStats(value)}
                                    statItem={statItem}/>
                                <Divider/>

                                {skills.map((skill) => {
                                    return (
                                        <CharacterSkillInfo key={skill.name} character={character} skill={skill}
                                                            handleUpdateSkill={handleUpdateSkill} stat={statItem}/>
                                    )
                                })}
                            </>
                        )
                    })}
                </List>
            </CardContent>
            <CardActions>
                <Button variant="outlined" onClick={handleTakeDamage}>Damage</Button>
                <Button variant="outlined" onClick={handleExportCharacter}>Export</Button>
                <Button variant="outlined" onClick={handleRemoveCharacter}>Remove</Button>
            </CardActions>
        </Card>
    )
}


export default CharacterCard;