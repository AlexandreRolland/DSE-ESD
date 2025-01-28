export default function Vote({ text, percentage, votes, atelier }) {
    return (
        <div className="question-votes">

            <input
                className="appearance-none"
                type="radio"
                name="vote"
                value={text}
                id={text}
            />
            <label
                htmlFor={text}
                className="question-vote-container  block rounded  border-transparent cursor-pointer "
            >
                <p className="text-2xl font-bold flex items-center justify-between">
                    {text}
                </p>
                <span>{atelier}</span>

            </label>
        </div>
    );
}
