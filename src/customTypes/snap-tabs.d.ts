declare global {
  namespace JSX {
    interface IntrinsicElements {
      'snap-tabs': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >
    }
  }
}
