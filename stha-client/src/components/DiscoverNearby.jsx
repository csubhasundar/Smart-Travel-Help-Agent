import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Chip,
  Avatar,
} from "@mui/material";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ParkIcon from "@mui/icons-material/Park";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import StoreIcon from "@mui/icons-material/Store";
import api from "../services/api";

export default function DiscoverNearby() {
  const [location, setLocation] = useState("");
  const [places, setPlaces] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      key: "coffee",
      label: "Coffee",
      icon: <LocalCafeIcon />,
      color: "warning",
    },
    {
      key: "restaurants",
      label: "Restaurants",
      icon: <RestaurantIcon />,
      color: "success",
    },
    { key: "parks", label: "Parks", icon: <ParkIcon />, color: "success" },
    {
      key: "shopping",
      label: "Shopping Malls",
      icon: <ShoppingCartIcon />,
      color: "secondary",
    },
    { key: "grocery", label: "Grocery", icon: <StoreIcon />, color: "info" },
    {
      key: "hospitals",
      label: "Hospitals",
      icon: <LocalHospitalIcon />,
      color: "error",
    },
  ];

  const fetchPlaces = async () => {
    if (!location) {
      alert("Please enter your location first.");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/nearby", { location });
      setPlaces(res.data);
    } catch {
      alert("Failed to fetch data");
    }
    setLoading(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Location Input */}
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <input
          type="text"
          placeholder="Enter city or coordinates"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <Button variant="contained" onClick={fetchPlaces}>
          Search
        </Button>
      </Box>

      {/* Category Chips */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {categories.map((cat) => (
          <Chip
            key={cat.key}
            avatar={<Avatar>{cat.icon}</Avatar>}
            label={cat.label}
            color={selectedCategory === cat.key ? cat.color : "default"}
            onClick={() => setSelectedCategory(cat.key)}
            clickable
            sx={{ fontWeight: "bold" }}
          />
        ))}
      </Box>

      {/* Loading Spinner */}
      {loading && <CircularProgress />}

      {/* Places Display */}
      {!loading && selectedCategory && (
        <Grid container spacing={2}>
          {places[selectedCategory]?.map((place, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <img
                  src={place.image}
                  alt={place.name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                />
                <CardContent>
                  <Typography variant="h6">{place.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ⭐ {place.rating} | {place.distance} km away
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 1 }}
                    href={place.mapUrl}
                    target="_blank"
                  >
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
