import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";

export default function Header() {
    return (
        <AppBar position="static" sx={{ background: "linear-gradient(90deg,#7DA17F,#C6D6B8)", width: "100vw" }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: "Georgia, serif" }}>
                    Chá Rifa do Yan Levi
                </Typography>

                <Button color="inherit" startIcon={<PeopleIcon />} component={Link} to="/participantes">
                    Participantes
                </Button>
            </Toolbar>
        </AppBar>
    );
}
