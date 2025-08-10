import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "linear-gradient(to bottom right, #4facfe, #00f2fe)",
        background:
          "linear-gradient(135deg, rgba(79,172,254,1) 0%, rgba(0,242,254,1) 100%)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
          color: "#fff",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Smart Travel Help Agent
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button
            variant="contained"
            sx={{
              ml: 2,
              bgcolor: "#ff9800",
              "&:hover": { bgcolor: "#e68a00" },
            }}
            onClick={() => navigate("/register")}
          >
            Sign Up
          </Button>
        </Box>
      </Box>

      {/* Hero Section */}
      <Container
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#fff",
          py: 8,
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            mb: 2,
            textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          Your AI Travel Companion
        </Typography>
        <Typography
          variant="h6"
          sx={{
            maxWidth: "700px",
            mb: 4,
            opacity: 0.9,
          }}
        >
          Plan smarter, travel safer, and explore more with AI-powered guidance
          tailored to your style and needs.
        </Typography>
        <Box>
          <Button
            variant="contained"
            size="large"
            sx={{
              mr: 2,
              bgcolor: "#ff9800",
              "&:hover": { bgcolor: "#e68a00" },
            }}
            onClick={() => navigate("/register")}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              color: "#fff",
              borderColor: "#fff",
              "&:hover": { borderColor: "#ff9800", color: "#ff9800" },
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ textAlign: "center", p: 2, color: "#fff", opacity: 0.7 }}>
        © {new Date().getFullYear()} Smart Travel Help Agent. All rights
        reserved.
      </Box>
    </Box>
  );
}
