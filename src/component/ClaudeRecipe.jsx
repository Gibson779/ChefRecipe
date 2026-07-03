import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ClaudeRecipe(props) {
    return (
        <section className="Claude_recipe" aria-live="polite">
            <h2>Chef Claude Recommends:</h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {props.recipe}
            </ReactMarkdown>
        </section>
    );
}