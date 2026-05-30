export function ChipButton({
  id,
  item,
  selectedItem,
  setSelectedItem,
  toggle,
}) {
  return (
    <span
      key={id}
      className="inline-flex items-center gap-1 text-xs bg-cyan-50 text-cyan-700 border border-cyan-200 rounded-full px-2.5 py-1"
    >
      {item?.name}
      <button onClick={() => toggle(selectedItem, setSelectedItem, id)}>
        <svg
          className="h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </span>
  );
}
