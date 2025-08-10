import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function CostAnalysis() {
  const [form, setForm] = useState({
    destination: "",
    days: 1,
    travelers: 1,
    transport: "train",
  });

  const [budget, setBudget] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateBudget = () => {
    const transportCost =
      form.transport === "flight" ? 150 * form.travelers : 50 * form.travelers;

    const foodCost = 20 * form.days * form.travelers;
    const shoppingCost = 30 * form.days * form.travelers;
    const otherCost = 15 * form.days * form.travelers;

    const total = transportCost + foodCost + shoppingCost + otherCost;

    setBudget({
      transport: transportCost,
      food: foodCost,
      shopping: shoppingCost,
      other: otherCost,
      total,
    });
  };

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c43"];

  const chartData = budget
    ? [
        { name: "Transport", value: budget.transport },
        { name: "Food", value: budget.food },
        { name: "Shopping", value: budget.shopping },
        { name: "Other", value: budget.other },
      ]
    : [];

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Trip Cost Analysis
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Destination"
              name="destination"
              value={form.destination}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              type="number"
              label="Days"
              name="days"
              value={form.days}
              onChange={handleChange}
              inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              type="number"
              label="Travelers"
              name="travelers"
              value={form.travelers}
              onChange={handleChange}
              inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Transport"
              name="transport"
              value={form.transport}
              onChange={handleChange}
            >
              <MenuItem value="train">Train</MenuItem>
              <MenuItem value="flight">Flight</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Button variant="contained" sx={{ mt: 2 }} onClick={calculateBudget}>
          Calculate Budget
        </Button>

        {/* Budget Output */}
        {budget && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6">Estimated Budget</Typography>
            <Typography>Destination: {form.destination}</Typography>
            <Typography>Transport: ${budget.transport.toFixed(2)}</Typography>
            <Typography>Food: ${budget.food.toFixed(2)}</Typography>
            <Typography>Shopping: ${budget.shopping.toFixed(2)}</Typography>
            <Typography>Other: ${budget.other.toFixed(2)}</Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Total: ${budget.total.toFixed(2)}
            </Typography>

            {/* Pie Chart */}
            <div style={{ width: "100%", height: 250 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: $${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
