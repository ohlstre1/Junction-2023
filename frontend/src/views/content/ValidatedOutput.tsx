export interface SentenceData {
    sentence: string;
    trust_score: number;
    ref: string;
}

export interface OutputData {
    data: SentenceData[];
}

const ValidateOutput = ({ data }: OutputData) => {

    const getHighlightColor = (trustScore: number): string => {
        const score = trustScore

        if (score >= 0.75) {
            return 'green';
        } else if (score >= 0.5) {
            return 'yellow';
        } else {
            return 'red';
        }
    };
    return (
        <>
            <div className="output-container">
                {data.map((item, index) => (
                    <p key={index} style={{ color: getHighlightColor(item.trust_score) }}>
                        {item.sentence}
                    </p>
                ))}
            </div>
        </>
    )
}

export default ValidateOutput;