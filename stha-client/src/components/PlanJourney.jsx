import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Divider,
  Paper,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import api from "../services/api";

export default function PlanJourney() {
  const [destination, setDestination] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [travelers, setTravelers] = useState(1); // new field
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!destination || !from || !to || travelers < 1) {
      alert("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/plan", {
        destination,
        from,
        to,
        travelers,
      });
      setPlan(res.data);
    } catch (error) {
      alert("Failed to generate itinerary");
    }
    setLoading(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ borderRadius: 4, boxShadow: 5 }}>
        {/* Header */}
        <Box
          sx={{
            p: 3,
            background: "linear-gradient(135deg, #1e88e5, #42a5f5)",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          <FlightTakeoffIcon fontSize="large" />
          <Typography variant="h5" fontWeight="bold">
            Plan Your Journey
          </Typography>
        </Box>

        {/* Content */}
        <CardContent>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Enter your destination, travel dates, and number of travelers. Our
            AI will create a detailed itinerary for your group.
          </Typography>

          <TextField
            fullWidth
            label="Destination"
            variant="outlined"
            sx={{ mb: 2 }}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <TextField
                type="date"
                fullWidth
                label="From"
                InputLabelProps={{ shrink: true }}
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="date"
                fullWidth
                label="To"
                InputLabelProps={{ shrink: true }}
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            type="number"
            label="Number of Travelers"
            variant="outlined"
            sx={{ mb: 2 }}
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
            inputProps={{ min: 1 }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              py: 1.5,
              fontSize: "1rem",
              backgroundColor: "#1e88e5",
              ":hover": { backgroundColor: "#1565c0" },
            }}
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Itinerary"}
          </Button>

          {plan && (
            <Paper
              elevation={3}
              sx={{
                mt: 4,
                p: 3,
                borderRadius: 3,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, color: "#1e88e5" }}>
                Your AI-Powered Travel Plan
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography variant="subtitle1" fontWeight="bold">
                Number of Travelers:
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {travelers}
              </Typography>

              <Typography variant="subtitle1" fontWeight="bold">
                Ticket Price Comparison:
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {plan.ticketPrices || "Data not available"}
              </Typography>

              <Typography variant="subtitle1" fontWeight="bold">
                Must-Visit Places:
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {plan.mustVisit || "Data not available"}
              </Typography>

              <Typography variant="subtitle1" fontWeight="bold">
                Suggested Itinerary:
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {plan.itinerary || "Data not available"}
              </Typography>

              <Typography variant="subtitle1" fontWeight="bold">
                Packing Suggestions:
              </Typography>
              <Typography variant="body2">
                {plan.packingList || "Data not available"}
              </Typography>
            </Paper>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
