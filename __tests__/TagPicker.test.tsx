import { fireEvent, render, screen } from "@testing-library/react-native";
import { TagPicker } from "@/components/plant/TagPicker";

describe("TagPicker", () => {
  it("선택하면 onChange로 목록이 온다", () => {
    const onChange = jest.fn();
    render(<TagPicker selected={[]} max={5} onChange={onChange} />);
    fireEvent.press(screen.getByRole("checkbox", { name: "그늘" }));
    expect(onChange).toHaveBeenCalledWith(["그늘"]);
  });
  it("최대 개수에 닿으면 더 못 고른다", () => {
    const onChange = jest.fn();
    render(<TagPicker selected={["앉을 자리", "그늘"]} max={2} onChange={onChange} />);
    fireEvent.press(screen.getByText("뷰"));
    expect(onChange).not.toHaveBeenCalled();
  });
  it("이미 고른 건 해제된다", () => {
    const onChange = jest.fn();
    render(<TagPicker selected={["그늘"]} max={5} onChange={onChange} />);
    fireEvent.press(screen.getByRole("checkbox", { name: "그늘" }));
    expect(onChange).toHaveBeenCalledWith([]);
  });
});
