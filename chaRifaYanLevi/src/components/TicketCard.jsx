import { Card, CardMedia, CardContent, Typography, Box, Button, Stack, Tooltip } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";

export default function TicketCard({ image, onDraw, rolling, balls = [] }) {
    return (
        <Card sx={{ width: { xs: "100%", md: "40%" }, borderRadius: 3, boxShadow: 6, overflow: "hidden" }}>
            <Box sx={{ position: "relative" }}>
                {/* Imagem */}
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

                {/* Bolinhas dinâmicas */}
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        display: "grid",
                        gridTemplateColumns: "repeat(5, auto)",  // Altere para 5 por linha
                        justifyContent: "center",
                        alignContent: "center",
                        gap: "6px",
                        pointerEvents: "none",
                    }}
                >
                    {balls.map((ball, index) => (
                        <Tooltip
                            key={index}
                            title={ball.name || "Participante desconhecido"}
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
                                    width: 33, // tamanho da bolinha
                                    height: 33,
                                    borderRadius: "50%",
                                    bgcolor: ball.status === "ok" ? "#4CAF50" : "#E57373",
                                    boxShadow: 2,
                                    pointerEvents: "auto",
                                    transition: "transform 0.2s ease",
                                    cursor: "pointer",
                                    "&:hover": {
                                        transform: "scale(1.2)",
                                    },
                                }}
                            />
                        </Tooltip>
                    ))}
                </Box>
            </Box>

            {/* Conteúdo inferior */}
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
                        Sortear 0–50
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}
