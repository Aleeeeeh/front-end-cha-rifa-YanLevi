import {
    Drawer, Box, Typography, Stack, Divider,
    List, ListItem, ListItemText, Avatar, TextField, IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";

export default function ParticipantDrawer({
    open, onClose, participants, newParticipant, setNewParticipant, addParticipant
}) {
    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <Box sx={{ width: 320, p: 2, bgcolor: "#FFFDF8", height: "100%" }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                    <Avatar sx={{ bgcolor: "#7DA17F" }}><PeopleIcon /></Avatar>
                    <Typography variant="h6">Participantes</Typography>
                </Stack>

                <Divider sx={{ mb: 2 }} />

                <List sx={{ maxHeight: "60vh", overflow: "auto" }}>
                    {participants.map((p, i) => (
                        <ListItem key={i} secondaryAction={<Typography variant="caption">#{i + 1}</Typography>}>
                            <ListItemText primary={p} />
                        </ListItem>
                    ))}
                </List>

                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <TextField
                        value={newParticipant}
                        onChange={(e) => setNewParticipant(e.target.value)}
                        placeholder="Adicionar participante"
                        size="small"
                        fullWidth
                    />
                    <IconButton color="primary" onClick={addParticipant} sx={{ bgcolor: "#E9F2E8" }}>
                        <AddIcon />
                    </IconButton>
                </Box>

                <Box sx={{ mt: 3 }}>
                    <Typography variant="caption" color="text.secondary">
                        Total participantes: {participants.length}
                    </Typography>
                </Box>
            </Box>
        </Drawer>
    );
}
