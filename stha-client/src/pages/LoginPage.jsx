import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  Paper,
} from "@mui/material";
import users from "../data/users.json";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
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
          Welcome Back
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ mb: 3, color: "text.secondary" }}
        >
          Sign in to continue your Smart Travel Help Agent experience
        </Typography>

        <TextField
          fullWidth
          label="Email Address"
          type="email"
          variant="outlined"
          sx={{ mb: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          sx={{ mb: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Remember me"
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{
            backgroundColor: "#1e88e5",
            ":hover": { backgroundColor: "#1565c0" },
            mb: 2,
          }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Button variant="text" fullWidth onClick={() => navigate("/register")}>
          Don’t have an account? Register
        </Button>
      </Paper>
    </Box>
  );
}
