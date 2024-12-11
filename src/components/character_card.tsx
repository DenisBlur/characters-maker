import {FC} from "react";
import Character from "../Character.ts";
import {
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Slider,
    Typography
} from "@mui/material";
import useCharacterStore from "../store";
import {PlusOneOutlined, Remove} from "@mui/icons-material";
import {SkillEntity, StatEntity} from "../entity.tsx";

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

interface StatProps {
    statItem: StatEntity
    addStat: () => void
    removeStat: () => void
}

const CharacterStatInfo: FC<StatProps> = ({statItem, addStat, removeStat}) => {
    return (
        <ListItem secondaryAction={
            statItem.edit ?
                <ButtonGroup>
                    <IconButton
                        onClick={addStat}>
                        <PlusOneOutlined/>
                    </IconButton>
                    <IconButton
                        onClick={removeStat}>
                        <Remove/>
                    </IconButton>
                </ButtonGroup> : undefined}>
            <ListItemText primary={statItem.level}/>
            <ListItemText primary={statItem.name}/>
        </ListItem>
    )
}

export default CharacterCard;