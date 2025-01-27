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
            <main className="result-body question-body" >
                <div className="question-titles">
                    <h1>RAPPORT</h1>
                    <h2>Pour terminer votre rapport d’enquête merci de sélectionner
                        la porte responsable des anomalies dans l’entreprise :</h2>
                </div>
                {questions.map((question) => (
                    <Question key={question.$id} data={question} />
                ))}
                <div className="question-bottom">
                    <div className="question-bottom-left">
                        <div className="question-map-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.10585 46.5383L15.8353 42.0692C16.1473 41.9098 16.4926 41.8262 16.8421 41.8262C17.1709 41.8262 17.4956 41.9 17.7927 42.0415L17.8238 42.0566L17.8489 42.0692L27.8986 47.2127C28.911 47.7306 30.0269 48 31.1579 48C32.2889 48 33.4055 47.7302 34.4179 47.2124L45.2805 41.6516C46.0957 41.2346 46.7826 40.5929 47.2634 39.7974C47.7442 39.0017 47.9995 38.084 48 37.1471L48 5.97595L48 5.97213C48.0006 5.11274 47.7867 4.26785 47.3792 3.51766C46.9712 2.7664 46.3827 2.13549 45.6706 1.68414C44.9586 1.23282 44.1462 0.975794 43.3108 0.936851C42.4754 0.897908 41.643 1.07869 40.8941 1.46174L32.1639 5.93115C31.8519 6.0906 31.5074 6.17381 31.1579 6.17381C30.8083 6.17381 30.4632 6.09028 30.1511 5.93075L20.1014 0.787261C19.089 0.26939 17.9731 0 16.8421 0C15.7111 0 14.5945 0.269767 13.5821 0.787638L2.71877 6.34876C1.90388 6.76576 1.21725 7.40728 0.736634 8.20261C0.25583 8.99824 0.000496415 9.91596 7.63193e-06 10.8529L7.18019e-06 42.0228C-0.00142634 42.8827 0.211815 43.7282 0.618963 44.479C1.02668 45.231 1.61505 45.8626 2.3273 46.3145C3.03948 46.7665 3.85215 47.0239 4.68797 47.0631C5.5238 47.1023 6.35663 46.9215 7.10585 46.5383ZM14.3158 6.21012L5.05264 10.9521V41.7912L13.582 37.4247C13.821 37.3024 14.0665 37.1936 14.3158 37.0994V6.21012ZM19.3684 6.20995V37.0994C19.5871 37.1821 19.8027 37.2758 20.0136 37.3801C20.0432 37.3947 20.0726 37.4095 20.102 37.4245L28.6316 41.7901V27.7085V10.9006C28.3823 10.8064 28.137 10.6977 27.898 10.5755L19.3684 6.20995ZM33.6842 41.7899L42.9474 37.0479V11.6425V6.20876L34.418 10.5753C34.179 10.6976 33.9335 10.8064 33.6842 10.9006V22.0382V41.7899Z" fill="#212E6B" />
                            </svg>
                        </div>
                    </div>
                    <div className="question-bottom-right">
                        <img src="https://www.dkayu.fr/wp-content/uploads/2025/01/logo.png" alt="Logo" />
                    </div>
                </div>

            </main>
        </div>
    );
}

export default App;
