// Responses.js
import Results from "./Results";

export default function Responses({ data }) {
    if (!data) return null;

    const totalVotes =
        data.votes_1 +
        data.votes_2 +
        data.votes_3 +
        data.votes_4 +
        data.votes_5 +
        data.votes_6 +
        data.votes_7 +
        data.votes_8;

    const options = [
        { text: data.answer_1, votes: data.votes_1 },
        { text: data.answer_2, votes: data.votes_2 },
        { text: data.answer_3, votes: data.votes_3 },
        { text: data.answer_4, votes: data.votes_4 },
        { text: data.answer_5, votes: data.votes_5 },
        { text: data.answer_6, votes: data.votes_6 },
        { text: data.answer_7, votes: data.votes_7 },
        { text: data.answer_8, votes: data.votes_8 },
    ];

    return (
        <div className="flex flex-col gap-4">
            {options.map(
                (option, index) =>
                    option.text && (
                        <Results
                            key={index}
                            text={option.text}
                            percentage={Math.floor((option.votes / totalVotes) * 100)}
                            votes={option.votes}
                        />
                    )
            )}
        </div>
    );
}
