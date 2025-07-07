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

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                justifyContent: "center",
                padding: "16px",
            }}
        >
            {list.map((p) => (
                <div
                    key={p.id}
                    style={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                        padding: "16px",
                        width: "280px",
                        backgroundColor: "#fafafa",
                    }}
                >
                    <h3 style={{ margin: "0 0 8px 0" }}>Order: {p.orderId}</h3>
                    <p>
                        <strong>Name:</strong> {p.name}
                    </p>
                    <p>
                        <strong>Size:</strong> {p.length} x {p.width} x {p.height}
                    </p>
                    <p>
                        <strong>Price:</strong> ${p.price.toFixed(2)}
                    </p>
                    <p>
                        <strong>Email:</strong> {p.email}
                    </p>
                    <p>
                        <strong>Submitted:</strong>{" "}
                        {new Date(p.orderDate).toLocaleString("en-US", {
                            timeZone: "America/New_York",
                            hour12: true,
                        })}{" "}
                        EST
                    </p>
                </div>
            ))}
        </div>
    );
}
