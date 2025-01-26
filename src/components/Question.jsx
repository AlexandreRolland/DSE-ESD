import { useState } from "react";
import { databases, DB_ID, COLLECTION_ID } from "../lib/appwrite";
import Vote from "./Vote";

export default function Question({ data }) {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const selectedVote = formData.get("vote");

        if (selectedVote === data.answer_1) {
            databases.updateDocument(DB_ID, COLLECTION_ID, data.$id, {
                votes_1: data.votes_1 + 1,
            });
        } else if (selectedVote === data.answer_2) {
            databases.updateDocument(DB_ID, COLLECTION_ID, data.$id, {
                votes_2: data.votes_2 + 1,
            });
        } else if (selectedVote === data.answer_3) {
            databases.updateDocument(DB_ID, COLLECTION_ID, data.$id, {
                votes_3: data.votes_3 + 1,
            });
        }
        else if (selectedVote === data.answer_4) {
            databases.updateDocument(DB_ID, COLLECTION_ID, data.$id, {
                votes_4: data.votes_4 + 1,
            });
        }
        else if (selectedVote === data.answer_5) {
            databases.updateDocument(DB_ID, COLLECTION_ID, data.$id, {
                votes_5: data.votes_5 + 1,
            });
        }
        else if (selectedVote === data.answer_6) {
            databases.updateDocument(DB_ID, COLLECTION_ID, data.$id, {
                votes_6: data.votes_6 + 1,
            });
        }
        else if (selectedVote === data.answer_7) {
            databases.updateDocument(DB_ID, COLLECTION_ID, data.$id, {
                votes_7: data.votes_7 + 1,
            });
        }
        else if (selectedVote === data.answer_8) {
            databases.updateDocument(DB_ID, COLLECTION_ID, data.$id, {
                votes_8: data.votes_8 + 1,
            });
        }

        setIsSubmitted(true);

        // Réactiver le bouton après 5 secondes
        setTimeout(() => {
            setIsSubmitted(false);
        }, 5000);

    }

    if (!data) return null;

    const totalVotes = data.votes_1 + data.votes_2 + data.votes_3 + data.votes_4 + data.votes_5 + data.votes_6 + data.votes_7 + data.votes_8;

    return (
        <>
            <h2 className="text-3xl text-center font-bold">{data.text}</h2>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 votes-container"
            >
                <Vote
                    text={data.answer_1}
                    percentage={Math.floor((data.votes_1 / totalVotes) * 100)}
                    votes={data.votes_1}
                />

                <Vote
                    text={data.answer_2}
                    percentage={Math.floor((data.votes_2 / totalVotes) * 100)}
                    votes={data.votes_2}
                />

                <Vote
                    text={data.answer_3}
                    percentage={Math.floor((data.votes_3 / totalVotes) * 100)}
                    votes={data.votes_3}
                />

                <Vote
                    text={data.answer_4}
                    percentage={Math.floor((data.votes_4 / totalVotes) * 100)}
                    votes={data.votes_4}
                />

                <Vote
                    text={data.answer_5}
                    percentage={Math.floor((data.votes_5 / totalVotes) * 100)}
                    votes={data.votes_5}
                />

                <Vote
                    text={data.answer_6}
                    percentage={Math.floor((data.votes_6 / totalVotes) * 100)}
                    votes={data.votes_6}
                />

                <Vote
                    text={data.answer_7}
                    percentage={Math.floor((data.votes_7 / totalVotes) * 100)}
                    votes={data.votes_7}
                />

                <Vote
                    text={data.answer_8}
                    percentage={Math.floor((data.votes_8 / totalVotes) * 100)}
                    votes={data.votes_8}
                />

                <button
                    type="submit"
                    disabled={isSubmitted}
                    className="cursor-pointer ml-auto my-6 rounded shadow bg-green-400 text-white font-medium text-lg py-2 px-10 transition hover:bg-white hover:text-green-400 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-100"
                >
                    Submit your vote
                </button>
            </form>
        </>
    );
}
