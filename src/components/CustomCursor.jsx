export default function CustomCursor() {
  return (
    <>
      <div id="cursor">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 3.5L20.5 12L4.5 20.5V3.5Z" fill="var(--bg)" stroke="var(--fg)" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      </div>
      <div id="cursor-ring" />
    </>
  );
}
