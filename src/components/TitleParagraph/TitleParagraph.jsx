// Estilos Css
import styles from "./TitleParagraph.module.css";

import PropTypes from "prop-types";

const TitleParagraph = ({
    title = "",
    paragraph = "",
    padding = "",
    marginBottom = "",
    textAlign = "",
    color = "",
    margin = "",
}) => {
    return (
        <>
            <h1 className={styles.title} style={{ padding, textAlign, color }}>
                {title}
            </h1>
            <p
                className={styles.paragraph}
                style={{ marginBottom, textAlign, color }}
            >
                {paragraph}
            </p>
        </>
    );
};

TitleParagraph.propTypes = {
    padding: PropTypes.string,
    marginBottom: PropTypes.string,
    textAlign: PropTypes.string,
    color: PropTypes.string,
};

TitleParagraph.defaultProps = {
    padding: "0",
    marginBottom: "",
    textAlign: "",
    color: "",
    marginBottom: "0",
    margin: "0",
};

export default TitleParagraph;
