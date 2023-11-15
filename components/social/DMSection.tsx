interface DMSectionProps {
  className?: string;
}

export default function DMSection({className = ''}: DMSectionProps) {
  return (
    <div className={` ${className}`}>
      <p>This is DM Section</p>
    </div>
  );
}
