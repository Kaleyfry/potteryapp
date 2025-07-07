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

  const maskEmail = (email) => {
    if (!email) return "";
    const [local, domain] = email.split("@");
    if (!domain) return email; // fallback for malformed email

    // Mask local part: first char + *** + last char
    const maskedLocal =
      local.length >= 2
        ? `${local[0]}***${local[local.length - 1]}`
        : `${local[0]}***`;

    // Split domain
    const domainParts = domain.split(".");
    const domainName = domainParts[0];
    const tld = domainParts.slice(1).join(".");

    // Mask domain: first char + ***
    const maskedDomainName = domainName
      ? `${domainName[0]}***`
      : "***";

    return `${maskedLocal}@${maskedDomainName}${tld ? "." + tld : ""}`;
  };

  const formatDate = (orderDate) => {
    if (!orderDate) return "N/A";
    const isoString = orderDate.replace(" ", "T");
    const date = new Date(isoString + "Z");
    return date.toLocaleString("en-US", {
      timeZone: "America/New_York",
      hour12: true,
    });
  };

  return (
    <div
      style={{
        padding: "20px 20px 0 0",
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        alignItems: "flex-start",
      }}
    >
      {list.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "16px",
            width: "250px",
            backgroundColor: "#fafafa",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
          }}
        >
          <p style={{ fontWeight: "bold", fontSize: "16px", margin: "0 0 8px" }}>
            Order #{p.orderId}
          </p>
          <p style={{ margin: "4px 0" }}>
            <strong>Name:</strong> {p.name}
          </p>
          <p style={{ margin: "4px 0" }}>
            <strong>Measurement:</strong> {p.length}x{p.width}x{p.height}
          </p>
          <p style={{ margin: "4px 0" }}>
            <strong>Price:</strong> ${p.price.toFixed(2)}
          </p>
          <p style={{ margin: "4px 0" }}>
            <strong>Email:</strong> {maskEmail(p.email)}
          </p>
          <p style={{ margin: "4px 0", fontSize: "12px", color: "#555" }}>
            Submitted: {formatDate(p.orderDate)} EST
          </p>
        </div>
      ))}
    </div>
  );
}
