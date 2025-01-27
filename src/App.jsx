import { useState, useEffect } from "react";
import { client, databases, DB_ID, COLLECTION_ID } from "./lib/appwrite";
import { Link } from "react-router-dom";
import Question from "./components/Question";
import "./lib/css/questions.css";

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
        <div className="result-grid question-container">
            {/* <video autoPlay muted loop className="result-video" src="https://www.dkayu.fr/wp-content/uploads/2025/01/0127.mp4"></video> */}
            <main className="result-body" >
                <div className="question-titles">
                        <h1>RAPPORT</h1>
                        <h2>Pour terminer votre rapport d’enquête merci de sélectionner 
                        la porte responsable des anomalies dans l’entreprise :</h2>
                    </div>
                {questions.map((question) => (
                    <Question key={question.$id} data={question} />
                ))}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">Questions</h3>
                    <Link 
                        to="/results"
                        className=" question-grid-container bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Voir les résultats
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default App;
