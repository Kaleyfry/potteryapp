import React, { useState } from 'react';

export default function PotteryForm({ onAdd }) {
    const [form, setForm] = useState({ name: '', length: '', width: '', height: '', email: '' });

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            ...form,
            length: parseFloat(form.length),
            width: parseFloat(form.width),
            height: parseFloat(form.height)
        };
        fetch('/pottery', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(() => onAdd());
        setForm({ name: '', length: '', width: '', height: '', email: '' });
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center" }}>
            <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                style={{ marginRight: "8px" }}
            />
            <input
                name="length"
                placeholder="Length"
                type="number"
                value={form.length}
                onChange={handleChange}
                style={{ marginRight: "8px" }}
            />
            <input
                name="width"
                placeholder="Width"
                type="number"
                value={form.width}
                onChange={handleChange}
                style={{ marginRight: "8px" }}
            />
            <input
                name="height"
                placeholder="Height"
                type="number"
                value={form.height}
                onChange={handleChange}
                style={{ marginRight: "8px" }}
            />
            <input
                name="email"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={handleChange}
                style={{ marginRight: "8px" }}
            />
            <button type="submit">Add Pottery</button>
        </form>
    )
} 
