interface EmphasizeProps {
  words: {
    text: string
    className?: string
  }[]
  className?: string
}

export const Emphasize = ({ words, className }: EmphasizeProps) => (
  <div className={className}>
    {words.map(w => (
      <div key={w.text} className={w.className}>
        {w.text}
        &nbsp;
      </div>
    ))}{' '}
  </div>
)
