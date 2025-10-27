import { Card, Typography, Button, Divider, Stack, Box } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";

export default function WinnerCard({ displayNumber, winner, rolling, onDraw, onReset }) {
    return (
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 6, textAlign: "center" }}>
            <Typography variant="h6" sx={{ fontFamily: "Georgia, serif", mb: 1 }}>
                Resultado
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <Box sx={{
                    width: 160, height: 160, borderRadius: "50%",
                    background: "radial-gradient(circle at 30% 20%, #FFF, #F0EAD6)",
                    display: "flex", justifyContent: "center", alignItems: "center",
                    boxShadow: 4
                }}>
                    <Typography variant="h2" sx={{
                        fontFamily: "Courier New, monospace",
                        fontWeight: 800,
                        transform: rolling ? "scale(1.05)" : winner !== null ? "scale(1.15)" : "scale(1)",
                        transition: "transform 0.4s"
                    }}>
                        {displayNumber}
                    </Typography>
                </Box>
            </Box>

            {winner !== null ? (
                <Box sx={{ py: 1 }}>
                    <Typography variant="h5" sx={{ fontFamily: "Georgia, serif" }}>
                        Ganhador: número {winner}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Parabéns! 🎉
                    </Typography>
                </Box>
            ) : (
                <Typography variant="body2" color="text.secondary">
                    Pressione para iniciar o sorteio.
                </Typography>
            )}

            <Divider sx={{ my: 2 }} />

            <Stack direction="row" spacing={1} justifyContent="center">
                <Button variant="outlined" onClick={onReset}>Resetar</Button>
                <Button
                    variant="contained"
                    startIcon={<CasinoIcon />}
                    onClick={onDraw}
                    disabled={rolling}
                    sx={{ background: "linear-gradient(90deg,#F6B26B,#F28E2B)" }}
                >
                    Sortear Novamente
                </Button>
            </Stack>
        </Card>
    );
}
