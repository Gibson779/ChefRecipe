import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Recipe(props) {
    return (
        <section className="recipe" aria-live="polite">
            <h2>Chef Recommendations:</h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {props.recipe}
            </ReactMarkdown>
        </section>
    );
}