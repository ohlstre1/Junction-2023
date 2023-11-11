import { Button } from '@/components/ui/button';

interface DocsData {
    content: string,
    distance: string,
    ref: string
}

export interface SentenceData {
    sentence: string;
    docs: DocsData[];
}

export interface OutputData {
    data: SentenceData[];
    prompt: string;
    clear: () => void;
    selectSource: (selectedSource: SentenceData) => void;
}


const ValidatedOutput = ({ data, prompt, clear, selectSource }: OutputData) => {
    const perc2color = (docs: DocsData[]) => {
        const bestDist = findNearestItemsScore(docs);
        if (!bestDist) {
            return
        }
        const bestDistNum = parseFloat(bestDist!);
        const perc = (1 - bestDistNum) * 100;
        let color: string;

        if (perc > 70) {
            color = 'green';
        } else if (perc > 50) {
            color = 'yellow';
        } else {
            color = 'red';
        }

        return {
            borderBottom: `4px solid ${color}`,
        };
    };

    const findNearestItemsScore = (dataArray: DocsData[]): string | null => {
        if (dataArray.length === 0) {
            return null; // Return null if the array is empty
        }

        // Sort the array based on the distance property
        const sortedArray = [...dataArray].sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

        // The item with the lowest distance is now at the beginning of the sortedArray
        const nearestItem = sortedArray[0];

        return nearestItem.distance;
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
                    <p className='mb-5'><b>{"Q: "}</b>{prompt}</p>
                    <p className="output-p">
                        <b>{"A: "}</b>
                        {data.map((item, index) => (
                            <span
                                onClick={() => selectSource(item)}
                                className="output-span"
                                key={index}
                                style={perc2color(item.docs)}
                            >
                                {item.sentence}{' '}
                            </span>
                        ))}
                    </p>
                </div>
                <Button
                    className="float-right mt-5"
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
