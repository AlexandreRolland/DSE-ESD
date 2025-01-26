import { useState, useEffect } from "react";
import { client, databases, DB_ID, COLLECTION_ID } from "./lib/appwrite";
import { Link } from "react-router-dom";
import Question from "./components/Question";

function App() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getQuestionsFromDB();

        const unsubscribe = client.subscribe(
            `databases.${DB_ID}.collections.${COLLECTION_ID}.documents`,
            (res) => {
                console.log(res);

                if (
                    res.events.includes(
                        "databases.*.collections.*.documents.*.update"
                    )
                ) {
                    setQuestions((prevQuestions) => {
                        return prevQuestions.map((question) => {
                            if (question.$id !== res.payload.$id) {
                                return question;
                            }

                            return res.payload;
                        });
                    });

                    console.log("Updated Question");
                }
            }
        );

        return () => {
            unsubscribe();
        };
    }, []);

    async function getQuestionsFromDB() {
        const questions = await databases.listDocuments(DB_ID, COLLECTION_ID);
        setQuestions(questions.documents);
    }

    return (
        <main className="container max-w-3xl mx-auto px-4 py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Questions</h1>
                <Link
                    to="/results"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Voir les résultats
                </Link>
            </div>
            {questions.map((question) => (
                <Question key={question.$id} data={question} />
            ))}
        </main>
    );
}

export default App;
