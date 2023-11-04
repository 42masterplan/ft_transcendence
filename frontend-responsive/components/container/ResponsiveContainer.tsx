/**
 * This component is a card component which is responsive.
 * Recommended to use this component inside a flex container. Because it will
 *  stretch to the full width of the container.
 */

type ResponsiveContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ResponsiveContainer({
  children,
  className
}: ResponsiveContainerProps) {
  return (
    <div className={`box-border flex min-w-fit p-0 m-0 ${className}`}>
      {children}
    </div>
  );
}
