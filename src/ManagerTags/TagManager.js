import { getAllTags } from "../APIManager.js";

export const TagManager = () => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const importedTags = getAllTags();
        setTags(importedTags);

    }, []);

    return (
        <div>
            <h2>Tags</h2>
            <ul>
                {tags.map((tag) => (
                    <li key={tag.id}>{tag.label}</li>
                ))}
            </ul>
        </div>
    )}