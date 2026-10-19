import { fireEvent, render, screen } from "@testing-library/react-native";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("라벨이 접근성 이름이 된다", () => {
    render(<Button label="여기 맞아요" onPress={() => {}} />);
    expect(screen.getByRole("button", { name: "여기 맞아요" })).toBeTruthy();
  });
  it("ariaLabel을 주면 그게 접근성 이름", () => {
    render(<Button label="보내기" ariaLabel="신고 보내기" onPress={() => {}} />);
    expect(screen.getByRole("button", { name: "신고 보내기" })).toBeTruthy();
  });
  it("disabled면 눌리지 않고 aria-disabled", () => {
    const onPress = jest.fn();
    render(<Button label="지우기" disabled onPress={onPress} />);
    const btn = screen.getByRole("button", { name: "지우기" });
    fireEvent.press(btn);
    expect(onPress).not.toHaveBeenCalled();
    expect(btn.props["aria-disabled"]).toBe(true);
  });
});
