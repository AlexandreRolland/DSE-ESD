import { useState, useEffect } from "react";
import { client, databases, DB_ID, COLLECTION_ID } from "./lib/appwrite";
import Responses from "./components/Responses";

export default function VoteResults() {
    const [questions, setQuestions] = useState([]);

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

    async function getQuestionsFromDB() {
        const questions = await databases.listDocuments(DB_ID, COLLECTION_ID);
        setQuestions(questions.documents);
    }

    return (
        <main className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-3xl font-bold mb-8 text-blue-600">Résultats des Votes</h1>
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
                {questions.map((question) => (
                    <div key={question.$id} className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">{question.text}</h2>
                        <Responses data={question} />
                    </div>
                ))}
            </div>
        </main>
    );
}
