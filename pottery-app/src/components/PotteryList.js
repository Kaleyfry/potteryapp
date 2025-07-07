import React, { useEffect, useState } from "react";

export default function PotteryList({ refresh }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("/pottery")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setList(data);
        } else {
          console.error("Expected an array but got:", data);
          setList([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setList([]);
      });
  }, [refresh]);

  const parseAndFormatDate = (orderDate) => {
    if (!orderDate) return "No Date Provided";

    // Convert DB format (2025-07-06 14:24:04.602) to ISO string
    const isoString = orderDate.replace(" ", "T") + "Z"; // Treat as UTC
    const date = new Date(isoString);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    return date.toLocaleString("en-US", {
      timeZone: "America/New_York",
      hour12: true,
    });
  };

  return (
    <ul>
      {list.map((p) => (
        <li key={p.id}>
          Order Number: {p.orderId}, Name: {p.name}, Measurement of Piece:{" "}
          {p.length}x{p.width}x{p.height}, Total Price: ${p.price.toFixed(2)},
          Email: {p.email}, Submitted on: {parseAndFormatDate(p.orderDate)} EST
        </li>
      ))}
    </ul>
  );
}
