import { useState, useEffect, useRef } from "react";
import { Container, Stack, Box, Dialog, DialogTitle, DialogContent, List, ListItemButton, ListItemText, CircularProgress, Typography } from "@mui/material";
import confetti from "canvas-confetti";
import TicketCard from "../components/TicketCard";
import WinnerCard from "../components/WinnerCard";
import safariImage from "../assets/imagem-safari.jpg";
import clickSound from "../assets/sounds/roleta-normal.mp3";

export default function Home() {
    const [winner, setWinner] = useState(null);
    const [rolling, setRolling] = useState(false);
    const [displayNumber, setDisplayNumber] = useState(0);
    const [balls, setBalls] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [loadingParticipants, setLoadingParticipants] = useState(false);
    const confettiRef = useRef(null);
    const clickAudio = useRef(new Audio(clickSound));

    // Função para buscar bolas
    const fetchBalls = async () => {
        try {
            const response = await fetch("https://localhost:7014/chaRifa/sorteio");
            if (!response.ok) throw new Error("Erro ao buscar dados da rifa");
            const data = await response.json();
            setBalls(data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    // Busca inicial
    useEffect(() => {
        fetchBalls();
    }, []);

    // Canvas de confete
    useEffect(() => {
        const canvas = document.createElement("canvas");
        canvas.style.position = "fixed";
        canvas.style.pointerEvents = "none";
        canvas.style.left = "0";
        canvas.style.top = "0";
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
        confettiRef.current = canvas;
        return () => document.body.removeChild(canvas);
    }, []);

    const launchConfetti = () => {
        const myConfetti = confetti.create(confettiRef.current, { resize: true });
        myConfetti({ particleCount: 250, spread: 160, origin: { y: 0.35 } });
    };

    const handleDraw = () => {
        if (rolling) return;
        clickAudio.current.play();
        setRolling(true);
        setWinner(null);

        const target = Math.floor(Math.random() * balls.length) + 1;
        const duration = 10000;
        const start = Date.now();

        const step = () => {
            const t = Math.min(1, (Date.now() - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplayNumber(Math.round(eased * target));
            if (t < 1) requestAnimationFrame(step);
            else {
                setWinner(target);
                setRolling(false);
                launchConfetti();
            }
        };
        requestAnimationFrame(step);
    };

    // ------------------------------
    // Clique em uma bolinha
    // ------------------------------
    const handleBallClick = async (numero) => {
        setSelectedNumber(numero);
        setOpenModal(true);
        setLoadingParticipants(true);
        try {
            const res = await fetch("https://localhost:7014/chaRifa/participante");
            const data = await res.json();
            setParticipants(data);
        } catch (err) {
            console.error("Erro ao buscar participantes:", err);
        } finally {
            setLoadingParticipants(false);
        }
    };

    // ------------------------------
    // Escolher participante
    // ------------------------------
    const handleSelectParticipant = async (participanteId) => {
        if (!selectedNumber) return;
        try {
            const res = await fetch("https://localhost:7014/chaRifa/sorteio", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ParticipanteId: participanteId,
                    Numero: selectedNumber
                }),
            });

            if (!res.ok) throw new Error("Erro ao atualizar sorteio");

            // Fecha modal e atualiza lista
            setOpenModal(false);
            setSelectedNumber(null);
            await fetchBalls();
        } catch (error) {
            console.error("Erro ao atualizar sorteio:", error);
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#FFF8F0" }}>
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={4} alignItems="center" justifyContent="center">
                    <TicketCard
                        image={safariImage}
                        onDraw={handleDraw}
                        rolling={rolling}
                        balls={balls}
                        onBallClick={handleBallClick} // <<< novo evento
                    />
                    <Box sx={{ width: { xs: "100%", md: "38%" } }}>
                        <WinnerCard
                            displayNumber={displayNumber}
                            winner={winner}
                            rolling={rolling}
                            onDraw={handleDraw}
                            onReset={() => { setDisplayNumber(0); setWinner(null); }}
                        />
                    </Box>
                </Stack>
            </Container>

            {/* Modal de seleção de participante */}
            <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="xs" fullWidth>
                <DialogTitle>Selecione um participante</DialogTitle>
                <DialogContent>
                    {loadingParticipants ? (
                        <Box display="flex" justifyContent="center" py={3}>
                            <CircularProgress />
                        </Box>
                    ) : participants.length === 0 ? (
                        <Typography align="center" color="text.secondary" py={2}>
                            Nenhum participante encontrado
                        </Typography>
                    ) : (
                        <List>
                            {participants.map((p) => (
                                <ListItemButton key={p.id} onClick={() => handleSelectParticipant(p.id)}>
                                    <ListItemText primary={p.nome} secondary={`ID: ${p.id}`} />
                                </ListItemButton>
                            ))}
                        </List>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}
