import { useState, useEffect } from "react";
import axios from "axios";
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    Stack,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
} from "@mui/material";

export default function Participants() {
    const [participants, setParticipants] = useState([]);
    const [newName, setNewName] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingList, setLoadingList] = useState(false);

    const API_BASE = "https://localhost:7014/chaRifa/participante";

    // 🔹 Buscar participantes cadastrados
    const fetchParticipants = async () => {
        setLoadingList(true);
        try {
            const response = await axios.get(API_BASE);
            setParticipants(response.data || []);
        } catch (error) {
            console.error("Erro ao buscar participantes:", error);
        } finally {
            setLoadingList(false);
        }
    };

    useEffect(() => {
        fetchParticipants();
    }, []);

    // 🔹 Cadastrar novo participante
    const handleAddParticipant = async (e) => {
        e.preventDefault();
        if (!newName.trim()) return;

        setLoading(true);
        try {
            await axios.post(`${API_BASE}/${encodeURIComponent(newName.trim())}`);
            setNewName("");
            fetchParticipants(); // Atualiza lista
        } catch (error) {
            console.error("Erro ao cadastrar participante:", error);
            alert("Não foi possível cadastrar o participante.");
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Função auxiliar para formatar a data/hora
    const formatDateTime = (isoString) => {
        try {
            return new Intl.DateTimeFormat("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
            })
                .format(new Date(isoString))
                .replace(",", " às "); // substitui a vírgula por " às "
        } catch {
            return isoString;
        }
    };

    return (
        <Container sx={{ pt: 12, pb: 12, minHeight: "100vh" }}>
            <Typography
                variant="h4"
                sx={{ mb: 4, fontFamily: "Georgia, serif", textAlign: "center" }}
            >
                Participantes
            </Typography>

            {/* 🔹 Formulário de cadastro */}
            <Paper sx={{ p: 3, mb: 5, maxWidth: 500, mx: "auto" }} elevation={10}>
                <form onSubmit={handleAddParticipant}>
                    <Stack spacing={2}>
                        <TextField
                            label="Nome do participante"
                            variant="outlined"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            fullWidth
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{
                                background: "linear-gradient(90deg,#7DA17F,#A6D29A)",
                                fontWeight: "bold",
                                borderRadius: 3,
                            }}
                        >
                            {loading ? "Enviando..." : "Cadastrar"}
                        </Button>
                    </Stack>
                </form>
            </Paper>

            {/* 🔹 Lista de participantes */}
            <Box sx={{ mb: 6, display: "flex", justifyContent: "center" }}>
                {loadingList ? (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : participants.length === 0 ? (
                    <Typography color="text.secondary" align="center">
                        Nenhum participante cadastrado ainda.
                    </Typography>
                ) : (
                    <TableContainer
                        component={Paper}
                        sx={{
                            maxWidth: 450,
                            width: "100%",
                            boxShadow: 4,
                            borderRadius: 3,
                            maxHeight: "60vh",
                            overflowY: "auto",
                        }}
                    >
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#A6D29A" }}>
                                    <TableCell sx={{ fontWeight: "bold" }}>Nome</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Data de Cadastro</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {participants.map((p, index) => (
                                    <TableRow
                                        key={p.id || index}
                                        sx={{
                                            backgroundColor: index % 2 === 0 ? "#F9FAF6" : "#F2F8F2",
                                        }}
                                    >
                                        <TableCell sx={{ fontWeight: 500 }}>{p.nome}</TableCell>
                                        <TableCell>{formatDateTime(p.dataHoraCadastro)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </Container>
    );
}
