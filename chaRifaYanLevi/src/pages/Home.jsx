import { useState, useEffect, useRef } from "react";
import { Container, Stack, Box } from "@mui/material";
import confetti from "canvas-confetti";
import TicketCard from "../components/TicketCard";
import WinnerCard from "../components/WinnerCard";
import ParticipantDrawer from "../components/ParticipantDrawer";
import safariImage from "../assets/imagem-safari.jpg";
import clickSound from "../assets/sounds/roleta-normal.mp3"

export default function Home() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [participants, setParticipants] = useState(["Ana", "Lucas", "Mariana", "Pedro"]);
    const [newParticipant, setNewParticipant] = useState("");
    const [winner, setWinner] = useState(null);
    const [rolling, setRolling] = useState(false);
    const [displayNumber, setDisplayNumber] = useState(0);
    const confettiRef = useRef(null);
    const clickAudio = useRef(new Audio(clickSound));

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

    const handleAddParticipant = () => {
        if (!newParticipant.trim()) return;
        setParticipants((prev) => [...prev, newParticipant.trim()]);
        setNewParticipant("");
    };

    const handleDraw = () => {
        if (rolling) return;
        clickAudio.current.play();
        setRolling(true);
        setWinner(null);

        const target = Math.floor(Math.random() * 51);
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

    const [balls] = useState([
        { id: 1, name: "Alefe", status: "ok" },
        { id: 2, name: "Thaylane", status: "ok" },
        { id: 3, name: "Ayron", status: "error" },
        { id: 4, name: "Yan", status: "ok" },
        { id: 5, status: "error" },
        { id: 6, status: "ok" },
        { id: 7, status: "error" },
        { id: 8, status: "ok" },
        { id: 9, status: "ok" },
        { id: 10, status: "error" },
        { id: 11, status: "ok" },
        { id: 12, status: "error" },
        { id: 13, status: "ok" },
        { id: 14, status: "ok" },
        { id: 15, status: "error" },
        { id: 16, status: "ok" },
        { id: 17, status: "error" },
        { id: 18, status: "ok" },
        { id: 19, status: "ok" },
        { id: 20, status: "error" },
        { id: 21, status: "ok" },
        { id: 22, status: "ok" },
        { id: 23, status: "error" },
        { id: 24, status: "ok" },
        { id: 25, status: "ok" },
        { id: 26, status: "error" },
        { id: 27, status: "ok" },
        { id: 28, status: "ok" },
        { id: 29, status: "error" },
        { id: 30, status: "ok" },
        { id: 31, status: "ok" },
        { id: 32, status: "error" },
        { id: 33, status: "ok" },
        { id: 34, status: "ok" },
        { id: 35, status: "error" },
        { id: 36, status: "ok" },
        { id: 37, status: "ok" },
        { id: 38, status: "error" },
        { id: 39, status: "ok" },
        { id: 40, status: "ok" },
        { id: 41, status: "error" },
        { id: 42, status: "ok" },
        { id: 43, status: "ok" },
        { id: 44, status: "error" },
        { id: 45, status: "ok" },
        { id: 46, status: "ok" },
        { id: 47, status: "error" },
        { id: 48, status: "ok" },
        { id: 49, status: "ok" },
        { id: 50, status: "error" },
    ]);


    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#FFF8F0" }}>
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={4} alignItems="center" justifyContent="center">
                    <TicketCard image={safariImage} onDraw={handleDraw} rolling={rolling} balls={balls} />
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

            <ParticipantDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                participants={participants}
                newParticipant={newParticipant}
                setNewParticipant={setNewParticipant}
                addParticipant={handleAddParticipant}
            />
        </Box>
    );
}
