import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    alert(`Registration successful for ${name}! (Not saved yet)`);
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1e88e5, #42a5f5)",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: 500,
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1e88e5" }}
        >
          Create an Account
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ mb: 3, color: "text.secondary" }}
        >
          Join Smart Travel Help Agent and start your journey today!
        </Typography>

        <TextField
          fullWidth
          label="Full Name"
          variant="outlined"
          sx={{ mb: 2 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          sx={{ mb: 2 }}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          fullWidth
          label="Contact Number"
          variant="outlined"
          sx={{ mb: 2 }}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <TextField
          fullWidth
          label="Email Address"
          variant="outlined"
          sx={{ mb: 3 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{
            backgroundColor: "#1e88e5",
            ":hover": { backgroundColor: "#1565c0" },
          }}
          onClick={handleRegister}
        >
          Register
        </Button>

        <Button
          variant="text"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </Button>
      </Paper>
    </Box>
  );
}
