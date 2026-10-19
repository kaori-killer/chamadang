import { useUi } from "@/store/ui";

const reset = () => useUi.setState({ mode: "all", card: "none", selectedPlaceId: null });

describe("카드 상태 기계", () => {
  beforeEach(reset);

  it("핀 탭 → 펼침", () => {
    useUi.getState().openCard("p1");
    expect(useUi.getState()).toMatchObject({ card: "expanded", selectedPlaceId: "p1" });
  });
  it("펼침에서 지도 드래그 → 접힘, 접힘에서 다시 드래그는 그대로", () => {
    useUi.getState().openCard("p1");
    useUi.getState().collapseCard();
    expect(useUi.getState().card).toBe("collapsed");
    useUi.getState().collapseCard();
    expect(useUi.getState().card).toBe("collapsed");
  });
  it("접힘 → 띠 탭 → 펼침", () => {
    useUi.getState().openCard("p1");
    useUi.getState().collapseCard();
    useUi.getState().expandCard();
    expect(useUi.getState().card).toBe("expanded");
  });
  it("닫기 → 선택 해제", () => {
    useUi.getState().openCard("p1");
    useUi.getState().closeCard();
    expect(useUi.getState()).toMatchObject({ card: "none", selectedPlaceId: null });
  });
  it("모드 전환 시 카드 닫힘", () => {
    useUi.getState().openCard("p1");
    useUi.getState().setMode("mine");
    expect(useUi.getState()).toMatchObject({ mode: "mine", card: "none" });
  });
  it("선택 없이 펼치기는 무시", () => {
    useUi.getState().expandCard();
    expect(useUi.getState().card).toBe("none");
  });
});
