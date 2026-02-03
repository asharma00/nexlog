function HighlightWord({ text, search }) {
    if (!text) return null;           
    if (!search) return text;     
    
    const regex = new RegExp(`(${search})`, 'ig');
    const parts = text.split(regex);
    
    return (
        <>
            {
                parts.map((part, i) => regex.test(part)
                    ? <span key={i} className='bg-(--highlight-colour)'>{part}</span>
                    : part
                )
            }
        </>
    );
}

export default HighlightWord