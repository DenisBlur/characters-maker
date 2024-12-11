import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
    onAdd: (name: string) => void;
}

const FormDialog: React.FC<Props> = ({onAdd}) => {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState<string>('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
                Добавить персонажа
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        if (name.trim() != "") {
                            onAdd(name);
                            handleClose();
                        }
                    },
                }}
            >
                <DialogTitle>Character maker</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Придумайте имя для своего персонажа
                    </DialogContentText>
                    <TextField
                        onChange={event => setName(event.target.value)}
                        autoFocus
                        required
                        name="name"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default FormDialog;