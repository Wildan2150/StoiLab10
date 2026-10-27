/**
 * FormulaRenderer
 * Renders chemical formulas with precise subscript (numbers) and superscript (charges).
 * E.g. "H2SO4" -> H<sub>2</sub>SO<sub>4</sub>
 * E.g. "Ca2+" -> Ca<sup>2+</sup>
 */
export default function FormulaRenderer({ formula, className = '' }) {
  if (!formula) return null;

  const renderFormulaContent = (text) => {
    const parts = [];
    let current = '';
    let i = 0;

    while (i < text.length) {
      const char = text[i];
      if (char === '^') {
        // Superscript marker
        i++;
        let sup = '';
        while (i < text.length && /[\w+-]/.test(text[i])) {
          sup += text[i];
          i++;
        }
        if (current) {
          parts.push(<span key={parts.length}>{current}</span>);
          current = '';
        }
        parts.push(<sup key={parts.length}>{sup}</sup>);
      } else if (/\d/.test(char) && i > 0 && /[A-Za-z)\]]/.test(text[i - 1])) {
        // Collect consecutive numbers for subscript
        let sub = '';
        while (i < text.length && /\d/.test(text[i])) {
          sub += text[i];
          i++;
        }
        if (current) {
          parts.push(<span key={parts.length}>{current}</span>);
          current = '';
        }
        parts.push(<sub key={parts.length}>{sub}</sub>);
      } else {
        current += char;
        i++;
      }
    }
    if (current) {
      parts.push(<span key={parts.length}>{current}</span>);
    }
    return parts;
  };

  return (
    <span className={`chem-formula ${className}`}>
      {renderFormulaContent(formula)}
    </span>
  );
}
