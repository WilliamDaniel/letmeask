import { useState } from "react";
import { useParams } from "react-router";

import logoImg from "../assets/images/logo.svg";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/userAuth";

import "../styles/rooms.scss";

type RoomParms = {
    id: string;
}

export function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParms>();
    const roomId = params.id;
    const [newQuestion, setNewQuestion] = useState('');

    async function handleSendQuestion() {

        if (newQuestion.trim() === '') return; // return if empty newQuestion

        if (!user) throw new Error('You must be logged in');

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <RoomCode code={params?.id} />
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>

                <form>
                    <textarea
                        placeholder="Para enviar uma pergunta, faça seu login"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />

                    <div className="form-footer">
                        <span>Para enviar uma pergunta, <button>Faça seu cadastro</button></span>
                        <Button type="submit">Enviar perguntar</Button>
                    </div>
                </form>
            </main>
        </div>
    )
}