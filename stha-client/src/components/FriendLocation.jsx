import { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

export default function FriendLocation() {
  const [location, setLocation] = useState(null);

  const findFriend = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6">Find Friend Location</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={findFriend}>
          Get Location
        </Button>
        {location && (
          <Typography sx={{ mt: 2 }}>
            Lat: {location.lat}, Lng: {location.lng}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
