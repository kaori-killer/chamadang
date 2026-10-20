import AsyncStorage from "@react-native-async-storage/async-storage";
import { enqueue, flushQueue, readQueue } from "@/lib/upload/queue";
import * as save from "@/lib/upload/savePlant";


const input = (id: string): save.SaveInput => ({
  userId: "u", attachTo: null, tea: null, note: null,
  clip: { uri: `file:///${id}.mp4`, durationMs: 1500, recordedAt: "2026-10-20T00:00:00Z" },
  place: { lat: 1, lng: 1, name: id, tags: [], visibility: "public", addressShort: null, addressFull: null },
});

describe("업로드 큐", () => {
  beforeEach(async () => { await AsyncStorage.clear(); jest.restoreAllMocks(); });

  it("넣으면 쌓이고 개수를 돌려준다", async () => {
    expect(await enqueue(input("a"))).toBe(1);
    expect(await enqueue(input("b"))).toBe(2);
    expect((await readQueue()).map((q) => q.place.name)).toEqual(["a", "b"]);
  });
  it("성공한 것만 빠지고 실패한 건 남는다", async () => {
    await enqueue(input("ok")); await enqueue(input("bad"));
    jest.spyOn(save, "savePlant").mockImplementation(async (i) => { if (i.place.name === "bad") throw new Error("x"); return "p"; });
    const r = await flushQueue();
    expect(r).toEqual({ done: 1, left: 1 });
    expect((await readQueue()).map((q) => q.place.name)).toEqual(["bad"]);
  });
});
