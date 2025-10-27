import { Container, Typography, Box } from "@mui/material";

export default function Participants() {
    return (
        <Container sx={{ py: 6, textAlign: "center" }}>
            <Typography variant="h4" sx={{ mb: 2, fontFamily: "Georgia, serif" }}>
                Participantes
            </Typography>
            <Box sx={{ py: 10 }}>
                <Typography variant="h6" color="text.secondary">
                    🚧 Página em desenvolvimento...
                </Typography>
            </Box>
        </Container>
    );
}
