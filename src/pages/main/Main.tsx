import {Button, Stack} from "@mui/material";
import useCharacterStore from "../../store";
import CharacterCard from "../../components/character_card.tsx";
import FormDialog from "../../components/form_dialog.tsx";
import styles from "./styled.module.css"


export const Main = () => {

    const {characters, addCharacter, importCharacter} = useCharacterStore();

    const handleImportCharacter = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) {
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                const characterJson = reader.result as string;
                importCharacter(characterJson);
            };
            reader.readAsText(file);
        };
        input.click();
    }

    return (
        <>
            <div className={styles.buttons}>
                <FormDialog onAdd={addCharacter}/>
                <Button sx={{marginLeft: "16px"}} variant="outlined" onClick={handleImportCharacter}>import</Button>
            </div>
            <Stack direction="row" spacing={2}>
                {characters.map((character, index) => (
                    <CharacterCard character={character} key={index}/>
                ))}
            </Stack>

        </>
    );
}

