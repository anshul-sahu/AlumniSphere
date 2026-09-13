import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../api";

function Chatbot() {

    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hello! 👋 I'm your AI assistant. How can I help you today?"
        }
    ]);

    useEffect(() => {
        if (user == null) {
            navigate("/signIn");
        }
    }, [user, navigate]);

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        const userMessage = message;

        setMessages((prev) => [
            ...prev,
            {
                sender: "user",
                text: userMessage
            }
        ]);

        setMessage("");

        try {

            // POST API
            const response = await axios.post(
                `${api}/chat_with_agent/${user.object.userId}`,
                { chat: userMessage }
            );

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: response.data
                }
            ]);

            // Temporary response
            // setTimeout(() => {
            //     setMessages((prev) => [
            //         ...prev,
            //         {
            //             sender: "bot",
            //             text: "I'm processing your request. How else can I help you?"
            //         }
            //     ]);
            // }, 700);

        } catch (error) {

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: "Sorry, something went wrong. Please try again."
                }
            ]);
        }
    };

    return (
        <div className="container-fluid min-vh-100 bg-light">

            {/* Header */}
            <div className="row justify-content-center">

                <div className="col-12 col-lg-9 col-xl-8">

                    <div className="card shadow-sm border-0 mt-3 mb-3"
                        style={{ height: "calc(100vh - 32px)" }}>

                        {/* Chat Header */}
                        <div className="card-header bg-primary text-white py-3">

                            <div className="d-flex align-items-center justify-content-between">

                                <div className="d-flex align-items-center">

                                    <div
                                        className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center me-3"
                                        style={{
                                            width: "45px",
                                            height: "45px"
                                        }}
                                    >
                                        <i className="bi bi-robot fs-4"></i>
                                    </div>

                                    <div>
                                        <h5 className="mb-0 fw-bold">
                                            AI Assistant
                                        </h5>

                                        <small className="opacity-75">
                                            <i className="bi bi-circle-fill me-1"
                                                style={{ fontSize: "7px" }}>
                                            </i>
                                            Online
                                        </small>
                                    </div>

                                </div>

                                {/* Back Button */}
                                <button
                                    className="btn btn-light btn-sm fw-semibold"
                                    onClick={() => navigate(-1)}
                                >
                                    <i className="bi bi-arrow-left me-1"></i>
                                    Back
                                </button>

                            </div>

                        </div>

                        {/* Messages */}
                        <div
                            className="card-body overflow-auto p-4"
                            style={{ backgroundColor: "#f8f9fa" }}
                        >

                            {messages.map((msg, index) => (

                                <div
                                    key={index}
                                    className={`d-flex mb-3 ${
                                        msg.sender === "user"
                                            ? "justify-content-end"
                                            : "justify-content-start"
                                    }`}
                                >

                                    {msg.sender === "bot" && (
                                        <div
                                            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2 flex-shrink-0"
                                            style={{
                                                width: "35px",
                                                height: "35px"
                                            }}
                                        >
                                            <i className="bi bi-robot"></i>
                                        </div>
                                    )}

                                    <div
                                        className={`p-3 shadow-sm ${
                                            msg.sender === "user"
                                                ? "bg-primary text-white"
                                                : "bg-white text-dark"
                                        }`}
                                        style={{
                                            maxWidth: "75%",
                                            borderRadius: "15px",
                                            borderTopRightRadius:
                                                msg.sender === "user"
                                                    ? "4px"
                                                    : "15px",
                                            borderTopLeftRadius:
                                                msg.sender === "bot"
                                                    ? "4px"
                                                    : "15px"
                                        }}
                                    >
                                        {msg.text}
                                    </div>

                                    {msg.sender === "user" && (
                                        <div
                                            className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center ms-2 flex-shrink-0"
                                            style={{
                                                width: "35px",
                                                height: "35px"
                                            }}
                                        >
                                            <i className="bi bi-person"></i>
                                        </div>
                                    )}

                                </div>

                            ))}

                        </div>

                        {/* Input */}
                        <div className="card-footer bg-white border-top p-3">

                            <form onSubmit={sendMessage}>

                                <div className="input-group">

                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Ask me anything..."
                                        value={message}
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                    />

                                    <button
                                        type="submit"
                                        className="btn btn-primary px-4"
                                        disabled={!message.trim()}
                                    >
                                        <i className="bi bi-send-fill me-1"></i>
                                        Send
                                    </button>

                                </div>

                            </form>

                            <div className="text-center mt-2">
                                <small className="text-muted">
                                    <i className="bi bi-shield-check me-1"></i>
                                    AI generated responses may not always be accurate.
                                </small>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Chatbot;