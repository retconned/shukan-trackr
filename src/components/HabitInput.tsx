import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const HabitInput: React.FC<{
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}> = ({ label, id, value, onChange, placeholder, type = "text" }) => (
  <div className="flex flex-col space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default HabitInput;
