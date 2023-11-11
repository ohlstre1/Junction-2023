import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useEffect, useState } from "react";
import dummy from './dummy2.json';
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from 'axios';
import { UploadDialog } from "./UploadDialog";
import { snakeCaseToWords } from "./utils";

type DatabaseSource = {
    name: string;
    source: string;
    docType: string;
};

type DatabaseData = {
    name: string;
    sources: DatabaseSource[];
};

const DatabaseSideNav = () => {
    const [databases, setDatabases] = useState<DatabaseData[]>([]);
    const [selectedDatabaseNames, setSelectedDatabaseNames] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/sources');
                setDatabases(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const updateSelectedDatabaseName = (name: string) => {
        // Check if the name is already in the list
        const isNameSelected = selectedDatabaseNames.includes(name);

        // If the name is already selected, remove it; otherwise, add it
        if (isNameSelected) {
            // Remove the name from the list
            setSelectedDatabaseNames(selectedDatabaseNames.filter(n => n !== name));
        } else {
            // Add the name to the list
            setSelectedDatabaseNames([...selectedDatabaseNames, name]);
        }
    }

    return (
        <>
            <div className="left-sidebar-container">
                <div className="left-sidebar-content">
                    <h2 className="mt-3 mb-2 px-4 text-lg font-semibold tracking-tight">
                        Your Data:
                    </h2>
                    <div className="space-y-1 p-2">
                        {databases.map((database) => (
                            <Collapsible>
                                <CollapsibleTrigger asChild key={database.name}>
                                    <Button
                                        className="w-full justify-between"
                                        onClick={() => updateSelectedDatabaseName(database.name)}
                                    >
                                        {snakeCaseToWords(database.name)}
                                        {selectedDatabaseNames.includes(database.name) ?
                                            <ChevronUp className="h-4 w-4" />
                                            :
                                            <ChevronDown className="h-4 w-4" />
                                        }
                                    </Button>

                                </CollapsibleTrigger>
                                {database.sources.map((source) => {
                                    return (
                                        <CollapsibleContent className="ml-3" key={source.name}>
                                            <Button variant="outline" size="sm" className="w-full justify-start">{snakeCaseToWords(source.name)}</Button>
                                        </CollapsibleContent>
                                    )
                                })}

                            </Collapsible>
                        ))}
                    </div>
                </div>
                <div className="w-full flex justify-around p-3">
                    <UploadDialog />
                    <Button>Create DB</Button>
                </div>
            </div>
        </>
    )
}

export default DatabaseSideNav;