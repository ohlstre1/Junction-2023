export interface SentenceData {
    sentence: string;
    trust_score: number;
    ref: string;
}

export interface OutputData {
    data: SentenceData[];
}

const ValidateOutput = ({ data }: OutputData) => {

    const getHighlightStyle = (trustScore: number) => {
        const score = trustScore;

        if (score >= 0.75) {
            return { borderBottom: '2px solid green' };
        } else if (score >= 0.5) {
            return { borderBottom: '2px solid yellow' };
        } else {
            return { borderBottom: '2px solid red' };
        }
    };
    return (
        <>
            <div className="output-container">
                <div>
                    <p className="output-p">
                        {data.map((item, index) => (
                            <span key={index} style={getHighlightStyle(item.trust_score)}>
                                {item.sentence}{' '}
                            </span>
                        ))}
                    </p>
                </div>
            </div>
        </>
    )
}

export default ValidateOutput;