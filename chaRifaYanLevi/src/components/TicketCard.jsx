import { Card, CardMedia, CardContent, Typography, Box, Button, Stack, Tooltip } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";

export default function TicketCard({ image, onDraw, rolling, balls = [], onBallClick }) {
    return (
        <Card sx={{ width: { xs: "100%", md: "40%" }, borderRadius: 3, boxShadow: 6, overflow: "hidden" }}>
            <Box sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    image={image}
                    alt="Ticket Safari"
                    sx={{
                        height: { xs: 320, md: 600 },
                        objectFit: "cover",
                        width: "100%",
                        display: "block",
                    }}
                />

                {/* Bolinhas */}
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        display: "grid",
                        gridTemplateColumns: "repeat(5, auto)",
                        justifyContent: "center",
                        alignContent: "center",
                        gap: "6px",
                    }}
                >
                    {balls.map((ball) => (
                        <Tooltip
                            key={ball.id}
                            title={ball.participante?.nome || "Número disponível"}
                            placement="top"
                            arrow
                            componentsProps={{
                                tooltip: {
                                    sx: {
                                        bgcolor: "#7DA17F",
                                        color: "white",
                                        fontSize: "0.8rem",
                                        fontFamily: "Georgia, serif",
                                    },
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    width: 33,
                                    height: 33,
                                    borderRadius: "50%",
                                    bgcolor: ball.foiEscolhido ? "#E57373" : "#4CAF50",
                                    boxShadow: 2,
                                    transition: "transform 0.2s ease",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "0.75rem",
                                    fontWeight: "bold",
                                    color: "white",
                                    "&:hover": { transform: "scale(1.2)" },
                                }}
                                onClick={() => onBallClick(ball.numero)}
                            >
                                {ball.numero}
                            </Box>
                        </Tooltip>
                    ))}
                </Box>
            </Box>

            <CardContent sx={{ background: "linear-gradient(180deg,#fff, #FEF8EE)" }}>
                <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                        Bem-vindos à rifa do Yan Levi — boa sorte!
                    </Typography>

                    <Button
                        variant="contained"
                        startIcon={<CasinoIcon />}
                        onClick={onDraw}
                        disabled={rolling}
                        sx={{
                            borderRadius: 4,
                            px: 3,
                            py: 1.2,
                            boxShadow: 4,
                            background: "linear-gradient(90deg,#7DA17F,#A6D29A)",
                        }}
                    >
                        Sortear
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}
