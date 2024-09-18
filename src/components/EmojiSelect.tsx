import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { emojiList } from "@/lib/utils";

const EmojiSelect: React.FC<{
  value: string;
  onValueChange: (value: string) => void;
}> = ({ value, onValueChange }) => (
  <div className="flex flex-col space-y-2">
    <Label htmlFor="emoji-select">Select Emoji</Label>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger id="emoji-select">
        <SelectValue placeholder="Select an emoji" />
      </SelectTrigger>
      <SelectContent>
        {emojiList.map((emoji, index) => (
          <SelectItem key={index} value={emoji}>
            {emoji}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default EmojiSelect;
