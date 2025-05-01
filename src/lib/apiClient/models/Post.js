export class Post {
  constructor({ id, userId, title, body }) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.body = body;
  }

  static fromJson(json) {
    return new Post({
      id: json.id,
      userId: json.userId,
      title: json.title,
      body: json.body,
    });
  }
}
