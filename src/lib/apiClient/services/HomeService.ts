import { ApiClient } from "../ApiClient";
import { Post } from "../models/Post";

const BASE_URL =
  "https://www.livefootballtickets.com/api/fixtures/41403?eventCode=tottenham-hotspur-vs-bodoglimt&eventTypeCode=europa-league&locale=en-GB&pageNumber=2&currency=gbp";

// Define types
interface CreatePostInput {
  title: string;
  body: string;
  userId: number;
}

export const HomeService = {
  async getPost(id: number): Promise<Post> {
    const data = await ApiClient<Post>(`${BASE_URL}`);
    return Post.fromJson(data);
  },

  async getAllPosts(): Promise<Post[]> {
    const data = await ApiClient<unknown[]>(`${BASE_URL}`);
    return data.map((postJson) => Post.fromJson(postJson));
  },

  async createPost({ title, body, userId }: CreatePostInput): Promise<Post> {
    const data = await ApiClient<unknown>(`${BASE_URL}`, {
      method: "POST",
      body: { title, body, userId },
    });
    return Post.fromJson(data);
  },
};

// async function fetchUser(id: number) {
//   const user = await ApiClient<User>(`/api/users/${id}`);
//   console.log(user.name); // now 'user' is fully typed
// }
