type Props = {
  type: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export default function Input({ type, placeholder, onChange }: Props) {
  return (
    <input
      className="border-primary-600 border-1 rounded p-2"
      type={type}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
