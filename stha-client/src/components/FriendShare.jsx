import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase";

export default function FriendShare() {
  const [trips, setTrips] = useState([]);
  const [newTripName, setNewTripName] = useState("");
  const [friendName, setFriendName] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expensePaidBy, setExpensePaidBy] = useState("");
  const [tripDate, setTripDate] = useState("");

  // Load trips from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "trips"), (snapshot) => {
      setTrips(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  // Add a new trip
  const handleAddTrip = async () => {
    if (!newTripName.trim()) return;
    await addDoc(collection(db, "trips"), {
      tripName: newTripName,
      friends: [],
      expenses: [],
      planDate: "",
      confirmations: {},
    });
    setNewTripName("");
  };

  // Add friend to trip
  const handleAddFriend = async (tripId) => {
    if (!friendName.trim()) return;
    const tripRef = doc(db, "trips", tripId);
    await updateDoc(tripRef, {
      friends: arrayUnion(friendName),
      [`confirmations.${friendName}`]: false,
    });
    setFriendName("");
  };

  // Add expense to trip
  const handleAddExpense = async (tripId) => {
    if (!expenseName.trim() || !expenseAmount || !expensePaidBy.trim()) return;
    const tripRef = doc(db, "trips", tripId);
    await updateDoc(tripRef, {
      expenses: arrayUnion({
        name: expenseName,
        amount: parseFloat(expenseAmount),
        paidBy: expensePaidBy,
      }),
    });
    setExpenseName("");
    setExpenseAmount("");
    setExpensePaidBy("");
  };

  // Set trip date
  const handleSetDate = async (tripId) => {
    if (!tripDate) return;
    const tripRef = doc(db, "trips", tripId);
    await updateDoc(tripRef, { planDate: tripDate });
    setTripDate("");
  };

  // Confirm trip by friend
  const handleConfirmTrip = async (tripId, friend) => {
    const tripRef = doc(db, "trips", tripId);
    await updateDoc(tripRef, {
      [`confirmations.${friend}`]: true,
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Trip Collaboration
      </Typography>

      {/* Add new trip */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <TextField
            label="New Trip Name"
            value={newTripName}
            onChange={(e) => setNewTripName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" onClick={handleAddTrip} fullWidth>
            Add Trip
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ marginY: 3 }} />

      {/* Show trips */}
      {trips.map((trip) => (
        <Card key={trip.id} sx={{ marginBottom: 3 }}>
          <CardContent>
            <Typography variant="h5">{trip.tripName}</Typography>
            <Typography variant="subtitle1">
              Date: {trip.planDate || "Not set"}
            </Typography>

            {/* Add friend */}
            <Grid container spacing={2} alignItems="center" sx={{ marginY: 1 }}>
              <Grid item xs={4}>
                <TextField
                  label="Friend Name"
                  value={friendName}
                  onChange={(e) => setFriendName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  onClick={() => handleAddFriend(trip.id)}
                >
                  Add Friend
                </Button>
              </Grid>

              {/* Set Date */}
              <Grid item xs={4}>
                <TextField
                  type="date"
                  value={tripDate}
                  onChange={(e) => setTripDate(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  onClick={() => handleSetDate(trip.id)}
                >
                  Set Date
                </Button>
              </Grid>
            </Grid>

            {/* Friends list & confirmation */}
            <Typography variant="subtitle2">Friends:</Typography>
            {trip.friends.map((f, idx) => (
              <div
                key={idx}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <span>{f}</span>
                {trip.confirmations?.[f] ? (
                  <span style={{ color: "green" }}>✔ Confirmed</span>
                ) : (
                  <Button
                    size="small"
                    onClick={() => handleConfirmTrip(trip.id, f)}
                  >
                    Confirm
                  </Button>
                )}
              </div>
            ))}

            <Divider sx={{ marginY: 2 }} />

            {/* Expenses section */}
            <Typography variant="subtitle2">Expenses:</Typography>
            {trip.expenses.length > 0 ? (
              trip.expenses.map((exp, idx) => (
                <div key={idx}>
                  {exp.name} - ₹{exp.amount} (Paid by {exp.paidBy})
                </div>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No expenses added yet
              </Typography>
            )}

            {/* Add expense */}
            <Grid
              container
              spacing={1}
              alignItems="center"
              sx={{ marginTop: 1 }}
            >
              <Grid item xs={3}>
                <TextField
                  label="Expense Name"
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Amount"
                  type="number"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Paid By"
                  value={expensePaidBy}
                  onChange={(e) => setExpensePaidBy(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  onClick={() => handleAddExpense(trip.id)}
                  fullWidth
                >
                  Add Expense
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
