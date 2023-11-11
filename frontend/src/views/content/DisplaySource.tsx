import {Button} from '@/components/ui/button';

export interface DisplaySourceData {
    clear: () => void;
}

const DisplaySource = ({clear}: DisplaySourceData) => {
    return (
        <div className="source-container">
            <Button onClick={() => clear()}>Close</Button>
        </div>
    );
};

export default DisplaySource;
