import {Button} from '@/components/ui/button';

export interface SentenceData {
    sentence: string;
    trust_score: number;
    ref: string;
}

export interface OutputData {
    data: SentenceData[];
    clear: () => void;
}

const ValidatedOutput = ({data, clear}: OutputData) => {
    const perc2color = (perc: number) => {
        perc = perc * 100;
        let r,
            g,
            b = 0;
        if (perc < 50) {
            r = 255;
            g = Math.round(5.1 * perc);
        } else {
            g = 255;
            r = Math.round(510 - 5.1 * perc);
        }
        return {
            borderBottom: `4px solid rgba(${r}, ${g}, ${b}, 1)`,
        };
    };

    // const getHighlightStyle = (trustScore: number) => {
    //     const score = trustScore;

    //     if (score >= 0.75) {
    //         return {borderBottom: '2px solid green'};
    //     } else if (score >= 0.5) {
    //         return {borderBottom: '2px solid yellow'};
    //     } else {
    //         return {borderBottom: '2px solid red'};
    //     }
    // };

    return (
        <>
            <div className="output-container">
                <div>
                    <p className="output-p">
                        {data.map((item, index) => (
                            <span
                                onClick={() => window.alert(item.trust_score)}
                                className="output-span"
                                key={index}
                                style={perc2color(item.trust_score)}
                            >
                                {item.sentence}{' '}
                            </span>
                        ))}
                    </p>
                </div>
                <Button
                    className="float-right mt-3"
                    onClick={() => clear()}
                    // disabled={prompt === ""}
                >
                    Clear
                </Button>
            </div>
        </>
    );
};

export default ValidatedOutput;
