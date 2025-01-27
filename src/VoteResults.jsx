import { useState, useEffect } from "react";
import { client, databases, DB_ID, COLLECTION_ID } from "./lib/appwrite";
import Responses from "./components/Responses";


export default function VoteResults() {
    const [questions, setQuestions] = useState([]);
    const [totalVotes, setTotalVotes] = useState(0); // Ajout d'un state pour le total des votes

    useEffect(() => {
        getQuestionsFromDB();

        // Subscription à Appwrite pour écouter les mises à jour
        const unsubscribe = client.subscribe(
            `databases.${DB_ID}.collections.${COLLECTION_ID}.documents`,
            (res) => {
                if (res.events.includes("databases.*.collections.*.documents.*.update")) {
                    setQuestions((prevQuestions) =>
                        prevQuestions.map((question) =>
                            question.$id === res.payload.$id ? res.payload : question
                        )
                    );
                }
            }
        );

        // Cleanup la subscription
        return () => {
            unsubscribe();
        };
    }, []);

    // Fonction pour récupérer les questions depuis la base de données
    async function getQuestionsFromDB() {
        const questions = await databases.listDocuments(DB_ID, COLLECTION_ID);
        setQuestions(questions.documents);
    }

    // Calcul du total des votes à partir des questions
    useEffect(() => {
        const total = questions.reduce((sum, question) => {
            return sum + question.votes_1 + question.votes_2 + question.votes_3 +
                question.votes_4 + question.votes_5 + question.votes_6 + question.votes_7 + question.votes_8;
        }, 0);
        setTotalVotes(total);
    }, [questions]);

    return (
        <div className="result-grid">
            <video autoPlay muted loop className="result-video" src="https://www.dkayu.fr/wp-content/uploads/2025/01/0127.mp4"></video>
            <main className="result-body">
                <div className="result-tv-filter"></div>
                <div>
                    <h1>RAPPORT</h1>
                    <h2>Résultats des analyses interdimensionnelles</h2>
                </div>
                <div>
                    {questions.map((question) => (
                        <div key={question.$id}>
                            <div className="results">
                                <Responses data={question} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="result-bottom">
                    <div className="result-img-container">
                        <img src="https://www.dkayu.fr/wp-content/uploads/2025/01/logo.png" alt="Logo" />
                    </div>
                    <div className="result-count">
                        <span>{totalVotes}</span> {/* Affichage du total des votes */}
                        <p>SONDÉS</p>
                    </div>

                    <div className="result-date">
                        <div>
                            <p>30</p>
                            <p>JANVIER</p>
                        </div>
                        <p>2025</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
