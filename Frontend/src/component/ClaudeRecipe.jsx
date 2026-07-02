import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ClaudeRecipe(props) {
    return (
        <section className="Claude_recipe">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {props.recipe}
            </ReactMarkdown>
        </section>
    );
}