import {StatEntity} from "../entity.tsx";
import {FC} from "react";
import {ButtonGroup, IconButton, ListItem, ListItemText} from "@mui/material";
import {PlusOneOutlined, Remove} from "@mui/icons-material";

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

export default CharacterStatInfo;