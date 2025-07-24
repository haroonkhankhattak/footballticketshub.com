export class Ticket {
  id: number;
  title: string;
  body: string;
  userId: number;

  constructor(id: number, title: string, body: string, userId: number) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.userId = userId;
  }

  static fromJson(json: unknown): Ticket {
    if (typeof json !== "object" || json === null) {
      throw new Error("Invalid JSON object for Ticket");
    }

    const obj = json as {
      id: number;
      title: string;
      body: string;
      userId: number;
    };

    return new Ticket(obj.id, obj.title, obj.body, obj.userId);
  }
}
