import { useState, useRef } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { VolumeUp, VolumeOff } from "@mui/icons-material";
import bgMusic from "../assets/sounds/safari.mp3";

export default function BackgroundMusic() {
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef(new Audio(bgMusic));

    const toggleMusic = () => {
        const audio = audioRef.current;
        audio.loop = true;
        audio.volume = 0.1;

        if (playing) {
            audio.pause();
        } else {
            audio.play().catch(() => console.log("Usuário precisa interagir primeiro."));
        }

        setPlaying(!playing);
    };

    return (
        <Tooltip title={playing ? "Desligar música" : "Ligar música"}>
            <IconButton
                onClick={toggleMusic}
                sx={{
                    position: "fixed",
                    bottom: 16,
                    right: 16,
                    bgcolor: "#7DA17F",
                    color: "white",
                    boxShadow: 3,
                    "&:hover": { bgcolor: "#6C906E" },
                    zIndex: 1300,
                }}
            >
                {playing ? <VolumeUp /> : <VolumeOff />}
            </IconButton>
        </Tooltip>
    );
}
